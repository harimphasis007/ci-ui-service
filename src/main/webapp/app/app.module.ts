import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { CommunityinvestmentSharedModule } from 'app/shared/shared.module';
import { CommunityinvestmentCoreModule } from 'app/core/core.module';
import { CommunityinvestmentAppRoutingModule } from './app-routing.module';
import { CommunityinvestmentHomeModule } from './home/home.module';
import { CommunityinvestmentEntityModule } from './entities/entity.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    CommunityinvestmentSharedModule,
    CommunityinvestmentCoreModule,
    CommunityinvestmentHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    CommunityinvestmentEntityModule,
    CommunityinvestmentAppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class CommunityinvestmentAppModule {}
