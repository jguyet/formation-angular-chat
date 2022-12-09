import { Component } from '@angular/core';
import { BehaviorSubject, mergeMap, Observable } from 'rxjs';
import { Card } from 'src/app/shared/models/card';
import { CardService } from 'src/app/shared/services/card.service';

@Component({
  selector: 'app-random-honey-pot',
  templateUrl: './random-honey-pot.component.html',
  styleUrls: ['./random-honey-pot.component.css']
})
export class RandomHoneyPotComponent {
  public card$: Observable<Card>;

  private process$ = new BehaviorSubject(false);

  constructor(public cardService: CardService) {
    this.card$ = this.process$.pipe(
      mergeMap(() => {
        return this.cardService.getRandomCard();
      })
    );
  }

  public reload() {
    // declencheur
    this.process$.next(true);
  }

}
