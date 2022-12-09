import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RandomHoneyPotComponent } from './pages/random-honey-pot/random-honey-pot.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './headers/sidebar/sidebar.component';
import { TopbarComponent } from './headers/topbar/topbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    RandomHoneyPotComponent
  ],
  imports: [
    /* Librairies  */
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MatSidenavModule,

    /* Composants standalones  */
    LoginComponent,
    HomeComponent,
    TopbarComponent,
    SidebarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
