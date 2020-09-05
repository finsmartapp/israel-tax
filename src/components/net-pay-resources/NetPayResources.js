import React from 'react';
import './NetPayResource.scss';
import Resource from './NetPayResource';
import bituachLeumi from '../../images/company-logos/bituach-leumi-logo.png';
import taxAuthority from '../../images/company-logos/tax-authority-logo.jpg';
import nefeshBnefesh from '../../images/company-logos/nefesh-bnefesh-logo.png';
import kolZchut from '../../images/company-logos/kol-zchut-logo.png';

function NetPayResources() {
	return (
		<section className="net-resources">
			<h2>Resources</h2>
			<Resource
				title="Israel Tax Authority"
				description="Income tax"
				image={taxAuthority}
				alt="Israel tax Authority logo"
				link="https://taxes.gov.il/English/IncomeTax/Pages/LobbyLayoutIncomeTax.aspx"
			/>
			<Resource
				title="Israel Tax Authority"
				description="Tax credit points calculator"
				image={taxAuthority}
				alt="Israel tax Authority logo"
				link="https://secapp.taxes.gov.il/srsimulatorNZ/#/simulator"
			/>
			<Resource
				title="Bituach Leumi"
				description="National and Health Insurance"
				image={bituachLeumi}
				alt="Bituach Leumi logo"
				link="https://www.btl.gov.il/English%20Homepage/Insurance/Ratesandamount/Pages/default.aspx"
			/>
			<Resource
				title="Nefesh B'Nefesh"
				description="Pay slip explained"
				image={nefeshBnefesh}
				alt="Nefesh B'Nefesh logo"
				link="https://www.nbn.org.il/aliyahpedia/employment-israel/employee-compensation-rights-benefits-israel/understanding-israeli-salary-stubs/"
			/>
			<Resource
				title="Kol Zchut"
				description="Rights and entitlements"
				image={kolZchut}
				alt="Kol Zchut logo"
				link="https://www.kolzchut.org.il/he/%D7%96%D7%99%D7%9B%D7%95%D7%99_%D7%9E%D7%9E%D7%A1_%D7%94%D7%9B%D7%A0%D7%A1%D7%94_%D7%91%D7%92%D7%99%D7%9F_%D7%94%D7%A4%D7%A8%D7%A9%D7%95%D7%AA_%D7%9C%D7%91%D7%99%D7%98%D7%95%D7%97_%D7%A4%D7%A0%D7%A1%D7%99%D7%95%D7%A0%D7%99"
			/>
		</section>
	);
}

export default NetPayResources;
