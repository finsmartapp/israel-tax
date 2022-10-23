import React from 'react';
import { globalProps, payrollProps } from '../../prop-types';
import Hero from '../../components/hero';
import PageContainer from '../../components/page-container';
import StudyFund from '../../components/contribution-tables/study-fund';

function ContributionTables(props) {
	let h1;
	let content;
	switch (props.page) {
		case 1:
			h1 = 'Employee Study Fund';
			content = <StudyFund employmentType={props.employmentType} />;
			break;
		case 2:
			h1 = 'Self-employed Study Fund';
			content = <StudyFund employmentType={props.employmentType} />;
			break;
		default:
			h1 = 'Israel Tax Information';
			content = 'This is embarrassing! Please try a different page';
	}
	return (
		<>
			<Hero h1={h1} />
			<PageContainer>{content}</PageContainer>
		</>
	);
}

ContributionTables.propTypes = {
	page: globalProps.page,
	employmentType: payrollProps.employmentType
};

export default ContributionTables;
