import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieHomeTitleComponent } from './movie-home-title.component';

describe('MovieHomeTitleComponent', () => {
  let component: MovieHomeTitleComponent;
  let fixture: ComponentFixture<MovieHomeTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieHomeTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieHomeTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
