import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";

const TOKEN_KEY = "AuthToken";

@Injectable({providedIn: 'root'})
export class TokenService {
    constructor(private router: Router) { }

    public setToken(token: string) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string | null {
        return sessionStorage.getItem(TOKEN_KEY);
    }

    public isLogged(): boolean {
        if (this.getToken()) {
        return true;
        }
        return false;
    }

    public login(token: string) {
        const decoded = this.decodePayload(token);
        console.log('Token Values: ', decoded);
        return decoded;
    }


    public logout() {
        window.sessionStorage.clear();
        this.router.navigate(["/login"]);
    }

    private decodePayload(token: string): any {
        console.log('Token value:', token);
        const payload = token!.split(".")[1];
        const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
        const values = JSON.parse(payloadDecoded);
        return values;
  }

    public encodePayload(payload: any): string {
        console.log('Payload value:', payload);
        const payloadString = JSON.stringify(payload);
        const payloadBase64 = Buffer.from(payloadString).toString('base64');
        const header = {
            alg: 'HS256',
            typ: 'JWT'
        };
        const headerString = JSON.stringify(header);
        const headerBase64 = Buffer.from(headerString).toString('base64');
        const token = `${headerBase64}.${payloadBase64}`;

        return token;
    }


    public getUserNickname(): string | null {
        const token = this.getToken();
        if (token) {
        const payload = this.decodePayload(token);
        return payload.nickname || null;
        }
        return null;
    }
}