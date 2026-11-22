import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTelephone } from './edit-telephone';

describe('EditTelephone', () => {
  let component: EditTelephone;
  let fixture: ComponentFixture<EditTelephone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTelephone],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTelephone);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
