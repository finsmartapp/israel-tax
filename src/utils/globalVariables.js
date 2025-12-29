import incomeTaxTables from '../data/income-tax.json';

export const currentYearIndex = incomeTaxTables.length - 1;
export const currentYear = incomeTaxTables[currentYearIndex].taxYear;
const todayDate = new Date();
const todayYear = todayDate.getFullYear();
export const nextTaxYear = todayYear === currentYear ? todayYear + 1 : todayYear;
