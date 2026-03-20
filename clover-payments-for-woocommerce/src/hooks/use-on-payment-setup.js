import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const useOnPaymentSetup = (
	onPaymentSetup,
	emitResponse,
	cloverInstance,
	applePayTokenRef,
) => {
	useEffect( () => {
		const onSetup = async () => {
			try {
				let tokenData = {
					token: '',
					errors: '',
					applePay: false,
				};

				const applePayToken = applePayTokenRef.current;

				if ( ! applePayToken ) {
					const response = await cloverInstance.createToken();
					tokenData.token = response?.token;
					tokenData.errors = response?.errors;
				} else {
					tokenData.token = applePayToken;
					tokenData.applePay = true;
				}

				if ( tokenData.errors ) {
					return {
						type: emitResponse.responseTypes.ERROR,
						message: Object.values( tokenData.errors )[ 0 ],
						messageContext: emitResponse.noticeContexts.PAYMENTS,
					};
				}

				if ( tokenData.token ) {
					return {
						type: emitResponse.responseTypes.SUCCESS,
						meta: {
							paymentMethodData: {
								clover_source: tokenData.token,
								clover_apple_pay: tokenData.applePay,
							},
						},
					};
				}

				return {
					type: emitResponse.responseTypes.FAIL,
					message: __(
						'(0002) Transaction could not be processed. Please contact support.',
						'clover-payments-for-woocommerce'
					),
					messageContext: emitResponse.noticeContexts.PAYMENTS,
				};
			} catch ( event ) {
				console.error( 'Payment token could not be created.', event );
				return {
					type: emitResponse.responseTypes.FAIL,
					message: __(
						'(0001) Transaction could not be processed. Please contact support.',
						'clover-payments-for-woocommerce'
					),
					messageContext: emitResponse.noticeContexts.PAYMENTS,
				};
			}
		};

		const unsubscribe = onPaymentSetup( onSetup );

		return () => unsubscribe();
	}, [
		cloverInstance,
		onPaymentSetup,
		applePayTokenRef,
		emitResponse.responseTypes.ERROR,
		emitResponse.responseTypes.FAIL,
		emitResponse.responseTypes.SUCCESS,
		emitResponse.noticeContexts.PAYMENTS,
	] );

	return null;
};

export { useOnPaymentSetup };
