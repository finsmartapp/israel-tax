import React from 'react';
import { globalProps, payrollProps, formProps } from '../../prop-types';
import { Form, Button } from 'react-bootstrap';
import NetPayIncome from './form-sections/Income';
import NetPayContributions from './form-sections/Contributions';
import NetPayAllowances from './form-sections/Allowances';
import NetPayIncentives from './form-sections/Incentives';
import LanguageContext from '../../contexts/LanguageContext';

function NetPayForm(props) {
	const employmentType = props.employmentType;
	const taxData = props.taxData;
	const stateData = props.stateData;
	const handleChange = props.handleChange;
	const formSize = ['xs=7', 'md=6'];

	return (
		<section>
			<h2>Calculator</h2>
			<Form
				id={`${employmentType}-netpay-form`}
				noValidate
				validated={stateData.validated}
				onSubmit={props.handleSubmit}
				className='horizontal-form'
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
								taxData={taxData}
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
				<Button type='submit' variant='primary'>
					Calculate
				</Button>
			</Form>
		</section>
	);
}

NetPayForm.propTypes = {
	handleSubmit: globalProps.handleSubmit,
	handleChange: globalProps.handleChange,
	taxData: payrollProps.taxData,
	employmentType: globalProps.employmentType,
	stateData: globalProps.shape({
		validated: formProps.validated
	})
};

export default NetPayForm;
