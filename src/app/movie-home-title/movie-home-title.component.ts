import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface MovieInfo{
  ID: number,
	Title: string,
	Overview: string,
	ReleaseDate: string,
	OriginalLanguage: string,
}

@Component({
  selector: 'movie-home-title',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-home-title.component.html',
  styleUrl: './movie-home-title.component.scss'
})
export class MovieHomeTitleComponent {
  @Input() info: any;
}
