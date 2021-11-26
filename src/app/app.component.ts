import { Component, OnInit } from '@angular/core';
import { LoremPicsumService } from './lorem-picsum.service';
import { LoremPicsum } from './header/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public $pictures: Observable<LoremPicsum[]>;

  constructor(private loremPicsum: LoremPicsumService){}

  ngOnInit(){
    this.$pictures = this.loremPicsum.getLoremPicsumImages();
  }
}
