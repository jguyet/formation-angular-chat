import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Observer, ReplaySubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  
  private ws: WebSocket | undefined = undefined;
  private subject: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() {}

  public subscribe(url: string, channels: Array<string>): Observable<any> {
    if (this.ws != undefined && this.ws?.readyState === WebSocket.OPEN) {
      this.sendMessage(channels);
      this.subject = new BehaviorSubject({});
      return this.subject;
    }
    this.ws = new WebSocket(url); // ws:// ou wss://
    this.ws.onmessage = (x) => { this.subject.next(JSON.parse(x.data)); };;
    this.ws.onerror = (x) => { this.subject.error(x); };
    this.ws.onclose = () => { this.subject.complete(); };
    this.ws.onopen = () => { this.sendMessage(channels); }; // subscribe on channels

    console.log("Successfully connected: " + url);
    return this.subject.asObservable();
  }

  public sendMessage(data: Object)  {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
}