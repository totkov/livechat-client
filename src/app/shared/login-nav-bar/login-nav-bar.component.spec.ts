import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNavBarComponent } from './login-nav-bar.component';

describe('LoginNavBarComponent', () => {
  let component: LoginNavBarComponent;
  let fixture: ComponentFixture<LoginNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
