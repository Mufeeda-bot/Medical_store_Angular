import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.builder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  proceedLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          // Access the token from the response object
          const token = response.token;
          console.log('Login successful! Token:', token); // Print the token in the console
          // Optionally, you can save the token to local storage or use it for further authentication
          this.toastr.success('Login successful!', 'Success');
          this.router.navigate(['/']);
        },
        (error) => {
          if (error.status === 401) {
            this.toastr.error('Invalid email or password. Please try again.', 'Error');
          } else {
            this.toastr.error('An unexpected error occurred. Please try again later.', 'Error');
            console.error('Login error:', error);
          }
        }
      );
    } else {
      this.toastr.error('Please fill in all required fields correctly.', 'Error');
    }
  }
}
