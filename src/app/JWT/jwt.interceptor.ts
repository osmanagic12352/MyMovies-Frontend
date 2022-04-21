import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private router: Router) {

    }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (localStorage.getItem('token') != null){
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer '+localStorage.getItem('token'))
            });
            return next.handle(clonedReq).pipe(
                tap(
                    succ =>{},
                    err => {
                        if(err.status == 401){
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('/user/login');
                        }
                        else if(err.status == 403)
                        this.router.navigateByUrl('/forbidden');
                    
                }
            )
        )
        }
       return next.handle(req.clone());
    }
}
export const CommonIterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
};
