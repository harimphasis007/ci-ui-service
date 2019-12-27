import { Route } from '@angular/router';

import { ProjectsComponent } from './projects.component';

export const projectsRoute: Route = {
  path: '',
  component: ProjectsComponent,
  data: {
    pageTitle: 'Application Metrics'
  }
};
