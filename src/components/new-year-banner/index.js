import React, { Component } from 'react';
import { globalProps } from '../../prop-types';
import Banner from './Banner';
import './new-year-banner.scss';

class NewTaxYearBanner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display: true
		};
	}

	handleClick = () => {
		this.setState({ display: false });
	};

	render() {
		return (
			<Banner
				active={this.props.active}
				display={this.state.display}
				handleClick={this.handleClick}
			/>
		);
	}
}

NewTaxYearBanner.propTypes = {
	active: globalProps.active
};

export default NewTaxYearBanner;
