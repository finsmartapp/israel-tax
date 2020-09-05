import { array, oneOfType, number, string, bool } from 'prop-types';

export const netPayType = {
	taxData: array.isRequired,
	taxYearIndex: number.isRequired,
	baseIncome: oneOfType([string, number]).isRequired,
	creditPoints: oneOfType([string, number]).isRequired,
	pensionOption: string.isRequired,
	pensionPercent: oneOfType([string, number]).isRequired,
	educationFund: oneOfType([string, number]).isRequired,
	travelAllowance: oneOfType([string, number]).isRequired,
	lunchAllowance: oneOfType([string, number]).isRequired,
	annualBonus: oneOfType([string, number]).isRequired,
	commission: oneOfType([string, number]).isRequired,
	overtime: oneOfType([string, number]).isRequired,
	validated: bool.isRequired,
	showResultsTable: bool.isRequired
};
