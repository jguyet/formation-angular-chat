import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { filter, mergeMap, Subscription, timer } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ]
})
export class TopbarComponent {

  public my: User | undefined;

  private subscriptions: Subscription[] = [];

  constructor(public authService: AuthService, public apiService: ApiService) {
    this.subscriptions.push(timer(1000).pipe(
      filter(() => this.my == undefined && this.authService.isLogged),
      mergeMap(() => this.apiService.getMyAccount())
    ).subscribe((my) => {
      this.my = my;
    }));
  }
}
