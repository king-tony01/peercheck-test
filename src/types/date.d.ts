interface DateFormater {
  date: string | Date;
  locale?: string;
  options?: {
    short?: boolean;
    asShortMonthDayYear?: boolean;
    withTime?: boolean;
    withSeconds?: boolean;
    withTimezone?: boolean;
  };
}
