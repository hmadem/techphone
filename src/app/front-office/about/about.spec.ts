import { ComponentFixture, TestBed } from '@angular/core/testing';
import { about } from './about';

describe('about', () => {
  let component: about;
  let fixture: ComponentFixture<about>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [about],
    }).compileComponents();

    fixture = TestBed.createComponent(about);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
