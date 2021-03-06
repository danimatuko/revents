import React from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector } from "react-redux";

const EventsDashboard = () => {
	const events = useSelector((state) => state.event.events);

	return (
		<Grid>
			<Grid.Column width={10}>
				<EventList events={events} />
			</Grid.Column>
			<Grid.Column width={6}>
				<h2>Filters</h2>
			</Grid.Column>
		</Grid>
	);
};

export default EventsDashboard;
