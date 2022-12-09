import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CardService } from './services/card.service';
import { LoginService } from './services/login.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { environement } from 'src/environement/environement';
import { WebsocketService } from './services/web-socket.service';
import { ChatService } from './services/chat.service';



@NgModule({
  declarations: [],
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
  providers: [
    CardService,
    LoginService,
    WebsocketService,
    ChatService
  ]
})
export class SharedModule { }
