import { Component, OnInit } from '@angular/core';
import { Film } from '../film';
import { FilmsService } from 'src/app/core/services/films.service';
import { ActivatedRoute, Params, Router, Route} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.scss']
})
export class EditFilmComponent implements OnInit {
  public film: Film;
  public errorMessages = '';
  public id: number;
  filmForm: FormGroup;

  constructor(private filmsService: FilmsService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.getFilm();
    });


  }
  public getFilm() {
    this.filmsService.getFilmById(this.id).subscribe(
      film => {
        this.film = film;
        this.initForm();
      },
      error => this.errorMessages = error
    );
  }
  private initForm() {
    this.filmForm = new FormGroup({
      title: new FormControl(this.film.title, Validators.required),
      genre: new FormControl(this.film.genre, Validators.required),
      numberInStock: new FormControl(this.film.numberInStock, Validators.required),
      dailyRentalRate: new FormControl(this.film.dailyRentalRate, Validators.required),
      imageUrl: new FormControl(this.film.imageUrl, Validators.required),
    });
  }
  onSubmit() {
    if (this.filmForm.invalid) {
      return;
    }
    this.filmsService.updateFilm(this.filmForm.value as Film, this.id );
    this.router.navigate(['/film-list']);
  }
}
