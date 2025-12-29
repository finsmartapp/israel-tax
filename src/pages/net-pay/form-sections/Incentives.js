import React from 'react';
import { globalProps, taxProps, formProps } from '../../../prop-types';
import { Form } from 'react-bootstrap';
import InputField from '../../../components/form-inputs/InputField';
import { invalidNum } from '../../../utils/validationText';
import { isZeroOrGreater } from '../../../utils/comparisons';

function NetPayIncentives(props) {
	const { annualBonus, commission, overtime } = props.stateData;
	const handleChange = props.handleChange;
	const language = props.language;
	const formSize = props.formSize;

	return (
		<fieldset>
			<Form.Label as='legend'>Incentives</Form.Label>
			<InputField
				language={language}
				label='One-time bonus or gift'
				name='annualBonus'
				value={annualBonus}
				labelColumns={formSize}
				handleChange={handleChange}
				required={isZeroOrGreater(annualBonus)}
				error={invalidNum}
			/>
			<InputField
				language={language}
				label='Commission'
				name='commission'
				value={commission}
				labelColumns={formSize}
				handleChange={handleChange}
				required={isZeroOrGreater(commission)}
				error={invalidNum}
			/>
			<InputField
				language={language}
				label='Overtime'
				name='overtime'
				value={overtime}
				labelColumns={formSize}
				handleChange={handleChange}
				required={isZeroOrGreater(overtime)}
				error={invalidNum}
			/>
		</fieldset>
	);
}

NetPayIncentives.propTypes = {
	handleChange: globalProps.handleChange,
	language: globalProps.language,
	stateData: globalProps.shape({
		annualBonus: taxProps.annualBonus,
		commission: taxProps.commission,
		overtime: taxProps.overtime
	}),
	formSize: formProps.formSize
};

export default NetPayIncentives;
