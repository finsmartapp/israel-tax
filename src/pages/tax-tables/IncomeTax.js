import React from 'react';
import Hero from '../../components/hero';
import PageContainer from '../../components/page-container';
import IncomeTaxBands from '../../components/tax-tables/income-tax';

function IncomeTax() {
	return (
		<>
			<Hero h1="Income Tax Bands" />
			<PageContainer>
				<IncomeTaxBands />
			</PageContainer>
		</>
	);
}

export default IncomeTax;
