import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RubiksSolverService {

  constructor(private http: HttpClient) { }

  solveCube(postbody, httpOptions): Observable<any> {
    return this.http.post(environment.api + 'solveCube',postbody, httpOptions).pipe(
    );
  }
}
