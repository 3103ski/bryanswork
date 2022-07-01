// --> React
import React from 'react';
import { Link } from 'react-router-dom';

// --> Packages
import { Icon } from '@iconify/react';
import { Grid } from 'semantic-ui-react';

// --> Project Imports
import { Section, TextWrapper } from 'components';
import { SURVEY, EMAIL } from 'icons';
import { CONTACT, REQUEST_QUOTE, EXPLORE_PROJECTS } from 'routes';

// --> Component Imports
import Style from './needSiteHeader.module.scss';

export default function NeedSiteHeader() {
	const OptionCard = ({ icon, text, route }) => (
		<Grid.Column computer={5} tablet={13} mobile={8} className={Style.OptionColumn}>
			<Link to={route}>
				<div className={Style.OptionCard}>
					<h3>{text}</h3>
					<Icon icon={icon} />
				</div>
			</Link>
		</Grid.Column>
	);
	return (
		<Section className={Style.Wrapper}>
			<Grid>
				<Grid.Row>
					<Grid.Column mobile={16} tablet={16} computer={16}>
						<h1>Need A Developer?</h1>
					</Grid.Column>
					<OptionCard text={`Send A Message`} icon={EMAIL} route={CONTACT} />
					<OptionCard text='Project Survey' icon={SURVEY} route={REQUEST_QUOTE} />
					<OptionCard text='Explore Work' icon={SURVEY} route={EXPLORE_PROJECTS} />
				</Grid.Row>
				<Grid.Row>
					<Grid.Column mobile={16} tablet={16} computer={16}>
						<TextWrapper>
							<h2>Businesses</h2>
							<p>
								Make sure your company looks good on the web. We can build a small site to advertise
								your local business, or build a robust website for selling your products around the
								world.
							</p>
							<p>
								Are you forward thinking about your business scaling? We can build business facing
								solutions for you and your company; scheduling, record keeping, inventory- whatever you
								need to get your business running better.
							</p>
						</TextWrapper>
						<TextWrapper>
							<h2>Freelancers</h2>
							<p>
								If you have work to show off to people, it can play a huge role in getting more work to
								show off later! Whether you need something basic, or you need to design something that
								feels as good as the work you're putting out there, we're going to
								<strong> make something you're proud to send to potential clients.</strong>
							</p>
						</TextWrapper>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Section>
	);
}
