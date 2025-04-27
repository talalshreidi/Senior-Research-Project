import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
// Filters component
@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
// Filters component class
export class FiltersComponent {
  @Input() filter: string = 'all';
  @Output() filterChange = new EventEmitter<string>();
// Handles the clicks on the filter buttons
  onFilterClick(filterValue: string): void {
    this.filterChange.emit(filterValue);
  }
// Checks if the filter is active
  isActive(filterValue: string): boolean {
    return this.filter === filterValue;
  }
}
