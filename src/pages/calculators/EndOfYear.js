import React from 'react';
import PageContainer from '../../components/page-container';
import Hero from '../../components/hero';
import EndOfYearCalculator from '../../components/calculators/end-of-year';

function EndOfYear() {
	return (
		<>
			<Hero h1="End of Year Calculator" />
			<PageContainer>
				<EndOfYearCalculator />
			</PageContainer>
		</>
	);
}

export default EndOfYear;
