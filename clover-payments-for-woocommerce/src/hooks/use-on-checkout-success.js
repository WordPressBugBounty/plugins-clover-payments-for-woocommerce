import { useEffect } from '@wordpress/element';

const useOnCheckoutSuccess = (
	onCheckoutSuccess,
	emitResponse,
	cloverInstance,
	applePayTokenRef
) => {
	useEffect( () => {
		const onSuccess = ( onCheckoutProcessingData ) => {
			const { redirectUrl, processingResponse } = onCheckoutProcessingData;
			const { paymentDetails, paymentStatus } = processingResponse;
			const applePayToken = applePayTokenRef.current;

			if ( paymentStatus === 'success' ) {
				if ( applePayToken ) {
					cloverInstance.updateApplePaymentStatus( 'success' );
				}
				return {
					type: emitResponse.responseTypes.SUCCESS,
					redirectUrl,
				};
			}

			if ( applePayToken ) {
				cloverInstance.updateApplePaymentStatus( 'failed' );
			}

			if ( paymentDetails?.result === 'failure' ) {
				return {
					type: emitResponse.responseTypes.FAIL,
					message: paymentDetails.message,
					messageContext: emitResponse.noticeContexts.PAYMENTS,
					retry: true,
				};
			}

			return {
				type: emitResponse.responseTypes.ERROR,
				retry: true,
			};
		};

		const unsubscribe = onCheckoutSuccess( onSuccess );

		return () => unsubscribe();
	}, [
		cloverInstance,
		applePayTokenRef,
		onCheckoutSuccess,
		emitResponse.responseTypes.SUCCESS,
		emitResponse.responseTypes.FAIL,
		emitResponse.responseTypes.ERROR,
		emitResponse.noticeContexts.PAYMENTS,
	] );

	return null;
};

export { useOnCheckoutSuccess };
