import React from 'react';
import { globalProps, taxProps, formProps } from '../../../prop-types';
import { Form, Row } from 'react-bootstrap';
import InputField from '../../../components/form-inputs/InputField';
import InputRadio from '../../../components/form-inputs/InputRadio';
import { invalidNum } from '../../../utils/validationText';
import { invalidPercent } from '../../../utils/validationText';

function EndOfYearStudyFund(props) {
	const { studyFundOption, studyFundType, studyFundAmount } = props.stateData;
	const handleChange = props.handleChange;
	const language = props.language;
	const formIndex = props.formIndex;

	return (
		<fieldset>
			<Form.Label as='legend'>Study Fund</Form.Label>
			<Row className='hideLabels'>
				<InputRadio
					label='Option'
					name={`studyFundOption${formIndex}`}
					state={studyFundOption[formIndex]}
					btnLabel={['None', 'Maximum\u{0002A}\u{0002A}', 'Custom']}
					btnValue={['none', 'maximum', 'custom']}
					labelColumns={studyFundOption[formIndex] === 'custom' ? ['md=4', 'lg=5'] : ['xs=12']}
					horizontal={false}
					handleChange={handleChange}
				/>
				{studyFundOption[formIndex] === 'custom' && (
					<>
						<InputRadio
							label='Type'
							name={`studyFundType${formIndex}`}
							state={studyFundType[formIndex]}
							btnLabel={['Shekel', 'Percent']}
							btnValue={['shekel', 'percent']}
							labelColumns={['xs=7', 'md=4', 'lg=4']}
							horizontal={false}
							handleChange={handleChange}
						/>
						<InputField
							language={language}
							label='Amount'
							name={`studyFundAmount${formIndex}`}
							value={studyFundAmount[formIndex]}
							symbol={studyFundType[formIndex] === 'percent' ? '%' : '₪'}
							max={studyFundType[formIndex] === 'percent' ? 100 : undefined}
							labelColumns={['xs=5', 'md=4', 'lg=3']}
							horizontal={false}
							handleChange={handleChange}
							required={true}
							error={studyFundType[formIndex] === 'percent' ? `${invalidPercent}` : `${invalidNum}`}
						/>
					</>
				)}
			</Row>
		</fieldset>
	);
}

EndOfYearStudyFund.propTypes = {
	handleChange: globalProps.handleChange,
	language: globalProps.language,
	formIndex: formProps.formIndex,
	stateData: globalProps.shape({
		studyFundOption: taxProps.studyFundOption,
		studyFundType: taxProps.studyFundType,
		studyFundAmount: taxProps.studyFundAmount
	})
};

export default EndOfYearStudyFund;
