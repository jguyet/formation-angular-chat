import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BehaviorSubject, combineLatest, combineLatestAll, filter, forkJoin, map, mergeMap, Observable, scan, startWith, Subject } from 'rxjs';
import { SidebarComponent } from 'src/app/headers/sidebar/sidebar.component';
import { Channel } from 'src/app/shared/models/channel';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { environement } from 'src/environements/environement';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
    SharedModule
  ]
})
export class HomeComponent {

  public channels$: Observable<Channel[]>;
  public currentChannel$: Observable<Channel>;
  public messageField: string = ''; // Input

  private select$: BehaviorSubject<string> = new BehaviorSubject<string>(''); // Declencheur

  constructor(public authService: AuthService, public websocketService: WebsocketService, public apiService: ApiService) {
    this.channels$ = this.apiService.getChannels();
    this.currentChannel$ = this.select$.pipe(
      filter(x => x !== ''),
      mergeMap((title) => {
        return combineLatest([
          this.apiService.getChannel(title),
          this.websocketService.subscribe(`ws://${environement.formationApi.replace('https://', '')}/ws`, [title]).pipe(startWith({}))
        ]).pipe(
          map(([channel, action]: [Channel, any]) => {

            switch(action?.cmd) {
              case 'create':
                channel.messages.push(action.data);
                break ;
              case 'update':
                channel.messages = [ ... channel.messages.filter(x => x.id == action.data.id), action.data ];
                break ;
              case 'delete':
                channel.messages = channel.messages.filter(x => x.id == action.data.id);
                break ;
            }
            return channel;
          })
        );
      })
    );
  }

  selectChannel(title: string) {
    console.log(title);
    this.select$.next(title);
  }

  onSendMessage(title: string, message: string) {
    this.apiService.sendMessage(title, message).subscribe((channel) => {
      this.messageField = '';
    });
  }
}
