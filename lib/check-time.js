const dayjs = require('dayjs');

function checkValidDay(blackWeekdays) {
  if (!Array.isArray(blackWeekdays)) {
    return true;
  }

  const days = [0, 1, 2, 3, 4, 5, 6, 7];
  const isValidDays = blackWeekdays.every((x) => days.includes(x));
  if (!isValidDays) {
    return true;
  }
  const finalBlackWeekdays = blackWeekdays.map((x) => (x === 7 ? 0 : x));
  const date = new Date();
  return !finalBlackWeekdays.includes(date.getDay());
}

function timeChecker(date) {
  const d = dayjs(date);
  const format = d.format('YYYY-MM-DD');
  return {
    after: (target) => {
      return d.isAfter(dayjs(`${format} ${target}`));
    },
    before: (target) => {
      return d.isBefore(dayjs(`${format} ${target}`));
    },
  };
}

function checkValidTime(checkTime) {
  if (typeof checkTime !== 'function') {
    return true;
  }
  const checker = timeChecker(new Date());
  return checkTime(checker, dayjs);
}

function checkTime({ checkTime, blackWeekdays }) {
  return checkValidDay(blackWeekdays) && checkValidTime(checkTime);
}

module.exports = {
  checkTime,
  timeChecker,
  checkValidDay,
};
