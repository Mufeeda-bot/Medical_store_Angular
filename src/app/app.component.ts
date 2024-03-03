import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router'; // Import Router from @angular/router

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout(); // Call AuthService logout method
    this.router.navigate(['/login']); // Navigate to login page after logout
  }
}
