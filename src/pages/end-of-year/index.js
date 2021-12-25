import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Hero from '../../components/hero/Hero';
import EndOfYearCalculator from '../../components/calculators/end-of-year';

function EndOfYear() {
	return (
		<>
			<Hero />
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} sm={10} md={8}>
						<EndOfYearCalculator />
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default EndOfYear;
