import studyFundTables from '../../data/study-fund.json';
export function studyFundAllowances(taxYearIndex, profit, employment, eoy) {
	//Education fund is a tax deductible expense up to a ceiling for self-employed
	//Employees contribution is taxed, but aren't taxed on the employers contribution (tax deductible expense for them)
	//Different ceilings for capital gains relief

	const { rate, ceiling } = studyFundTables[taxYearIndex][employment];
	const maxCeilingCalc = ceiling * (rate / 100);
	const maxCeiling = eoy ? maxCeilingCalc : maxCeilingCalc / 12;
	const profitCeiling = profit * (rate / 100);

	return profitCeiling > maxCeiling ? maxCeiling : profitCeiling;
}
