import { Injectable } from '@angular/core';
import { UserProfile } from '../models/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TokenService {
    private userSubject = new BehaviorSubject<any | null>(null);
    user$ = this.userSubject.asObservable();

    setUser(user: UserProfile) {
        this.userSubject.next(user);
    }

    isLogged(): boolean {
        return !!this.userSubject.value; 
    }

    loggout(): void {
        this.userSubject.next(null);
    }

    getUser(): UserProfile {
        if (this.userSubject.value){
            return {
                ID: this.userSubject.value.id,
                Nickname: this.userSubject.value.nickname,
                Email: this.userSubject.value.email,}
        }
        return {ID: "", Nickname: "", Email: ""};
    }
}