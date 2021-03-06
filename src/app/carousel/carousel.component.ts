import { Component, OnInit, Input } from '@angular/core';
import { LoremPicsum } from '../header/interfaces';
import { PictureService } from '../shared/picture.service';
import { LoremPicsumService } from '../lorem-picsum.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  public imageUrl$: Observable<any>;
  public imageLoading$: Observable<boolean>;
  public imageLoaded$: Observable<string>;
  private readonly SHOWN = "selected-picture-shown";
  private readonly HIDDEN = "selected-picture-hidden";

  constructor(public pictureService: PictureService, public loremPicsumService: LoremPicsumService) { }

  ngOnInit(): void {
    this.pictureService.initializeCarousel();
    this.imageUrl$ = this.pictureService.getImageUrl();
    this.imageLoading$ = this.pictureService.pictureLoading$;
    this.imageLoaded$ = this.pictureService.pictureLoaded$.pipe(map((loaded: boolean) => loaded ? this.SHOWN : this.HIDDEN));
  }

}
