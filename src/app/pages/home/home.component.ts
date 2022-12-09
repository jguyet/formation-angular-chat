import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, filter, map, mergeMap, Observable } from 'rxjs';
import { Channel } from 'src/app/shared/models/channel';
import { ChatService } from 'src/app/shared/services/chat.service';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from 'src/app/shared/services/web-socket.service';
import { environement } from 'src/environement/environement';

export interface ChipColor {
  message: string;
  my: boolean;
}

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    MatTooltipModule,
    MatSnackBarModule
  ]
})
export class HomeComponent {

  public channels$: Observable<Channel[]>;
  public currentChannel$: Observable<Channel>;

  public availableColors: ChipColor[] = [
    {message: 'message1', my: false},
    {message: 'message2', my: false},
    {message: 'message3 (MOI)', my: true},
    {message: 'message4', my: false},
  ];

  public text: string = '';

  private select$ = new BehaviorSubject<string>('');
  private webSocketChannelsSubscription: Observable<any>;

  constructor(
    public chatService: ChatService,
    public webSocketService: WebsocketService,
    private snackBar: MatSnackBar) {
    this.channels$ = this.chatService.getChannels();

    // gestion websocket
    this.webSocketChannelsSubscription = this.channels$.pipe(
      mergeMap((channels) => {
        const channelTitles = channels.map(x => x.title);
        return this.webSocketService
          .subscribe(`${environement.formationWs}`, channelTitles);
      })
    );

    this.currentChannel$ = this.select$.pipe(
      filter(x => x != ''),
      mergeMap((channelTitle) => {
        return combineLatest([
          this.chatService.getChannel(channelTitle),
          this.webSocketChannelsSubscription
        ]).pipe(
          map(([channel, event]) => {

            switch (event.cmd) {
              case 'create':
                if (event.title === channel.title) {
                  channel.messages.push(event.data);
                } else {
                  this.snackBar.open(`${event.title}: ${event.data.email} -> ${event.data.message}`);
                }
                break ;
              default:
                break ;
            }
            console.log(channel, event);
            return channel;
          })
        )
      })
    );
  }

  selectChannel(title: string) {
    console.log(`Channel ${title} selected.`);
    this.select$.next(title);
  }

  addMessageToOneChannel(channelTitle: string, message: string) {
    this.chatService.addMessageToOneChannel(channelTitle, message).subscribe((currentChannel) => {
      this.text = '';
    });
  }

}
