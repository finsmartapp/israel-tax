import React from 'react';
import Hero from '../../components/hero';
import PageContainer from '../../components/page-container';
import CreditPointsTable from './Table';

function CreditPoints() {
	return (
		<>
			<Hero h1='Tax Credit Points' heroImage='creditPoints' />
			<PageContainer>
				<section>
					<h2>Credit Point Vaules</h2>
					<p>
						Tax credit points reduce the amount of income tax you pay. Once your total tax liability
						has been calculated, the value of your credit points is deducted. A man receives 2.25
						points a month and a woman 2.75. Additional points are awarded to{' '}
						<a
							href='https://www.gov.il/en/departments/general/introducing_innovative_reforms'
							target='_blank'
							rel='noopener noreferrer'
						>
							new olim and returning residents
						</a>
						,{' '}
						<a
							href='https://www.gov.il/en/departments/guides/tax-benefits-for-parents-with-small-children'
							target='_blank'
							rel='noopener noreferrer'
						>
							parents of young children
						</a>
						, and the disabled etc. Calculate your entitlement using the Israel Tax Authority's{' '}
						<a
							href='https://secapp.taxes.gov.il/srsimulatorNZ/#/simulator'
							target='_blank'
							rel='noopener noreferrer'
						>
							credit point simulator
						</a>
						.
					</p>
					<CreditPointsTable />
				</section>
			</PageContainer>
		</>
	);
}

export default CreditPoints;
