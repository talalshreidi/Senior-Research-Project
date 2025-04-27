import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskListComponent} from './task-list.component';

describe('TaskListComponent', () => {
  // Component references for testing
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  // Set up before each test
  beforeEach(async () => {
    // Configure the testing module with our component
    await TestBed.configureTestingModule({
      imports: [TaskListComponent]
    })
      .compileComponents();

    // Create component instance and detect changes
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Basic test to verify component creates successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
