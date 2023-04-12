import React from 'react';
import { globalProps, formProps } from '../../prop-types';
import { Form, Row, Col } from 'react-bootstrap';
import ConditionalWrapper from '../../utils/conditionalWrapper';
import { camelToKebab } from '../../utils/caseConvertor';

function InputWrapper(props) {
	const { label, name, horizontal, labelColumns, type } = props;
	const radio = {
		as: 'legend' //workaround as ternary doesn't work with as
	};
	const horizontalForm = horizontal === undefined ? true : horizontal;
	const id = camelToKebab(name);
	//Processes colum size attributes passed as xx=# in an array and returns as literal
	const arrayToLiteral = e => {
		return [...e].reduce(
			(array, i) => ({ ...array, [i.match(/.*(?==)/)]: i.match(/[^=]*$/)[0] }),
			{}
		);
	};
	const inputColumns = labelColumns.map(e => {
		const num = /\d+/;
		return e.replace(num, 12 - e.match(num));
	});

	return (
		<Form.Group
			className='mb-3'
			as={horizontalForm ? Row : Col}
			{...(!horizontalForm && arrayToLiteral(labelColumns))}
			controlId={id}
		>
			<ConditionalWrapper
				condition={!horizontalForm && type === 'radio'}
				wrapper={children => <fieldset>{children}</fieldset>}
			>
				<Form.Label
					column={horizontalForm ? true : false}
					{...(horizontalForm && arrayToLiteral(labelColumns))}
					{...(type === 'radio' && radio)}
				>
					{label}
				</Form.Label>
				<ConditionalWrapper
					condition={horizontalForm}
					wrapper={children => <Col {...arrayToLiteral(inputColumns)}>{children}</Col>}
				>
					{props.children}
				</ConditionalWrapper>
			</ConditionalWrapper>
		</Form.Group>
	);
}

InputWrapper.propTypes = {
	label: formProps.label,
	name: formProps.name,
	horizontal: formProps.horizontal,
	labelColumns: formProps.labelColumns,
	type: formProps.type,
	children: globalProps.children
};

export default InputWrapper;
