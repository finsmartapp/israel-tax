import React from 'react';
import { globalProps, taxProps, formProps } from '../../prop-types/index';
import { Form, ButtonGroup, ToggleButton, Button, Row, Col } from 'react-bootstrap';
import LanguageContext from '../../contexts/LanguageContext';
import EndOfYearRevenue from './form-sections/Revenue';
import EndOfYearPension from './form-sections/Pension';
import EndOfYearStudyFund from './form-sections/StudyFund';
import TaxYearBtn from '../../components/buttons/TaxYear';

function EndOfYearForm(props) {
	const stateData = props.stateData;
	const { fiscalPeriod, pensionOption, studyFundOption, validated } = props.stateData;
	const handleChange = props.handleChange;
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	return (
		<section>
			<h2>Calculator</h2>
			<Row className='justify-content-center mb-3'>
				<Col xs={'auto'}>
					<ButtonGroup>
						{['Annual', 'Quarterly', 'Monthly'].map((period, i) => (
							<ToggleButton
								key={i}
								id={`fiscal-period-${i}`}
								type='radio'
								variant='outline-primary'
								name='fiscalPeriod'
								value={period.toLowerCase()}
								checked={fiscalPeriod === period.toLowerCase()}
								onChange={handleChange}
							>
								{period}
							</ToggleButton>
						))}
					</ButtonGroup>
				</Col>
			</Row>
			<Form
				id='endofyear-form'
				noValidate
				validated={validated}
				onSubmit={props.handleSubmit}
				className='vertical-form'
			>
				<TaxYearBtn handleChange={handleChange} />

				{pensionOption.map((forms, i) => {
					const fullWidth =
						pensionOption[i] === 'custom' || (studyFundOption[i] === 'custom' && true);

					return (
						<fieldset key={i} className='mb-3'>
							<Form.Label as='legend' className={fiscalPeriod === 'annual' && 'visually-hidden'}>
								{fiscalPeriod === 'annual'
									? 'Annual'
									: fiscalPeriod === 'quarterly'
									? `Quarter ${i + 1}`
									: months[i]}
							</Form.Label>
							<LanguageContext.Consumer>
								{value => (
									<>
										<EndOfYearRevenue
											language={value.language}
											stateData={stateData}
											handleChange={handleChange}
											formIndex={i}
										/>
										<Row>
											<Col xs={fullWidth && 12}>
												<EndOfYearPension
													language={value.language}
													stateData={stateData}
													handleChange={handleChange}
													formIndex={i}
												/>
											</Col>
											<Col xs={fullWidth && 12}>
												<EndOfYearStudyFund
													language={value.language}
													stateData={stateData}
													handleChange={handleChange}
													formIndex={i}
												/>
											</Col>
										</Row>
									</>
								)}
							</LanguageContext.Consumer>
						</fieldset>
					);
				})}
				<small style={{ display: 'block', paddingBottom: '1rem' }}>
					<sup>&#42;&#42;</sup>Calculated pro rata based on tax deductible.
				</small>
				{fiscalPeriod !== 'annual' && (
					<small style={{ display: 'block', paddingBottom: '1rem' }}>
						<sup>&#42;</sup>Calculated pro rata.
					</small>
				)}
				<Button type='submit' variant='primary'>
					Calculate
				</Button>
			</Form>
		</section>
	);
}

EndOfYearForm.propTypes = {
	handleSubmit: globalProps.handleSubmit,
	handleChange: globalProps.handleChange,
	stateData: globalProps.shape({
		fiscalPeriod: taxProps.fiscalPeriod,
		taxYearIndex: taxProps.taxYearIndex,
		pensionOption: taxProps.pensionOption,
		studyFundOption: taxProps.studyFundOption,
		validated: formProps.validated
	})
};

export default EndOfYearForm;
