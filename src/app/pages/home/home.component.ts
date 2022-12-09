import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

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
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule
  ]
})
export class HomeComponent {

  availableColors: ChipColor[] = [
    {message: 'message1', my: false},
    {message: 'message2', my: false},
    {message: 'message3 (MOI)', my: true},
    {message: 'message4', my: false},
  ];

}
