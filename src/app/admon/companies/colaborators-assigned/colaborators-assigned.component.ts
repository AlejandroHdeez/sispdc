
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Status } from 'src/app/common/status';
import { Common } from 'src/app/common/common';
import Swal from 'sweetalert2';
import { Colaborator } from '@models/colaborator.model';
import { ColaboratorService } from '@services/colaborator.service';
import { Company } from '@models/company.model';
import { Router } from '@angular/router';
import { Municipality } from '@models/municipality.model';

@Component({
  selector: 'app-colaborators-assigned',
  templateUrl: './colaborators-assigned.component.html',
  styleUrl: './colaborators-assigned.component.scss'
})
export class ColaboratorsAssignedComponent {
  displayedColumns = ['colaboratorId', 'fullname', 'age', 'phoneNumber', 'email'];
  dataSource: MatTableDataSource<Colaborator>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  defaultPagination = this.common.defaultPagination();

  company!: Company;

  constructor(
    public dialog: MatDialog,
    private colaboratorSrv: ColaboratorService,
    private status: Status,
    private common: Common,
    private router: Router
  ) {
    this.company = history.state.company ? history.state.company : null;
  }

  ngOnInit(): void {
    if (!this.company) {
      this.router.navigate(['/admon/empresas']);
      return;
    }

    this.getColaborators();
  }

  ngAfterViewInit(): void {
  }

  getColaborators(): void {
    this.colaboratorSrv.getByCompany(this.company.id).subscribe((collaborators: any[]) => {
      this.dataSource = new MatTableDataSource(collaborators);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  back() {
    this.router.navigate(['/admon/empresas']);
  }

  reload(): void {
    this.getColaborators();
  }
}
