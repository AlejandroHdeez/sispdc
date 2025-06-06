
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Status } from 'src/app/common/status';
import { Common } from 'src/app/common/common';
import Swal from 'sweetalert2';
import { Department } from '@models/department.model';
import { Router } from '@angular/router';
import { MunicipalityEditComponent } from './municipality-edit/municipality-edit.component';
import { Municipality } from '@models/municipality.model';
import { MunicipalityService } from '@services/municipality.service';
import { MunicipalityComponent } from './municipality/municipality.component';

@Component({
  selector: 'app-municipalities',
  templateUrl: './municipalities.component.html',
  styleUrl: './municipalities.component.scss'
})
export class MunicipalitiesComponent {
  displayedColumns = ['municipalityId', 'name', 'description', 'code', 'options'];
  dataSource: MatTableDataSource<Municipality>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  defaultPagination = this.common.defaultPagination();

  department!: Department;

  constructor(
    public dialog: MatDialog,
    private municipalitySrv: MunicipalityService,
    private status: Status,
    private common: Common,
    private router: Router
  ) {
    this.department = history.state.department ? history.state.department : null;

  }

  ngOnInit(): void {
    if (!this.department) {
      this.router.navigate(['/admon/departamentos']);
      return;
    }

    this.getMunicipalities();
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getMunicipalities(): void {
    this.municipalitySrv.getByDepartment(this.department.id).subscribe((municipalities: any[]) => {
      this.dataSource = new MatTableDataSource(municipalities);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  view(data: any): void {
    this.dialog.open(MunicipalityComponent, {
      width: '950px',
      disableClose: false,
      data: data
    });
  }

  upsert(data?: any): void {
    const dialogRef = this.dialog.open(MunicipalityEditComponent, {
      width: '950px',
      disableClose: false,
      data: {
        muunicipality: data,
        department: this.department
      }
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getMunicipalities();
      }
    });
  }

  deleteMunicipality(data: any) {
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
        this.municipalitySrv.deleteMunicipality(data.id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Municipio eliminada correctamente',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.getMunicipalities();
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el municipio',
              footer: error.message || '',
            });
            console.error(error);
          }
        });
      }
    });
  }

  reload(): void {
    this.getMunicipalities();
  }
}
