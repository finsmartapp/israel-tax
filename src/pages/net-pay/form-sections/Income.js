import React from 'react';
import { globalProps, payrollProps, formProps } from '../../../prop-types';
import { Form } from 'react-bootstrap';
import PayrollTaxYearBtn from '../../../components/buttons/PayrollYear';
import InputField from '../../../components/form-inputs/InputField';
import { invalidNum } from '../../../utils/validationText';
import { isZeroOrGreater } from '../../../utils/comparisons';

function NetPayIncome(props) {
	const { baseIncome, creditPoints, bituachLeumiAdvance } = props.stateData;
	const handleChange = props.handleChange;
	const employmentType = props.employmentType;
	const language = props.language;
	const formSize = props.formSize;

	return (
		<fieldset>
			<Form.Label as='legend'>Income</Form.Label>
			<PayrollTaxYearBtn handleChange={handleChange} yearLabelColumns={formSize} />
			<InputField
				language={language}
				label={employmentType === 'employee' ? 'Base salary' : 'Profit'}
				name='baseIncome'
				value={baseIncome}
				labelColumns={formSize}
				handleChange={handleChange}
				required={true}
				error={invalidNum}
			/>
			<InputField
				language={language}
				label='Tax credit points'
				name='creditPoints'
				value={creditPoints}
				labelColumns={formSize}
				step={0.25}
				handleChange={handleChange}
				required={isZeroOrGreater(creditPoints)}
				error={invalidNum}
			/>
			{employmentType === 'selfEmployed' && (
				<InputField
					language={language}
					label='Bituach Leumi advance'
					name='bituachLeumiAdvance'
					value={bituachLeumiAdvance}
					labelColumns={formSize}
					handleChange={handleChange}
					required={isZeroOrGreater(creditPoints)}
					error={invalidNum}
				/>
			)}
		</fieldset>
	);
}

NetPayIncome.propTypes = {
	handleChange: globalProps.handleChange,
	employmentType: globalProps.employmentType,
	language: globalProps.language,
	stateData: globalProps.shape({
		baseIncome: payrollProps.baseIncome,
		creditPoints: payrollProps.creditPoints,
		bituachLeumiAdvance: payrollProps.bituachLeumiAdvance
	}),
	formSize: formProps.formSize
};

export default NetPayIncome;
