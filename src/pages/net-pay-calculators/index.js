import React from 'react';
import { globalProps } from '../../prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import Hero from '../../components/hero/Hero';
import NetPay from '../../components/calculators/net-pay';

function NetPayCalculator(props) {
	return (
		<>
			<Hero />
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} sm={10} md={8}>
						<NetPay employmentType={props.employmentType} />
					</Col>
				</Row>
			</Container>
		</>
	);
}

NetPayCalculator.propTypes = {
	employmentType: globalProps.employmentType
};

export default NetPayCalculator;
