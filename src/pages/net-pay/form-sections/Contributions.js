import React from 'react';
import { globalProps, payrollProps, formProps } from '../../../prop-types';
import { Form } from 'react-bootstrap';
import InputRadio from '../../../components/form-inputs/InputRadio';
import InputField from '../../../components/form-inputs/InputField';
import { invalidNum, invalidPercent } from '../../../utils/validationText';
import { isZeroOrGreater } from '../../../utils/comparisons';
import { pensionMinCalc } from '../../../utils/tax-calculators/pensionLegalMin';

function NetPayContributions(props) {
	const taxData = props.taxData;
	const {
		taxYearIndex,
		baseIncome,
		pensionOption,
		pensionType,
		pensionAmount,
		studyFundType,
		studyFundAmount
	} = props.stateData;
	const handleChange = props.handleChange;
	const employmentType = props.employmentType;
	const language = props.language;
	const formSize = props.formSize;
	const pensionMin = pensionMinCalc(taxData, taxYearIndex, baseIncome, employmentType).toFixed(2);
	const pensionMinPecrcent = ((pensionMin / baseIncome) * 100).toFixed(2);

	return (
		<fieldset>
			<Form.Label as='legend'>Contributions</Form.Label>
			<fieldset>
				<Form.Label as='legend'>Pension</Form.Label>
				<InputRadio
					label='Option'
					name='pensionOption'
					state={pensionOption}
					btnLabel={['Legal minium', 'Custom']}
					btnValue={['legalMin', 'custom']}
					disabled={[false, baseIncome >= 1 ? false : true]}
					labelColumns={formSize}
					handleChange={handleChange}
					help={
						employmentType === 'employee'
							? 'Enter a base salary to select custom.'
							: 'Enter profit to select custom.'
					}
					helpInput='custom'
					helpCondition={baseIncome < 1}
				/>
				{pensionOption === 'custom' && (
					<>
						{employmentType === 'selfEmployed' && (
							<InputRadio
								label='Type'
								name='pensionType'
								state={pensionType}
								btnLabel={['Percent', 'Shekel']}
								btnValue={['percent', 'shekel']}
								labelColumns={formSize}
								handleChange={handleChange}
							/>
						)}
						<InputField
							language={language}
							label='Amount'
							name='pensionAmount'
							value={pensionAmount}
							symbol={pensionType === 'percent' ? '%' : '₪'}
							min={
								pensionType === 'percent' ? parseFloat(pensionMinPecrcent) : parseFloat(pensionMin)
							}
							max={pensionType === 'percent' ? 100 : undefined}
							labelColumns={formSize}
							handleChange={handleChange}
							required={true}
							error={
								pensionType === 'percent'
									? `${invalidPercent} The legal minimum is ${pensionMinPecrcent}%.`
									: `${invalidNum} The legal minimum is ${pensionMin}₪.`
							}
						/>
					</>
				)}
			</fieldset>
			<fieldset>
				<Form.Label as='legend'>Study Fund</Form.Label>
				<InputRadio
					label='Type'
					name='studyFundType'
					state={studyFundType}
					btnLabel={['Percent', 'Shekel']}
					btnValue={['percent', 'shekel']}
					labelColumns={formSize}
					handleChange={handleChange}
				/>
				<InputField
					language={language}
					label='Amount'
					name='studyFundAmount'
					value={studyFundAmount}
					symbol={studyFundType === 'percent' ? '%' : '₪'}
					max={studyFundType === 'percent' ? 100 : undefined}
					labelColumns={formSize}
					handleChange={handleChange}
					required={isZeroOrGreater(studyFundAmount)}
					error={studyFundType === 'percent' ? `${invalidPercent}` : `${invalidNum}`}
				/>
			</fieldset>
		</fieldset>
	);
}

NetPayContributions.propTypes = {
	handleChange: globalProps.handleChange,
	employmentType: globalProps.employmentType,
	language: globalProps.language,
	taxData: payrollProps.taxData,
	stateData: globalProps.shape({
		taxYearIndex: payrollProps.taxYearIndex,
		baseIncome: payrollProps.baseIncome,
		pensionOption: payrollProps.pensionOption,
		pensionType: payrollProps.pensionType,
		pensionAmount: payrollProps.pensionAmount,
		studyFundType: payrollProps.studyFundType,
		studyFundAmount: payrollProps.studyFundAmount
	}),
	formSize: formProps.formSize
};

export default NetPayContributions;
