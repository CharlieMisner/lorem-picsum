import { Injectable } from '@angular/core';
import { LoremPicsum } from '../header/interfaces';
import {BehaviorSubject, Observable, combineLatest} from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoremPicsumService } from '../lorem-picsum.service';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  public currentPictureIndex$:BehaviorSubject<number> = new BehaviorSubject(0);
  private currentPictureIndex: number = 0;
  private pictureArrayLength: number = 0;
  private pictures: LoremPicsum[] = [];

  constructor(private loremPicsumService: LoremPicsumService) { }

  public initializeCarousel(): void{
    this.currentPictureIndex$.next(this.currentPictureIndex);
    this.loremPicsumService.getLoremPicsumImages().pipe(take(1)).subscribe((pictures: LoremPicsum[]) => this.pictureArrayLength = pictures.length)
  }

  public goToNextPhoto(): void{
    if(this.currentPictureIndex < this.pictureArrayLength){
      this.currentPictureIndex$.next(this.currentPictureIndex++);
    } else {
      this.currentPictureIndex$.next(0);
      this.currentPictureIndex = 0;
    }
  }

  public goToPreviousPhoto(): void{
    if(this.currentPictureIndex > 0){
      this.currentPictureIndex$.next(this.currentPictureIndex--);
    } else {
      this.currentPictureIndex$.next(this.pictureArrayLength - 1);
      this.currentPictureIndex = this.pictureArrayLength - 1;
    }
  }


  private getImageSourceString(currentPictureIndex: number | null, allPictures: LoremPicsum[] | null): string {
    if(currentPictureIndex != null && allPictures != null){
      const currentPicture = allPictures[currentPictureIndex];
      return `https://picsum.photos/id/${currentPicture.id}/${currentPicture.width}/${currentPicture.height}`;
    } else {
      return "";
    }
  }

  /**
   * Combines the streams of the current picture index and pictures, then returns the current umages url.
   */
  public getImageUrl(): Observable<any>{
    return combineLatest(this.currentPictureIndex$,this.loremPicsumService.getLoremPicsumImages()).pipe(
      map(([currentPictureIndex, allPictures]) => this.getImageSourceString(currentPictureIndex, allPictures))
    )
  }
}
