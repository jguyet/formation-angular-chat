import { Injectable } from "@angular/core";
import { Observable, Observer, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  
  private ws: WebSocket | undefined = undefined;
  private subject: Subject<Object> = new Subject<Object>();

  constructor() {
    
  }

  public subscribe(url: string, channels: Array<string>): Subject<Object> {
    if (this.ws != undefined && this.ws?.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
    this.ws = new WebSocket(url);
    this.ws.onmessage = (x) => { this.subject.next(JSON.parse(x.data)); };;
    this.ws.onerror = (x) => { this.subject.error(x); };
    this.ws.onclose = () => { this.subject.complete(); };
    this.ws.onopen = () => { this.sendMessage(channels); }; // subscribe on channels

    console.log("Successfully connected: " + url);
    return this.subject;
  }

  public sendMessage(data: Object)  {
    console.log(this.ws?.readyState, this.ws?.readyState === WebSocket.OPEN);
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
}