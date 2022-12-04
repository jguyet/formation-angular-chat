import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';

@Pipe({
  name: 'getUser'
})
export class GetUserPipe implements PipeTransform {

  constructor(public apiService: ApiService) {

  }

  transform(value: string, ...args: unknown[]): Observable<User> {
    return this.apiService.getUser(value);
  }

}
