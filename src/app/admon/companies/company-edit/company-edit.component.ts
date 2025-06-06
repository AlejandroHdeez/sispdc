import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Common } from '@common/common';
import { Company } from '@models/company.model';
import { Country } from '@models/country.model';
import { Department } from '@models/department.model';
import { Municipality } from '@models/municipality.model';
import { CompanyService } from '@services/company.service';
import { CountryService } from '@services/country.service';
import { DepartmentService } from '@services/department.service';
import { MunicipalityService } from '@services/municipality.service';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/common/status';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss'
})
export class CompanyEditComponent {

  company: Company;
  form: FormGroup;
  reload = false;
  statusOptions = this.status.getOptionStatus();

  countries: Country[] = [];
  departments: Department[] = [];
  municipalities: Municipality[] = [];

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
    public dialogRef: MatDialogRef<CompanyEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Company,
    private fb: FormBuilder,
    private status: Status,
    private companySrv: CompanyService,
    private toastr: ToastrService,
    public common: Common,
    private countrySrv: CountryService,
    private departmentSrv: DepartmentService,
    private municipalitySrv: MunicipalityService,
  ) {

    this.company = data;

    this.form = this.fb.group({
      id: [null, []],
      paisId: [null, [Validators.required]],
      departamentoId: [null, [Validators.required]],
      municipioId: [null, [Validators.required]],
      nit: ['', [Validators.required]],
      socialReason: ['', [Validators.required]],
      comercialName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      statusId: [1]
    });

    this.form.get('paisId')?.valueChanges.subscribe(paisId => {
      this.departments = [];
      this.form.get('departamentoId')?.reset();
      this.form.get('municipioId')?.reset();
      if (paisId) this.getDepartmentsByCountry(paisId);
    });

    this.form.get('departamentoId')?.valueChanges.subscribe(departmentId => {
      this.municipalities = [];
      this.form.get('municipioId')?.reset();
      if (departmentId) this.getMunicipalitiesByDepartment(departmentId);
    });

    if (this.company) {
      this.form.patchValue(this.company);
      this.form.get('departamentoId')?.setValue(this.company.departamentoId);
      this.form.get('municipioId')?.setValue(this.company.municipioId);
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

  getDepartmentsByCountry(paisId: string) {
    this.departmentSrv.getByCountry(paisId).subscribe(departments => {
      this.departments = departments;
    });
  }

  getMunicipalitiesByDepartment(departamentoId: string) {
    this.municipalitySrv.getByDepartment(departamentoId).subscribe(towns => {
      this.municipalities = towns;
    });
  }

  save(): any {
    if (!this.form.value) {
      this.form.markAllAsTouched();
      return this.toastr.error('Revise los datos e intentelo nuevamente', 'Error');
    }

    let data: Company = new Company().deserialize(this.form.value);

    if (this.company?.id) {
      this.update(data);
    } else {
      this.add(data);
    }
  }


  add(data: Company) {
    const plain = JSON.parse(JSON.stringify(data));
    this.companySrv.add(plain).subscribe(resp => {
      if (resp.status) {
        this.reload = true;
        this.close();
        this.toastr.success(resp.message);
      } else {
        this.toastr.error(resp.message);
      }
    });
  }


  update(data: Company) {
    const plainData = { ...data };

    this.companySrv.update(plainData.id, plainData).subscribe({
      next: (resp) => {
        if (resp.status) {
          this.reload = true;
          console.log(this.reload);
          
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
