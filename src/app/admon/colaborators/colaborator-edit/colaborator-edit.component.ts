import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Common } from '@common/common';
import { Colaborator } from '@models/colaborator.model';
import { Company } from '@models/company.model';
import { ColaboratorService } from '@services/colaborator.service';
import { CompanyService } from '@services/company.service';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/common/status';

@Component({
  selector: 'app-colaborator-edit',
  templateUrl: './colaborator-edit.component.html',
  styleUrl: './colaborator-edit.component.scss'
})
export class ColaboratorEditComponent {
  colaborator: Colaborator;
  form: FormGroup;
  reload = false;
  statusOptions = this.status.getOptionStatus();

  companies: Company[] = [];

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
    public dialogRef: MatDialogRef<ColaboratorEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Colaborator,
    private fb: FormBuilder,
    private status: Status,
    private colaboratorSrv: ColaboratorService,
    private toastr: ToastrService,
    public common: Common,
    private companySrv: CompanyService,
  ) {

    this.colaborator = data;

    this.form = this.fb.group({
      id: [null, []],
      companyIds: [[], [Validators.required]],
      fullname: [null, [Validators.required]],
      age: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: ['', [Validators.required]],
      statusId: [1]
    });

    if (this.colaborator) {
      this.form.patchValue(this.colaborator);
    }
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.companySrv.getAll().subscribe(companies => {
      this.companies = companies;
      console.log(this.companies);
      
    });
  }

  save(): any {
    if (!this.form.value) {
      this.form.markAllAsTouched();
      return this.toastr.error('Revise los datos e intentelo nuevamente', 'Error');
    }

    let data: Colaborator = new Colaborator().deserialize(this.form.value);

    if (this.colaborator?.id) {
      this.update(data);
    } else {
      this.add(data);
    }
  }


  add(data: Colaborator) {
    const plain = JSON.parse(JSON.stringify(data));
    this.colaboratorSrv.add(plain).subscribe(resp => {
      if (resp.status) {
        this.reload = true;
        this.close();
        this.toastr.success(resp.message);
      } else {
        this.toastr.error(resp.message);
      }
    });
  }


  update(data: Colaborator) {
    const plainData = { ...data };

    this.colaboratorSrv.update(plainData.id, plainData).subscribe({
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
