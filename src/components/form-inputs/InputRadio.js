import React from 'react';
import { globalProps, formProps } from '../../prop-types';
import { Form } from 'react-bootstrap';
import InputWrapper from './InputWrapper';
import { camelToKebab } from '../../utils/caseConvertor';

function InputRadio(props) {
	const {
		label,
		name,
		state,
		btnValue,
		btnLabel,
		disabled,
		columns,
		horizontal,
		inline,
		handleChange,
		help,
		helpInput,
		helpCondition
	} = props;
	const id = camelToKebab(name);
	const btnId = btnValue.map(e => {
		return `${id}-${camelToKebab(e)}`;
	});
	const ariaHelp = `${id}-help`;

	return (
		<fieldset>
			<InputWrapper
				name={name}
				label={label}
				columns={columns}
				horizontal={horizontal}
				type="radio"
			>
				{btnValue.map((e, i) => (
					<Form.Check
						key={i}
						type="radio"
						inline={inline === undefined ? true : inline}
						label={btnLabel[i]}
						name={name}
						value={e}
						disabled={disabled === undefined ? false : disabled[i]}
						id={btnId[i]}
						onChange={handleChange}
						checked={state === btnValue[i]}
						aria-describedby={e === helpInput ? ariaHelp : undefined}
					/>
				))}
				{helpCondition || (helpCondition === undefined && help !== undefined) ? (
					<Form.Text className="text-muted" id={ariaHelp}>
						{help}
					</Form.Text>
				) : (
					''
				)}
			</InputWrapper>
		</fieldset>
	);
}

InputRadio.propTypes = {
	handleChange: globalProps.handleChange,
	label: formProps.label,
	name: formProps.name,
	horizontal: formProps.horizontal,
	columns: formProps.columns,
	help: formProps.help,
	helpCondition: formProps.helpCondition,
	helpInput: formProps.helpInput,
	inline: formProps.inline,
	btnValue: formProps.btnValue,
	btnLabel: formProps.btnLabel,
	disabled: formProps.disabled,
	state: formProps.state
};

export default InputRadio;
