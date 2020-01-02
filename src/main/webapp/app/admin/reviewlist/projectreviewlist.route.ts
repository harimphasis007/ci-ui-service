import { Routes } from '@angular/router';

import { ProjectReviewListComponent } from './projectreviewlist.component';

export const reviewListRoute: Routes = [
  { path: '', component: ProjectReviewListComponent, data: { pageTitle: 'Applications in Progress' } }
];
