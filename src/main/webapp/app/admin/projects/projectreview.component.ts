import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'jhi-projectreview',
  templateUrl: './projectreview.component.html'
})
export class ProjectReviewComponent implements OnInit {
  projectNo: any;
  snapshotForm: FormGroup;
  reviewForm: FormGroup;
  reviewInfo: any;
  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private projectsService: ProjectsService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectNo = +params.get('projectNo');
      if (this.projectNo) {
        // eslint-disable-next-line no-console
      }
    });
    this.projectsService.getApplicationReviewDetails(this.projectNo).subscribe((res: any) => {
      this.reviewInfo = res;
      // eslint-disable-next-line no-console
      console.log(this.reviewInfo);
    });
  }

  ngOnInit() {
    this.snapshotForm = this.fb.group({
      applicationDate: '2019-12-31T01:37:14.592Z',
      totalAmountRequested: 22000000,
      analystReviewEndDate: null,
      managerDecision: null,
      managerReviewEndDate: null,
      totalReviewTurntime: 0,
      notificationSentDate: null,
      certifiationName: 'John Smith',
      certificationTitle: 'Lending Specialist',
      certificationDate: '2019-12-31T01:37:14.592Z',
      projectSpecificApplication: false,
      projectNameMemberSpecified: null,
      projectDescription: null,
      currentReviewStatus: 'Analyst Review',
      currentAssignment: 'John',
      currentAssignmentStartDate: '2019-12-31T01:37:14.592Z',
      currentTurntimeDaysElapsed: 6,
      assignedAnalyst: 'John',
      analystReviewStartDate: '2019-12-31T01:37:14.592Z',
      analystTurntime: 0,
      analystComments: null,
      analystRecommendation: null,
      assinedManager: 'Smith',
      managerReviewStartDate: null,
      managerTurntime: 0,
      managerComments: null
    });
  }
}
