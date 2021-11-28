import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PictureService } from './picture.service';
import { LoremPicsum } from '../header/interfaces';

describe('PictureService', () => {
  let service: PictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(PictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should go to next photo', () => {
    service.pictureArrayLength =4;
    service.goToNextPhoto();
    expect(service.currentPictureIndex).toEqual(1);
  });

  it('should go to previous photo', () => {
    service.pictureArrayLength =4;
    service.currentPictureIndex = 3;
    service.goToPreviousPhoto();
    expect(service.currentPictureIndex).toEqual(2);
  });

  it('should go to previous photo 4', () => {
    service.pictureArrayLength =4;
    service.currentPictureIndex = 0;
    service.goToPreviousPhoto();
    expect(service.currentPictureIndex).toEqual(3);
  });

  it('should go to next photo 0', () => {
    service.pictureArrayLength =4;
    service.currentPictureIndex = 4;
    service.goToNextPhoto();
    expect(service.currentPictureIndex).toEqual(0);
  });

  it('should set picture loaded', () => {
    service.setPictureLoaded();
    service.pictureLoaded$.subscribe((loaded: boolean) => expect(loaded).toBeTrue())
    service.pictureLoading$.subscribe((loading: boolean) => expect(loading).toBeFalse())
  });

  it('should get image source url', () => {
    const image: LoremPicsum = {
      id:1,
      width: 1000,
      height: 1000,
      author_url: "",
      post_url:"",
      format:"",
      author: "",
      filename: ""
    };

    const url:string = service.getImageSourceString(0, [image]);
    expect(url).toEqual("https://picsum.photos/id/1/1000/1000");
  });
});
