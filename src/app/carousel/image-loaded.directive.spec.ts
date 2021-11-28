import { ImageLoadedDirective } from './image-loaded.directive';
import { ElementRef, Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class MockElementRef extends ElementRef {}

@Component({
  template: `<img (loaded)="this.loaded()">`
})
class TestComponent {
  public isLoaded: boolean = false;
  public loaded(){this.isLoaded=true}
}

describe('ImageLoadedDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let imgElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, useClass: MockElementRef }
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    imgElement = fixture.debugElement.query(By.css('img'));
  });

  it('should create an instance', () => {
    const directive = new ImageLoadedDirective(imgElement);
    expect(directive).toBeTruthy();
  });
});
