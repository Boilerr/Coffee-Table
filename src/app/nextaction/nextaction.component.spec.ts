import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextactionComponent } from './nextaction.component';

describe('NextactionComponent', () => {
  let component: NextactionComponent;
  let fixture: ComponentFixture<NextactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
