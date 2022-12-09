import { Component } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  imports: [
    MatToolbarModule,
    MatIconModule
  ]
})
export class TopbarComponent {

}
