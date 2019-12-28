import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProjectsService } from './projects.service';
export interface ProjectList {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'jhi-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.projectsService.getProjectList().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  syncPrimaryPaginator(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.paginator.page.emit(event);
  }
}
