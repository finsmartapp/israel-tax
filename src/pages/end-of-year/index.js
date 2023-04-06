import React from 'react';
import PageContainer from '../../components/page-container';
import Hero from '../../components/hero';
import EndOfYearCalculator from './Calculator';

function EndOfYear() {
	return (
		<>
			<Hero h1='End of Year Calculator' />
			<PageContainer>
				<section>
					<h2>Net Pay</h2>
					<p>
						Use the calculator to determine your net pay for the year, which is the amount you're
						left with after all tax and other deductions have been applied.
					</p>
				</section>
				<EndOfYearCalculator />
			</PageContainer>
		</>
	);
}

export default EndOfYear;
