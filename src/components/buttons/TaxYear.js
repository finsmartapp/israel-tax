import React from 'react';
import { globalProps, formProps } from '../../prop-types';
import InputSelect from '../form-inputs/InputSelect';
import incomeTaxTables from '../../data/income-tax.json';

function TaxYearBtn(props) {
	const { controlled, startIndex, yearLabelColumns, horizontal, handleChange } = props;
	const columnSize = yearLabelColumns === undefined ? ['xs=auto'] : yearLabelColumns;

	return (
		<InputSelect
			label='Tax year'
			name='taxYearIndex'
			dataSource={incomeTaxTables}
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

TaxYearBtn.propTypes = {
	controlled: formProps.controlled,
	startIndex: formProps.startIndex,
	yearLabelColumns: formProps.yearLabelColumns,
	horizontal: formProps.horizontal,
	handleChange: globalProps.handleChange
};

export default TaxYearBtn;
