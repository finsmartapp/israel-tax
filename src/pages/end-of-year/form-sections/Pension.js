import React from 'react';
import { globalProps, payrollProps, formProps } from '../../../prop-types';
import { Form, Row } from 'react-bootstrap';
import InputField from '../../../components/form-inputs/InputField';
import InputRadio from '../../../components/form-inputs/InputRadio';
import { invalidNum } from '../../../utils/validationText';
import { invalidPercent } from '../../../utils/validationText';

function EndOfYearPension(props) {
	const { fiscalPeriod, profit, pensionOption, pensionType, pensionAmount } = props.stateData;
	const handleChange = props.handleChange;
	const language = props.language;
	const formIndex = props.formIndex;

	return (
		<fieldset>
			<Form.Label as='legend'>Pension</Form.Label>
			<Row className='hideLabels'>
				<InputRadio
					label='Option'
					name={`pensionOption${formIndex}`}
					state={pensionOption[formIndex]}
					btnLabel={[`${fiscalPeriod === 'annual' ? 'Minium' : 'Minimum\u{0002A}'}`, 'Custom']}
					btnValue={['legalMin', 'custom']}
					disabled={[false, profit[formIndex] <= 0]}
					labelColumns={pensionOption[formIndex] === 'legalMin' ? ['xs=12'] : ['md=4', 'lg=5']}
					horizontal={false}
					handleChange={handleChange}
					help='Enter income or profit to select custom.'
					helpInput='custom'
					helpCondition={profit[formIndex] <= 0}
				/>
				{pensionOption[formIndex] === 'custom' && (
					<>
						<InputRadio
							label='Type'
							name={`pensionType${formIndex}`}
							state={pensionType[formIndex]}
							btnLabel={['Shekel', 'Percent']}
							btnValue={['shekel', 'percent']}
							labelColumns={['xs=7', 'md=4', 'lg=4']}
							horizontal={false}
							handleChange={handleChange}
						/>

						<InputField
							language={language}
							label='Amount'
							name={`pensionAmount${formIndex}`}
							value={pensionAmount[formIndex]}
							symbol={pensionType[formIndex] === 'percent' ? '%' : '₪'}
							max={pensionType[formIndex] === 'percent' ? 100 : undefined}
							labelColumns={['xs=5', 'md=4', 'lg=3']}
							horizontal={false}
							handleChange={handleChange}
							required={true}
							error={pensionType[formIndex] === 'percent' ? `${invalidPercent}` : `${invalidNum}`}
						/>
					</>
				)}
			</Row>
		</fieldset>
	);
}

EndOfYearPension.propTypes = {
	handleChange: globalProps.handleChange,
	language: globalProps.language,
	formIndex: formProps.formIndex,
	stateData: globalProps.shape({
		fiscalPeriod: payrollProps.fiscalPeriod,
		profit: payrollProps.profit,
		pensionOption: payrollProps.pensionOption,
		pensionType: payrollProps.pensionType,
		pensionAmount: payrollProps.pensionAmount
	})
};

export default EndOfYearPension;
