import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommunityinvestmentSharedModule } from 'app/shared/shared.module';

import { ProjectReviewListComponent } from './projectreviewlist.component';

import { reviewListRoute } from './projectreviewlist.route';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommunityinvestmentSharedModule,
    RouterModule.forChild(reviewListRoute),
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatTableExporterModule,
    MatPaginatorModule
  ],
  exports: [MatTableModule, MatPaginatorModule],
  declarations: [ProjectReviewListComponent]
})
export class ProjectReviewListModule {}
