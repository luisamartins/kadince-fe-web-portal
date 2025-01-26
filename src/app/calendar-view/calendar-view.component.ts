import {Component, Input, OnInit} from '@angular/core';

/**
 * Component for displaying tasks in a calendar view.
 */
@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
  @Input() tasks: any[] = [];
  dates: any[] = [];
  weeks: any[][] = [];
  month: string = '';
  year: number = 0;
  currentMonth: number = 0;
  expandedDay: Date | null = null;

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    const today = new Date();
    this.year = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.generateCalendar();
  }

  /**
   * Generates the calendar for the current month.
   */
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

    while (daysInMonth.length % 7 !== 0) {
      daysInMonth.push(null);
    }

    // Group the days into weeks
    this.weeks = [];
    for (let i = 0; i < daysInMonth.length; i += 7) {
      this.weeks.push(daysInMonth.slice(i, i + 7));
    }
  }

  /**
   * Changes the month displayed in the calendar.
   *
   * @param offset the number of months to change (positive for next month, negative for previous month)
   */
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

  /**
   * Retrieves the tasks for a specific date.
   *
   * @param date the date to retrieve tasks for
   * @return the list of tasks for the specified date
   */
  getTasksForDate(date: Date): any[] {
    if (!date) return [];
    return this.tasks.filter(task => {
      if (!task.deadline) return false;

      const taskDateParts = task.deadline.split('-');
      const taskDate = new Date(
        Number(taskDateParts[0]),
        Number(taskDateParts[1]) - 1,
        Number(taskDateParts[2])
      );
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  }


  /**
   * Checks if a date is today.
   *
   * @param date the date to check
   * @return true if the date is today, false otherwise
   */
  isToday(date: Date | null): boolean {
    if (!date) {
      return false;
    }

    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  expandDay(date: Date): void {
    this.expandedDay = date;
  }

  closeExpandedDay(): void {
    this.expandedDay = null;
  }
}
