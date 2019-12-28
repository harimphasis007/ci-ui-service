import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommunityinvestmentSharedModule } from 'app/shared/shared.module';

import { ProjectsComponent } from './projects.component';
import { ProjectDetailComponent } from './projectdetail.component';
import { ProjectReviewComponent } from './projectreview.component';
import { ProjectActivityComponent } from './projectactivity.component';
import { ProjectPoolComponent } from './projectpool.component';
import { ProjectContactsComponent } from './projectcontacts.component';
import { ProjectLogComponent } from './projectlog.component';

import { projectsRoute } from './projects.route';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommunityinvestmentSharedModule,
    RouterModule.forChild(projectsRoute),
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatTableExporterModule,
    MatPaginatorModule
  ],
  exports: [MatTableModule, MatPaginatorModule],
  declarations: [
    ProjectsComponent,
    ProjectDetailComponent,
    ProjectReviewComponent,
    ProjectActivityComponent,
    ProjectPoolComponent,
    ProjectContactsComponent,
    ProjectLogComponent
  ]
})
export class ProjectsModule {}
