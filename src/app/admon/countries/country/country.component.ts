import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Country } from '@models/country.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {
  country: Country;

  constructor(
    public dialogRef: MatDialogRef<CountryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Country,
  ) {
    this.country = data;
  }

  close(): void {
    this.dialogRef.close();
  }
}
