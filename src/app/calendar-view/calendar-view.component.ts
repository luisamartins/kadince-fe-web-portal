import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit{
  @Input() tasks: any[] = [];
  dates: any[] = [];
  month: string = '';
  year: number = 0;
  currentMonth: number = 0;

  ngOnInit(): void {
    const today = new Date();
    this.year = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.generateCalendar();
  }

  generateCalendar(): void {
    const firstDayOfMonth = new Date(this.year, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.year, this.currentMonth + 1, 0);

    this.month = firstDayOfMonth.toLocaleString('default', { month: 'long' });

    const daysInMonth = [];
    const firstDayIndex = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    for (let i = 0; i < firstDayIndex; i++) {
      daysInMonth.push(null);
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysInMonth.push(new Date(this.year, this.currentMonth, i));
    }

    this.dates = daysInMonth;
  }

  changeMonth(offset: number): void {
    this.currentMonth += offset;

    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.year++;
    } else if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.year--;
    }

    this.generateCalendar();
  }

  getTasksForDate(date: Date): any[] {
    return this.tasks.filter(
      task => new Date(task.deadline).toDateString() === date.toDateString()
    );
  }
}
