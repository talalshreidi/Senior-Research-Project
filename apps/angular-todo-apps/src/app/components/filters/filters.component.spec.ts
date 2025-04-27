import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  // Component instance and fixture declarations
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    // Configure a testing module with required imports
    await TestBed.configureTestingModule({
      imports: [FiltersComponent]
    })
      .compileComponents();

    // Create component and detect changes
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Basic test to verify component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
