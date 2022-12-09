import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { catchError, from, map, mergeMap, Observable, of } from 'rxjs';
import { environement } from 'src/environement/environement';

export interface LoginResponse { error?: string; success: boolean; }

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  get isLogged() {
    return true;
  }

  constructor(
    public oauthService: OAuthService,
    public httpClient: HttpClient) {
      this.setConfiguration();
  }
  
  public login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<any>(`${environement.formationApi}/user/login`, {
      email: email,
      password: password
    }).pipe(
      catchError((response: any) => {
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

  public logout() {
    this.oauthService.logOut();
  }

  private setConfiguration() {
    this.oauthService.configure({
      scope: environement.oauth2.scope,
      requireHttps: environement.oauth2.requireHttps,
      tokenEndpoint: environement.oauth2.tokenEndpoint
    });
  }
}
