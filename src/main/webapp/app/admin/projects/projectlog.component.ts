import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from './projects.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-projectlog',
  templateUrl: './projectlog.component.html'
})
export class ProjectLogComponent implements OnInit {
  projectNo: any;
  logList: any;
  displayedLogColumns: string[] = ['projectDate', 'projectUser', 'entryDetails'];
  @ViewChild('sort', { static: true }) sort: MatSort;
  @ViewChild('matPaginator', { static: true }) paginator: MatPaginator;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    config: NgbModalConfig,
    private modal: NgbModal
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectNo = +params.get('projectNo');
    });
    this.projectsService.getProjectLog(this.projectNo).subscribe((res: any) => {
      this.logList = new MatTableDataSource(res);
      this.logList.sort = this.sort;
      this.logList.paginator = this.paginator;
    });
  }

  ngOnInit() {}

  open(content) {
    this.modal.open(content, { size: 'xl', centered: true });
  }
}
