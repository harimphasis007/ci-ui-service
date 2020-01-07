import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectsService } from './projects.service';
import { BUSINESS_SERVICE_URL } from './projects.constants';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'jhi-projectreview',
  templateUrl: './projectreview.component.html'
})
export class ProjectReviewComponent implements OnInit {
  info: any;
  projectNo: any;
  snapshotForm: FormGroup;
  reviewForm: FormGroup;
  reviewInfo: any;
  runningCreditCheck: boolean;
  creditCheckResult: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private datePipe: DatePipe,
    private httpClient: HttpClient
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectNo = +params.get('projectNo');
    });
    this.projectsService.getProjectInfoBeneficiaries(this.projectNo).subscribe((res: any) => {
      this.info = res;
    });
    this.projectsService.getApplicationReviewDetails(this.projectNo).subscribe((res: any) => {
      this.reviewInfo = res;
      this.snapshotForm.patchValue({
        applicationDate: this.reviewInfo.applicationDate,
        totalAmountRequested: this.reviewInfo.totalAmountRequested,
        analystReviewEndDate: this.reviewInfo.analystReviewEndDate,
        managerDecision: this.reviewInfo.managerDecision,
        managerReviewEndDate: this.reviewInfo.managerReviewEndDate,
        totalReviewTurntime: this.reviewInfo.totalReviewTurntime,
        notificationSentDate: this.reviewInfo.notificationSentDate,
        certifiationName: this.reviewInfo.certifiationName,
        certificationTitle: this.reviewInfo.certificationTitle,
        certificationDate: this.reviewInfo.certificationDate,
        projectSpecificApplication: this.reviewInfo.projectSpecificApplication,
        projectNameMemberSpecified: this.reviewInfo.projectNameMemberSpecified,
        projectDescription: this.reviewInfo.projectDescription,
        currentReviewStatus: this.reviewInfo.currentReviewStatus,
        currentAssignment: this.reviewInfo.currentAssignment,
        currentAssignmentStartDate: this.reviewInfo.currentAssignmentStartDate,
        currentTurntimeDaysElapsed: this.reviewInfo.currentTurntimeDaysElapsed,
        assignedAnalyst: this.reviewInfo.assignedAnalyst,
        analystReviewStartDate: this.reviewInfo.analystReviewStartDate,
        analystTurntime: this.reviewInfo.analystTurntime,
        analystComments: this.reviewInfo.analystComments,
        analystRecommendation: this.reviewInfo.analystRecommendation,
        assinedManager: this.reviewInfo.assinedManager,
        managerReviewStartDate: this.reviewInfo.managerReviewStartDate,
        managerTurntime: this.reviewInfo.managerTurntime,
        managerComments: this.reviewInfo.managerComments
      });
    });
  }

  ngOnInit() {
    this.runningCreditCheck = false;
    this.creditCheckResult = {
      result: '',
      msg:
        'Results of Credit Check (if integration with credit check web service is feasible) (system runs credit check automatically at time of import and stores results, with ability for user to re-run at anytime during application review phase)'
    };
    this.snapshotForm = this.fb.group({
      applicationDate: [{ value: null, disabled: true }],
      totalAmountRequested: [{ value: null, disabled: true }],
      analystReviewEndDate: [{ value: null, disabled: true }],
      managerDecision: [{ value: null, disabled: true }],
      managerReviewEndDate: [{ value: null, disabled: true }],
      totalReviewTurntime: [{ value: null, disabled: true }],
      notificationSentDate: [{ value: null, disabled: true }],
      certifiationName: [{ value: null, disabled: false }],
      certificationTitle: [{ value: null, disabled: false }],
      certificationDate: [{ value: null, disabled: false }],
      projectSpecificApplication: [{ value: null, disabled: false }],
      projectNameMemberSpecified: [{ value: null, disabled: true }],
      projectDescription: [{ value: null, disabled: true }],
      currentReviewStatus: [{ value: null, disabled: true }],
      currentAssignment: [{ value: null, disabled: true }],
      currentAssignmentStartDate: [{ value: null, disabled: true }],
      currentTurntimeDaysElapsed: [{ value: null, disabled: true }],
      assignedAnalyst: [{ value: null, disabled: true }],
      analystReviewStartDate: [{ value: null, disabled: true }],
      analystTurntime: [{ value: null, disabled: true }],
      analystComments: [{ value: null, disabled: false }],
      analystRecommendation: [{ value: null, disabled: false }],
      assinedManager: [{ value: null, disabled: true }],
      managerReviewStartDate: [{ value: null, disabled: true }],
      managerTurntime: [{ value: null, disabled: true }],
      managerComments: [{ value: null, disabled: true }]
    });
  }

  runCreditCheck() {
    this.runningCreditCheck = true;
    this.projectsService.getCreditCheck(this.projectNo).subscribe((res: any) => {
      setTimeout(() => {
        this.runningCreditCheck = false;
        if (res) {
          this.creditCheckResult = { result: 'success', msg: 'Credit check passed!' };
        } else {
          this.creditCheckResult = { result: 'failed', msg: 'Credit check failed!' };
        }
      }, 3000);
      //
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }

  patchValueAnalyst() {
    this.snapshotForm.patchValue({
      analystComments: null,
      analystRecommendation: null
    });
  }

  addLog() {
    const entryDetails =
      (this.snapshotForm.controls['analystRecommendation'].value === null ||
      this.snapshotForm.controls['analystRecommendation'].value === 'null'
        ? ''
        : this.snapshotForm.controls['analystRecommendation'].value + ' - ') +
      (this.snapshotForm.controls['analystComments'].value === null || this.snapshotForm.controls['analystComments'].value === ''
        ? ''
        : this.snapshotForm.controls['analystComments'].value);
    const url =
      BUSINESS_SERVICE_URL +
      '/projects/addProjectLog?projectNo=' +
      this.projectNo +
      '&projectDate=' +
      this.datePipe.transform(new Date(), 'yyyy-MM-dd') +
      '&projectUser=' +
      this.snapshotForm.controls['assignedAnalyst'].value +
      '&entryDetails=' +
      entryDetails;
    this.httpClient.post(url, '').subscribe(
      data => {
        this.patchValueAnalyst();
        // eslint-disable-next-line no-console
        console.log(data);
      },
      error => {
        this.patchValueAnalyst();
        // eslint-disable-next-line no-console
        console.log(error);
      }
    );
  }
}
