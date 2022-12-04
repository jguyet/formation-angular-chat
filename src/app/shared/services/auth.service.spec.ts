import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { OAuthService, TokenResponse } from 'angular-oauth2-oidc';
import { Observable, of } from 'rxjs';

import { AuthService } from './auth.service';

class MockHttp {
  public post(): Observable<any> { return of(); }
}

class MockOAuth {

  public hasValidAccessToken(): boolean { return false; }
  public getAccessToken(): string { return ''; }
  public fetchTokenUsingGrant(): Promise<TokenResponse> { return Promise.resolve({} as TokenResponse); }
  public logOut() {}
  public configure() {}
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useClass: MockHttp },
        { provide: OAuthService, useClass: MockOAuth }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
