import { Component, OnInit } from '@angular/core';
import * as data from 'db.json';
import { Film } from '../film';
import { FilmsService } from 'src/app/core/services/films.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit {
  public name = 'Films list';
  public films: Film[];
  public filmsDetailIsVisible = false;
  public errorMessages = '';

  constructor(private filmsService: FilmsService) {
    this.films =  data.default.movies;
  }

  ngOnInit() {
    this.filmsService.getFilms().subscribe(
      films => {
        this.films = films;
      },
      error => this.errorMessages = error
    );
  }

  public removeFilm(filmId: number) {
    this.filmsService.deleteFilm(filmId).subscribe();
  }

  public toggleFilmDetails(): void {
    this.filmsDetailIsVisible = !this.filmsDetailIsVisible;
  }
}
