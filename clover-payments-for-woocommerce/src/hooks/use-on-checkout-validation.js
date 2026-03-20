import { CHECKOUT_STORE_KEY } from '@woocommerce/block-data';
import { useEffect } from '@wordpress/element';
import { select } from '@wordpress/data';

const useOnCheckoutValidation = (
	onCheckoutValidation,
	cloverInstance,
	applePayTokenRef
) => {
	useEffect( () => {
		const onValidation = () => {
			const applePayToken = applePayTokenRef.current;
			const checkoutHasError = select( CHECKOUT_STORE_KEY ).hasError();

			// If WooCommerce encounters any issues with the information the
			// customer has entered (i.e., billing address, shipping address,
			// email, etc.), update the Clover Apple Pay status to 'failed',
			// so the Apple Pay modal closes and shows the checkout page again
			// with any WooCommerce errors.
			if ( checkoutHasError && applePayToken ) {
				cloverInstance.updateApplePaymentStatus( 'failed' );
			}
		};

		const unsubscribe = onCheckoutValidation( onValidation );

		return () => unsubscribe();
	}, [ onCheckoutValidation, cloverInstance, applePayTokenRef ] );

	return null;
};

export { useOnCheckoutValidation };
