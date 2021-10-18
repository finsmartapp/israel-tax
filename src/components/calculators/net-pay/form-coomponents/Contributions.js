import React from 'react';
import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { keypadDisplay } from '../../../../utils/keypadDisplay';
import { invalidNum, invalidPercent } from '../../../../utils/validationText';
import { isZeroOrGreater } from '../../../../utils/comparisons';
import { pensionMinCalc } from '../../../../utils/tax-calculators/pensionLegalMin';

function NetPayContributions(props) {
	const {
		taxData,
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
	const { xsLabel, mdLabel, xsInput, mdInput } = props.formSize;
	const pensionMin = pensionMinCalc(taxData, taxYearIndex, baseIncome, employmentType).toFixed(2);
	const pensionMinPecrcent = ((pensionMin / baseIncome) * 100).toFixed(2);

	return (
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
								value="custom"
								checked={pensionOption === 'custom'}
								disabled={baseIncome >= 1 ? false : true}
								onChange={handleChange}
							/>
							<Form.Check.Label htmlFor="pensionlExtra">Custom</Form.Check.Label>
						</Form.Check>
						{baseIncome < 1 && (
							<div className="small">
								{employmentType === 'employee'
									? 'Enter a base salary to select custom.'
									: 'Enter profit to select custom.'}
							</div>
						)}
					</Col>
				</Form.Group>
				{pensionOption === 'custom' && (
					<>
						{employmentType === 'selfEmployed' && (
							<Form.Group as={Row}>
								<Form.Label column xs={xsLabel} md={mdLabel}>
									Type
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
						<Form.Group as={Row} controlId="pensionAmount">
							<Form.Label column xs={xsLabel} md={mdLabel}>
								Amount
							</Form.Label>
							<Col xs={xsInput} md={mdInput}>
								<InputGroup>
									<FormControl
										name="pensionAmount"
										type="number"
										pattern="[0-9]"
										inputMode={keypadDisplay(language)}
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
											? `${invalidPercent} The legal minimum is ${pensionMinPecrcent}%.`
											: `${invalidNum} The legal minimum is ${pensionMin}₪.`}
									</Form.Control.Feedback>
								</InputGroup>
							</Col>
						</Form.Group>
					</>
				)}
			</fieldset>
			<fieldset>
				<Form.Group as={Row}>
					<Form.Label as="legend" column xs={xsLabel} md={mdLabel}>
						Study fund
					</Form.Label>
					<Col xs={xsInput} md={mdInput}>
						<Form.Check inline>
							<Form.Check.Input
								type="radio"
								id="studyFundPercent"
								name="studyFundType"
								value="percent"
								checked={studyFundType === 'percent'}
								onChange={handleChange}
							/>
							<Form.Check.Label htmlFor="studyFundPercent">Percent</Form.Check.Label>
						</Form.Check>
						<Form.Check inline>
							<Form.Check.Input
								type="radio"
								id="studyFundShekel"
								name="studyFundType"
								value="shekel"
								checked={studyFundType === 'shekel'}
								onChange={handleChange}
							/>
							<Form.Check.Label htmlFor="studyFundShekel">Shekel</Form.Check.Label>
						</Form.Check>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label htmlFor="studyFundAmount" column xs={xsLabel} md={mdLabel}>
						Amount
					</Form.Label>
					<Col xs={xsInput} md={mdInput}>
						<InputGroup>
							<FormControl
								as="input"
								id="studyFundAmount"
								name="studyFundAmount"
								type="number"
								pattern="[0-9]"
								inputMode={keypadDisplay(language)}
								step="0.01"
								min="0"
								max={studyFundType === 'percent' ? 100 : undefined}
								value={studyFundAmount}
								onChange={handleChange}
								required={isZeroOrGreater(studyFundAmount)}
							/>
							<InputGroup.Append>
								<InputGroup.Text>{studyFundType === 'percent' ? '%' : '₪'}</InputGroup.Text>
							</InputGroup.Append>
							<Form.Control.Feedback type="invalid">
								{studyFundType === 'percent' ? `${invalidPercent}` : `${invalidNum}`}
							</Form.Control.Feedback>
						</InputGroup>
					</Col>
				</Form.Group>
			</fieldset>
		</fieldset>
	);
}

export default NetPayContributions;
