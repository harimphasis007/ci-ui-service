import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommunityinvestmentSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommunityinvestmentSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class CommunityinvestmentHomeModule {}
