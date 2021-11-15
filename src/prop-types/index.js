import {
	func,
	string,
	oneOf,
	array,
	oneOfType,
	number,
	bool,
	object,
	shape,
	any
} from 'prop-types';

export const globalProps = {
	shape,
	handleSubmit: func.isRequired,
	handleChange: func.isRequired,
	handleClick: func.isRequired,
	stateData: object.isRequired,
	employmentType: oneOf(['employee', 'selfEmployed']).isRequired,
	language: string.isRequired,
	display: bool.isRequired,
	validated: bool.isRequired,
	children: oneOfType([array, object]).isRequired
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
	foodAllowance: oneOfType([string, number]).isRequired,
	otherAllowance: oneOfType([string, number]).isRequired,
	annualBonus: oneOfType([string, number]).isRequired,
	commission: oneOfType([string, number]).isRequired,
	overtime: oneOfType([string, number]).isRequired,
	resultsTable: object.isRequired,
	showResultsTable: bool.isRequired
};

export const panelProps = {
	type: string.isRequired,
	title: string.isRequired,
	text: string.isRequired
};

export const formProps = {
	formSize: array.isRequired,
	label: string.isRequired,
	name: string.isRequired,
	value: oneOfType([string, number]).isRequired,
	symbol: string,
	min: number,
	max: number,
	step: number,
	horizontal: bool,
	columns: array.isRequired,
	required: bool.isRequired,
	error: string.isRequired,
	help: string,
	helpInput: string,
	helpCondition: bool,
	inline: bool,
	btnValue: array.isRequired,
	btnLabel: array.isRequired,
	disabled: array,
	state: any.isRequired,
	dataSource: array.isRequired,
	dataKey: string.isRequired,
	controlled: bool,
	type: string
};
