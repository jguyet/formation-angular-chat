import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable } from 'rxjs';
import { environement } from 'src/environement/environement';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(public httpClient: HttpClient) {
  }

  public getRandomCard(): Observable<Card> {
    return this.httpClient.get(`${environement.formationApi}/random-card-id`,
      { responseType: 'text' }
    ).pipe(
      mergeMap((cardId) => {
        return this.httpClient.get<Card>(`${environement.formationApi}/card/${cardId}`);
      })
    );
  }

}
