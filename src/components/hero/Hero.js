import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../hero/hero.scss';

function Hero() {
	return (
		<Container fluid={true}>
			<Row>
				<Col xs={12} className="hero">
					<h1>Israel Tax Calculators</h1>
				</Col>
			</Row>
		</Container>
	);
}

export default Hero;
