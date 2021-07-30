import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import Hero from '../../components/hero/Hero';
import NetPayContainer from '../../components/calculators/net-pay/NetPay';

function NetPayCalculator(props) {
	return (
		<>
			<Hero />
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} sm={10} md={8}>
						<NetPayContainer employmentType={props.employmentType} />
					</Col>
				</Row>
			</Container>
		</>
	);
}

NetPayCalculator.propTypes = {
	employmentType: PropTypes.string
};

export default NetPayCalculator;
