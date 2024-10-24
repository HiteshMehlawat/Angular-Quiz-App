import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";


@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{

    constructor(private router :Router){}

    canActivate(): boolean {
        const isLoggedIn =localStorage.getItem('uname') !==null;
        if(!isLoggedIn){
            alert("Please Login First!!");
            this.router.navigate(['/login']);
            return false;
        }
        return true
    }
}