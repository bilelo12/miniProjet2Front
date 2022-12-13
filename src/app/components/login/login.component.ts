import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  err:number = 0;
  user = new User()
  constructor(private authService :AuthService,private router :Router) { }
  erreur =0;
  ngOnInit(): void {
  }


  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
      let jwToken = data.headers.get('Authorization')!;
      this.authService.saveToken(jwToken);
      this.router.navigate(['/']);
      },
      error: (err: any) => {
      this.err = 1;
      }
      });
      

  }

}
