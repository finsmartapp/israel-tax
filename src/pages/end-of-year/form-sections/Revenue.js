import React from 'react';
import { globalProps, payrollProps, formProps } from '../../../prop-types';
import { Form, Row } from 'react-bootstrap';
import InputField from '../../../components/form-inputs/InputField';
import { invalidNum } from '../../../utils/validationText';
import { isZeroOrGreater } from '../../../utils/comparisons';
import { formatNumberPlain } from '../../../utils/formatNumber';

function EndOfYearRevenue(props) {
	const { income, expenses, profit, creditPoints, bituachLeumiAdvance } = props.stateData;
	const handleChange = props.handleChange;
	const language = props.language;
	const formSize = ['xs=6', 'md=3'];
	const formIndex = props.formIndex;

	return (
		<fieldset>
			<Form.Label as='legend'>Revenue</Form.Label>
			<Row className='eoy-income'>
				<InputField
					language={language}
					label='Business income'
					name={`income${formIndex}`}
					value={income[formIndex]}
					labelColumns={formSize}
					horizontal={false}
					handleChange={handleChange}
					required={isZeroOrGreater(income[formIndex])}
					error={invalidNum}
				/>
				<InputField
					language={language}
					label='Expenses'
					name={`expenses${formIndex}`}
					value={expenses[formIndex]}
					labelColumns={formSize}
					horizontal={false}
					handleChange={handleChange}
					required={isZeroOrGreater(expenses[formIndex])}
					error={invalidNum}
				/>
				<InputField
					language={language}
					label='Profit'
					name={`profit${formIndex}`}
					value={
						profit[formIndex] > 0 ? formatNumberPlain(profit[formIndex], 2) : profit[formIndex]
					}
					labelColumns={formSize}
					horizontal={false}
					handleChange={handleChange}
					required={true}
					error={profit[formIndex] < 0 ? 'Profit cannot be minus.' : invalidNum}
				/>
				<InputField
					language={language}
					label='Tax credit points'
					name={`creditPoints${formIndex}`}
					value={creditPoints[formIndex]}
					labelColumns={formSize}
					horizontal={false}
					handleChange={handleChange}
					required={isZeroOrGreater(creditPoints[formIndex])}
					error={invalidNum}
				/>
				<InputField
					className='bituach-leumi-field'
					language={language}
					label='Bituach Leumi advances'
					name={`bituachLeumiAdvance${formIndex}`}
					value={bituachLeumiAdvance[formIndex]}
					labelColumns={formSize}
					horizontal={false}
					handleChange={handleChange}
					required={isZeroOrGreater(bituachLeumiAdvance[formIndex])}
					error={invalidNum}
				/>
			</Row>
		</fieldset>
	);
}

EndOfYearRevenue.propTypes = {
	handleChange: globalProps.handleChange,
	language: globalProps.language,
	formIndex: formProps.formIndex,
	stateData: globalProps.shape({
		income: payrollProps.income,
		expenses: payrollProps.expenses,
		profit: payrollProps.profit,
		creditPoints: payrollProps.creditPoints,
		bituachLeumiAdvance: payrollProps.bituachLeumiAdvance
	})
};

export default EndOfYearRevenue;
