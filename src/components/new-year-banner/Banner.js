import React from 'react';
import { globalProps } from '../../prop-types';
import CloseButton from 'react-bootstrap/CloseButton';
import { nextTaxYear } from '../../utils/globalVariables';

function Banner(props) {
	const { active, display, handleClick } = props;
	return (
		<>
			{active && (
				<div
					className='tax-banner'
					role='banner'
					style={{
						display: display === true ? 'block' : 'none'
					}}
				>
					<CloseButton variant='white' onClick={handleClick} />
					Tax information for {nextTaxYear} will be updated once it becomes publicly available.
				</div>
			)}
		</>
	);
}

Banner.propTypes = {
	active: globalProps.active,
	display: globalProps.display,
	handleClick: globalProps.handleClick
};

export default Banner;
