import { formatInTimeZone } from "date-fns-tz";

export const dateFormat = (date: Date, format?: string, region?: string): string => {
  return formatInTimeZone(
    date,
    region ? region : "Europe/Moscow",
    format ? format : "dd MMM yyyy"
  );
};