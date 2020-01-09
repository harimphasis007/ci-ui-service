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
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BUSINESS_SERVICE_URL } from './projects.constants';

@Component({
  selector: 'jhi-projectlog',
  templateUrl: './projectlog.component.html'
})
export class ProjectLogComponent implements OnInit {
  info: any;
  account: Account;
  projectNo: any;
  logList: any;
  displayedLogColumns: string[] = ['projectDate', 'projectUser', 'entryDetails'];
  addLogForm: FormGroup;
  searchForm: FormGroup;
  currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  dataSource: any;
  @ViewChild('sort', { static: true }) sort: MatSort;
  @ViewChild('matPaginator', { static: true }) paginator: MatPaginator;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    private config: NgbModalConfig,
    private modal: NgbModal,
    private fb: FormBuilder,
    private accountService: AccountService,
    private httpClient: HttpClient,
    private datePipe: DatePipe
  ) {
    // customize default values of modals used by this component tree
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectNo = +params.get('projectNo');
    });
    this.projectsService.getProjectInfoBeneficiaries(this.projectNo).subscribe((res: any) => {
      this.info = res;
    });
    this.refreshGrid();
  }

  ngOnInit() {
    this.accountService.identity().subscribe((account: Account) => {
      this.account = account;
    });
    this.addLogForm = this.fb.group({
      addLogDate: [{ value: this.currentDate, disabled: true }],
      addLogUser: [{ value: this.account.login, disabled: true }],
      addLogEntry: [{ value: '', disabled: false }]
    });
    this.searchForm = this.fb.group({
      searchUser: [{ value: '', disabled: false }],
      searchEntry: [{ value: '', disabled: false }]
    });
  }

  open(content) {
    this.modal.open(content, { size: 'lg', centered: true });
  }

  refreshGrid() {
    this.projectsService.getProjectLog(this.projectNo).subscribe((res: any) => {
      this.dataSource = res;
      this.logList = new MatTableDataSource(this.dataSource);
      this.logList.sort = this.sort;
      this.logList.paginator = this.paginator;
    });
  }

  patchValueAddLog() {
    this.addLogForm.patchValue({
      addLogEntry: ''
    });
  }

  addLog() {
    const url =
      BUSINESS_SERVICE_URL +
      '/projects/addProjectLog?projectNo=' +
      this.projectNo +
      '&projectDate=' +
      this.datePipe.transform(new Date(), 'yyyy-MM-dd') +
      '&projectUser=' +
      this.addLogForm.controls['addLogUser'].value +
      '&entryDetails=' +
      this.addLogForm.controls['addLogEntry'].value;
    this.httpClient.post(url, '').subscribe(
      data => {
        this.patchValueAddLog();
        this.refreshGrid();
        // eslint-disable-next-line no-console
        console.log(data);
      },
      error => {
        this.patchValueAddLog();
        this.refreshGrid();
        // eslint-disable-next-line no-console
        console.log(error);
      }
    );
  }

  resetForm() {
    this.searchForm.patchValue({
      searchUser: '',
      searchEntry: ''
    });
  }
}
