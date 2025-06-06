import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Common } from '@common/common';
import { Department } from '@models/department.model';
import { Municipality } from '@models/municipality.model';
import { DepartmentService } from '@services/department.service';
import { MunicipalityService } from '@services/municipality.service';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/common/status';

@Component({
  selector: 'app-municipality-edit',
  templateUrl: './municipality-edit.component.html',
  styleUrl: './municipality-edit.component.scss'
})
export class MunicipalityEditComponent {
  municipality: Municipality;
  department: Department;
  form: FormGroup;
  reload = false;
  statusOptions = this.status.getOptionStatus();

  rules: any = {
    name: {
      message: '',
      validators: [
        { type: 'required', message: 'El valor es requerido' },
        { type: 'minlength', message: 'El texto debe tener al menos 2 carácteres' }
      ]
    },
    description: {
      message: '',
      validators: [
        { type: 'required', message: 'El valor es requerido' },
        { type: 'minlength', message: 'El texto debe tener al menos 2 carácteres' }
      ]
    },
    code: {
      message: '',
      validators: [
        { type: 'required', message: 'El valor es requerido' },
      ]
    }
  }

  constructor(
    public dialogRef: MatDialogRef<MunicipalityEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private status: Status,
    private municipalitySrv: MunicipalityService,
    private departmentSrv: DepartmentService,
    private toastr: ToastrService,
    public common: Common,
  ) {
    this.municipality = data.municipality;
    this.department = data.department;

    this.form = this.fb.group({
      id: [null, []],
      name: ['', [Validators.required, Validators.minLength(2)]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      departamentoId: [this.department.id],
      statusId: [1]
    });

    if (this.municipality) {
      this.form.patchValue(this.municipality);
    }

  }

  ngOnInit(): void {
  }

  save(): any {
    if (!this.form.value) {
      this.form.markAllAsTouched();
      return this.toastr.error('Revise los datos e intentelo nuevamente', 'Error');
    }

    let data: Municipality = new Municipality().deserialize(this.form.value);

    if (this.municipality?.id) {
      this.update(data);
    } else {
      this.add(data);
    }
  }


  add(data: Municipality) {
    const plain = JSON.parse(JSON.stringify(data));
    this.municipalitySrv.add(plain).subscribe(resp => {
      if (resp.status) {
        this.reload = true;
        this.close();
        this.toastr.success(resp.message);
      } else {
        this.toastr.error(resp.message);
      }
    });
  }


  update(data: Municipality) {
    const plainData = { ...data };

    this.municipalitySrv.update(plainData.id, plainData).subscribe({
      next: (resp) => {
        if (resp.status) {
          this.reload = true;
          this.close();
          this.toastr.success(resp.message);
        } else {
          this.toastr.error(resp.message);
        }
      },
      error: (err) => {
        this.toastr.error('Error inesperado al actualizar municipio');
        console.error(err);
      }
    });
  }

  close(): void {
    this.dialogRef.close(this.reload);
  }
}
