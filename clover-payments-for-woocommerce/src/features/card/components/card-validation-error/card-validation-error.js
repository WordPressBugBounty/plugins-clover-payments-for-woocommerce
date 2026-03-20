import styles from './card-validation-error.module.css';
import { ErrorIcon } from '~/features/card/assets/error';

const CardValidationError = ( { error } ) => {
	return (
		<div
			aria-live="polite"
			role="alert"
			className={ styles.validationInputError__wrapper }
		>
			<p className={ styles.validationInputError } >
				<ErrorIcon className={ styles.errorIcon } />
				{ error }
			</p>
		</div>
	);
};

export { CardValidationError };
