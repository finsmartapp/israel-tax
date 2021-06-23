import React from 'react';
import Popup from '../popup/Popup';
import { formatCurrency } from '../../utils/FormatCurrency';

export function cardAllowancePopup(allowance) {
	return (
		<Popup
			type="info"
			title="10bis, Cibus, or credit/debit card allowance"
			text={`Your allowance of ${formatCurrency(
				'il',
				allowance
			)} has been added to your taxable income, but as it's not included in your salary payment, it doesn't form part of your net income. It should still be considered desposible income though. `}
		/>
	);
}
