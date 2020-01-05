import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from './projects.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'jhi-projectlog',
  templateUrl: './projectlog.component.html'
})
export class ProjectLogComponent implements OnInit {
  account: Account;
  projectNo: any;
  logList: any;
  displayedLogColumns: string[] = ['projectDate', 'projectUser', 'entryDetails'];
  addLogForm: FormGroup;
  currentDate = new Date();
  dataSource: any;
  @ViewChild('sort', { static: true }) sort: MatSort;
  @ViewChild('matPaginator', { static: true }) paginator: MatPaginator;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    private config: NgbModalConfig,
    private modal: NgbModal,
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    // customize default values of modals used by this component tree
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectNo = +params.get('projectNo');
    });
    this.projectsService.getProjectLog(this.projectNo).subscribe((res: any) => {
      this.dataSource = res;
      this.logList = new MatTableDataSource(this.dataSource);
      this.logList.sort = this.sort;
      this.logList.paginator = this.paginator;
    });
  }

  ngOnInit() {
    this.accountService.identity().subscribe((account: Account) => {
      this.account = account;
    });
    this.addLogForm = this.fb.group({
      addLogDate: [{ value: '', disabled: true }],
      addLogUser: [{ value: this.account.login, disabled: true }],
      addLogEntry: [{ value: '', disabled: false }]
    });
  }

  open(content) {
    this.modal.open(content, { size: 'lg', centered: true });
  }

  addLog() {
    this.dataSource.push({
      projectDate: this.currentDate,
      projectUser: this.addLogForm.controls['addLogUser'].value,
      entryDetails: this.addLogForm.controls['addLogEntry'].value
    });
    this.logList = new MatTableDataSource(this.dataSource);
  }
}
