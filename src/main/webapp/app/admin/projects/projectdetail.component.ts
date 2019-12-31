import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from './projects.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'jhi-projectdetail',
  templateUrl: './projectdetail.component.html'
})
export class ProjectDetailComponent implements OnInit {
  projectNo: any;
  info: any;
  member: any;
  projectStatus: any;
  infoForm: FormGroup;
  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectsService, private fb: FormBuilder) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectNo = +params.get('projectNo');
    });
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
      programType: '',
      projectType: '',
      noOfRentalUnits: '',
      noOfOwnedUnits: '',
      noOfJobsCreated: '',
      noOfJobsRetained: '',
      geoDefinedBeneficiaries: false,
      targetedIncome: false,
      championCommunity: false,
      empowermentZone: false,
      enterpriseCommunity: false,
      indianArea: false,
      brownfieldTaxCredit: false,
      disasterArea: false,
      militaryBaseClosing: false,
      communityAdjustmentandInvestmentProgram: false,
      individualBeneficiaries: false,
      jobsCreated: false,
      jobsRetained: false,
      communityServices: false,
      activityBeneficiaries: false,
      smallBusiness: false,
      other: false,
      otherBeneficiaries: false,
      otherTargetedBeneficiaries: false
    });
  }

  submitForm() {
    // eslint-disable-next-line no-console
    console.log(this.infoForm.getRawValue());
  }
}
