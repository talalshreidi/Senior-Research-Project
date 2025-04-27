import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskFormComponent} from './task-form.component';

// Test suite for TaskFormComponent
describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  // Setup before each test
  beforeEach(async () => {
    // Configure testing module
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent]
    })
      .compileComponents();

    // Create component and detect changes
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test that component can be created
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
