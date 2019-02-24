import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from 'src/app/films/film';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  private moviesUrl = 'http://localhost:3000/movies';

  constructor(private httpClient: HttpClient) { }

  getFilms(): Observable<Film[]> {
    return this.httpClient.get<Film[]>(this.moviesUrl);
  }

  addFilm(film: Film) {
    this.httpClient.post(this.moviesUrl, film).subscribe(
      data  => {
        console.log('POST Request is successful ', data);
      },
      error  => {
        console.log('Error', error);
      }
    );
  }

  deleteFilm(index) {
    return this.httpClient.delete(`${this.moviesUrl}/${index}`);
  }


}
