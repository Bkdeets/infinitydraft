import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { TeamDisplayComponent } from './components/team-display/team-display.component';
import { ModalModule } from './modules/modal/modal.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AboutComponent } from './components/about/about.component';
import { HowToUseComponent } from './components/how-to-use/how-to-use.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    TeamDisplayComponent,
    NavigationComponent,
    AboutComponent,
    HowToUseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
