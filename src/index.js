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
      let newDate = date;
      if (newDate.indexOf('-') > -1 && newDate.indexOf('-') < 10) { // 把1999-1-1 转换成1999/1/1
        newDate = date.replace(/-/, '/').replace(/-/, '/'); // 替换两次，防止'1999-1-1 12:00:00-0100'
      }
      newDate = newDate.replace(/T/, ' ');
      let millisecond = 0;
      newDate = newDate.replace(/\.(\d+)/, (str, s) => { // 获取毫秒 1999-1-1 12:00:00.123
        millisecond = s;
        return '';
      });
      let deviation = 0; // 偏移时间（分钟）
      const timeZone = new Date().getTimezoneOffset(); // 时区（分钟）
      if (newDate.indexOf('+') > -1 || newDate.indexOf('-') > -1) { // 2019-1-1 12:00:08+0800  -0800 情况
        let ZZZ = '';
        let hour = 0;
        let min = 0;
        let positive = true;
        if (newDate.indexOf('-') > -1) {
          positive = false;
        }
        ZZZ = newDate.split(positive ? '+' : '-')[1];
        newDate = newDate.split(positive ? '+' : '-')[0];
        if (ZZZ.indexOf(':') > -1) { // 2019-1-1 12:00:08+08:00 情况
          hour = ZZZ.split(':')[0];
          min = ZZZ.split(':')[1];
        } else {
          hour = ZZZ.slice(0, 2);
          min = ZZZ.slice(2, 4);
        }
        deviation = hour * 60 + Number(min);
        if (positive) {
          deviation = -deviation;
        }
        deviation = (deviation - timeZone) * 60 * 1000;
      }
      if (newDate.indexOf('Z') > -1) {
        newDate = newDate.split('Z')[0];
        deviation = (deviation - timeZone) * 60 * 1000;
      }
      return new Date(Date.parse(newDate) + parseInt(millisecond, 10) + deviation);
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

  unix() {
    return Math.floor(this.valueOf() / 1000);
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
      }
    });
  }

  toDate() {
    return new Date(this.$d);
  }

  toObject() {
    return {
      years: this.$y,
      months: this.$M,
      date: this.$D,
      hours: this.$H,
      minutes: this.$m,
      seconds: this.$s,
      milliseconds: this.$ms,
    };
  }

  ago(that) {
    const sec = parseInt(this.$compare(that) / 1000, 10);
    if (sec < 0) {
      return null;
    } else if (sec < 10) {
      return '刚刚';
    } else if (sec < 60) {
      return `${sec}秒前`;
    } else if (sec < 3600) {
      return `${parseInt(sec / 60, 10)}分钟前`;
    } else if (sec < 86400) {
      return `${parseInt(sec / 3600, 10)}小时前`;
    } else if (sec < 2592000) {
      return `${parseInt(sec / 86400, 10)}天前`;
    } else if (sec < 31536000) {
      return `${parseInt(sec / 2592000, 10)}个月前`;
    } else {
      return `${parseInt(sec / 31536000, 10)}年前`;
    }
  }

  dayNum(that) {
    const sec = parseInt(this.$compare(that) / 1000, 10);
    return parseInt(sec / 86400, 10);
  }

  monthDays() {
    const lastDay = new Date(this.$y, this.$M + 1, 0);
    return lastDay.getDate();
  }
}

// export default time;
module.exports = time;
