import React from 'react';
import { func, shape } from 'prop-types';
import { netPayType } from './PropTypes';
import { Form, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { checkZeroOrGreater } from '../../utils/Comparisons';
import { pensionMinCalc } from './calculations/PensionLegalMin';

function NetPayForm(props) {
	const {
		employmentType,
		taxData,
		taxYearIndex,
		baseIncome,
		creditPoints,
		pensionOption,
		pensionType,
		pensionAmount,
		educationFund,
		travelAllowance,
		lunchAllowance,
		annualBonus,
		commission,
		overtime,
		validated
	} = props.stateData;
	const handleChange = props.handleChange;
	const invalidNum = 'Enter a valid number (Up to 2 decimal places).';
	const xsLabel = 7;
	const mdLabel = 6;
	const xsInput = 12 - xsLabel;
	const mdInput = 12 - mdLabel;
	const pensionMin = pensionMinCalc(taxData, taxYearIndex, baseIncome, employmentType).toFixed(2);
	const pensionMinPecrcent = ((pensionMin / baseIncome) * 100).toFixed(2);

	return (
		<section>
			<h2>Net pay calculator</h2>
			<Form
				id={`netpay-form-${employmentType}`}
				noValidate
				validated={validated}
				onSubmit={props.handleSubmit}
			>
				<Form.Group as={Row}>
					<Form.Label htmlFor="taxYear" column xs={xsLabel} md={mdLabel}>
						Tax year
					</Form.Label>
					<Col xs={xsInput} md={mdInput}>
						<Form.Control
							as="select"
							id="taxYear"
							name="taxYearIndex"
							defaultValue=""
							required
							onChange={handleChange}
						>
							<option disabled value="">
								Select
							</option>
							{taxData.map((years, i) => (
								<option key={i} value={i}>
									{years.taxYear}
								</option>
							))}
						</Form.Control>
						<Form.Control.Feedback type="invalid">Select a tax year.</Form.Control.Feedback>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label htmlFor="income" column xs={xsLabel} md={mdLabel}>
						{employmentType === 'salaried' ? 'Base salary' : 'Profit'}
					</Form.Label>
					<Col xs={xsInput} md={mdInput}>
						<Form.Control
							as="input"
							id="income"
							name="baseIncome"
							type="number"
							inputMode="decimal"
							pattern="[0-9]*"
							step="0.01"
							min="0"
							required
							value={baseIncome}
							onChange={handleChange}
						></Form.Control>
						<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label htmlFor="creditPoints" column xs={xsLabel} md={mdLabel}>
						Tax credit points
					</Form.Label>
					<Col xs={xsInput} md={mdInput}>
						<Form.Control
							as="input"
							id="creditPoints"
							name="creditPoints"
							type="number"
							inputMode="decimal"
							pattern="[0-9]*"
							step="0.25"
							min="0"
							required={checkZeroOrGreater(creditPoints)}
							value={creditPoints}
							onChange={handleChange}
						></Form.Control>
						<Form.Control.Feedback type="invalid">
							Must be in quater increments.
						</Form.Control.Feedback>
					</Col>
				</Form.Group>
				<fieldset>
					<Form.Label as="legend">Contributions</Form.Label>
					<fieldset>
						<Form.Group as={Row}>
							<Form.Label as="legend" column xs={xsLabel} md={mdLabel}>
								Pension
							</Form.Label>
							<Col xs={xsInput} md={mdInput}>
								<Form.Check inline>
									<Form.Check.Input
										type="radio"
										id="pensionlMin"
										name="pensionOption"
										value="legalMin"
										checked={pensionOption === 'legalMin'}
										onChange={handleChange}
									/>
									<Form.Check.Label htmlFor="pensionlMin">Legal minium</Form.Check.Label>
								</Form.Check>
								<Form.Check inline>
									<Form.Check.Input
										type="radio"
										id="pensionlExtra"
										name="pensionOption"
										value="additional"
										checked={pensionOption === 'additional'}
										disabled={baseIncome >= 1 ? false : true}
										onChange={handleChange}
									/>
									<Form.Check.Label htmlFor="pensionlExtra">Additional</Form.Check.Label>
								</Form.Check>
								{baseIncome < 1 && (
									<div className="small">
										{employmentType === 'salaried'
											? 'Enter a base salary to select additional.'
											: 'Enter profit to select additional.'}
									</div>
								)}
							</Col>
						</Form.Group>
						{pensionOption === 'additional' && (
							<>
								{employmentType === 'selfEmployed' && (
									<Form.Group as={Row}>
										<Form.Label column xs={xsLabel} md={mdLabel}>
											Contribution type
										</Form.Label>
										<Col xs={xsInput} md={mdInput}>
											<Form.Check inline>
												<Form.Check.Input
													type="radio"
													id="pensionPercent"
													name="pensionType"
													value="percent"
													checked={pensionType === 'percent'}
													onChange={handleChange}
												/>
												<Form.Check.Label htmlFor="pensionPercent">Percent</Form.Check.Label>
											</Form.Check>
											<Form.Check inline>
												<Form.Check.Input
													type="radio"
													id="pensionlShekel"
													name="pensionType"
													value="shekel"
													checked={pensionType === 'shekel'}
													onChange={handleChange}
												/>
												<Form.Check.Label htmlFor="pensionlShekel">Shekel</Form.Check.Label>
											</Form.Check>
										</Col>
									</Form.Group>
								)}
								<Form.Group as={Row}>
									<Form.Label htmlFor="pensionAmount" column xs={xsLabel} md={mdLabel}>
										Total contribution
									</Form.Label>
									<Col xs={xsInput} md={mdInput}>
										<InputGroup>
											<FormControl
												as="input"
												id="pensionAmount"
												name="pensionAmount"
												type="number"
												inputMode="decimal"
												pattern="[0-9]*"
												step="0.01"
												min={pensionType === 'percent' ? pensionMinPecrcent : pensionMin}
												max={pensionType === 'percent' ? 100 : undefined}
												value={pensionAmount}
												onChange={handleChange}
												required
											/>
											<InputGroup.Append>
												<InputGroup.Text>{pensionType === 'percent' ? '%' : '₪'}</InputGroup.Text>
											</InputGroup.Append>
											<Form.Control.Feedback type="invalid">
												{pensionType === 'percent'
													? `Enter a valid percentage. The legal minimum is ${pensionMinPecrcent}%.`
													: `${invalidNum} The legal minimum is ${pensionMin}₪.`}
											</Form.Control.Feedback>
										</InputGroup>
									</Col>
								</Form.Group>
							</>
						)}
					</fieldset>
					<Form.Group as={Row}>
						<Form.Label htmlFor="educationFund" column xs={xsLabel} md={mdLabel}>
							Education fund
						</Form.Label>
						<Col xs={xsInput} md={mdInput}>
							<InputGroup>
								<FormControl
									as="input"
									id="educationFund"
									name="educationFund"
									type="number"
									inputMode="decimal"
									pattern="[0-9]*"
									step="0.01"
									min="1"
									max={taxData[taxYearIndex].educationFund[employmentType].salaryPercent}
									value={educationFund}
									onChange={handleChange}
									required={checkZeroOrGreater(educationFund)}
								/>
								<InputGroup.Append>
									<InputGroup.Text>%</InputGroup.Text>
								</InputGroup.Append>
								<Form.Control.Feedback type="invalid">
									{`The maximum contribution allowed is ${taxData[taxYearIndex].educationFund[employmentType].salaryPercent}.`}
								</Form.Control.Feedback>
							</InputGroup>
						</Col>
					</Form.Group>
				</fieldset>
				{employmentType === 'salaried' && (
					<>
						<fieldset>
							<Form.Label as="legend">Allowances</Form.Label>
							<Form.Group as={Row}>
								<Form.Label htmlFor="travelAllowance" column xs={xsLabel} md={mdLabel}>
									Travel
								</Form.Label>
								<Col xs={xsInput} md={mdInput}>
									<Form.Control
										as="input"
										id="travelAllowance"
										name="travelAllowance"
										type="number"
										inputMode="decimal"
										pattern="[0-9]*"
										step="0.01"
										min="0"
										value={travelAllowance}
										onChange={handleChange}
										required={checkZeroOrGreater(travelAllowance)}
									></Form.Control>
									<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label htmlFor="lunchAllowance" column xs={xsLabel} md={mdLabel}>
									Lunch
								</Form.Label>
								<Col xs={xsInput} md={mdInput}>
									<Form.Control
										as="input"
										id="lunchAllowance"
										name="lunchAllowance"
										type="number"
										inputMode="decimal"
										pattern="[0-9]*"
										step="0.01"
										min="0"
										value={lunchAllowance}
										onChange={handleChange}
										required={checkZeroOrGreater(lunchAllowance)}
									></Form.Control>
									<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
								</Col>
							</Form.Group>
						</fieldset>
						<fieldset>
							<Form.Label as="legend">Incentives</Form.Label>
							<Form.Group as={Row}>
								<Form.Label htmlFor="annualBonus" column xs={xsLabel} md={mdLabel}>
									One-time bonus or gift
								</Form.Label>
								<Col xs={xsInput} md={mdInput}>
									<Form.Control
										as="input"
										id="annualBonus"
										name="annualBonus"
										type="number"
										inputMode="decimal"
										pattern="[0-9]*"
										step="0.01"
										min="0"
										value={annualBonus}
										onChange={handleChange}
										required={checkZeroOrGreater(annualBonus)}
									></Form.Control>
									<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label htmlFor="commission" column xs={xsLabel} md={mdLabel}>
									Commission
								</Form.Label>
								<Col xs={xsInput} md={mdInput}>
									<Form.Control
										as="input"
										id="commission"
										name="commission"
										type="number"
										inputMode="decimal"
										pattern="[0-9]*"
										step="0.01"
										min="0"
										value={commission}
										onChange={handleChange}
										required={checkZeroOrGreater(commission)}
									></Form.Control>
									<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label htmlFor="overtime" column xs={xsLabel} md={mdLabel}>
									Overtime
								</Form.Label>
								<Col xs={xsInput} md={mdInput}>
									<Form.Control
										as="input"
										id="overtime"
										name="overtime"
										type="number"
										inputMode="decimal"
										pattern="[0-9]*"
										step="0.01"
										min="0"
										value={overtime}
										onChange={handleChange}
										required={checkZeroOrGreater(overtime)}
									></Form.Control>
									<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
								</Col>
							</Form.Group>
						</fieldset>
					</>
				)}
				<Button type="submit" variant="primary">
					Calculate
				</Button>
			</Form>
		</section>
	);
}

NetPayForm.propTypes = {
	handleSubmit: func,
	handleChange: func,
	stateData: shape({
		taxData: netPayType.taxData,
		baseIncome: netPayType.baseIncome,
		creditPoints: netPayType.creditPoints,
		pensionOption: netPayType.pensionOption,
		pensionAmount: netPayType.pensionAmount,
		educationFund: netPayType.educationFund,
		travelAllowance: netPayType.travelAllowance,
		lunchAllowance: netPayType.lunchAllowance,
		annualBonus: netPayType.annualBonus,
		commission: netPayType.commission,
		overtime: netPayType.overtime,
		validated: netPayType.validated
	})
};

export default NetPayForm;
