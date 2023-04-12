import React from 'react';
import { globalProps, formProps } from '../../prop-types';
import { Form, InputGroup } from 'react-bootstrap';
import ConditionalWrapper from '../../utils/conditionalWrapper';
import InputWrapper from './InputWrapper';
import { keypadDisplay } from '../../utils/keypadDisplay';
import { camelToKebab } from '../../utils/caseConvertor';

function InputField(props) {
	const {
		language,
		label,
		name,
		value,
		symbol,
		min,
		max,
		step,
		horizontal,
		labelColumns,
		handleChange,
		help,
		required,
		error
	} = props;
	const controls = {
		type: 'number',
		pattern: '[0-9]',
		inputMode: keypadDisplay(language),
		min: min === undefined ? 0 : parseFloat(min),
		max: max === undefined ? undefined : max,
		step: step === undefined ? 0.01 : step
	};
	const appendSymbol = symbol === undefined ? false : true;
	const aria = camelToKebab(name);
	const ariaError = `${aria}-error`;
	const ariaSymbol = appendSymbol ? `${aria}-symbol` : '';

	return (
		<InputWrapper name={name} label={label} labelColumns={labelColumns} horizontal={horizontal}>
			<ConditionalWrapper
				condition={appendSymbol}
				wrapper={children => <InputGroup hasValidation>{children}</InputGroup>}
			>
				<Form.Control
					name={name}
					value={value}
					{...controls}
					onChange={handleChange}
					required={required}
					aria-describedby={`${ariaError} ${ariaSymbol}`}
				/>
				{appendSymbol && <InputGroup.Text id={ariaSymbol}>{symbol}</InputGroup.Text>}
				{help !== undefined && (
					<Form.Text id='passwordHelpBlock' muted>
						{help}
					</Form.Text>
				)}
				<Form.Control.Feedback type='invalid' id={ariaError}>
					{error}
				</Form.Control.Feedback>
			</ConditionalWrapper>
		</InputWrapper>
	);
}

InputField.propTypes = {
	handleChange: globalProps.handleChange,
	language: globalProps.language,
	label: formProps.label,
	name: formProps.name,
	value: formProps.value,
	symbol: formProps.symbol,
	min: formProps.min,
	max: formProps.max,
	step: formProps.step,
	horizontal: formProps.horizontal,
	labelColumns: formProps.labelColumns,
	required: formProps.required,
	error: formProps.error,
	help: formProps.help
};

export default InputField;
