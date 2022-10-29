import React from 'react';
import { globalProps, payrollProps } from '../../../../prop-types';
import PayrollTaxYearBtn from '../../../buttons/PayrollYear';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../../../utils/formatCurrency';

function SelfEmployedPensionRates(props) {
	const { taxYearIndex, taxData, handleChange } = props;
	const { reducedRate, fullRate } = taxData[0].pension.legalMin.selfEmployed;
	const averageWage = taxData[taxYearIndex].bituachLeumi.averageSalary;
	const averageWageHalf = averageWage / 2;
	const reducedMax = averageWageHalf * (reducedRate / 100) * 12;
	const fullMax = averageWageHalf * (fullRate / 100) * 12;

	return (
		<section>
			<h2>Contribution Rates</h2>
			<div className='section'>
				<p>
					You're required to contribute to a pension by law. The minimum contribution amounts are
					calculated in relation to your taxable income and the national average wage, up to a
					maximum required amount.
				</p>
			</div>
			<PayrollTaxYearBtn
				value={taxYearIndex}
				columns={['xs=auto']}
				handleChange={handleChange}
				controlled={true}
			/>
			<p>
				The national avergae wage for the tax year is {formatCurrency('il', averageWage, 0)} a
				month.
			</p>
			<Table striped bordered className='table--col-3 table__header--blue'>
				<thead>
					<tr className='table__row-header table__row-header--primary'>
						<th>National Average</th>
						<th>Percent</th>
						<th>Annual Maximum</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Up to 50%</td>
						<td>{reducedRate}</td>
						<td>{formatCurrency('il', reducedMax, 0)}</td>
					</tr>
					<tr>
						<td>Over 50%</td>
						<td>{fullRate}</td>
						<td>{formatCurrency('il', fullMax, 0)}</td>
					</tr>

					<tr className='table__total'>
						<td>Total</td>
						<td></td>
						<td>{formatCurrency('il', reducedMax + fullMax, 0)}</td>
					</tr>
				</tbody>
			</Table>
		</section>
	);
}

SelfEmployedPensionRates.propTypes = {
	taxYearIndex: payrollProps.taxYearIndex,
	taxData: payrollProps.taxData,
	handleChange: globalProps.handleChange
};

export default SelfEmployedPensionRates;
