import React from 'react';
import { formProps, globalProps } from '../../prop-types';
import InputSelect from '../form-inputs/InputSelect';
import taxData from '../../data/payroll.json';

function PayrollTaxYearBtn(props) {
	return (
		<InputSelect
			label="Tax year"
			name="taxYearIndex"
			value={props.value}
			dataSource={taxData}
			dataKey="taxYear"
			controlled={props.controlled}
			columns={props.columns}
			horizontal={props.horizontal}
			handleChange={props.handleChange}
			required={true}
			error="Select a tax year."
		/>
	);
}

PayrollTaxYearBtn.propTypes = {
	value: formProps.value,
	columns: formProps.columns,
	horizontal: formProps.horizontal,
	handleChange: globalProps.handleChange,
	controlled: formProps.controlled
};

export default PayrollTaxYearBtn;
