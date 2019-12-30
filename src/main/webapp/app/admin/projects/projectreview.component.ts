import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-projectreview',
  templateUrl: './projectreview.component.html'
})
export class ProjectReviewComponent implements OnInit {
  projectNo: any;
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectNo = +params.get('projectNo');
      if (this.projectNo) {
        // eslint-disable-next-line no-console
      }
    });
  }

  ngOnInit() {}
}
