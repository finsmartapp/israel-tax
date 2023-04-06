import React from 'react';
import pensionData from '../../data/workplace-pension.json';
import taxData from '../../data/payroll.json';
import PageContainer from '../../components/page-container';
import Hero from '../../components/hero';
import EmployeePensionDeposit from './Deposit';
import { currentYearIndex } from '../../utils/globalVariables';

function EmployeePension() {
	const latestPensionData = pensionData[pensionData.length - 1];
	const averageWage = taxData[currentYearIndex].bituachLeumi.averageSalary;

	return (
		<>
			<Hero h1='Workplace Pension' />
			<PageContainer>
				<EmployeePensionDeposit latestPensionData={latestPensionData} averageWage={averageWage} />
			</PageContainer>
		</>
	);
}

export default EmployeePension;
