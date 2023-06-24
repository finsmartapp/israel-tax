import React from 'react';
import Hero from '../../components/hero';
import PageContainer from '../../components/page-container';
import TaxBandsTable from './Table';

function TaxBands() {
	return (
		<>
			<Hero h1='Income Tax Bands' heroImage='taxTable' />
			<PageContainer>
				<section>
					<h2>Tax Bands</h2>
					<p>
						Income tax is calculated on your annual income, but monthly bands have been included for
						comparrison.
					</p>
				</section>
				<TaxBandsTable />
			</PageContainer>
		</>
	);
}

export default TaxBands;
