import React from 'react';
import { globalProps } from '../../prop-types';
import Hero from '../../components/hero';
import PageContainer from '../../components/page-container';
import StudyFund from '../../components/contribution-tables/study-fund';
import EmployeePension from '../../components/contribution-tables/pension/employee';
import SelfEmployedPension from '../../components/contribution-tables/pension/self-employed';

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
		case 3:
			h1 = 'Workplace Pension';
			content = <EmployeePension />;
			break;
		case 4:
			h1 = 'Self-employed Pension';
			content = <SelfEmployedPension />;
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
	employmentType: globalProps.employmentTypeOptional
};

export default ContributionTables;
