import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'app/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    valor = localStorage.getItem('userLogin');
    
    constructor(private accessService: AuthService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
// tslint:disable-next-line:no-debugger

        const userLogin = JSON.parse(localStorage.getItem('userLogin'));
        if (userLogin && userLogin.token) {

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${userLogin.token}`
                }
            });
        }
        return next.handle(request);
    }

}
