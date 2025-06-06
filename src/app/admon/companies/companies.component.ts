
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Status } from 'src/app/common/status';
import { Common } from 'src/app/common/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { Company } from '@models/company.model';
import { CompanyService } from '@services/company.service';
import { forkJoin, take } from 'rxjs';
import { CountryService } from '@services/country.service';
import { DepartmentService } from '@services/department.service';
import { MunicipalityService } from '@services/municipality.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent {
  displayedColumns = ['companyId', 'nameCountry', 'nameDepartment', 'nameMunicipality', 'nit', 'comercialName', 'socialReason', 'email', 'phoneNumber', 'options'];
  dataSource: MatTableDataSource<Company>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  defaultPagination = this.common.defaultPagination();
  empresas: any[] = [];

  countries: any[] = [];
  departments: any[] = [];
  municipalities: any[] = [];

  constructor(
    public dialog: MatDialog,
    private companySrv: CompanyService,
    private status: Status,
    private common: Common,
    private router: Router,
    private countrySrv: CountryService,
    private departmentSrv: DepartmentService,
    private municipalitySrv: MunicipalityService,
  ) {
    this.getCatalogs();
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  ngAfterViewInit(): void {
  }

  getCatalogs() {
    this.countrySrv.getCountries().subscribe(countries => {
      this.countries = countries;
    });

    this.departmentSrv.getAll().subscribe(departments => {
      this.departments = departments;
    });

    this.municipalitySrv.getAll().subscribe(municipalities => {
      this.municipalities = municipalities;
    });
  }

  getCompanies(): void {
    this.companySrv.getAll().subscribe((companies: any[]) => {
      this.empresas = companies.map(c => ({
        ...c,
        nameCountry: this.getCountryName(c.paisId),
        nameDepartment: this.getDepartmentName(c.departamentoId),
        nameMunicipality: this.getMunicipalityName(c.municipioId)
      }));

      this.dataSource = new MatTableDataSource(this.empresas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  upsert(data?: any): void {
    const dialogRef = this.dialog.open(CompanyEditComponent, {
      width: '950px',
      disableClose: false,
      data: data
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getCompanies();
      }
    });
  }

  deleteCompany(data: any) {
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
        this.companySrv.delete(data.id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Empresa eliminada correctamente',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.getCompanies();
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la empresa',
              footer: error.message || '',
            });
            console.error(error);
          }
        });
      }
    });
  }

  showDepartments(company: Company): void {
    this.router.navigate(['/admon/departamentos'], { state: { company } });
  }

  reload(): void {
    this.getCompanies();
  }
}
