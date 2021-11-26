import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoremPicsum } from './header/interfaces';
import { flatMap, filter, toArray, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoremPicsumService {

  private readonly LOREM_PICSUM_URL = "https://picsum.photos/list";
  private readonly ALEJANDRO_ESCAMILLA = "Alejandro Escamilla";

  constructor(private http: HttpClient) { }

  /**
   * Get Lorem Picsum photos and filter for only Alejandor Escamilla.
   */
  public getLoremPicsumImages(): Observable<LoremPicsum[]>{
    return this.http.get<LoremPicsum[]>(this.LOREM_PICSUM_URL).pipe(
      flatMap((pictures: LoremPicsum[]) => pictures),
      filter((picture: LoremPicsum) => picture.author == this.ALEJANDRO_ESCAMILLA),
      toArray()
    )
  }
}
