import React, { Component } from 'react';
import { cardProps } from '../../prop-types';
import InfoCards from './Card';
import './info-card.scss';

class InfoCard extends Component {
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
			<InfoCards
				display={this.state.display}
				type={this.props.type}
				title={this.props.title}
				body={this.props.body}
				close={this.props.close}
				handleClick={this.handleClick}
			/>
		);
	}
}

InfoCard.propTypes = {
	type: cardProps.type,
	title: cardProps.title,
	body: cardProps.body,
	close: cardProps.close
};

export default InfoCard;
