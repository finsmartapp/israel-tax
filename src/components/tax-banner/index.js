import React, { Component } from 'react';
import { globalProps } from '../../prop-types';
import TaxBanner from './Banner';
import './tax-banner.scss';

class TaxUpdateBanner extends Component {
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
			<TaxBanner
				active={this.props.active}
				display={this.state.display}
				handleClick={this.handleClick}
			/>
		);
	}
}

TaxUpdateBanner.propTypes = {
	active: globalProps.active
};

export default TaxUpdateBanner;
