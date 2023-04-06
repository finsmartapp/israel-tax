import React from 'react';
import { globalProps, formProps } from '../../prop-types';
import { Form } from 'react-bootstrap';
import InputWrapper from './InputWrapper';
import { camelToKebab } from '../../utils/caseConvertor';

function InputSelect(props) {
	const {
		label,
		name,
		startIndex,
		dataSource,
		dataKey,
		horizontal,
		columns,
		handleChange,
		controlled,
		required,
		error
	} = props;
	const placeholder = controlled === undefined ? false : controlled;
	const showPlacholder = placeholder ? { value: startIndex } : { defaultValue: '' };
	const ariaHelp = `${camelToKebab(name)}-help`;

	return (
		<InputWrapper name={name} label={label} columns={columns} horizontal={horizontal}>
			<Form.Select
				name={name}
				{...showPlacholder}
				onChange={handleChange}
				required={required}
				aria-describedby={ariaHelp}
			>
				<option disabled value=''>
					Select
				</option>
				{dataSource.map((e, i) => (
					<option key={i} value={i}>
						{e[dataKey]}
					</option>
				))}
			</Form.Select>
			<Form.Control.Feedback type='invalid' id={ariaHelp}>
				{error}
			</Form.Control.Feedback>
		</InputWrapper>
	);
}

InputSelect.propTypes = {
	handleChange: globalProps.handleChange,
	label: formProps.label,
	name: formProps.name,
	startIndex: formProps.startIndex,
	dataSource: formProps.dataSource,
	dataKey: formProps.dataKey,
	horizontal: formProps.horizontal,
	columns: formProps.columns,
	controlled: formProps.controlled,
	required: formProps.required,
	error: formProps.error
};

export default InputSelect;
