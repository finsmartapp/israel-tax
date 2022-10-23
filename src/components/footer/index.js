import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.scss';

function Footer() {
	return (
		<footer>
			<Container fluid={true} className='footer-inner container'>
				<Row>
					<Col xs={12}>
						<p>The information on this site is intended as a guide only.</p>
						<p>
							All monthly tax calculators presume your income is the same each month and that you
							haven't reached retirement age.
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
}

export default Footer;
