import { Component, OnInit } from '@angular/core';
import { LoremPicsumService } from '../lorem-picsum.service';
import { PictureService } from '../shared/picture.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public imageUrl$: Observable<any>;
  public imageLoading$: Observable<boolean>;
  public imageLoaded$: Observable<string>;
  private readonly SHOWN = "selected-picture-shown";
  private readonly HIDDEN = "selected-picture-hidden";

  constructor(public loremPicsum: LoremPicsumService, public pictureService: PictureService) { }

  ngOnInit(): void {
    this.pictureService.setPictureLoading();
    this.imageUrl$ = this.pictureService.getImageUrl();
    this.imageLoading$ = this.pictureService.pictureLoading$;
    this.imageLoaded$ = this.pictureService.pictureLoaded$.pipe(map((loaded: boolean) => loaded ? this.SHOWN : this.HIDDEN));
  }

}
