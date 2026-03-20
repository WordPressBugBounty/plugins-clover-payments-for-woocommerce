const CreditCardIcon = ( { height = '24', width = '24' } ) => {
	return (
		<svg
			width={ width }
			height={ height }
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M3 8.6H21M6.6 12.2H13.2M6.6 14.6H10.8M4.2 5H19.8C20.4627 5 21 5.53726 21 6.2V17C21 17.6627 20.4627 18.2 19.8 18.2H4.2C3.53726 18.2 3 17.6627 3 17V6.2C3 5.53726 3.53726 5 4.2 5Z"
				stroke="black"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export { CreditCardIcon };
