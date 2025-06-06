import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Department } from '@models/department.model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent {
  department: Department;

  constructor(
    public dialogRef: MatDialogRef<DepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Department,
  ) {
    this.department = data;
  }

  close(): void {
    this.dialogRef.close();
  }
}
