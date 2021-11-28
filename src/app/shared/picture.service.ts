import { Injectable } from '@angular/core';
import { LoremPicsum } from '../header/interfaces';
import {BehaviorSubject, Observable, combineLatest} from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoremPicsumService } from '../lorem-picsum.service';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  public currentPictureIndex$:BehaviorSubject<number> = new BehaviorSubject(0);
  public pictureLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public pictureLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public currentPictureIndex: number = 0;
  public pictureArrayLength: number = 0;

  constructor(private loremPicsumService: LoremPicsumService) { }

  public initializeCarousel(): void{
    this.loremPicsumService.getLoremPicsumImages().pipe(take(1)).subscribe((pictures: LoremPicsum[]) => this.pictureArrayLength = pictures.length)
  }

  /**
   * Increments current image index, if current index is last in array, sets to 0.
   */
  public goToNextPhoto(): void{
    this.setPictureLoading();
    if(this.currentPictureIndex < this.pictureArrayLength){
      this.currentPictureIndex++
      this.currentPictureIndex$.next(this.currentPictureIndex);
    } else {
      this.currentPictureIndex$.next(0);
      this.currentPictureIndex = 0;
    }
  }

  /**
   * Decriments the current image index, if current index is 0, sets to last index.
   */
  public goToPreviousPhoto(): void{
    this.setPictureLoading();
    if(this.currentPictureIndex > 0){
      this.currentPictureIndex--
      this.currentPictureIndex$.next(this.currentPictureIndex);
    } else {
      this.currentPictureIndex$.next(this.pictureArrayLength - 1);
      this.currentPictureIndex = this.pictureArrayLength - 1;
    }
  }

  /**
   * Generates a URL to get the picture for the current index
   * @param currentPictureIndex
   * @param allPictures 
   */
  public getImageSourceString(currentPictureIndex: number | null, allPictures: LoremPicsum[] | null): string {
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

  public setPictureLoading(){
    this.pictureLoading$.next(true);
    this.pictureLoaded$.next(false);
  }

  public setPictureLoaded(){
    this.pictureLoading$.next(false);
    this.pictureLoaded$.next(true);
  }

}
