import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Common } from '@common/common';
import { Country } from '@models/country.model';
import { Department } from '@models/department.model';
import { CountryService } from '@services/country.service';
import { DepartmentService } from '@services/department.service';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/common/status';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrl: './department-edit.component.scss'
})
export class DepartmentEditComponent {
  department: Department;
  country: Country;
  countries: Country[] = [];
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
    public dialogRef: MatDialogRef<DepartmentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private status: Status,
    private departmentSrv: DepartmentService,
    private countrySrv: CountryService,
    private toastr: ToastrService,
    public common: Common,
  ) {

    this.department = data.department;
    this.country = data.country;

    this.form = this.fb.group({
      id: [null, []],
      name: ['', [Validators.required, Validators.minLength(2)]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      paisId: [this.country.id],
      statusId: [1]
    });

    if (this.department) {
      this.form.patchValue(this.department);
    }

  }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.countrySrv.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  save(): any {
    if (!this.form.value) {
      this.form.markAllAsTouched();
      return this.toastr.error('Revise los datos e intentelo nuevamente', 'Error');
    }

    let data: Department = new Department().deserialize(this.form.value);

    if (this.department?.id) {
      this.update(data);
    } else {
      this.add(data);
    }
  }


  add(data: Department) {
    const plain = JSON.parse(JSON.stringify(data));
    this.departmentSrv.add(plain).subscribe(resp => {
      if (resp.status) {
        this.reload = true;
        this.close();
        this.toastr.success(resp.message);
      } else {
        this.toastr.error(resp.message);
      }
    });
  }


  update(data: Department) {
    const plainData = { ...data };

    this.departmentSrv.update(plainData.id, plainData).subscribe({
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
        this.toastr.error('Error inesperado al actualizar país');
        console.error(err);
      }
    });
  }

  close(): void {
    this.dialogRef.close(this.reload);
  }
}
