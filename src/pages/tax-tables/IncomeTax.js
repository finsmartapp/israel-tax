import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Hero from '../../components/hero/Hero';
import IncomeTaxBands from '../../components/tax-tables/income-tax';

function IncomeTax() {
	return (
		<>
			<Hero />
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} sm={10} md={8}>
						<IncomeTaxBands />
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default IncomeTax;
