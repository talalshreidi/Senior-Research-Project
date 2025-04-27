import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';

// Test suite for AppComponent
describe('AppComponent', () => {
  // Set up testing module before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  // Test if component can be created successfully
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Verify the component has correct title
  it(`should have the 'angular-todo-apps' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-todo-apps');
  });

  // Check if title is rendered in the template
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular-todo-apps');
  });
});
