import { useOnPaymentSetup } from './use-on-payment-setup';
import { useOnCheckoutSuccess } from './use-on-checkout-success';
import { useOnCheckoutFail } from './use-on-checkout-fail';
import { useOnCheckoutValidation } from './use-on-checkout-validation';

const useCheckoutEvents = (
	eventRegistration,
	emitReponse,
	cloverInstance,
	applePayTokenRef,
) => {
	const {
		onCheckoutValidation,
		onPaymentSetup,
		onCheckoutSuccess,
		onCheckoutFail,
	} = eventRegistration;

	useOnCheckoutValidation(
		onCheckoutValidation,
		cloverInstance,
		applePayTokenRef
	);
	useOnPaymentSetup(
		onPaymentSetup,
		emitReponse,
		cloverInstance,
		applePayTokenRef,
	);
	useOnCheckoutSuccess(
		onCheckoutSuccess,
		emitReponse,
		cloverInstance,
		applePayTokenRef
	);
	useOnCheckoutFail(
		onCheckoutFail,
		emitReponse,
		cloverInstance,
		applePayTokenRef
	);
};

export { useCheckoutEvents };
