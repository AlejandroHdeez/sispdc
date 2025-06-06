
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Status } from 'src/app/common/status';
import { Common } from 'src/app/common/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Colaborator } from '@models/colaborator.model';
import { ColaboratorService } from '@services/colaborator.service';
import { forkJoin, take } from 'rxjs';
import { CountryService } from '@services/country.service';
import { DepartmentService } from '@services/department.service';
import { MunicipalityService } from '@services/municipality.service';
import { ColaboratorEditComponent } from './colaborator-edit/colaborator-edit.component';
import { CompanyService } from '@services/company.service';
import { ExcelService } from '@services/excel.service';
import { Report } from '../report/report';
import { ColaboratorComponent } from './colaborator/colaborator.component';

@Component({
  selector: 'app-colaborators',
  templateUrl: './colaborators.component.html',
  styleUrl: './colaborators.component.scss'
})
export class ColaboratorsComponent {
  displayedColumns = ['colaboratorId', 'companies', 'fullname', 'age', 'phoneNumber', 'email', 'options'];
  dataSource: MatTableDataSource<Colaborator>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  defaultPagination = this.common.defaultPagination();
  companies: any[] = [];

  constructor(
    public dialog: MatDialog,
    private colaboratorSrv: ColaboratorService,
    private status: Status,
    private common: Common,
    private router: Router,
    private companySrv: CompanyService,
    private excelSrv: ExcelService,
    private report: Report
  ) {
    this.getCompanies();
  }

  ngOnInit(): void {
  }

  getColaborators(): void {
    this.colaboratorSrv.getAll().subscribe((colaborators: any[]) => {
      this.dataSource = new MatTableDataSource(colaborators);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getCompanies() {
    this.companySrv.getAll().subscribe(companies => {
      this.companies = companies;
      this.getColaborators();
    });
  }

  getCompanyNames(companyIds: string[]): string[] {
    return this.companies
      ?.filter(c => companyIds.includes(c.id))
      .map(c => c.comercialName || c.socialReason) || [];
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  view(colaborator: any): void {
    this.dialog.open(ColaboratorComponent, {
      width: '950px',
      disableClose: false,
      data: {
        colaborator: colaborator,
        companies: this.companies,
      }
    });
  }

  upsert(data?: any): void {
    const dialogRef = this.dialog.open(ColaboratorEditComponent, {
      width: '950px',
      disableClose: false,
      data: data
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getColaborators();
      }
    });
  }

  deleteColaborator(data: any) {
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
        this.colaboratorSrv.delete(data.id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Empresa eliminada correctamente',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.getColaborators();
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

  downloadExcel(): any {
    if (this.dataSource.data.length == 0) {
      return Swal.fire('Ooops', 'No hay datos, inténtelo nuevamente', 'info')
    }

    Swal.fire({
      title: 'Archivo descargado',
      icon: 'success'
    });

    const name = `Colaboradores`;
    const locale = 'en-US';

    let dataXlsx: any[] = [];
    dataXlsx = this.dataSource.data.map((item: any, index: number) => {
      const companyNames = this.getCompanyNames(item.companyIds).join(', ');

      return {
        'No.': (index + 1),
        'Empresas': companyNames,
        'Nombre completo': item.fullname,
        'Edad': item.age,
        'Teléfono': item.phoneNumber,
        'Correo Electrónico': item.email,
      };
    });

    this.excelSrv.exportAsExcelFile(dataXlsx, name.replaceAll(' ', '-'));
  }

  downloadPdf(): any {
    const colaborators = this.dataSource.data;
    if (colaborators.length === 0) {
      return Swal.fire('Ooops', 'No hay datos, inténtelo nuevamente', 'info');
    }
    this.report.printColaborators(colaborators, this.companies);
  }

  showDepartments(colaborator: Colaborator): void {
    this.router.navigate(['/admon/departamentos'], { state: { colaborator } });
  }

  reload(): void {
    this.getColaborators();
  }
}
