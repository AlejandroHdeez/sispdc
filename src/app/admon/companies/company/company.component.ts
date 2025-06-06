import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Company } from '@models/company.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent {
  company: Company;

  countries: any[] = [];
  departments: any[] = [];
  municipalities: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.company = data.company;
    this.countries = data.countries;
    this.departments = data.departments;
    this.municipalities = data.municipalities;
  }

  getCountryName(id: string): string {
    return this.countries?.find(p => p.id === id)?.name || 'N/D';
  }

  getDepartmentName(id: string): string {
    return this.departments?.find(d => d.id === id)?.name || 'N/D';
  }

  getMunicipalityName(id: string): string {
    return this.municipalities?.find(m => m.id === id)?.name || 'N/D';
  }

  close(): void {
    this.dialogRef.close();
  }
}
