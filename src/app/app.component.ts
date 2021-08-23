import { Component } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-chat-app';

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.setup();
  }
}
