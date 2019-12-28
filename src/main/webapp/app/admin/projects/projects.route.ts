import { Routes } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { ProjectDetailComponent } from './projectdetail.component';
import { ProjectReviewComponent } from './projectreview.component';
import { ProjectPoolComponent } from './projectpool.component';
import { ProjectActivityComponent } from './projectactivity.component';
import { ProjectContactsComponent } from './projectcontacts.component';
import { ProjectLogComponent } from './projectlog.component';

export const projectsRoute: Routes = [
  { path: '', component: ProjectsComponent, data: { pageTitle: 'Select Project' } },
  { path: 'detail', component: ProjectDetailComponent, data: { pageTitle: 'Info & Beneficiaries' } },
  { path: 'review', component: ProjectReviewComponent, data: { pageTitle: 'Application Review' } },
  { path: 'activity', component: ProjectActivityComponent, data: { pageTitle: 'Commitment & Advance Activity' } },
  { path: 'pool', component: ProjectPoolComponent, data: { pageTitle: 'Loan Pool' } },
  { path: 'contacts', component: ProjectContactsComponent, data: { pageTitle: 'Email Notification & Contacts' } },
  { path: 'log', component: ProjectLogComponent, data: { pageTitle: 'Project Log' } }
];
