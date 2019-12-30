import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-projectpool',
  templateUrl: './projectpool.component.html'
})
export class ProjectPoolComponent implements OnInit {
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
