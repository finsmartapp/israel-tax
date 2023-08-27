import React from 'react';
import { globalProps, payrollProps, formProps } from '../../../prop-types';
import { Form } from 'react-bootstrap';
import InputField from '../../../components/form-inputs/InputField';
import { invalidNum } from '../../../utils/validationText';
import { isZeroOrGreater } from '../../../utils/comparisons';

function NetPayAllowances(props) {
	const { travelAllowance, foodAllowance, otherAllowance } = props.stateData;
	const handleChange = props.handleChange;
	const language = props.language;
	const formSize = props.formSize;

	return (
		<fieldset>
			<Form.Label as='legend'>Allowances</Form.Label>
			<InputField
				language={language}
				label='Transport'
				name='travelAllowance'
				value={travelAllowance}
				labelColumns={formSize}
				handleChange={handleChange}
				required={isZeroOrGreater(travelAllowance)}
				error={invalidNum}
			/>
			<InputField
				language={language}
				label='10bis / Cibus / Other card'
				name='foodAllowance'
				value={foodAllowance}
				labelColumns={formSize}
				handleChange={handleChange}
				required={isZeroOrGreater(foodAllowance)}
				error={invalidNum}
			/>
			<InputField
				language={language}
				label='Other'
				name='otherAllowance'
				value={otherAllowance}
				labelColumns={formSize}
				handleChange={handleChange}
				required={isZeroOrGreater(otherAllowance)}
				error={invalidNum}
			/>
		</fieldset>
	);
}

NetPayAllowances.propTypes = {
	handleChange: globalProps.handleChange,
	language: globalProps.language,
	stateData: globalProps.shape({
		travelAllowance: payrollProps.travelAllowance,
		foodAllowance: payrollProps.foodAllowance,
		otherAllowance: payrollProps.otherAllowance
	}),
	formSize: formProps.formSize
};

export default NetPayAllowances;
