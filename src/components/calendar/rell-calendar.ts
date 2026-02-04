import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellCalendar extends BaseComponent {
  static get observedAttributes() {
    return [
      'value', 'min-date', 'max-date', 'disabled-dates', 'first-day-of-week',
      'show-today', 'show-other-months', 'multiple', 'range'
    ];
  }

  private currentMonth: number = new Date().getMonth();
  private currentYear: number = new Date().getFullYear();
  private selectedDates: Date[] = [];
  private rangeStart: Date | null = null;
  private rangeEnd: Date | null = null;

  private getValue(): string {
    return this.getAttribute('value') || '';
  }

  private getMinDate(): Date | null {
    const min = this.getAttribute('min-date');
    return min ? new Date(min) : null;
  }

  private getMaxDate(): Date | null {
    const max = this.getAttribute('max-date');
    return max ? new Date(max) : null;
  }

  private getDisabledDates(): Date[] {
    const disabled = this.getAttribute('disabled-dates');
    if (!disabled) return [];
    
    return disabled.split(',').map(d => new Date(d.trim())).filter(d => !isNaN(d.getTime()));
  }

  private getFirstDayOfWeek(): number {
    const day = this.getAttribute('first-day-of-week');
    return day ? parseInt(day) : 0; // 0 = Sunday, 1 = Monday
  }

  private showToday(): boolean {
    return this.getAttribute('show-today') !== 'false';
  }

  private showOtherMonths(): boolean {
    return this.getAttribute('show-other-months') !== 'false';
  }

  private isMultiple(): boolean {
    return this.hasAttribute('multiple');
  }

  private isRange(): boolean {
    return this.hasAttribute('range');
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  private parseDate(dateString: string): Date | null {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }

  private isDateDisabled(date: Date): boolean {
    const minDate = this.getMinDate();
    const maxDate = this.getMaxDate();
    const disabledDates = this.getDisabledDates();

    if (minDate) {
      const min = new Date(minDate);
      min.setHours(0, 0, 0, 0);
      if (date < min) return true;
    }
    if (maxDate) {
      const max = new Date(maxDate);
      max.setHours(23, 59, 59, 999);
      if (date > max) return true;
    }

    return disabledDates.some(disabled => {
      const d = new Date(disabled);
      d.setHours(0, 0, 0, 0);
      const check = new Date(date);
      check.setHours(0, 0, 0, 0);
      return check.getTime() === d.getTime();
    });
  }

  private getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  private getFirstDayOfMonth(month: number, year: number): number {
    return new Date(year, month, 1).getDay();
  }

  private getCalendarDays(): Array<{ date: Date; isCurrentMonth: boolean; isToday: boolean; isSelected: boolean; isInRange: boolean; isRangeStart: boolean; isRangeEnd: boolean; isDisabled: boolean }> {
    const days: Array<{ date: Date; isCurrentMonth: boolean; isToday: boolean; isSelected: boolean; isInRange: boolean; isRangeStart: boolean; isRangeEnd: boolean; isDisabled: boolean }> = [];
    const firstDay = this.getFirstDayOfMonth(this.currentMonth, this.currentYear);
    const daysInMonth = this.getDaysInMonth(this.currentMonth, this.currentYear);
    const firstDayOfWeek = this.getFirstDayOfWeek();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let startDay = firstDay - firstDayOfWeek;
    if (startDay < 0) startDay += 7;

    const prevMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    const prevYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
    const daysInPrevMonth = this.getDaysInMonth(prevMonth, prevYear);

    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(prevYear, prevMonth, daysInPrevMonth - i);
      date.setHours(0, 0, 0, 0);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: date.getTime() === today.getTime(),
        isSelected: this.isDateSelected(date),
        isInRange: this.isDateInRange(date),
        isRangeStart: this.isRangeStart(date),
        isRangeEnd: this.isRangeEnd(date),
        isDisabled: this.isDateDisabled(date),
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      date.setHours(0, 0, 0, 0);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.getTime() === today.getTime(),
        isSelected: this.isDateSelected(date),
        isInRange: this.isDateInRange(date),
        isRangeStart: this.isRangeStart(date),
        isRangeEnd: this.isRangeEnd(date),
        isDisabled: this.isDateDisabled(date),
      });
    }

    const nextMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
    const nextYear = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
    const remainingDays = 42 - days.length;

    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(nextYear, nextMonth, day);
      date.setHours(0, 0, 0, 0);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: date.getTime() === today.getTime(),
        isSelected: this.isDateSelected(date),
        isInRange: this.isDateInRange(date),
        isRangeStart: this.isRangeStart(date),
        isRangeEnd: this.isRangeEnd(date),
        isDisabled: this.isDateDisabled(date),
      });
    }

    return days;
  }

  private isDateSelected(date: Date): boolean {
    if (this.isRange()) {
      return (this.rangeStart !== null && date.getTime() === this.rangeStart.getTime()) ||
             (this.rangeEnd !== null && date.getTime() === this.rangeEnd.getTime());
    }
    return this.selectedDates.some(selected => selected.getTime() === date.getTime());
  }

  private isDateInRange(date: Date): boolean {
    if (!this.isRange() || !this.rangeStart || !this.rangeEnd) return false;
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    const start = new Date(this.rangeStart);
    start.setHours(0, 0, 0, 0);
    const end = new Date(this.rangeEnd);
    end.setHours(0, 0, 0, 0);
    return checkDate.getTime() > start.getTime() && checkDate.getTime() < end.getTime();
  }

  private isRangeStart(date: Date): boolean {
    return this.isRange() && this.rangeStart !== null && date.getTime() === this.rangeStart.getTime();
  }

  private isRangeEnd(date: Date): boolean {
    return this.isRange() && this.rangeEnd !== null && date.getTime() === this.rangeEnd.getTime();
  }

  private selectDate(date: Date): void {
    if (this.isDateDisabled(date)) return;

    if (this.isRange()) {
      if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
        this.rangeStart = date;
        this.rangeEnd = null;
      } else {
        if (date < this.rangeStart) {
          this.rangeEnd = this.rangeStart;
          this.rangeStart = date;
        } else {
          this.rangeEnd = date;
        }
      }
      this.updateRangeValue();
    } else if (this.isMultiple()) {
      const index = this.selectedDates.findIndex(d => d.getTime() === date.getTime());
      if (index >= 0) {
        this.selectedDates.splice(index, 1);
      } else {
        this.selectedDates.push(date);
      }
      this.updateMultipleValue();
    } else {
      this.selectedDates = [date];
      this.updateSingleValue();
    }

    this.render();
    this.dispatchChangeEvent();
  }

  private updateSingleValue(): void {
    if (this.selectedDates.length > 0) {
      this.setAttribute('value', this.formatDate(this.selectedDates[0]));
    } else {
      this.removeAttribute('value');
    }
  }

  private updateMultipleValue(): void {
    const values = this.selectedDates.map(d => this.formatDate(d)).join(',');
    if (values) {
      this.setAttribute('value', values);
    } else {
      this.removeAttribute('value');
    }
  }

  private updateRangeValue(): void {
    if (this.rangeStart && this.rangeEnd) {
      this.setAttribute('value', `${this.formatDate(this.rangeStart)} - ${this.formatDate(this.rangeEnd)}`);
    } else if (this.rangeStart) {
      this.setAttribute('value', this.formatDate(this.rangeStart));
    } else {
      this.removeAttribute('value');
    }
  }

  private dispatchChangeEvent(): void {
    if (this.isRange()) {
      this.dispatchEvent(new CustomEvent('change', {
        detail: { 
          start: this.rangeStart ? this.formatDate(this.rangeStart) : null,
          end: this.rangeEnd ? this.formatDate(this.rangeEnd) : null,
          range: this.rangeStart && this.rangeEnd ? [this.rangeStart, this.rangeEnd] : null
        },
        bubbles: true,
        composed: true,
      }));
    } else {
      this.dispatchEvent(new CustomEvent('change', {
        detail: { 
          value: this.selectedDates.map(d => this.formatDate(d)),
          dates: this.selectedDates
        },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private navigateMonth(direction: number): void {
    this.currentMonth += direction;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.render();
  }

  private getMonthName(month: number): string {
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    return months[month];
  }

  private getWeekdayNames(): string[] {
    const firstDay = this.getFirstDayOfWeek();
    const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return [...weekdays.slice(firstDay), ...weekdays.slice(0, firstDay)];
  }

  protected getComponentStyles(): string {
    const showOtherMonths = this.showOtherMonths();

    return `
      :host {
        display: inline-block;
      }

      .calendar {
        background-color: var(--rell-surface-base);
        border: 2px solid var(--rell-border-default);
        border-radius: ${radius.md};
        padding: ${spacing[4]};
        font-family: var(--rell-font-sans);
        min-width: 300px;
      }

      .calendar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: ${spacing[4]};
      }

      .calendar-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--rell-text-primary);
      }

      .calendar-nav {
        display: flex;
        align-items: center;
        gap: ${spacing[2]};
      }

      .calendar-nav-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: none;
        background: transparent;
        color: var(--rell-text-secondary);
        cursor: pointer;
        border-radius: ${radius.sm};
        transition: all 0.2s ease;
      }

      .calendar-nav-button:hover {
        background-color: var(--rell-surface-hover);
        color: var(--rell-text-primary);
      }

      .calendar-weekdays {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: ${spacing[1]};
        margin-bottom: ${spacing[2]};
      }

      .calendar-weekday {
        text-align: center;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--rell-text-secondary);
        padding: ${spacing[2]};
      }

      .calendar-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: ${spacing[1]};
      }

      .calendar-day {
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        border-radius: ${radius.sm};
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--rell-text-primary);
        background-color: transparent;
        user-select: none;
        -webkit-user-select: none;
        position: relative;
        z-index: 1;
      }

      .calendar-day:hover:not(.disabled):not(.other-month) {
        background-color: var(--rell-surface-hover);
        border-color: var(--rell-border-hover);
      }

      .calendar-day.other-month {
        color: var(--rell-text-tertiary);
        opacity: ${showOtherMonths ? '0.3' : '0'};
        pointer-events: ${showOtherMonths ? 'auto' : 'none'};
      }

      .calendar-day.today {
        font-weight: 600;
        border-color: var(--rell-interactive-primary);
      }

      .calendar-day.selected {
        background-color: var(--rell-interactive-primary);
        color: var(--rell-text-inverse);
        border-color: var(--rell-interactive-primary);
        font-weight: 600;
      }

      .calendar-day.in-range {
        background-color: var(--rell-interactive-primary)20;
        color: var(--rell-interactive-primary);
      }

      .calendar-day.range-start,
      .calendar-day.range-end {
        background-color: var(--rell-interactive-primary);
        color: var(--rell-text-inverse);
        border-color: var(--rell-interactive-primary);
        font-weight: 600;
      }

      .calendar-day.disabled {
        opacity: 0.3;
        cursor: not-allowed;
        color: var(--rell-text-tertiary);
      }

      .calendar-day.disabled:hover {
        background-color: transparent;
        border-color: transparent;
      }
    `;
  }

  protected render(): void {
    const days = this.getCalendarDays();
    const weekdays = this.getWeekdayNames();
    const monthName = this.getMonthName(this.currentMonth);

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="calendar">
        <div class="calendar-header">
          <button class="calendar-nav-button" data-action="prev" type="button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <div class="calendar-title">${monthName} ${this.currentYear}</div>
          <button class="calendar-nav-button" data-action="next" type="button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        <div class="calendar-weekdays">
          ${weekdays.map(day => `<div class="calendar-weekday">${day}</div>`).join('')}
        </div>
        <div class="calendar-days">
          ${days.map(day => {
            const classes = [
              'calendar-day',
              !day.isCurrentMonth ? 'other-month' : '',
              day.isToday && this.showToday() ? 'today' : '',
              day.isSelected ? 'selected' : '',
              day.isInRange ? 'in-range' : '',
              day.isRangeStart ? 'range-start' : '',
              day.isRangeEnd ? 'range-end' : '',
              day.isDisabled ? 'disabled' : '',
            ].filter(Boolean).join(' ');
            return `<div class="${classes}" data-date="${day.date.toISOString()}" ${day.isDisabled ? '' : 'tabindex="0"'}">${day.date.getDate()}</div>`;
          }).join('')}
        </div>
      </div>
    `;

    this.setupEventListeners();
    this.initializeFromValue();
  }

  private initializeFromValue(): void {
    const value = this.getValue();
    if (!value) return;

    if (this.isRange()) {
      const parts = value.split(' - ');
      if (parts.length === 2) {
        const start = this.parseDate(parts[0].trim());
        const end = this.parseDate(parts[1].trim());
        if (start) this.rangeStart = start;
        if (end) this.rangeEnd = end;
      }
    } else {
      const dates = value.split(',').map(d => this.parseDate(d.trim())).filter(d => d !== null) as Date[];
      this.selectedDates = dates;
    }
  }

  private setupEventListeners(): void {
    const prevButton = this.shadow.querySelector('[data-action="prev"]');
    const nextButton = this.shadow.querySelector('[data-action="next"]');

    if (prevButton) {
      prevButton.addEventListener('click', () => this.navigateMonth(-1));
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => this.navigateMonth(1));
    }

    this.shadow.querySelectorAll('.calendar-day:not(.disabled)').forEach(day => {
      const handleClick = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        const dayElement = e.currentTarget as HTMLElement;
        if (dayElement) {
          const dateStr = dayElement.getAttribute('data-date');
          if (dateStr) {
            const date = new Date(dateStr);
            this.selectDate(date);
          }
        }
      };

      day.addEventListener('click', handleClick);
      
      day.addEventListener('keydown', (e) => {
        const keyEvent = e as KeyboardEvent;
        if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
          e.preventDefault();
          handleClick(e);
        }
      });
    });
  }

  protected onAttributeChange(name: string, oldValue: string, newValue: string): void {
    if (name === 'value') {
      this.initializeFromValue();
      this.render();
    } else if (name === 'min-date' || name === 'max-date' || name === 'disabled-dates' || 
               name === 'first-day-of-week' || name === 'show-today' || name === 'show-other-months') {
      this.render();
    }
  }
}

customElements.define('rell-calendar', RellCalendar);

