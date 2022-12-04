import { Component, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  standalone: true
})
export class LoginComponent implements OnDestroy {

  public loginFormGroup: FormGroup;
  public error: string | undefined;

  public subscriptions: Array<Subscription> = [];

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) {
    this.loginFormGroup = this.fb.group({
      email: this.fb.control('', []),
      password: this.fb.control('', [])
    });
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(x => x.unsubscribe());
      this.subscriptions = [];
  }

  public onSubmit(): void {
    this.subscriptions.push(this.authService.login(
      this.loginFormGroup.controls['email'].value,
      this.loginFormGroup.controls['password'].value
    ).subscribe((response) => {
      if (response.success) {
        this.router.navigate(["/"]);
        // console.log('SUCCESSSSS');
      } else {
        this.error = response.error;
      }
    }));
  }

  public onLogout(): void {
    this.authService.logout();
  }

}
