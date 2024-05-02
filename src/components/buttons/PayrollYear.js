import React from 'react';
import { globalProps, formProps } from '../../prop-types';
import InputSelect from '../form-inputs/InputSelect';
import taxData from '../../data/payroll.json';

function PayrollTaxYearBtn(props) {
	const { controlled, startIndex, yearLabelColumns, horizontal, handleChange } = props;
	const columnSize = yearLabelColumns === undefined ? ['xs=auto'] : yearLabelColumns;

	return (
		<InputSelect
			label='Tax year'
			name='taxYearIndex'
			dataSource={taxData}
			dataKey='taxYear'
			controlled={controlled}
			startIndex={startIndex}
			labelColumns={columnSize}
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
	yearLabelColumns: formProps.yearLabelColumns,
	horizontal: formProps.horizontal,
	handleChange: globalProps.handleChange
};

export default PayrollTaxYearBtn;
