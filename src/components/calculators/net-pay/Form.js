import React from 'react';
import { shape } from 'prop-types';
import { globalProps, payrollProps } from '../../../prop-types';
import { Form, Button } from 'react-bootstrap';
import NetPayIncome from './form-coomponents/Income';
import NetPayContributions from './form-coomponents/Contributions';
import NetPayAllowances from './form-coomponents/Allowances';
import NetPayIncentives from './form-coomponents/Incentives';
import LanguageContext from '../../../contexts/LanguageContext';

function NetPayForm(props) {
	const employmentType = props.employmentType;
	const stateData = props.stateData;
	const handleChange = props.handleChange;
	const formSize = {
		xsLabel: 7,
		mdLabel: 6,
		get xsInput() {
			return 12 - this.xsLabel;
		},
		get mdInput() {
			return 12 - this.mdLabel;
		}
	};

	return (
		<section>
			<h2>Net pay calculator</h2>
			<Form
				id={`${employmentType}-netpay-form`}
				noValidate
				validated={stateData.validated}
				onSubmit={props.handleSubmit}
			>
				<LanguageContext.Consumer>
					{value => (
						<>
							<NetPayIncome
								employmentType={employmentType}
								stateData={stateData}
								handleChange={handleChange}
								language={value.language}
								formSize={formSize}
							/>
							<NetPayContributions
								employmentType={employmentType}
								stateData={stateData}
								handleChange={handleChange}
								language={value.language}
								formSize={formSize}
							/>
							{employmentType === 'employee' && (
								<>
									<NetPayAllowances
										stateData={stateData}
										handleChange={handleChange}
										language={value.language}
										formSize={formSize}
									/>
									<NetPayIncentives
										stateData={stateData}
										handleChange={handleChange}
										language={value.language}
										formSize={formSize}
									/>
								</>
							)}
						</>
					)}
				</LanguageContext.Consumer>
				<Button type="submit" variant="primary">
					Calculate
				</Button>
			</Form>
		</section>
	);
}

NetPayForm.propTypes = {
	handleSubmit: globalProps.handleSubmit,
	handleChange: globalProps.handleChange,
	employmentType: globalProps.employmentType,
	language: globalProps.language,
	stateData: shape({
		taxData: payrollProps.taxData,
		baseIncome: payrollProps.baseIncome,
		creditPoints: payrollProps.creditPoints,
		pensionOption: payrollProps.pensionOption,
		pensionAmount: payrollProps.pensionAmount,
		educationFund: payrollProps.educationFund,
		travelAllowance: payrollProps.travelAllowance,
		lunchAllowance: payrollProps.lunchAllowance,
		annualBonus: payrollProps.annualBonus,
		commission: payrollProps.commission,
		overtime: payrollProps.overtime,
		validated: payrollProps.validated
	})
};

export default NetPayForm;
