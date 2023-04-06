import React from 'react';
import { globalProps } from '../../prop-types';
import Hero from '../../components/hero';
import PageContainer from '../../components/page-container';
import NetPayCalculator from './Calculator';
import { camelToKebab, capitaliseFirst } from '../../utils/caseConvertor';

function NetPay(props) {
	const employment = props.employmentType;

	return (
		<>
			<Hero h1={`${capitaliseFirst(camelToKebab(employment))} Net Pay Calculator`} />
			<PageContainer>
				<section>
					<h2>Net Pay</h2>
					<p>
						Use the calculator to determine your net pay, which is the amount you're left with after
						all tax and other deductions have been applied.
					</p>
					<p>
						Enter your monthly financials, but it's important to be aware that final taxes are
						calculated on your annual income.
					</p>
				</section>
				<NetPayCalculator employmentType={employment} />
			</PageContainer>
		</>
	);
}

NetPay.propTypes = {
	employmentType: globalProps.employmentType
};

export default NetPay;
