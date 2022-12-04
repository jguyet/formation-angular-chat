import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { catchError, from, map, mergeMap, Observable, of, Subject } from 'rxjs';
import { environement } from 'src/environements/environement';
import { User } from '../models/user';

export interface LoginResponse {
  error?: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public get isLogged() {
    return this.oauthService.hasValidAccessToken();
  }

  public getUser(): User {
    return { ... JSON.parse(atob(this.oauthService.getAccessToken().split('.')[1]))?.sub } as User;
  }

  constructor(public oauthService: OAuthService,public httpClient: HttpClient) {
    this.setConfiguration();
  }

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<any>(`${environement.formationApi}/user/login`, {
        email: email,
        password: password
    }).pipe(
      catchError((response: any) => {
        if (response?.status == 406) {
          return of(false);
        }
        return of(false);
      }),
      mergeMap((account) => {
        if (account === false) {
          return of({ error: "Email or password failed", success: false } as LoginResponse);
        }
        return from(this.oauthService.fetchTokenUsingGrant(`${environement.oauth2.scope}`, {
          clientId: account.clientId,
          clientSecret: account.clientSecret
        })).pipe(map(x => {

            return { success: this.oauthService.hasValidAccessToken() } as LoginResponse
        }));
      })
    );
  }

  public logout(): void {
    this.oauthService.logOut();
  }

  public setConfiguration() {
    this.oauthService.configure({
      scope: environement.oauth2.scope,
      requireHttps: environement.oauth2.requireHttps,
      tokenEndpoint: environement.oauth2.tokenEndpoint
    });
  }

}
