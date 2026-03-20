import styles from './apple-pay-button.module.css';
import { applePayButtonStyles } from './apple-pay-button-styles';
import { memo, useEffect, useRef, useId } from '@wordpress/element';

const ApplePayButton = memo(
	( {
		cloverInstance,
		cloverElementsInstance,
		onTokenReceived,
		billing,
		merchantSettings,
	} ) => {
		const { cartTotal, currency, billingAddress } = billing;
		const { merchantId } = merchantSettings;
		const applePayContainerRef = useRef( null );
		const rawId = useId().slice( 1, -1 );
		const id = `clover-apple-pay-${ rawId }`;

		useEffect( () => {
			const handleApplePayEvent = ( event ) => {
				if ( event?.detail?.status === 'apple_token_received' ) {
					const applePayToken =
						event.detail?.tokenRecieved?.id ?? null;
					if ( applePayToken ) {
						onTokenReceived( applePayToken );
					}
				}
			};

			const handleApplePayError = ( event ) => {
				console.error( event?.detail );
			};

			const applePaymentRequest =
				cloverInstance.createApplePaymentRequest( {
					amount: cartTotal.value,
					countryCode: billingAddress.country,
					currencyCode: currency.code,
				} );

			const applePayButton = cloverElementsInstance.create(
				'PAYMENT_REQUEST_BUTTON_APPLE_PAY',
				{
					applePaymentRequest,
					sessionIdentifier: merchantId,
					...applePayButtonStyles,
				}
			);

			applePayButton.mount( `#${ id }` );

			window.addEventListener( 'paymentMethod', handleApplePayEvent );
			window.addEventListener( 'paymentMethodEnd', handleApplePayError );

			return () => {
				if ( applePayContainerRef.current ) {
					applePayContainerRef.current.innerHTML = '';
				}

				window.removeEventListener( 'paymentMethod', handleApplePayEvent );
				window.removeEventListener( 'paymentMethodEnd', handleApplePayError );
			};
		}, [
			cloverInstance,
			cloverElementsInstance,
			cartTotal.value,
			currency.code,
			billingAddress.country,
			merchantId,
			onTokenReceived,
		] );

		return (
			<div
				ref={ applePayContainerRef }
				id={ id }
				className={ styles.applePayButton }
			/>
		);
	}
);

export { ApplePayButton };
