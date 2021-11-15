import React from 'react';
import { globalProps, payrollProps, formProps } from '../../../../prop-types';
import { Form } from 'react-bootstrap';
import InputSelect from '../../../form-inputs/InputSelect';
import InputField from '../../../form-inputs/InputField';
import { invalidNum } from '../../../../utils/validationText';
import { isZeroOrGreater } from '../../../../utils/comparisons';

function NetPayIncome(props) {
	const { taxData, taxYearIndex, baseIncome, creditPoints } = props.stateData;
	const handleChange = props.handleChange;
	const employmentType = props.employmentType;
	const language = props.language;
	const formSize = props.formSize;

	return (
		<fieldset>
			<Form.Label as="legend">Tax</Form.Label>
			<InputSelect
				label="Tax year"
				name="taxYearIndex"
				value={taxYearIndex}
				dataSource={taxData}
				dataKey="taxYear"
				columns={formSize}
				handleChange={handleChange}
				required={true}
				error="Select a tax year."
			/>
			<InputField
				language={language}
				label={employmentType === 'employee' ? 'Base salary' : 'Profit'}
				name="baseIncome"
				value={baseIncome}
				columns={formSize}
				handleChange={handleChange}
				required={true}
				error={invalidNum}
			/>
			<InputField
				language={language}
				label="Tax credit points"
				name="creditPoints"
				value={creditPoints}
				columns={formSize}
				step={0.25}
				handleChange={handleChange}
				required={isZeroOrGreater(creditPoints)}
				error={invalidNum}
			/>
		</fieldset>
	);
}

NetPayIncome.propTypes = {
	handleChange: globalProps.handleChange,
	employmentType: globalProps.employmentType,
	language: globalProps.language,
	stateData: globalProps.shape({
		taxData: payrollProps.taxData,
		taxYearIndex: payrollProps.taxYearIndex,
		baseIncome: payrollProps.baseIncome,
		creditPoints: payrollProps.creditPoints
	}),
	formSize: formProps.formSize
};

export default NetPayIncome;
