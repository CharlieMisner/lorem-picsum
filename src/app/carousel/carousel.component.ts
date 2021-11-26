import { Component, OnInit, Input } from '@angular/core';
import { LoremPicsum } from '../header/interfaces';
import { CarouselService } from './carousel.service';
import { LoremPicsumService } from '../lorem-picsum.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  public imageUrl$: Observable<any>;

  constructor(public carouselService: CarouselService, public loremPicsumService: LoremPicsumService) { }

  ngOnInit(): void {
    this.carouselService.initializeCarousel();
    this.imageUrl$ = this.carouselService.getImageUrl();
  }

}
