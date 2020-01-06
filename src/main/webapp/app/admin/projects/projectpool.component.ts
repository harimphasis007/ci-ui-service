import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from './projects.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'jhi-projectpool',
  templateUrl: './projectpool.component.html'
})
export class ProjectPoolComponent implements OnInit {
  info: any;
  projectNo: any;
  poolDetailsForm: FormGroup;
  poolInfo: any;
  poolListData: any;

  dataSource: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [
    'loanid',
    'settelmentDate',
    'amount',
    'term',
    'propertyAddress',
    'qualificationMethod',
    'decision',
    'rejectionReason'
  ];

  constructor(private activatedRoute: ActivatedRoute, private projectsService: ProjectsService, private fb: FormBuilder) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectNo = +params.get('projectNo');
    });
    this.projectsService.getProjectInfoBeneficiaries(this.projectNo).subscribe((res: any) => {
      this.info = res;
    });

    this.projectsService.getPoolDetails(this.projectNo).subscribe((res: any) => {
      this.poolInfo = res;
      this.poolDetailsForm.patchValue({
        id: this.poolInfo.id,
        total: this.poolInfo.total,
        qualified: this.poolInfo.qualified,
        rejected: this.poolInfo.rejected,
        unreviewed: this.poolInfo.unreviewed,
        totalAmount: this.poolInfo.totalAmount,
        qualifiedAmount: this.poolInfo.qualifiedAmount,
        rejectedAmount: this.poolInfo.rejectedAmount,
        unreviewedAmount: this.poolInfo.unreviewedAmount
      });
    });

    this.pageLoad();
  }

  pageLoad() {
    this.projectsService.getPoolListing(this.projectNo).subscribe((res: any) => {
      this.poolListData = res;
      this.dataSource = new MatTableDataSource(this.poolListData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  syncPrimaryPaginator(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.paginator.page.emit(event);
  }

  ngOnInit() {
    this.poolDetailsForm = this.fb.group({
      id: [{ value: null }],
      total: [{ value: null, disabled: true }],
      qualified: [{ value: null, disabled: true }],
      rejected: [{ value: null, disabled: true }],
      unreviewed: [{ value: null, disabled: true }],
      totalAmount: [{ value: null, disabled: true }],
      qualifiedAmount: [{ value: null, disabled: true }],
      rejectedAmount: [{ value: null, disabled: true }],
      unreviewedAmount: [{ value: null, disabled: true }]
    });
  }
}
