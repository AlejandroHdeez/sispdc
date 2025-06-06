import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Common } from '@common/common';
import { Country } from '@models/country.model';
import { CountryService } from '@services/country.service';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/common/status';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrl: './country-edit.component.scss'
})
export class CountryEditComponent {

  country: Country;
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
    public dialogRef: MatDialogRef<CountryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Country,
    private fb: FormBuilder,
    private status: Status,
    private countrySrv: CountryService,
    private toastr: ToastrService,
    public common: Common,
  ) {

    this.country = data;

    this.form = this.fb.group({
      id: [null, []],
      name: ['', [Validators.required, Validators.minLength(2)]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      statusId: [1]
    });

    if (this.country) {
      this.form.patchValue(this.country);
    }

  }

  save(): any {
    if (!this.form.value) {
      this.form.markAllAsTouched();
      return this.toastr.error('Revise los datos e intentelo nuevamente', 'Error');
    }

    let data: Country = new Country().deserialize(this.form.value);

    if (this.country?.id) {
      this.update(data);
    } else {
      this.add(data);
    }
  }


  add(data: Country) {
    const plain = JSON.parse(JSON.stringify(data));
    this.countrySrv.addCountry(plain).subscribe(resp => {
      if (resp.status) {
        this.reload = true;
        this.close();
        this.toastr.success(resp.message);
      } else {
        this.toastr.error(resp.message);
      }
    });
  }


  update(data: Country) {
    const plainData = { ...data };

    this.countrySrv.updateCountry(plainData.id, plainData).subscribe({
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
