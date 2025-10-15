import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineGivingComponent } from './online-giving.component';

describe('OnlineGivingComponent', () => {
  let component: OnlineGivingComponent;
  let fixture: ComponentFixture<OnlineGivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineGivingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineGivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
