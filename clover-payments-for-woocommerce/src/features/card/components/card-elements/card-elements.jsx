import { useCallback, useState } from '@wordpress/element';
import { CardInput } from '../card-input/card-input';
import { CardValidationError } from '../card-validation-error/card-validation-error';
import styles from './card-elements.module.css';

const CARD_FIELDS = {
	CARD_NAME: 'CARD_NAME',
	CARD_NUMBER: 'CARD_NUMBER',
	CARD_DATE: 'CARD_DATE',
	CARD_CVV: 'CARD_CVV',
	CARD_POSTAL_CODE: 'CARD_POSTAL_CODE',
};

const initialError = {
	renderError: false,
	errorMessage: '',
	focused: false,
};

const createInitialState = () => {
	return Object.keys( CARD_FIELDS ).reduce( ( acc, key ) => {
		acc[ key ] = { ...initialError };
		return acc;
	}, {} );
};

const ValidatedInputWrapper = ( {
	fieldName,
	cloverElementsInstance,
	handleValidationOnChange,
	handleValidationOnBlur,
	handleValidationOnFocus,
	validationErrors,
	inputClassName,
} ) => {
	const errorState = validationErrors[ fieldName ];

	return (
		<>
			<CardInput
				cloverElementsInstance={ cloverElementsInstance }
				fieldName={ fieldName }
				handleValidationOnChange={ handleValidationOnChange }
				handleValidationOnBlur={ handleValidationOnBlur }
				handleValidationOnFocus={ handleValidationOnFocus }
				className={ inputClassName }
			/>
			{ errorState.renderError && (
				<CardValidationError error={ errorState.errorMessage } />
			) }
		</>
	);
};

const CardElements = ( { cloverElementsInstance } ) => {
	const [ validationErrors, setValidationErrors ] = useState( createInitialState );

	const handleValidationOnChange = useCallback( ( event, fieldName ) => {
		setValidationErrors( ( prevErrors ) => ( {
			...prevErrors,
			[ fieldName ]: {
				...prevErrors[ fieldName ],
				renderError: false,
			},
		} ) );
	}, [] );

	const handleValidationOnBlur = useCallback( ( event, fieldName ) => {
		setValidationErrors( ( prevErrors ) => ( {
			...prevErrors,
			[ fieldName ]: {
				...prevErrors[ fieldName ],
				renderError: event[ fieldName ].touched && !!event[ fieldName ].error,
				errorMessage: event[ fieldName ].error,
				focused: false,
			},
		} ) );
	}, [] );

	const handleValidationOnFocus = useCallback( ( fieldName ) => {
		setValidationErrors( ( prevErrors ) => ( {
			...prevErrors,
			[ fieldName ]: {
				...prevErrors[ fieldName ],
				focused: true,
			},
		} ) );
	}, [] );

	const applyStyle = ( fieldName ) => {
		if ( validationErrors[ fieldName ].focused ) {
			return styles.inputFocused;
		}
		if ( validationErrors[ fieldName ].renderError ) {
			return styles.inputError;
		}
		return styles.inputDefault;
	};

	const commonInputProps = {
		cloverElementsInstance,
		handleValidationOnChange,
		handleValidationOnBlur,
		handleValidationOnFocus,
		validationErrors,
	};

	return (
		<>
			<div className={ styles.cardRowTop }>
				<ValidatedInputWrapper
					{ ...commonInputProps }
					fieldName={ CARD_FIELDS.CARD_NAME }
					inputClassName={ applyStyle( CARD_FIELDS.CARD_NAME ) }
				/>
			</div>
			<div className={ styles.cardRowTop }>
				<ValidatedInputWrapper
					{ ...commonInputProps }
					fieldName={ CARD_FIELDS.CARD_NUMBER }
					inputClassName={ applyStyle( CARD_FIELDS.CARD_NUMBER ) }
				/>
			</div>
			<div className={ styles.cardRowCenter }>
				<div className={ styles.centerContainer__left }>
					<ValidatedInputWrapper
						{ ...commonInputProps }
						fieldName={ CARD_FIELDS.CARD_DATE }
						inputClassName={ applyStyle( CARD_FIELDS.CARD_DATE ) }
					/>
				</div>
				<div className={ styles.centerContainer__right }>
					<ValidatedInputWrapper
						{ ...commonInputProps }
						fieldName={ CARD_FIELDS.CARD_CVV }
						inputClassName={ applyStyle( CARD_FIELDS.CARD_CVV ) }
					/>
				</div>
			</div>
			<div className={ styles.cardRowBottom }>
				<div className={ styles.rowBottomWrapper__width }>
					<div className={ styles.rowBottomWrapper__margin }>
						<ValidatedInputWrapper
							{ ...commonInputProps }
							fieldName={ CARD_FIELDS.CARD_POSTAL_CODE }
							inputClassName={ applyStyle( CARD_FIELDS.CARD_POSTAL_CODE ) }
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export { CardElements };
