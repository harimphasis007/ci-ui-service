import { Routes } from '@angular/router';

import { ProjectPipelineComponent } from './projectpipeline.component';

export const pipelineRoute: Routes = [{ path: '', component: ProjectPipelineComponent, data: { pageTitle: 'Activity Pipeline' } }];
