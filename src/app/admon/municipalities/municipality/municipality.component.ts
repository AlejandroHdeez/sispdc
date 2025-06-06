import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Municipality } from '@models/municipality.model';

@Component({
  selector: 'app-municipality',
  templateUrl: './municipality.component.html',
  styleUrl: './municipality.component.scss'
})
export class MunicipalityComponent {
  municipality: Municipality;

  constructor(
    public dialogRef: MatDialogRef<MunicipalityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Municipality,
  ) {
    this.municipality = data;
  }

  close(): void {
    this.dialogRef.close();
  }
}
