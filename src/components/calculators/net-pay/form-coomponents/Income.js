import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { keypadDisplay } from '../../../../utils/keypadDisplay';
import { invalidNum } from '../../../../utils/validationText';
import { isZeroOrGreater } from '../../../../utils/comparisons';

function NetPayIncome(props) {
	const { taxData, baseIncome, creditPoints } = props.stateData;
	const handleChange = props.handleChange;
	const employmentType = props.employmentType;
	const language = props.language;
	const { xsLabel, mdLabel, xsInput, mdInput } = props.formSize;

	return (
		<fieldset>
			<Form.Label as="legend">Tax</Form.Label>
			<Form.Group as={Row} controlId="taxYear">
				<Form.Label column xs={xsLabel} md={mdLabel}>
					Tax year
				</Form.Label>
				<Col xs={xsInput} md={mdInput}>
					<Form.Control
						as="select"
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
			<Form.Group as={Row} controlId="income">
				<Form.Label column xs={xsLabel} md={mdLabel}>
					{employmentType === 'employee' ? 'Base salary' : 'Profit'}
				</Form.Label>
				<Col xs={xsInput} md={mdInput}>
					<Form.Control
						name="baseIncome"
						type="number"
						pattern="[0-9]"
						inputMode={keypadDisplay(language)}
						step="0.01"
						min="0"
						required
						value={baseIncome}
						onChange={handleChange}
					></Form.Control>
					<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
				</Col>
			</Form.Group>
			<Form.Group as={Row} controlId="credit-points">
				<Form.Label column xs={xsLabel} md={mdLabel}>
					Tax credit points
				</Form.Label>
				<Col xs={xsInput} md={mdInput}>
					<Form.Control
						name="creditPoints"
						type="number"
						pattern="[0-9]"
						inputMode={keypadDisplay(language)}
						step="0.25"
						min="0"
						required={isZeroOrGreater(creditPoints)}
						value={creditPoints}
						onChange={handleChange}
					></Form.Control>
					<Form.Control.Feedback type="invalid">
						Must be a valid number in quater increments.
					</Form.Control.Feedback>
				</Col>
			</Form.Group>
		</fieldset>
	);
}

export default NetPayIncome;
