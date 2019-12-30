import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'jhi-projectdetail',
  templateUrl: './projectdetail.component.html'
})
export class ProjectDetailComponent implements OnInit {
  projectNo: any;
  info: any;
  member: any;
  projectStatus: any;
  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectsService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectNo = +params.get('projectNo');
      if (this.projectNo) {
        // eslint-disable-next-line no-console
      }
    });
    this.projectService.getProjectInfoBeneficiaries(this.projectNo).subscribe((res: any) => {
      this.info = res;
    });
  }

  ngOnInit() {}
}
