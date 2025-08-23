import React from 'react';
import InfoCard from '../../../components/info-card';
import { formatCurrency } from '../../../utils/formatCurrency';
import { Link } from 'react-router-dom';

export function noTaxCreditPoints() {
	return (
		<InfoCard
			type='danger'
			title='No Tax Credit Points Provided'
			body={
				<p>
					Tax credit points reduce your overall income tax bill. Check your{' '}
					<Link to='/tax-rates/credit-points' target='_blank'>
						eligibility and entitlement
					</Link>
					.
				</p>
			}
			close={true}
		/>
	);
}

export function foodAllowanceInfo(allowance) {
	return (
		<InfoCard
			type='info'
			title='10bis or Cibus'
			body={
				<p>
					Your food allowance of {formatCurrency('il', allowance)} has been added to your taxable
					income, but as it's not included in your salary payment, it doesn't form part of your net
					income. It can still be considered desposible income though.
				</p>
			}
			close={true}
		/>
	);
}
