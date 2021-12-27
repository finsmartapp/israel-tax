import React from 'react';
import { heroProps } from '../../prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import '../hero/hero.scss';

function Hero(props) {
	return (
		<Container fluid={true}>
			<Row>
				<Col xs={12} className="hero">
					<h1>{props.h1}</h1>
				</Col>
			</Row>
		</Container>
	);
}

Hero.propTypes = {
	h1: heroProps.h1
};

export default Hero;
