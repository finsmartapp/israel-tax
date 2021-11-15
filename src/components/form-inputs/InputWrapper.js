import React from 'react';
import { globalProps, formProps } from '../../prop-types';
import { Form, Row, Col } from 'react-bootstrap';
import ConditionalWrapper from '../../utils/conditionalWrapper';
import { camelToKebab } from '../../utils/caseConvertor';

function InputWrapper(props) {
	const { label, name, horizontal, columns, type } = props;
	const horizontalForm = horizontal === undefined ? true : horizontal;
	const id = camelToKebab(name);
	//Processes colum size attributes passed as xx=# in an array and returns as literal
	const arrayToLiteral = e => {
		return [...e].reduce(
			(array, i) => ({ ...array, [i.match(/.*(?==)/)]: i.match(/[^=]*$/)[0] }),
			{}
		);
	};
	//
	const colSizeInput = columns.map(e => {
		const num = /\d+/;
		return e.replace(num, 12 - e.match(num));
	});

	return (
		<Form.Group
			className="mb-3"
			as={horizontalForm ? Row : Col}
			{...(!horizontalForm && arrayToLiteral(columns))}
			controlId={id}
		>
			<Form.Label
				column={horizontalForm ? true : false}
				{...(horizontalForm && arrayToLiteral(columns))}
				as={type === 'radio' && 'legend'}
			>
				{label}
			</Form.Label>
			<ConditionalWrapper
				condition={horizontalForm}
				wrapper={children => <Col {...arrayToLiteral(colSizeInput)}>{children}</Col>}
			>
				{props.children}
			</ConditionalWrapper>
		</Form.Group>
	);
}

InputWrapper.propTypes = {
	label: formProps.label,
	name: formProps.name,
	horizontal: formProps.horizontal,
	columns: formProps.columns,
	type: formProps.type,
	children: globalProps.children
};

export default InputWrapper;
