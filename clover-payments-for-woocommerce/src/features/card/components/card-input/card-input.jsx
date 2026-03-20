import { memo, useEffect, useId } from '@wordpress/element';
import { CC_STYLES } from './cc-styles';

const CardInput = memo( ( {
	cloverElementsInstance,
	fieldName,
	handleValidationOnChange,
	handleValidationOnBlur,
	handleValidationOnFocus,
	...props
} ) => {

	const rawId = useId().slice( 1, -1 );
	const id = `clover-input-${ rawId }`;

	useEffect( () => {
		const handleChange = ( event ) => {
			handleValidationOnChange( event, fieldName );
		};

		const handleBlur = ( event ) => {
			handleValidationOnBlur( event, fieldName );
		};

		const handleFocus = () => {
			handleValidationOnFocus( fieldName );
		};

		const element = cloverElementsInstance.create( fieldName, CC_STYLES );
		element.mount( `#${ id }` );
		element.addEventListener( 'change', handleChange );
		element.addEventListener( 'blur', handleBlur );
		element.addEventListener( 'focus', handleFocus );

		return () => {
			element.removeEventListener( 'change', handleChange );
			element.removeEventListener( 'blur', handleBlur );
			element.removeEventListener( 'focus', handleFocus );
		};
	}, [
		fieldName,
		cloverElementsInstance,
		handleValidationOnChange,
		handleValidationOnBlur,
		handleValidationOnFocus
	] );

	return <div id={ id } { ...props } />;
} );

export { CardInput };
