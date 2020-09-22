import { array, oneOfType, number, string, bool } from 'prop-types';

export const netPayType = {
	taxData: array.isRequired,
	taxYearIndex: oneOfType([string, number]).isRequired,
	baseIncome: oneOfType([string, number]).isRequired,
	creditPoints: oneOfType([string, number]).isRequired,
	pensionOption: string.isRequired,
	pensionType: string.isRequired,
	pensionAmount: oneOfType([string, number]).isRequired,
	educationFund: oneOfType([string, number]).isRequired,
	travelAllowance: oneOfType([string, number]).isRequired,
	lunchAllowance: oneOfType([string, number]).isRequired,
	annualBonus: oneOfType([string, number]).isRequired,
	commission: oneOfType([string, number]).isRequired,
	overtime: oneOfType([string, number]).isRequired,
	validated: bool.isRequired,
	showResultsTable: bool.isRequired
};
