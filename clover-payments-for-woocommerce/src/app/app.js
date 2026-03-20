import { getSetting } from '@woocommerce/settings';
import { PaymentLayout } from '~/components/layouts/payment-layout/payment-layout';
import { PaymentLabel } from '~/components/ui/payment-label/payment-label';
import { __ } from '@wordpress/i18n';

const merchantSettings = getSetting( 'clover_payments_data', {} );

const cloverCardPaymentOptions = {
	name: 'clover_payments',
	title: __( 'Clover Payments', 'clover-payments-for-woocommerce' ),
	edit: <PaymentLayout merchantSettings={ merchantSettings } />,
	content: <PaymentLayout merchantSettings={ merchantSettings } />,
	canMakePayment: () => true,
	gatewayId: merchantSettings?.gatewayId ?? '',
	paymentMethodId: merchantSettings?.paymentMethodId ?? '',
	ariaLabel: __( 'Clover Card Payment Method', 'clover-payments-for-woocommerce' ),
	label: <PaymentLabel merchantSettings={ merchantSettings } />,
};

export { cloverCardPaymentOptions };
