import { BaseComponent } from '../../utils/base-component';
import { spacing, radius } from '../../tokens';

export class RellDateRangePicker extends BaseComponent {
  static get observedAttributes() {
    return [
      'value', 'format', 'placeholder', 'disabled', 'error', 'error-message',
      'min-date', 'max-date', 'disabled-dates', 'first-day-of-week', 'name',
      'separator'
    ];
  }

  private fromInputElement?: HTMLInputElement;
  private toInputElement?: HTMLInputElement;
  private isOpen: boolean = false;
  private currentMonth: number = new Date().getMonth();
  private currentYear: number = new Date().getFullYear();
  private selectedFromDate: Date | null = null;
  private selectedToDate: Date | null = null;
  private selectingFrom: boolean = true;

  private getValue(): string {
    return this.getAttribute('value') || '';
  }

  private getFormat(): string {
    return this.getAttribute('format') || 'YYYY-MM-DD';
  }

  private getPlaceholder(): string {
    return this.getAttribute('placeholder') || 'Select date range...';
  }

  private getSeparator(): string {
    return this.getAttribute('separator') || ' - ';
  }

  private isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }

  private hasError(): boolean {
    return this.hasAttribute('error');
  }

  private getErrorMessage(): string {
    return this.getAttribute('error-message') || '';
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
    return day ? parseInt(day) : 0;
  }

  private getName(): string {
    return this.getAttribute('name') || '';
  }

  private formatDate(date: Date, format: string): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return format
      .replace('DD', day)
      .replace('MM', month)
      .replace('YYYY', String(year))
      .replace('YY', String(year).slice(-2));
  }

  private parseDate(dateString: string): Date | null {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }

  private parseValue(): void {
    const value = this.getValue();
    if (!value) {
      this.selectedFromDate = null;
      this.selectedToDate = null;
      return;
    }

    const separator = this.getSeparator();
    const parts = value.split(separator);
    
    if (parts.length === 2) {
      const from = this.parseDate(parts[0].trim());
      const to = this.parseDate(parts[1].trim());
      
      if (from) {
        this.selectedFromDate = from;
        this.currentMonth = from.getMonth();
        this.currentYear = from.getFullYear();
      }
      if (to) {
        this.selectedToDate = to;
      }
    }
  }

  private isDateDisabled(date: Date): boolean {
    const minDate = this.getMinDate();
    const maxDate = this.getMaxDate();
    const disabledDates = this.getDisabledDates();

    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;

    return disabledDates.some(disabled => 
      date.getDate() === disabled.getDate() &&
      date.getMonth() === disabled.getMonth() &&
      date.getFullYear() === disabled.getFullYear()
    );
  }

  private isDateInRange(date: Date): boolean {
    if (!this.selectedFromDate || !this.selectedToDate) return false;
    
    const dateTime = date.getTime();
    const fromTime = this.selectedFromDate.getTime();
    const toTime = this.selectedToDate.getTime();
    
    return dateTime >= fromTime && dateTime <= toTime;
  }

  private getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  private getFirstDayOfMonth(month: number, year: number): number {
    return new Date(year, month, 1).getDay();
  }

  private getCalendarDays(): Array<{ date: Date; isCurrentMonth: boolean; isToday: boolean; isFrom: boolean; isTo: boolean; isInRange: boolean; isDisabled: boolean }> {
    const days: Array<{ date: Date; isCurrentMonth: boolean; isToday: boolean; isFrom: boolean; isTo: boolean; isInRange: boolean; isDisabled: boolean }> = [];
    const firstDay = this.getFirstDayOfMonth(this.currentMonth, this.currentYear);
    const daysInMonth = this.getDaysInMonth(this.currentMonth, this.currentYear);
    const firstDayOfWeek = this.getFirstDayOfWeek();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.selectedFromDate) this.selectedFromDate.setHours(0, 0, 0, 0);
    if (this.selectedToDate) this.selectedToDate.setHours(0, 0, 0, 0);

    let startDay = firstDay - firstDayOfWeek;
    if (startDay < 0) startDay += 7;

    const prevMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    const prevYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
    const daysInPrevMonth = this.getDaysInMonth(prevMonth, prevYear);

    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(prevYear, prevMonth, daysInPrevMonth - i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: date.getTime() === today.getTime(),
        isFrom: this.selectedFromDate ? date.getTime() === this.selectedFromDate.getTime() : false,
        isTo: this.selectedToDate ? date.getTime() === this.selectedToDate.getTime() : false,
        isInRange: this.isDateInRange(date),
        isDisabled: this.isDateDisabled(date),
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.getTime() === today.getTime(),
        isFrom: this.selectedFromDate ? date.getTime() === this.selectedFromDate.getTime() : false,
        isTo: this.selectedToDate ? date.getTime() === this.selectedToDate.getTime() : false,
        isInRange: this.isDateInRange(date),
        isDisabled: this.isDateDisabled(date),
      });
    }

    const nextMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
    const nextYear = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
    const remainingDays = 42 - days.length;

    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(nextYear, nextMonth, day);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: date.getTime() === today.getTime(),
        isFrom: this.selectedFromDate ? date.getTime() === this.selectedFromDate.getTime() : false,
        isTo: this.selectedToDate ? date.getTime() === this.selectedToDate.getTime() : false,
        isInRange: this.isDateInRange(date),
        isDisabled: this.isDateDisabled(date),
      });
    }

    return days;
  }

  private selectDate(date: Date): void {
    if (this.isDateDisabled(date)) return;

    if (this.selectingFrom || !this.selectedFromDate) {
      this.selectedFromDate = date;
      this.selectedToDate = null;
      this.selectingFrom = false;
    } else {
      if (date < this.selectedFromDate) {
        this.selectedToDate = this.selectedFromDate;
        this.selectedFromDate = date;
      } else {
        this.selectedToDate = date;
      }
      this.isOpen = false;
    }

    this.updateValue();
    this.render();
  }

  private updateValue(): void {
    if (this.selectedFromDate && this.selectedToDate) {
      const format = this.getFormat();
      const separator = this.getSeparator();
      const fromStr = this.formatDate(this.selectedFromDate, format);
      const toStr = this.formatDate(this.selectedToDate, format);
      const value = `${fromStr}${separator}${toStr}`;
      
      this.setAttribute('value', value);
      
      this.dispatchEvent(new CustomEvent('change', {
        detail: { 
          value,
          from: fromStr,
          to: toStr,
          fromDate: this.selectedFromDate,
          toDate: this.selectedToDate,
        },
        bubbles: true,
        composed: true,
      }));
    } else if (this.selectedFromDate) {
      const format = this.getFormat();
      const fromStr = this.formatDate(this.selectedFromDate, format);
      this.setAttribute('value', fromStr);
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

  public setError(message?: string): void {
    this.setAttribute('error', '');
    if (message) {
      this.setAttribute('error-message', message);
    }
    this.render();
  }

  public clearError(): void {
    this.removeAttribute('error');
    this.removeAttribute('error-message');
    this.render();
  }

  protected getComponentStyles(): string {
    const error = this.hasError();
    const borderColor = error ? 'var(--rell-border-error)' : 'var(--rell-border-default)';
    const borderColorFocus = error ? 'var(--rell-border-error)' : 'var(--rell-border-focus)';

    return `
      :host {
        display: block;
        width: 100%;
        position: relative;
      }

      .date-range-picker-wrapper {
        position: relative;
        width: 100%;
      }

      .date-range-input {
        width: 100%;
        padding: ${spacing[3]} ${spacing[4]};
        padding-right: 2.5rem;
        font-size: 1rem;
        min-height: 40px;
        font-family: var(--rell-font-sans);
        color: var(--rell-text-primary);
        background-color: var(--rell-surface-base);
        border: 2px solid ${borderColor};
        border-radius: ${radius.md};
        outline: none;
        transition: all 0.2s ease;
        box-sizing: border-box;
        cursor: pointer;
      }

      .date-range-input:hover:not(:disabled) {
        border-color: var(--rell-border-hover);
      }

      .date-range-input:focus {
        border-color: ${borderColorFocus};
        box-shadow: 0 0 0 3px ${borderColorFocus}40, 0 0 12px ${borderColorFocus}20;
      }

      .date-range-input:disabled {
        cursor: not-allowed;
        background-color: var(--rell-surface-disabled);
        opacity: 0.5;
      }

      .date-icon {
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        pointer-events: none;
        color: var(--rell-interactive-primary);
      }

      .calendar-dropdown {
        position: absolute;
        top: calc(100% + ${spacing[1]});
        left: 0;
        z-index: 1000;
        background-color: var(--rell-surface-base);
        border: 2px solid ${borderColorFocus};
        border-radius: ${radius.md};
        box-shadow: var(--rell-shadow-lg);
        padding: ${spacing[4]};
        min-width: 280px;
        display: ${this.isOpen ? 'block' : 'none'};
      }

      .calendar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: ${spacing[4]};
      }

      .calendar-nav-button {
        background: none;
        border: none;
        color: var(--rell-text-primary);
        cursor: pointer;
        padding: ${spacing[2]};
        border-radius: ${radius.sm};
        transition: background-color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
      }

      .calendar-nav-button:hover {
        background-color: var(--rell-surface-hover);
      }

      .calendar-month-year {
        font-weight: 600;
        font-size: 1rem;
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
        font-size: 0.875rem;
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
        border: none;
        background: none;
        color: var(--rell-text-primary);
        cursor: pointer;
        border-radius: ${radius.sm};
        transition: all 0.2s;
        font-size: 0.875rem;
        position: relative;
      }

      .calendar-day:hover:not(.disabled):not(.selected):not(.in-range):not(.from):not(.to) {
        background-color: var(--rell-surface-hover);
        opacity: 0.5;
      }
      
      .calendar-day.in-range:hover:not(.disabled) {
        background-color: var(--rell-interactive-primary);
        opacity: 0.3;
      }

      .calendar-day.other-month {
        color: var(--rell-text-tertiary);
      }

      .calendar-day.today {
        font-weight: 600;
        border: 2px solid var(--rell-interactive-primary);
      }

      .calendar-day.from {
        background-color: var(--rell-interactive-primary);
        color: var(--rell-text-inverse);
        font-weight: 600;
        border-radius: ${radius.sm} 0 0 ${radius.sm};
      }

      .calendar-day.to {
        background-color: var(--rell-interactive-primary);
        color: var(--rell-text-inverse);
        font-weight: 600;
        border-radius: 0 ${radius.sm} ${radius.sm} 0;
      }

      .calendar-day.in-range {
        background-color: var(--rell-interactive-primary);
        opacity: 0.2;
        border-radius: 0;
        color: var(--rell-text-inverse);
        font-weight: 500;
      }

      .calendar-day.in-range.from {
        border-radius: ${radius.sm} 0 0 ${radius.sm};
      }

      .calendar-day.in-range.to {
        border-radius: 0 ${radius.sm} ${radius.sm} 0;
      }

      .calendar-day.disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      .range-hint {
        margin-top: ${spacing[3]};
        padding: ${spacing[2]};
        background-color: var(--rell-surface-hover);
        border-radius: ${radius.sm};
        font-size: 0.875rem;
        color: var(--rell-text-secondary);
        text-align: center;
      }

      .error-message {
        margin-top: ${spacing[2]};
        font-size: 0.875rem;
        color: var(--rell-status-error);
        display: ${this.hasError() ? 'block' : 'none'};
      }
    `;
  }

  protected render(): void {
    this.parseValue();
    
    const value = this.getValue();
    const placeholder = this.getPlaceholder();
    const disabled = this.isDisabled();
    const errorMessage = this.getErrorMessage();
    const format = this.getFormat();
    const name = this.getName();

    const days = this.getCalendarDays();
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const firstDayOfWeek = this.getFirstDayOfWeek();
    const orderedWeekdays = [...weekdays.slice(firstDayOfWeek), ...weekdays.slice(0, firstDayOfWeek)];

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const monthYear = `${monthNames[this.currentMonth]} ${this.currentYear}`;

    const displayValue = value || placeholder;
    const hint = this.selectingFrom 
      ? 'Select start date' 
      : this.selectedFromDate && !this.selectedToDate 
        ? 'Select end date' 
        : '';

    this.shadow.innerHTML = `
      ${this.createStyles()}
      <div class="date-range-picker-wrapper">
        <input 
          type="text"
          class="date-range-input"
          placeholder="${placeholder}"
          value="${displayValue}"
          ${disabled ? 'disabled' : ''}
          ${name ? `name="${name}"` : ''}
          readonly
        />
        <svg class="date-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <div class="calendar-dropdown">
          <div class="calendar-header">
            <button class="calendar-nav-button" data-action="prev">‹</button>
            <div class="calendar-month-year">${monthYear}</div>
            <button class="calendar-nav-button" data-action="next">›</button>
          </div>
          <div class="calendar-weekdays">
            ${orderedWeekdays.map(day => `<div class="calendar-weekday">${day}</div>`).join('')}
          </div>
          <div class="calendar-days">
            ${days.map(day => {
              let classes = 'calendar-day';
              if (!day.isCurrentMonth) classes += ' other-month';
              if (day.isToday) classes += ' today';
              if (day.isFrom) classes += ' from';
              if (day.isTo) classes += ' to';
              if (day.isInRange && !day.isFrom && !day.isTo) classes += ' in-range';
              if (day.isDisabled) classes += ' disabled';
              
              return `
                <button 
                  class="${classes}"
                  data-date="${day.date.toISOString()}"
                  ${day.isDisabled ? 'disabled' : ''}
                >
                  ${day.date.getDate()}
                </button>
              `;
            }).join('')}
          </div>
          ${hint ? `<div class="range-hint">${hint}</div>` : ''}
        </div>
        ${errorMessage ? `<span class="error-message">${errorMessage}</span>` : ''}
      </div>
    `;

    this.fromInputElement = this.shadow.querySelector('.date-range-input') as HTMLInputElement;
    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const input = this.shadow.querySelector('.date-range-input');
    const dropdown = this.shadow.querySelector('.calendar-dropdown');
    const prevButton = this.shadow.querySelector('[data-action="prev"]');
    const nextButton = this.shadow.querySelector('[data-action="next"]');
    const dayButtons = this.shadow.querySelectorAll('.calendar-day:not(.disabled)');

    if (input && !this.isDisabled()) {
      input.addEventListener('click', (e) => {
        e.stopPropagation();
        this.isOpen = !this.isOpen;
        this.render();
      });

      input.addEventListener('focus', () => {
        this.isOpen = true;
        this.render();
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.navigateMonth(-1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.navigateMonth(1);
      });
    }

    dayButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const dateStr = button.getAttribute('data-date');
        if (dateStr) {
          this.selectDate(new Date(dateStr));
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!this.shadow.contains(e.target as Node)) {
        this.isOpen = false;
        this.render();
      }
    });
  }

  protected onAttributeChange(name: string): void {
    if (name === 'value') {
      this.parseValue();
    }
    this.render();
  }
}

customElements.define('rell-date-range-picker', RellDateRangePicker);

