import React from 'react';
import InfoCard from '../../../components/info-card';

export function bituachLeumiAdvances() {
	return (
		<InfoCard
			type='warning'
			title='No Bituach Leumi Advances Provided'
			body={
				<p>
					Bituach Leumi advances are, in part, deemed to be a recognised expense and therefore lower
					your overall tax contributions. By not providing what advances you've made, the estimated
					taxes are likely higher than they should be.
				</p>
			}
			close={true}
		/>
	);
}
