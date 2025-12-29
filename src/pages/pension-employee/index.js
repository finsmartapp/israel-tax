import React from 'react';
import pensionTables from '../../data/pension.json';
import PageContainer from '../../components/page-container';
import Hero from '../../components/hero';
import EmployeePensionDeposit from './Deposit';
import { currentYearIndex } from '../../utils/globalVariables';

function EmployeePension() {
	const pensionTable = pensionTables[currentYearIndex];

	return (
		<>
			<Hero h1='Workplace Pension' heroImage='pension' />
			<PageContainer>
				<EmployeePensionDeposit pensionTable={pensionTable} />
			</PageContainer>
		</>
	);
}

export default EmployeePension;
