const expect = require('chai').expect;
const moment = require('moment');
const time = require('../src/index');

describe('time', function () {

	it('isValid', function () {
		expect(time('2018-1-1').isValid()).to.be.equal(true);
		expect(time('2018-10-18T13:47:30.449+0000').isValid()).to.be.equal(true);
	});
	
	it('测试 year', function () {
		expect(time(new Date(2018,10,10)).year()).to.be.equal(2018);
		expect(time('2018-10-10').year()).to.be.equal(2018);
		expect(time(1532329201000).year()).to.be.equal(2018);
		expect(time().year()).to.be.equal(new Date().getFullYear());
		expect(isNaN(time(null).year())).to.be.equal(true);
	});

	it('测试 month', function () {
		expect(time(new Date(2018,10,10)).month()).to.be.equal(10);
		expect(time('2018-10-10').month()).to.be.equal(9);
		expect(time(1532329201000).month()).to.be.equal(6);
		expect(time().month()).to.be.equal(new Date().getMonth());
		expect(isNaN(time(null).month())).to.be.equal(true);
	});

	it('测试 day', function () {
		expect(time(new Date(2018,10,10)).day()).to.be.equal(6);
		expect(time('2018-10-10').day()).to.be.equal(3);
		expect(time(1532329201000).day()).to.be.equal(1);
		expect(time().day()).to.be.equal(new Date().getDay());
		expect(isNaN(time(null).day())).to.be.equal(true);
	});

	it('测试 date', function () {
		expect(time(new Date(2018,10,10)).date()).to.be.equal(10);
		expect(time('2018-10-10').date()).to.be.equal(10);
		expect(time(1532329201000).date()).to.be.equal(23);
		expect(time().date()).to.be.equal(new Date().getDate());
		expect(isNaN(time(null).date())).to.be.equal(true);
	});

	it('测试 hour', function () {
		expect(time('2018-10-10 14:23:23').hour()).to.be.equal(14);
		expect(time(1532329201000).hour()).to.be.equal(15);
		expect(time().hour()).to.be.equal(new Date().getHours());
		expect(isNaN(time(null).hour())).to.be.equal(true);
	});

	it('测试 minute', function () {
		expect(time('2018-10-10 14:23:23').minute()).to.be.equal(23);
		expect(time(1532329201000).minute()).to.be.equal(0);
		expect(time().minute()).to.be.equal(new Date().getMinutes());
		expect(isNaN(time(null).minute())).to.be.equal(true);
	});

	it('测试 second', function () {
		expect(time('2018-10-10 14:23:23:222').second()).to.be.equal(23);
		expect(time(1532329201000).second()).to.be.equal(1);
		expect(time().second()).to.be.equal(new Date().getSeconds());
		expect(isNaN(time(null).second())).to.be.equal(true);
	});

	it('测试 millisecond', function () {
		expect(time('2018-10-10 14:23:23:222').millisecond()).to.be.equal(222);
		expect(time(1532329201000).millisecond()).to.be.equal(0);
		// expect(time().millisecond()).to.be.equal(new Date().getMilliseconds());
		expect(isNaN(time(null).millisecond())).to.be.equal(true);
	});

	it('测试 unix', function () {
		expect(time('2018-10-10 14:23:23').unix()).to.be.equal(1539152603);
		expect(time(1532329201000).unix()).to.be.equal(1532329201);
		expect(time().unix()).to.be.equal(moment().unix());
	});

	it('测试 valueOf', function () {
		expect(time('2018-10-10 14:23:23').valueOf()).to.be.equal(1539152603000);
		expect(time(1532329201000).valueOf()).to.be.equal(1532329201000);
		expect(time().valueOf()).to.be.equal(new Date().getTime());
	});

	it('测试 isSame', function () {
		expect(time('2018-1-1').isSame('2018-1-1')).to.be.equal(true);
		expect(time('2018-1-12').isSame('2018-1-1')).to.be.equal(false);
	});

	it('测试 isBefore', function () {
		expect(time('2018-1-1').isBefore('2018-1-10')).to.be.equal(true);
		expect(time('2018-1-1').isBefore('2017-1-10')).to.be.equal(false);
	});

	it('测试 isAfter', function () {
		expect(time('2018-1-10').isAfter('2018-1-5')).to.be.equal(true);
		expect(time('2018-1-1').isAfter('2018-1-10')).to.be.equal(false);
	});

	it('测试 format', function () {
		expect(time().format('YY')).to.be.equal(moment().format('YY'));
		expect(time().format('YYYY')).to.be.equal(moment().format('YYYY'));
		expect(time().format('YYYY-M')).to.be.equal(moment().format('YYYY-M'));
		expect(time().format('YYYY-MM')).to.be.equal(moment().format('YYYY-MM'));
		expect(time().format('YYYY-MM-D')).to.be.equal(moment().format('YYYY-MM-D'));
		expect(time().format('YYYY-MM-DD')).to.be.equal(moment().format('YYYY-MM-DD'));
		expect(time().format('YYYY-MM-DD H')).to.be.equal(moment().format('YYYY-MM-DD H'));
		expect(time().format('YYYY-MM-DD HH')).to.be.equal(moment().format('YYYY-MM-DD HH'));
		expect(time().format('YYYY-MM-DD h')).to.be.equal(moment().format('YYYY-MM-DD h'));
		expect(time().format('YYYY-MM-DD hh')).to.be.equal(moment().format('YYYY-MM-DD hh'));
		expect(time().format('YYYY-MM-DD HH a')).to.be.equal(moment().format('YYYY-MM-DD HH a'));
		expect(time().format('YYYY-MM-DD HH A')).to.be.equal(moment().format('YYYY-MM-DD HH A'));
		expect(time().format('YYYY-MM-DD HH')).to.be.equal(moment().format('YYYY-MM-DD HH'));
		expect(time().format('YYYY-MM-DD HH:m')).to.be.equal(moment().format('YYYY-MM-DD HH:m'));
		expect(time().format('YYYY-MM-DD HH:mm')).to.be.equal(moment().format('YYYY-MM-DD HH:mm'));
		expect(time().format('YYYY-MM-DD HH:mm:s')).to.be.equal(moment().format('YYYY-MM-DD HH:mm:s'));
		expect(time().format('YYYY-MM-DD HH:mm:ss')).to.be.equal(moment().format('YYYY-MM-DD HH:mm:ss'));
		expect(time().format('YYYY-MM-DD HH:mm:ss:SSS')).to.be.equal(moment().format('YYYY-MM-DD HH:mm:ss:SSS'));
		expect(time('2018-1-1 0:0').format('hh')).to.be.equal('12');
		expect(time('2018-1-1 18:0').format('hh')).to.be.equal('06');
		expect(time('2018-1-1 8:0').format('hh')).to.be.equal('08');
		expect(time('2018-1-1 18:0').format('a')).to.be.equal('pm');
		expect(time('2018-1-1 18:0').format('A')).to.be.equal('PM');
		expect(time('2018-1-1 6:0').format('a')).to.be.equal('am');
		expect(time('2018-1-1 6:0').format('A')).to.be.equal('AM');
		expect(time('2018-1-1 0:0:0+0800').format('YYYY-MM-DD HH:mm:ss')).to.be.equal(moment('2018-1-1 0:0:0+0800').format('YYYY-MM-DD HH:mm:ss'));
		expect(time('2018-1-1 0:0:0-0800').format('YYYY-MM-DD HH:mm:ss')).to.be.equal(moment('2018-1-1 0:0:0-0800').format('YYYY-MM-DD HH:mm:ss'));
		expect(time('2018-1-1 0:0:0+08:00').format('YYYY-MM-DD HH:mm:ss')).to.be.equal(moment('2018-1-1 0:0:0+08:00').format('YYYY-MM-DD HH:mm:ss'));
		expect(time('2018-1-1 0:0:0Z').format('YYYY-MM-DD HH:mm:ss')).to.be.equal(moment('2018-1-1 0:0:0Z').format('YYYY-MM-DD HH:mm:ss'));
	});

	it('测试 toObject', function () {
		expect(JSON.stringify(time('2018-1-10 14:12:45').toObject())).to.be.equal('{"years":2018,"months":0,"date":10,"hours":14,"minutes":12,"seconds":45,"milliseconds":0}');
	});

	it('测试 ago', function () {
		expect(JSON.stringify(time('2018-1-10 1:0:0').ago('2018-1-10 2:0:0'))).to.be.equal('null');
		expect(JSON.stringify(time('2018-1-10 1:0:0').ago('2018-1-10 1:0:0'))).to.be.equal('"刚刚"');
		expect(JSON.stringify(time('2018-1-10 1:0:0').ago('2018-1-10 0:59:40'))).to.be.equal('"20秒前"');
		expect(JSON.stringify(time('2018-1-10 1:0:0').ago('2018-1-10 0:57:59'))).to.be.equal('"2分钟前"');
		expect(JSON.stringify(time('2018-1-10 5:0:0').ago('2018-1-10 3:57:59'))).to.be.equal('"1小时前"');
		expect(JSON.stringify(time('2018-1-10 5:0:0').ago('2018-1-9 3:57:59'))).to.be.equal('"1天前"');
		expect(JSON.stringify(time('2018-3-10 5:0:0').ago('2018-1-11 3:57:59'))).to.be.equal('"1个月前"');
		expect(JSON.stringify(time('2018-3-10 5:0:0').ago('2017-1-11 3:57:59'))).to.be.equal('"1年前"');
	});

	it('测试 dayNum', function () {
		expect(time('2018-3-10 5:0:0').dayNum('2018-3-9')).to.be.equal(1);
		expect(time('2018-3-10 5:0:0').dayNum('2018-3-10 4:0:0')).to.be.equal(0);
		expect(time('2018-3-10 5:0:0').dayNum('2018-3-12')).to.be.equal(-1);
	})

	it('测试 monthDays', function () {
		expect(time('2018-8').monthDays()).to.be.equal(31);
		expect(time('2018').monthDays()).to.be.equal(31);
		expect(time('2018-2').monthDays()).to.be.equal(28);
	})

	it('测试 toDate', function () {
		expect((time().toDate().valueOf() / 1000).toFixed(0)).to.be.equal((new Date().valueOf() / 1000).toFixed(0));
	});
});