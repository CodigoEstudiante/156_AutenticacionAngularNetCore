import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { form, required, FormField } from '@angular/forms/signals';
import { AuthService } from '../../../services/auth-service';
import { LoginRequest } from '../../../interfaces/user-dtos';
import { switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, RouterLink, FormField],
  selector: 'app-page-login',
  styleUrl: './page-login.scss',
  templateUrl: './page-login.html',
})
export class PageLogin {

  private initialData = {
    email: '',
    password: ''
  }
  protected formModel = signal(this.initialData)
  private router = inject(Router);
  protected myForm = form(this.formModel, (path) => {
    required(path.email);
    required(path.password);
  })

  protected authService = inject(AuthService)

  login(): void {
    const { email, password } = this.myForm().value();

    const req: LoginRequest = {
      email,
      password
    }

    this.authService.login(req)
      .pipe(
        switchMap(
          () => this.authService.loadCurrentUser()
        )
      )
      .subscribe({
        next: (user) => {
          console.log(user)
          this.router.navigate(['/'])
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            alert("email o contraseña incorrectos")
          } else {
            alert("Ocurrio un error al iniciar la sesión.")
          }
        }
      })

  }

}
