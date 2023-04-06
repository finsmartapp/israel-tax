import React from 'react';
import { globalProps, incomeTaxProps } from '../../../prop-types';
import { formatCurrency } from '../../../utils/formatCurrency';

function IncomeTaxBreakdownTable(props) {
	const {
		incomeTax,
		annualIncomeTax,
		monthlyBandPayments,
		annualBandPayments,
		active,
		handleClick,
		eoy
	} = props;
	const hasTax = annualIncomeTax > 0;
	const monthView = eoy ? false : true;

	return (
		<>
			<tr>
				<td>
					Income Tax
					<button
						className='btn-link btn-link--breakdown'
						aria-pressed={active ? 'true' : 'false'}
						onClick={handleClick}
						style={{ display: hasTax ? 'inline-block' : 'none' }}
					>
						BREAKDOWN
					</button>
				</td>
				{monthView && <td>{formatCurrency('il', incomeTax)}</td>}
				<td>{formatCurrency('il', annualIncomeTax)}</td>
			</tr>
			{active && (
				<>
					{monthlyBandPayments.map((monthlyBand, i) => {
						const rate = Object.keys(monthlyBand);
						const tax = Object.values(monthlyBand);
						const isAnnual = i <= annualBandPayments.length - 1;

						return (
							<tr key={i} className='breakdown-row'>
								<td>{rate}% Rate</td>
								{monthView && <td>{formatCurrency('il', tax)}</td>}
								<td>{formatCurrency('il', isAnnual ? annualBandPayments[i][rate] : 0)}</td>
							</tr>
						);
					})}
				</>
			)}
		</>
	);
}

IncomeTaxBreakdownTable.propTypes = {
	handleClick: globalProps.handleClick,
	active: globalProps.active,
	incomeTax: incomeTaxProps.incomeTax,
	annualIncomeTax: incomeTaxProps.annualIncomeTax,
	monthlyBandPayments: incomeTaxProps.monthlyBandPayments,
	annualBandPayments: incomeTaxProps.annualBandPayments,
	eoy: incomeTaxProps.eoy
};

export default IncomeTaxBreakdownTable;
