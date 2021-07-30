export function workingDaysCalc(year) {
	const startJan = new Date(year, 0, 1);
	const endDec = new Date(year, 11, 31);
	const daysInYear = new Date(year, 2, 0).getDate() === 29 ? 366 : 365;
	const publicHolidays = 9;
	let weekendDays = 0;

	for (let i = startJan; i <= endDec; i.setDate(i.getDate() + 1)) {
		if (i.getDay() === 5 || i.getDay() === 6) {
			weekendDays++;
		}
	}

	return daysInYear - (weekendDays + publicHolidays);
}
