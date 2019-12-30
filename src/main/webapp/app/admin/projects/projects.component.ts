import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'jhi-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  displayedColumns: string[] = [
    'projectNo',
    'projName',
    'program',
    'member',
    'projectStatus',
    'commitmentStatus',
    'commitmentBalance',
    'commitmentExpiration'
  ];
  dataSource;
  controlList: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.projectsService.getProjectList().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.projectsService.getSearchControls().subscribe((res: any) => {
      this.controlList = res;
    });
  }

  syncPrimaryPaginator(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.paginator.page.emit(event);
  }
}
