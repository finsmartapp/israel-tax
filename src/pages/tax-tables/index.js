import React from 'react';
import { globalProps } from '../../prop-types';
import Hero from '../../components/hero';
import PageContainer from '../../components/page-container';
import TaxBands from '../../components/tax-tables/income-tax';
import CreditPoints from '../../components/tax-tables/credit-points';

function TaxTables(props) {
	let h1;
	let content;
	switch (props.page) {
		case 1:
			h1 = 'Income Tax Bands';
			content = <TaxBands />;
			break;
		case 2:
			h1 = 'Tax Credit Points';
			content = <CreditPoints />;
			break;
		default:
			h1 = 'Israel Tax Information';
			content = 'This is embarrassing! Please try a different page';
	}
	return (
		<>
			<Hero h1={h1} />
			<PageContainer>{content}</PageContainer>
		</>
	);
}

TaxTables.propTypes = {
	page: globalProps.page
};

export default TaxTables;
