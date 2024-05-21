import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieInfo } from '../../models/models';

@Component({
  selector: 'movie-home-title',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-home-title.component.html',
  styleUrl: './movie-home-title.component.scss'
})
export class MovieHomeTitleComponent {
  @Input() info: MovieInfo = {
    ID: 0,
    Title: "Title_Template",
    Overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus, neque quis vulputate placerat, tortor eros fermentum lectus, non elementum neque neque in sapien. Nulla volutpat pellentesque arcu eu sagittis. Duis cursus dui at rhoncus aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris erat metus, cursus et leo quis, porta tristique massa. Cras rhoncus tellus ut lectus accumsan, id luctus tortor interdum. Sed enim arcu, venenatis ac nunc nec, elementum pellentesque nisl. Donec non vehicula dui, in facilisis libero. Aliquam sed porta neque, quis pellentesque eros. Donec tempor odio magna, a convallis enim gravida non. Sed nec ex ante. Integer vel sem diam.",
    ReleaseDate: "17-02-2022",
    OriginalLanguage: "ENG",
  };
}
