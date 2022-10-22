import React from 'react';
import { object } from 'prop-types';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import LanguageSelector from '../navbar/language-selector';
import { LinkContainer } from 'react-router-bootstrap';

function NavigationMenu(props) {
	return (
		<Navbar ref={props.nav} expand='lg' sticky='top'>
			<Container>
				<LinkContainer exact to='/'>
					<Navbar.Brand>IsraelTax</Navbar.Brand>
				</LinkContainer>
				<LanguageSelector />
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<LinkContainer exact to='/'>
							<Nav.Link>Home</Nav.Link>
						</LinkContainer>
						<NavDropdown title='Employee'>
							<LinkContainer to='/employee/net-pay-calculator'>
								<NavDropdown.Item>Net Pay Calculator</NavDropdown.Item>
							</LinkContainer>
						</NavDropdown>
						<NavDropdown title='Self-employed'>
							<LinkContainer to='/self-employed/net-pay-calculator'>
								<NavDropdown.Item>Net Pay Calculator</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to='/self-employed/end-of-year-calculator'>
								<NavDropdown.Item>End of Year Calculator</NavDropdown.Item>
							</LinkContainer>
						</NavDropdown>
						<NavDropdown title='Tax Rates & Bands'>
							<LinkContainer to='/tax-rates/income-tax'>
								<NavDropdown.Item>Income Tax</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to='/tax-rates/credit-points'>
								<NavDropdown.Item>Credit Points</NavDropdown.Item>
							</LinkContainer>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

NavigationMenu.propTypes = {
	nav: object.isRequired
};

export default NavigationMenu;
