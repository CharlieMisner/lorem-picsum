import { Component, OnInit } from '@angular/core';
import { LoremPicsumService } from './lorem-picsum.service';
import { LoremPicsum } from './header/interfaces';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public displayModal$: BehaviorSubject<boolean>;

  constructor(private loremPicsum: LoremPicsumService){}

  ngOnInit(){
    this.displayModal$ = this.loremPicsum.displayModal$;
  }
}
