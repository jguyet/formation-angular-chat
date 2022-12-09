import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { myOf } from 'src/app/shared/libs/my-of';
import { LoginService } from 'src/app/shared/services/login.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    RouterModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class LoginComponent {

  public loginFormGroup: FormGroup;
  public error?: string;

  constructor(
    public fb: FormBuilder,
    public loginService: LoginService,
    public router: Router) {
    this.loginFormGroup = fb.group({
      'email': fb.control('', [Validators.email], []),
      'password': fb.control('', [Validators.minLength(2)], [])
    });
  }

  public submit() {
    console.log(this.loginFormGroup);
    if (this.loginFormGroup.invalid) {
      return ;
    }
    this.error = undefined;
    this.loginService.login(
      this.loginFormGroup.controls['email'].value,
      this.loginFormGroup.controls['password'].value
    ).subscribe((response) => {
      if (response.success) {
        // redirection vers home
        this.router.navigate(['/']);
      } else {
        this.error = response.error;
      }
    });
  }

}
