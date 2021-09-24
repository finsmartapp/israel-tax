import { string, func } from 'prop-types';

export const globalProps = {
	handleSubmit: func.isRequired,
	handleChange: func.isRequired,
	handleClick: func.isRequired,
	employmentType: string.isRequired,
	lanuage: string.isRequired
};
