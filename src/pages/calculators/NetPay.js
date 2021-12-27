import React from 'react';
import { globalProps } from '../../prop-types';
import Hero from '../../components/hero';
import PageContainer from '../../components/page-container';
import NetPayCalculator from '../../components/calculators/net-pay';
import { camelToKebab, capitaliseFirst } from '../../utils/caseConvertor';

function NetPay(props) {
	const employment = props.employmentType;

	return (
		<>
			<Hero h1={`${capitaliseFirst(camelToKebab(employment))} Net Pay Calculator`} />
			<PageContainer>
				<NetPayCalculator employmentType={employment} />
			</PageContainer>
		</>
	);
}

NetPay.propTypes = {
	employmentType: globalProps.employmentType
};

export default NetPay;
