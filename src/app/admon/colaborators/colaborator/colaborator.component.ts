import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Colaborator } from '@models/colaborator.model';

@Component({
  selector: 'app-colaborator',
  templateUrl: './colaborator.component.html',
  styleUrl: './colaborator.component.scss'
})
export class ColaboratorComponent {
  colaborator: Colaborator;
  companies: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ColaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.colaborator = data.colaborator;
    this.companies = data.companies;
  }
  
  getCompanyNames(companyIds: string[]): string[] {
    return this.companies
      ?.filter(c => companyIds.includes(c.id))
      .map(c => c.comercialName || c.socialReason) || [];
  }


  close(): void {
    this.dialogRef.close();
  }
}
