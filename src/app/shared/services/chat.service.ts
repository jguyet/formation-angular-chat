import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from 'src/environement/environement';
import { Channel } from '../models/channel';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public httpClient: HttpClient) { }

  public getChannels(): Observable<Channel[]> {
    return this.httpClient.get<Channel[]>(`${environement.formationApi}/channels`);
  }

  public getChannel(title: string): Observable<Channel> {
    return this.httpClient.get<Channel>(`${environement.formationApi}/channel/${title}`);
  }

  public addMessageToOneChannel(channelTitle: string, message: string): Observable<Channel> {
    return this.httpClient.post<Channel>(
      `${environement.formationApi}/channel/${channelTitle}/message/add`,
      {
        title: channelTitle,
        message: message
      }
    );
  }

}
