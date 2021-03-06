import cuid from "cuid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Segment, Header } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";

const EventForm = ({ match, history }) => {
	const selectedEvent = useSelector((state) =>
		state.event.events.find((evt) => evt.id === match.params.id)
	);
	const dispatch = useDispatch();

	const initialValues = selectedEvent ?? {
		title: "",
		category: "",
		description: "",
		city: "",
		venue: ""
	};

	const [values, setValues] = useState(initialValues);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const onFormSubmit = () => {
		selectedEvent
			? dispatch(
					updateEvent({
						...selectedEvent,
						...values
					})
			  )
			: dispatch(
					createEvent({
						...values,
						id: cuid(),
						attendees: [],
						hostedBy: "Dani",
						hostPhotoURL: "/assets/user.png"
					})
			  );
		history.push("/events");
	};

	return (
		<Segment>
			<Header content={selectedEvent ? "Update Event" : "Create New Event"} />
			<Form onSubmit={onFormSubmit}>
				<Form.Field>
					<input
						type="text"
						placeholder="Event Title"
						name="title"
						onChange={(e) => handleInputChange(e)}
						value={values.title}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type="text"
						placeholder="Category"
						name="category"
						onChange={(e) => handleInputChange(e)}
						value={values.category}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type="text"
						placeholder="Description"
						name="description"
						onChange={(e) => handleInputChange(e)}
						value={values.description}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type="text"
						placeholder="City"
						name="city"
						onChange={(e) => handleInputChange(e)}
						value={values.city}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type="text"
						placeholder="Venue"
						name="venue"
						onChange={(e) => handleInputChange(e)}
						value={values.venue}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type="date"
						name="date"
						onChange={(e) => handleInputChange(e)}
						value={values.date}
					/>
				</Form.Field>
				<Form.Field>
					<Button type="submit" positive content="Submit" />
					<Button as={Link} to="/events" type="submit" content="Cancel" />
				</Form.Field>
			</Form>
		</Segment>
	);
};

export default EventForm;
