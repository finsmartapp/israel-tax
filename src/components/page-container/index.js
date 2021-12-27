import React from 'react';
import { globalProps } from '../../prop-types';
import { Container, Row, Col } from 'react-bootstrap';

function PageContainer(props) {
	return (
		<Container as="main">
			<Row className="justify-content-center">
				<Col xs={12} sm={10} md={8}>
					{props.children}
				</Col>
			</Row>
		</Container>
	);
}

PageContainer.propTypes = {
	children: globalProps.children
};

export default PageContainer;
