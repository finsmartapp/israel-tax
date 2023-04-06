import React from 'react';
import { formProps, globalProps } from '../../prop-types';
import InputSelect from '../form-inputs/InputSelect';
import taxData from '../../data/payroll.json';

function PayrollTaxYearBtn(props) {
	const { controlled, startIndex, columns, horizontal, handleChange } = props;
	const columnSize = columns === undefined ? ['xs=auto'] : columns;

	return (
		<InputSelect
			label='Tax year'
			name='taxYearIndex'
			dataSource={controlled ? taxData : taxData.reverse()}
			dataKey='taxYear'
			controlled={controlled}
			value={startIndex}
			columns={columnSize}
			horizontal={horizontal}
			handleChange={handleChange}
			required={true}
			error='Select a tax year.'
		/>
	);
}

PayrollTaxYearBtn.propTypes = {
	controlled: formProps.controlled,
	startIndex: formProps.startIndex,
	columns: formProps.columns,
	horizontal: formProps.horizontal,
	handleChange: globalProps.handleChange
};

export default PayrollTaxYearBtn;
