const padStart = (string, length, pad) => {
  const s = String(string);
  if (!s || s.length >= length) return string;
  return `${Array((length + 1) - s.length).join(pad)}${string}`;
};

const time = date => (
  new Time(date)
);

class Time {
  constructor(date) {
    this.parse(date);
  }

  parse(date) {
    this.$d = Time.parseDate(date);
    this.init();
  }

  static parseDate(date) {
    if (date === null) {
      return new Date(NaN);
    }
    if (date === undefined) {
      return new Date();
    }
    if (date instanceof Date) {
      return date;
    }
    if (typeof date === 'string') {
      date.replace(/-/g, '/');
      return new Date(date);
    }
    return new Date(date);
  }

  init() {
    this.$y = this.$d.getFullYear();
    this.$M = this.$d.getMonth();
    this.$D = this.$d.getDate();
    this.$W = this.$d.getDay();
    this.$H = this.$d.getHours();
    this.$m = this.$d.getMinutes();
    this.$s = this.$d.getSeconds();
    this.$ms = this.$d.getMilliseconds();
  }

  isValid() {
    return !(this.$d.toString() === 'Invalid Date');
  }

  $compare(that) {
    return this.valueOf() - time(that).valueOf();
  }

  isSame(that) {
    return this.$compare(that) === 0;
  }

  isBefore(that) {
    return this.$compare(that) < 0;
  }

  isAfter(that) {
    return this.$compare(that) > 0;
  }

  year() {
    return this.$y;
  }

  month() {
    return this.$M;
  }

  day() {
    return this.$W;
  }

  date() {
    return this.$D;
  }

  hour() {
    return this.$H;
  }

  minute() {
    return this.$m;
  }

  second() {
    return this.$s;
  }

  millisecond() {
    return this.$ms;
  }

  valueOf() {
    return this.$d.getTime();
  }

  format(str = 'YYYY-MM-DD HH:mm:ss') {
    return str.replace(/\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, (match) => {
      switch (match) {
        case 'YY':
          return String(this.$y).slice(-2);
        case 'YYYY':
          return String(this.$y);
        case 'M':
          return String(this.$M + 1);
        case 'MM':
          return padStart(this.$M + 1, 2, '0');
        case 'D':
          return String(this.$D);
        case 'DD':
          return padStart(this.$D, 2, '0');
        case 'H':
          return String(this.$H);
        case 'HH':
          return padStart(this.$H, 2, '0');
        case 'h':
        case 'hh':
          if (this.$H === 0) return 12;
          return padStart(this.$H < 13 ? this.$H : this.$H - 12, match === 'hh' ? 2 : 1, '0');
        case 'a':
          return this.$H < 12 ? 'am' : 'pm';
        case 'A':
          return this.$H < 12 ? 'AM' : 'PM';
        case 'm':
          return String(this.$m);
        case 'mm':
          return padStart(this.$m, 2, '0');
        case 's':
          return String(this.$s);
        case 'ss':
          return padStart(this.$s, 2, '0');
        case 'SSS':
          return padStart(this.$ms, 3, '0');
        default:
          return null;
      }
    });
  }
}

export default time;
