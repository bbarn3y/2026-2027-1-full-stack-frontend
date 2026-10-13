import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Service()
export class ClientService {
  private readonly http: HttpClient = inject(HttpClient);

  login(): Observable<string> {
    return this.http.get<{ token: string }>('https://mocki.io/v1/258750c6-530f-4a10-beef-d2f71e775b13')
      .pipe(
        map(res => res.token),
      );
  }

}
