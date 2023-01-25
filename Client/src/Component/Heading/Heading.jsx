const Heading = (props) => {
	return (
		<>
			<p
				className={`fs-6 font-lato headingColor fw-bold d-flex justify-content-${props.position} my-1`}>
				{props.subheading}
			</p>
			<h2 className={`font-heebo fw-bold fs-2 d-flex justify-content-${props.position}`}>
				{props.heading}
			</h2>
		</>
	);
};

export default Heading;
