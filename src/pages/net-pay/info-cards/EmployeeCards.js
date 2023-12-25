import React from 'react';
import InfoCard from '../../../components/info-card';
import { formatCurrency } from '../../../utils/formatCurrency';

export function foodAllowanceInfo(allowance) {
	return (
		<InfoCard
			type='info'
			title='10bis or Cibus'
			body={
				<p>
					Your allowance of {formatCurrency('il', allowance)} has been added to your taxable income,
					but as it's not included in your salary payment, it doesn't form part of your net income.
					It should still be considered desposible income though.
				</p>
			}
			close={true}
		/>
	);
}
