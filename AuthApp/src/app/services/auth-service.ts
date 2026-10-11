import { inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { GetUserResponse, LoginRequest, RegisterRequest } from '../interfaces/user-dtos';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';

@Service()
export class AuthService {

    private endPoint = `${environment.apiUrl}/auth`
    public currentUser = signal<GetUserResponse | null>(null)
    private http = inject(HttpClient)

    register(request: RegisterRequest): Observable<void> {
        return this.http.post<void>(`${this.endPoint}/register`, request)
    }

    login(request: LoginRequest): Observable<void> {
        return this.http.post<void>(`${this.endPoint}/login`, request)
    }

    loadCurrentUser(): Observable<GetUserResponse> {
        return this.http.get<GetUserResponse>(`${this.endPoint}/me`)
            .pipe(
                tap(user => {
                    this.currentUser.set(user)
                }),
                catchError((error) => {
                    console.log("error from authservice")
                    this.currentUser.set(null)
                    return throwError(() => error)
                })
            )
    }


    logout(): Observable<void> {
        return this.http.post<void>(`${this.endPoint}/logout`, {})
            .pipe(
                finalize(() => {
                    this.currentUser.set(null)
                })
            )
    }


}
