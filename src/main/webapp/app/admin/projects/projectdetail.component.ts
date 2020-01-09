import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from './projects.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BUSINESS_SERVICE_URL } from './projects.constants';

@Component({
  selector: 'jhi-projectdetail',
  templateUrl: './projectdetail.component.html'
})
export class ProjectDetailComponent implements OnInit {
  updating: boolean;
  projectNo: any;
  info: any;
  member: any;
  projectStatus: any;
  infoForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectsService,
    private fb: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectNo = +params.get('projectNo');
    });
    this.pageLoad();
  }

  pageLoad() {
    this.projectService.getProjectInfoBeneficiaries(this.projectNo).subscribe((res: any) => {
      this.info = res;
      this.infoForm.patchValue({
        projName: this.info.projName,
        programType: this.info.programType,
        projectType: this.info.projectType,
        noOfRentalUnits: this.info.noOfRentalUnits,
        noOfOwnedUnits: this.info.noOfOwnedUnits,
        noOfJobsCreated: this.info.noOfJobsCreated,
        noOfJobsRetained: this.info.noOfJobsRetained,
        geoDefinedBeneficiaries: this.info.geoDefinedBeneficiaries !== '' ? true : false,
        targetedIncome: true,
        individualBeneficiaries: this.info.individualBeneficiaries !== '' ? true : false,
        jobsCreated: true,
        activityBeneficiaries: this.info.activityBeneficiaries !== '' ? true : false,
        smallBusiness: true,
        otherBeneficiaries: this.info.otherBeneficiaries !== '' ? true : false
      });
    });
  }

  ngOnInit() {
    this.infoForm = this.fb.group({
      projName: '',
      programType: [{ value: '', disabled: true }],
      projectType: [{ value: '', disabled: true }],
      noOfRentalUnits: '',
      noOfOwnedUnits: '',
      noOfJobsCreated: '',
      noOfJobsRetained: '',
      geoDefinedBeneficiaries: [{ value: false, disabled: true }],
      targetedIncome: [{ value: false, disabled: true }],
      championCommunity: [{ value: false, disabled: true }],
      empowermentZone: [{ value: false, disabled: true }],
      enterpriseCommunity: [{ value: false, disabled: true }],
      indianArea: [{ value: false, disabled: true }],
      brownfieldTaxCredit: [{ value: false, disabled: true }],
      disasterArea: [{ value: false, disabled: true }],
      militaryBaseClosing: [{ value: false, disabled: true }],
      communityAdjustmentandInvestmentProgram: [{ value: false, disabled: true }],
      individualBeneficiaries: [{ value: false, disabled: true }],
      jobsCreated: [{ value: false, disabled: true }],
      jobsRetained: [{ value: false, disabled: true }],
      communityServices: [{ value: false, disabled: true }],
      activityBeneficiaries: [{ value: false, disabled: true }],
      smallBusiness: [{ value: false, disabled: true }],
      other: [{ value: false, disabled: true }],
      otherBeneficiaries: [{ value: false, disabled: true }],
      otherTargetedBeneficiaries: [{ value: false, disabled: true }]
    });
  }

  submitForm() {
    this.updating = true;

    setTimeout(() => {
      this.httpClient
        .put(BUSINESS_SERVICE_URL + '/projects/updateProjectInfoBeneficiaries', {
          projectNo: this.projectNo,
          projName: this.infoForm.controls['projName'].value,
          infoBeneficiariesId: this.info.infoBeneficiariesId,
          programType: this.info.programType,
          projectType: this.info.projectType,
          noOfRentalUnits: this.infoForm.controls['noOfRentalUnits'].value,
          noOfOwnedUnits: this.infoForm.controls['noOfOwnedUnits'].value,
          noOfJobsCreated: this.infoForm.controls['noOfJobsCreated'].value,
          noOfJobsRetained: this.infoForm.controls['noOfJobsRetained'].value,
          geoDefinedBeneficiaries: this.info.geoDefinedBeneficiaries,
          individualBeneficiaries: this.info.individualBeneficiaries,
          activityBeneficiaries: this.info.activityBeneficiaries,
          otherBeneficiaries: this.info.otherBeneficiaries
        })
        .subscribe(
          data => {
            this.updating = false;
            this.pageLoad();
            // eslint-disable-next-line no-console
            console.log('PUT Request is successful ', data);
          },
          error => {
            this.updating = false;
            this.pageLoad();
            // eslint-disable-next-line no-console
            console.log('Error', error);
          }
        );
    }, 1500);
  }
}
