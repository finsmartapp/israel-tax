import taxData from '../data/payroll.json';

export const currentYearIndex = taxData.length - 1;
export const currentYear = taxData[currentYearIndex].taxYear;
const todayDate = new Date();
const todayYear = todayDate.getFullYear();
export const newTaxYear = todayYear === currentYear ? todayYear + 1 : todayYear;
