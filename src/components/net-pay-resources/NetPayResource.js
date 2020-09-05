import React from 'react';
import { string } from 'prop-types';

function Resource(props) {
	return (
		<div className="net-resource">
			<a href={props.link} target="_blank" rel="noopener noreferrer">
				<img src={props.image} alt={props.alt} />
				<h3>{props.title}</h3>
				<p>{props.description}</p>
			</a>
		</div>
	);
}

Resource.propTypes = {
	link: string.isRequired,
	image: string.isRequired,
	alt: string.isRequired,
	title: string.isRequired,
	description: string.isRequired
};

export default Resource;
