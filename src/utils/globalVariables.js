import taxData from '../data/payroll.json';

export const currentYearIndex = taxData.length - 1;
export const currentYear = taxData[currentYearIndex].taxYear;
