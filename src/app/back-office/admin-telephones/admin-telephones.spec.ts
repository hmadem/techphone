import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminTelephones } from './admin-telephones';

describe('AdminTelephones', () => {
  let component: AdminTelephones;
  let fixture: ComponentFixture<AdminTelephones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTelephones],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTelephones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
