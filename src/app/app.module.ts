import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { environement } from 'src/environements/environement';
import { AuthService } from './shared/services/auth.service';
import { HomeComponent } from './pages/home/home.component';
import { WebsocketService } from './shared/services/websocket.service';
import { TopbarComponent } from './headers/topbar/topbar.component';
import { SidebarComponent } from './headers/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    /* Modules */
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,

    /* Standalone Components */
    SidebarComponent,
    TopbarComponent,
    HomeComponent,
    LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
