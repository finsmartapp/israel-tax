import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { keypadDisplay } from '../../../../utils/keypadDisplay';
import { invalidNum } from '../../../../utils/validationText';
import { isZeroOrGreater } from '../../../../utils/comparisons';

function NetPayAllowances(props) {
	const { travelAllowance, lunchAllowance, otherAllowance } = props.stateData;
	const handleChange = props.handleChange;
	const language = props.language;
	const { xsLabel, mdLabel, xsInput, mdInput } = props.formSize;

	return (
		<fieldset>
			<Form.Label as="legend">Allowances</Form.Label>
			<Form.Group as={Row} controlId="travel-allowance">
				<Form.Label column xs={xsLabel} md={mdLabel}>
					Transport
				</Form.Label>
				<Col xs={xsInput} md={mdInput}>
					<Form.Control
						name="travelAllowance"
						type="number"
						pattern="[0-9]"
						inputMode={keypadDisplay(language)}
						step="0.01"
						min="0"
						value={travelAllowance}
						onChange={handleChange}
						required={isZeroOrGreater(travelAllowance)}
					></Form.Control>
					<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
				</Col>
			</Form.Group>
			<Form.Group as={Row} controlId="lunch-allowance">
				<Form.Label column xs={xsLabel} md={mdLabel}>
					10bis / Cibus / Other Card
				</Form.Label>
				<Col xs={xsInput} md={mdInput}>
					<Form.Control
						name="lunchAllowance"
						type="number"
						pattern="[0-9]"
						inputMode={keypadDisplay(language)}
						step="0.01"
						min="0"
						value={lunchAllowance}
						onChange={handleChange}
						required={isZeroOrGreater(lunchAllowance)}
					></Form.Control>
					<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
				</Col>
			</Form.Group>
			<Form.Group as={Row} controlId="other-allowance">
				<Form.Label column xs={xsLabel} md={mdLabel}>
					Other
				</Form.Label>
				<Col xs={xsInput} md={mdInput}>
					<Form.Control
						name="otherAllowance"
						type="number"
						pattern="[0-9]"
						inputMode={keypadDisplay(language)}
						step="0.01"
						min="0"
						value={otherAllowance}
						onChange={handleChange}
						required={isZeroOrGreater(otherAllowance)}
					></Form.Control>
					<Form.Control.Feedback type="invalid">{invalidNum}</Form.Control.Feedback>
				</Col>
			</Form.Group>
		</fieldset>
	);
}

export default NetPayAllowances;
