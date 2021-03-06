import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectsService } from './projects.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModalConfig, NgbModal, NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-projectactivity',
  templateUrl: './projectactivity.component.html'
})
export class ProjectActivityComponent implements OnInit {
  info: any;
  projectNo: any;
  commitmentForm: FormGroup;
  commitmentInfo: any;
  drawdownHistoryList: any;
  dataSourceDrawdowns: any;
  commitmentsScheduleList: any;
  dataSourceCommitmentsSchedule: any;
  fromDate: NgbDate;

  @ViewChild('sort1', { static: true }) sort1: MatSort;
  @ViewChild('sort2', { static: true }) sort2: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumnsDrawdowns: string[] = [
    'date',
    'note',
    'status',
    'amount',
    'term',
    'rate',
    'maturityDate',
    'intSubsidyAl',
    'intSubsidyCr'
  ];

  displayedColumnsCommitmentsSchedule: string[] = ['expDate', 'amtExp', 'proReAvailability'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private config: NgbModalConfig,
    private modal: NgbModal,
    private calendar: NgbCalendar,
    private formatter: NgbDateParserFormatter
  ) {
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    this.fromDate = calendar.getToday();
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectNo = +params.get('projectNo');
    });

    this.projectsService.getProjectInfoBeneficiaries(this.projectNo).subscribe((res: any) => {
      this.info = res;
    });

    this.projectsService.getCommitmentsByProject(this.projectNo).subscribe((res: any) => {
      this.commitmentInfo = res;
      this.commitmentsScheduleList = [
        {
          expDate: this.commitmentInfo.commitmentExpiration,
          amtExp: this.commitmentInfo.commitmentBal,
          proReAvailability: this.commitmentInfo.avaiableBal
        }
      ];
      this.commitmentForm.patchValue({
        commitmentStatus: this.commitmentInfo.commitmentStatus,
        commitmentBal: this.commitmentInfo.commitmentBal,
        commitmentExpiration: this.commitmentInfo.commitmentExpiration,
        commenceDate: this.commitmentInfo.commenceDate,
        avaiableBal: this.commitmentInfo.avaiableBal,
        totalDrawdowns: this.commitmentInfo.totalDrawdowns,
        recentDrawdown: this.commitmentInfo.recentDrawdown
      });
      this.dataSourceCommitmentsSchedule = new MatTableDataSource(this.commitmentsScheduleList);
      this.dataSourceCommitmentsSchedule.sort = this.sort1;
    });

    this.projectsService.getDrawdownHistoriesByProject(this.projectNo).subscribe((res: any) => {
      this.drawdownHistoryList = res;
      this.dataSourceDrawdowns = new MatTableDataSource(this.drawdownHistoryList);
      this.dataSourceDrawdowns.paginator = this.paginator;
      this.dataSourceDrawdowns.sort = this.sort2;
    });
  }

  ngOnInit() {
    this.commitmentForm = this.fb.group({
      id: [{ value: null }],
      commitmentStatus: [{ value: null, disabled: true }],
      commitmentBal: [{ value: null, disabled: true }],
      commitmentExpiration: [{ value: null, disabled: true }],
      commenceDate: [{ value: null, disabled: true }],
      avaiableBal: [{ value: null, disabled: true }],
      totalDrawdowns: [{ value: null, disabled: true }],
      recentDrawdown: [{ value: null, disabled: true }]
    });
  }

  open(content) {
    this.modal.open(content, { size: 'lg', centered: true });
  }
}
