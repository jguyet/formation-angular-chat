import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BehaviorSubject, combineLatest, combineLatestAll, defaultIfEmpty, filter, forkJoin, interval, map, mergeMap, Observable, OperatorFunction, pairwise, scan, startWith, Subject, Subscription, tap, timer } from 'rxjs';
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
export class HomeComponent implements OnDestroy {

  public channels$: Observable<Channel[]>;
  public currentChannel$: Observable<Channel>;
  
  public selectedChannelTitle: string = '';
  public messageField: string = ''; // Input

  @ViewChild('messageContainer')
  public messageContainer: ElementRef | undefined;

  private select$: Subject<string> = new Subject<string>(); // Declencheur
  private subscriptions: Subscription[] = [];

  constructor(public authService: AuthService, public websocketService: WebsocketService, public apiService: ApiService) {
    this.channels$ = this.apiService.getChannels().pipe(
      tap(channels => {
        if (channels.length > 0) {
          this.selectChannel(channels[0].title);
        }
      })
    );
    this.currentChannel$ = this.select$.pipe(
      mergeMap((title) => {
        return combineLatest([
          this.apiService.getChannel(title).pipe(this.moveScrollBarToBottomOperator()),
          this.websocketService.subscribe(`${environement.formationWebSocket}/ws`, [title])
        ]).pipe(
          map(([channel, action]: [Channel, any]) => {
            switch(action?.cmd) {
              case 'create':
                action.data.recent = true;
                channel.messages.push(action.data);
                this.moveScrollBarToBottom();
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

  ngOnDestroy(): void {
    // clean des souscriptions
    this.subscriptions.forEach(x => x.unsubscribe());
    this.subscriptions = [];
  }

  selectChannel(title: string) {
    this.selectedChannelTitle = title;
    this.select$.next(title);
  }

  onSendMessage(title: string, message: string) {
    this.apiService.sendMessage(title, message).subscribe((channel) => {
      this.messageField = '';
    });
  }

  // detecter quand l'utilisateur entre dans un nouveau canal et bouger la scrollbar vers le bas.
  private moveScrollBarToBottomOperator<T>(): OperatorFunction<T, T> {
    return (element) => {
      // logique scroll
      this.moveScrollBarToBottom();
      return element;
    };
  }

  private moveScrollBarToBottom() {
    timer(500).subscribe(() => {
      if (this.messageContainer !== undefined) {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }
    });
  }
}
