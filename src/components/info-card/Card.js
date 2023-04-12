import React from 'react';
import { cardProps, globalProps } from '../../prop-types';
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';

function InfoCards(props) {
	const { type, display, title, body, close, handleClick } = props;
	return (
		<Card
			border={type}
			style={{
				display: display === true ? 'block' : 'none'
			}}
		>
			<Card.Header>
				<Card.Title className={`card-icon card-icon--${type}`}>{title}</Card.Title>
				{close && <CloseButton onClick={handleClick} />}
			</Card.Header>
			<Card.Body>
				<div className='card-text'>{body}</div>
			</Card.Body>
		</Card>
	);
}

InfoCards.propTypes = {
	type: cardProps.type,
	title: cardProps.title,
	body: cardProps.body,
	close: cardProps.close,
	display: globalProps.display,
	handleClick: globalProps.handleClick
};

export default InfoCards;
