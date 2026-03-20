import { getMerchantConfig } from './merchant-config';
import { useState, useEffect } from '@wordpress/element';

const useApplePayAvailability = ( merchantSettings ) => {
	const { isApplePayEnabled, cloverURL, publicKey, merchantId } = merchantSettings;

	const [ availability, setAvailability ] = useState( {
		isAvailable: false,
		isLoading: true,
	} );

	useEffect( () => {
		const checkAvailability = async () => {
			const isBrowserSupported =
				window?.ApplePaySession?.canMakePayments() &&
				window?.ApplePaySession?.supportsVersion( 3 );

			if ( ! isApplePayEnabled || ! isBrowserSupported ) {
				setAvailability( { isAvailable: false, isLoading: false } );
				return;
			}

			const config = await getMerchantConfig(
				cloverURL,
				publicKey,
				merchantId
			);

			if ( config?.apple_pay?.supported ) {
				setAvailability( { isAvailable: true, isLoading: false } );
			} else {
				setAvailability( { isAvailable: false, isLoading: false } );
			}
		};

		checkAvailability();
	}, [ isApplePayEnabled, cloverURL, publicKey, merchantId ] );

	return availability;
};

export { useApplePayAvailability };
