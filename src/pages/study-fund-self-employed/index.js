import React from 'react';
import studyFundTables from '../../data/study-fund.json';
import Hero from '../../components/hero';
import PageContainer from '../../components/page-container';
import SelfEmployedStudyFundDeposit from './Deposit';
import SelfEmployedStudyExamples from './Examples';
import { currentYearIndex, currentYear } from '../../utils/globalVariables';

function SelfEmployedStudyFund() {
	const { rate, ceiling, capitalGainsLimit } = studyFundTables[currentYearIndex].selfEmployed;
	const maxDeposit = ceiling * (rate / 100);

	return (
		<>
			<Hero h1='Self-employed Study Fund' heroImage='studyFund' />
			<PageContainer>
				<SelfEmployedStudyFundDeposit
					currentYear={currentYear}
					rate={rate}
					ceiling={ceiling}
					capitalGainsLimit={capitalGainsLimit}
					maxDeposit={maxDeposit}
				/>
				<SelfEmployedStudyExamples
					rate={rate}
					ceiling={ceiling}
					capitalGainsLimit={capitalGainsLimit}
					maxDeposit={maxDeposit}
				/>
			</PageContainer>
		</>
	);
}

export default SelfEmployedStudyFund;
