import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTelephone } from './add-telephone';

describe('AddTelephone', () => {
  let component: AddTelephone;
  let fixture: ComponentFixture<AddTelephone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTelephone],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTelephone);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
