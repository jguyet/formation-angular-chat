import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public authService: AuthService, public websocketService: WebsocketService) {
    console.log(authService.getUser());
    this.websocketService.subscribe("ws://localhost:8080/ws", ["test"]).subscribe((message) => {
      console.log(message);
    })
  }
}
