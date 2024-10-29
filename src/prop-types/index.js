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
	employmentTypeOptional: oneOf(['employee', 'selfEmployed']),
	language: string.isRequired,
	display: bool.isRequired,
	children: oneOfType([array, object]).isRequired,
	scrollPoint: object.isRequired,
	showResultsTable: bool.isRequired,
	displayItems: number.isRequired,
	rate: number.isRequired,
	active: bool.isRequired,
	currentYear: number.isRequired,
	className: string,
	decimal: number
};

export const payrollProps = {
	taxData: array.isRequired,
	taxYearIndex: oneOfType([string, number]).isRequired,
	baseIncome: oneOfType([string, number]).isRequired,
	income: oneOfType([string, array]).isRequired,
	expenses: oneOfType([string, array]).isRequired,
	profit: oneOfType([string, array]).isRequired,
	creditPoints: oneOfType([string, number, array]).isRequired,
	pensionOption: oneOfType([string, array]).isRequired,
	pensionType: oneOfType([string, array]).isRequired,
	pensionAmount: oneOfType([string, number, array]).isRequired,
	studyFundType: oneOfType([string, array]).isRequired,
	studyFundAmount: oneOfType([string, number, array]).isRequired,
	studyFundOption: oneOfType([string, array]).isRequired,
	travelAllowance: oneOfType([string, number]).isRequired,
	foodAllowance: oneOfType([string, number]).isRequired,
	otherAllowance: oneOfType([string, number]).isRequired,
	annualBonus: oneOfType([string, number]).isRequired,
	commission: oneOfType([string, number]).isRequired,
	overtime: oneOfType([string, number]).isRequired,
	fiscalPeriod: string.isRequired,
	bituachLeumiAdvance: oneOfType([string, number, array]).isRequired,
	showExtended: bool.isRequired
};

export const panelProps = {
	type: string.isRequired,
	title: string.isRequired,
	text: string.isRequired
};

export const cardProps = {
	type: string.isRequired,
	title: string.isRequired,
	text: string.isRequired,
	body: object.isRequired,
	close: bool
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
	labelColumns: array.isRequired,
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
	type: string,
	formIndex: number.isRequired,
	validated: bool.isRequired,
	yearLabelColumns: array,
	startIndex: function (props, propName, componentName) {
		if (props['controlled'] === true && props[propName] === undefined) {
			return new Error(`${propName} supplied to ${componentName} is undefined. Validation failed.`);
		}
	}
};

export const heroProps = {
	h1: string.isRequired,
	heroImage: string.isRequired
};

export const breakdownProps = {
	rowHeader: string.isRequired,
	monthTotal: function (props, propName, componentName) {
		if (props['eoy'] === undefined && props[propName] === undefined) {
			return new Error(`${propName} supplied to ${componentName} is undefined. Validation failed.`);
		}
	},
	annualTotal: number,
	monthBreakdown: array.isRequired,
	annualBreakdown: array.isRequired,
	eoy: bool
};

export const pensionProps = {
	pensionData: array.isRequired,
	latestPensionData: object.isRequired,
	averageWage: number.isRequired,
	averageWageHalf: number.isRequired,
	reducedRate: number.isRequired,
	fullRate: number.isRequired,
	reducedMax: number.isRequired,
	fullMax: number.isRequired,
	taxDeductableMaxPercent: number.isRequired,
	taxCreditMaxPercent: number.isRequired,
	eligibleIncome: number.isRequired,
	ceiling: number.isRequired,
	maxContribution: number.isRequired,
	beneficiaryPayment: number.isRequired,
	recognisedExpense: number.isRequired,
	taxCredit: number.isRequired,
	taxCreditRate: number.isRequired,
	tierLimit: number.isRequired
};

export const studyProps = {
	ceiling: number.isRequired,
	rate: number.isRequired,
	capitalGainsLimit: number.isRequired,
	maxDeposit: number.isRequired,
	employeeRate: number.isRequired,
	employerRate: number.isRequired
};
