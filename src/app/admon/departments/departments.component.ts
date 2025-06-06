
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Status } from 'src/app/common/status';
import { Common } from 'src/app/common/common';
import { DepartmentEditComponent } from './department-edit/department-edit.component';
import Swal from 'sweetalert2';
import { Department } from '@models/department.model';
import { DepartmentService } from '@services/department.service';
import { Country } from '@models/country.model';
import { Router } from '@angular/router';
import { Municipality } from '@models/municipality.model';
import { DepartmentComponent } from './department/department.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent {
  displayedColumns = ['departmentId', 'name', 'description', 'code', 'options'];
  dataSource: MatTableDataSource<Department>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  defaultPagination = this.common.defaultPagination();

  country!: Country;

  constructor(
    public dialog: MatDialog,
    private departmentSrv: DepartmentService,
    private status: Status,
    private common: Common,
    private router: Router
  ) {
    this.country = history.state.country ? history.state.country : null;

  }

  ngOnInit(): void {
    if (!this.country) {
      this.router.navigate(['/admon/paises']);
      return;
    }

    this.getDepartments();
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getDepartments(): void {
    this.departmentSrv.getByCountry(this.country.id).subscribe((departments: any[]) => {
      this.dataSource = new MatTableDataSource(departments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  view(data: any): void {
    this.dialog.open(DepartmentComponent, {
      width: '950px',
      disableClose: false,
      data: data
    });
  }

  upsert(data?: any): void {
    const dialogRef = this.dialog.open(DepartmentEditComponent, {
      width: '950px',
      disableClose: false,
      data: {
        department: data,
        country: this.country
      }
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getDepartments();
      }
    });
  }

  deleteDepartment(data: any) {
    Swal.fire({
      title: '¿Estás seguro de eliminar el registro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.departmentSrv.deleteDepartment(data.id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Departamento eliminado correctamente',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.getDepartments();
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el departamento',
              footer: error.message || '',
            });
            console.error(error);
          }
        });
      }
    });
  }

  showMunicipalities(department: Department): void {
    this.router.navigate(['/admon/municipios'], { state: { department } });
  }

  reload(): void {
    this.getDepartments();
  }
}
