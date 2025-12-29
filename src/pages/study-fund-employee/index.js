import React from 'react';
import studyFundTables from '../../data/study-fund.json';
import Hero from '../../components/hero';
import PageContainer from '../../components/page-container';
import EmployeeStudyFundDeposit from './Deposit';
import EmployeeStudyFundExamples from './Examples';
import { currentYearIndex, currentYear } from '../../utils/globalVariables';

function EmployeeStudyFund() {
	const {
		employee: { rate: employeeRate, ceiling },
		employer: { rate: employerRate }
	} = studyFundTables[currentYearIndex];

	return (
		<>
			<Hero h1='Employee Study Fund' heroImage='studyFund' />
			<PageContainer>
				<EmployeeStudyFundDeposit
					currentYear={currentYear}
					employeeRate={employeeRate}
					employerRate={employerRate}
					ceiling={ceiling}
				/>
				<EmployeeStudyFundExamples
					employeeRate={employeeRate}
					employerRate={employerRate}
					ceiling={ceiling}
				/>
			</PageContainer>
		</>
	);
}

export default EmployeeStudyFund;
