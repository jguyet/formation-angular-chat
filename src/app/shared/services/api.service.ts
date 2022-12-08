import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environement } from 'src/environements/environement';
import { Channel } from '../models/channel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public users = new BehaviorSubject<User[]>([]);

  constructor(public httpClient: HttpClient) { }

  public getMyAccount(): Observable<User> {
    return this.httpClient.get<User>(`${environement.formationApi}/user`);
  }

  public getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${environement.formationApi}/user/${id}`);
  }

  public getChannels(): Observable<Channel[]> {
    return this.httpClient.get<Channel[]>(`${environement.formationApi}/channels`);
  }

  public getChannel(title: string): Observable<Channel> {
    return this.httpClient.get<Channel>(`${environement.formationApi}/channel/${title}`);
  }

  public sendMessage(channelTitle: string, message: string): Observable<Channel> {
    return this.httpClient.post<Channel>(`${environement.formationApi}/channel/${channelTitle}/message/add`, {
      title: channelTitle,
      message: message
    });
  }

}
