import { func, string, oneOf, array, oneOfType, number, bool, object } from 'prop-types';

export const globalProps = {
	handleSubmit: func.isRequired,
	handleChange: func.isRequired,
	handleClick: func.isRequired,
	employmentType: oneOf(['employee', 'selfEmployed']).isRequired,
	language: string.isRequired,
	display: bool.isRequired
};

export const panelProps = {
	type: string.isRequired,
	title: string.isRequired,
	text: string.isRequired
};

export const payrollProps = {
	taxData: array.isRequired,
	taxYearIndex: oneOfType([string, number]).isRequired,
	baseIncome: oneOfType([string, number]).isRequired,
	creditPoints: oneOfType([string, number]).isRequired,
	pensionOption: string.isRequired,
	pensionType: string.isRequired,
	pensionAmount: oneOfType([string, number]).isRequired,
	studyFundType: string.isRequired,
	studyFundAmount: oneOfType([string, number]).isRequired,
	travelAllowance: oneOfType([string, number]).isRequired,
	lunchAllowance: oneOfType([string, number]).isRequired,
	otherAllowance: oneOfType([string, number]).isRequired,
	annualBonus: oneOfType([string, number]).isRequired,
	commission: oneOfType([string, number]).isRequired,
	overtime: oneOfType([string, number]).isRequired,
	validated: bool.isRequired,
	resultsTable: object.isRequired,
	showResultsTable: bool.isRequired
};
