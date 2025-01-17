import { IonDatePickerCalendarComponentProps } from '../picker/core/calendar-model';
import { Day } from '../picker/core/day';

export const TOTAL_DAYS = {
  WITH_SIX_WEEKS: 42,
  WITH_FIVE_WEEKS: 35,
  WITH_FOUR_WEEKS: 28,
};
export const SUNDAY = 'domingo';
export const SATURDAY = 'sábado';
export const INITIAL_RANGE = 0;
export const FINAL_RANGE = 1;

export function isToday(
  date: Day,
  lang: IonDatePickerCalendarComponentProps['lang']
): boolean {
  const TODAY = new Day(new Date(), lang);
  return isSameDay(date, TODAY);
}

export function isSameDay(day: Day, dayToCompare?: Day): boolean {
  return (
    dayToCompare &&
    day.date === dayToCompare.date &&
    day.monthNumber === dayToCompare.monthNumber &&
    day.year === dayToCompare.year
  );
}

export function isSameDate(INITIAL_DATE: Date, FINAL_DATE: Date): boolean {
  return INITIAL_DATE.toString() !== FINAL_DATE.toString();
}

export function isNotRangeLimit(
  date: Day,
  dayName: string,
  randeDateSelected: Day
): boolean {
  return !(date.day === dayName && isSameDay(date, randeDateSelected));
}

export function getInitialDate(currentDate: string[]): Date {
  return currentDate && currentDate.length
    ? getFormattedDate(currentDate)
    : new Date();
}

export function getFormattedDate(
  dates: string[],
  isFinalOfRange?: boolean
): Date {
  return new Date(
    dates[isFinalOfRange ? FINAL_RANGE : INITIAL_RANGE].replace('-', ',')
  );
}
