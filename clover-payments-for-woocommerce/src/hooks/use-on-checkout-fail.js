import { useEffect } from '@wordpress/element';

const useOnCheckoutFail = (
	onCheckoutFail,
	emitResponse,
	cloverInstance,
	applePayTokenRef
) => {
	useEffect( () => {
		const onFail = ( onCheckoutProcessingData ) => {
			const { paymentDetails, paymentStatus } = onCheckoutProcessingData?.processingResponse;
			const applePayToken = applePayTokenRef.current;

			if ( applePayToken ) {
				cloverInstance.updateApplePaymentStatus( 'failed' );
			}

			if ( paymentStatus === 'failure' ) {
				return {
					type: emitResponse.responseTypes.FAIL,
					message: paymentDetails?.message,
					messageContext: emitResponse.noticeContexts.PAYMENTS,
					retry: true,
				};
			}

			return {
				type: emitResponse.responseTypes.ERROR,
				retry: true,
			};
		};

		const unsubscribe = onCheckoutFail( onFail );

		return () => unsubscribe();
	}, [
		cloverInstance,
		onCheckoutFail,
		applePayTokenRef,
		emitResponse.responseTypes.FAIL,
		emitResponse.responseTypes.ERROR,
		emitResponse.noticeContexts.PAYMENTS,
	] );

	return null;
};

export { useOnCheckoutFail };
