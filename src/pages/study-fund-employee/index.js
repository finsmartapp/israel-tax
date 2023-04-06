import React from 'react';
import taxData from '../../data/payroll.json';
import Hero from '../../components/hero';
import PageContainer from '../../components/page-container';
import EmployeeStudyFundDeposit from './Deposit';
import EmployeeStudyFundExamples from './Examples';
import { currentYearIndex, currentYear } from '../../utils/globalVariables';

function EmployeeStudyFund() {
	const {
		studyFund: {
			employee: { rate: employeeRate, ceiling },
			employer: { rate: employerRate }
		}
	} = taxData[currentYearIndex];

	return (
		<>
			<Hero h1='Employee Study Fund' />
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
