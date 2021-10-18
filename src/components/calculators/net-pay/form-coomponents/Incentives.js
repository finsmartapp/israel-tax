import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { keypadDisplay } from '../../../../utils/keypadDisplay';
import { invalidNum } from '../../../../utils/validationText';
import { isZeroOrGreater } from '../../../../utils/comparisons';

function NetPayIncentives(props) {
	const { annualBonus, commission, overtime } = props.stateData;
	const handleChange = props.handleChange;
	const language = props.language;
	const { xsLabel, mdLabel, xsInput, mdInput } = props.formSize;

	return (
		<fieldset>
			<Form.Label as="legend">Incentives</Form.Label>
			<Form.Group as={Row} controlId="annual-bonus">
				<Form.Label column xs={xsLabel} md={mdLabel}>
					One-time bonus or gift
				</Form.Label>
				<Col xs={xsInput} md={mdInput}>
					<Form.Control
						name="annualBonus"
						type="number"
						pattern="[0-9]"
						inputMode={keypadDisplay(language)}
						step="0.01"
						min="0"
						value={annualBonus}
						onChange={handleChange}
						required={isZeroOrGreater(annualBonus)}
					></Form.Control>
					<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
				</Col>
			</Form.Group>
			<Form.Group as={Row} controlId="commission">
				<Form.Label column xs={xsLabel} md={mdLabel}>
					Commission
				</Form.Label>
				<Col xs={xsInput} md={mdInput}>
					<Form.Control
						name="commission"
						type="number"
						pattern="[0-9]"
						inputMode={keypadDisplay(language)}
						step="0.01"
						min="0"
						value={commission}
						onChange={handleChange}
						required={isZeroOrGreater(commission)}
					></Form.Control>
					<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
				</Col>
			</Form.Group>
			<Form.Group as={Row} controlId="overtime">
				<Form.Label column xs={xsLabel} md={mdLabel}>
					Overtime
				</Form.Label>
				<Col xs={xsInput} md={mdInput}>
					<Form.Control
						name="overtime"
						type="number"
						pattern="[0-9]"
						inputMode={keypadDisplay(language)}
						step="0.01"
						min="0"
						value={overtime}
						onChange={handleChange}
						required={isZeroOrGreater(overtime)}
					></Form.Control>
					<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
				</Col>
			</Form.Group>
		</fieldset>
	);
}

export default NetPayIncentives;
