import React from 'react';
import { globalProps } from '../../prop-types';
import { Button } from 'react-bootstrap';

function CreditPointsTableShowMore(props) {
	const handleClick = props.handleClick;

	return (
		<Button type='button' variant='primary' onClick={handleClick}>
			View previous years
		</Button>
	);
}

CreditPointsTableShowMore.propTypes = {
	handleClick: globalProps.handleClick
};

export default CreditPointsTableShowMore;
