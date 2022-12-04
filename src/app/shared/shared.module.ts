import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetUserPipe } from './pipes/get-user.pipe';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { WebsocketService } from './services/websocket.service';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { environement } from 'src/environements/environement';

@NgModule({
  declarations: [GetUserPipe],
  exports: [GetUserPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environement.formationApi],
        sendAccessToken: true
      }
    })
  ],
  providers: [GetUserPipe, ApiService, AuthService, WebsocketService]
})
export class SharedModule { }
