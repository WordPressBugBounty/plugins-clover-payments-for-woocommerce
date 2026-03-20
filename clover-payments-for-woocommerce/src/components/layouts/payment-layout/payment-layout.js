/* global Clover */
import styles from './payment-layout.module.css';
import { CardElements } from '~/features/card/components/card-elements/card-elements';
import { useCheckoutEvents } from '~/hooks/use-checkout-events';
import { ApplePayButton } from '~/features/apple-pay/components/apple-pay-button/apple-pay-button';
import { useCallback, useMemo, useRef } from '@wordpress/element';
import { useApplePayAvailability } from '~/utils/use-apple-pay-availability';
import { Divider } from '~/components/ui/divider/divider';

const PaymentLayout = ( {
	eventRegistration,
	merchantSettings,
	components,
	emitResponse,
	billing,
	onSubmit,
} ) => {
	const { merchantId, publicKey, locale } = merchantSettings;
	const { LoadingMask } = components;
	const applePayTokenRef = useRef( null );

	const cloverInstance = useMemo( () => {
		return new Clover( publicKey, {
			merchantId,
			locale,
		} );
	}, [ merchantId, publicKey, locale ] );

	const cloverElementsInstance = useMemo( () => {
		return cloverInstance.elements();
	}, [ cloverInstance ] );

	useCheckoutEvents(
		eventRegistration,
		emitResponse,
		cloverInstance,
		applePayTokenRef
	);

	const {
		isAvailable: isApplePayReady,
		isLoading: isApplePayLoading
	} = useApplePayAvailability( merchantSettings );

	const onTokenReceived = useCallback(
		( token ) => {
			applePayTokenRef.current = token;
			onSubmit();
		},
		[ onSubmit ]
	);

	return (
		<div className={ styles.paymentFormWrapper } >
			<LoadingMask
				isLoading={ isApplePayLoading }
				showSpinner={ true }
			>
				{ ! isApplePayLoading && isApplePayReady && (
					<>
						<ApplePayButton
							cloverInstance={ cloverInstance }
							cloverElementsInstance={ cloverElementsInstance }
							onTokenReceived={ onTokenReceived }
							billing={ billing }
							merchantSettings={ merchantSettings }
						/>
						<Divider text="Or" />
					</>
				) }
				<CardElements
					cloverElementsInstance={ cloverElementsInstance }
				/>
			</LoadingMask>
		</div>
	);
};

export { PaymentLayout };
