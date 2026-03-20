import styles from './payment-label.module.css';
import { CreditCardIcon } from '~/assets/icons/credit-card-icon';

const PaymentLabel = ( { merchantSettings, components } ) => {
	const { title } = merchantSettings;
	const { PaymentMethodLabel } = components;

	return (
		<div className={ styles.label } >
			<PaymentMethodLabel text={ title } />
			<CreditCardIcon />
		</div>
	);
};

export { PaymentLabel };
