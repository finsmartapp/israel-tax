import React from 'react';
import { panelProps } from '../../prop-types';
import Card from 'react-bootstrap/Card';
import './card.scss';

function Cards(props) {
	return (
		<Card border={props.type}>
			<Card.Header>
				<Card.Title className={`card-icon card-icon--${props.type}`}>{props.title}</Card.Title>
			</Card.Header>
			<Card.Body>
				<div className='card-text'>{props.body}</div>
			</Card.Body>
		</Card>
	);
}

Cards.propTypes = {
	type: panelProps.type,
	title: panelProps.title,
	body: panelProps.body
};

export default Cards;
