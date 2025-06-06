
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Status } from 'src/app/common/status';
import { Common } from 'src/app/common/common';
import { CountryService } from '@services/country.service';
import { Country } from '@models/country.model';
import { CountryEditComponent } from './country-edit/country-edit.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CountryComponent } from './country/country.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})

export class CountriesComponent {

  displayedColumns = ['countryId', 'name', 'description', 'code', 'options'];
  dataSource: MatTableDataSource<Country>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  defaultPagination = this.common.defaultPagination();

  constructor(
    public dialog: MatDialog,
    private countrySrv: CountryService,
    private status: Status,
    private common: Common,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getCountries();
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getCountries(): void {
    this.countrySrv.getCountries().subscribe((countryes: any[]) => {
      this.dataSource = new MatTableDataSource(countryes.reverse());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }



  // getCountries(): void {
  //   this.countrySrv.getAll().subscribe(resp => {
  //     if (resp.status) {
  //       this.dataSource = new MatTableDataSource(resp.data.reverse().map((item: Country) => {
  //         item.status = this.status.getStatus(item.statusId!);
  //         return item;
  //       }));

  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;

  //     }
  //   });
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  view(data: any): void {
    this.dialog.open(CountryComponent, {
      width: '950px',
      disableClose: false,
      data: data
    });
  }

  upsert(data?: any): void {
    const dialogRef = this.dialog.open(CountryEditComponent, {
      width: '950px',
      disableClose: false,
      data: data
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getCountries();
      }
    });
  }

  deleteCountry(data: any) {
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
        this.countrySrv.deleteCountry(data.id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'País eliminado correctamente',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.getCountries();
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el país',
              footer: error.message || '',
            });
            console.error(error);
          }
        });
      }
    });
  }

  showDepartments(country: Country): void {
    this.router.navigate(['/admon/departamentos'], { state: { country } });
  }

  reload(): void {
    this.getCountries();
  }

}