const getMerchantConfig = async ( cloverURL, publicKey, merchantId ) => {
	if ( ! cloverURL || ! publicKey || ! merchantId ) {
		console.error( 'Missing parameters for getMerchantConfig' );
		return null;
	}

	try {
		const url = new URL(
			`v3/merchants/${ merchantId }/ecomm_payment_configs`,
			cloverURL
		);
		url.searchParams.set( 'pakmsKey', publicKey );

		const response = await fetch( url.href );

		if ( ! response.ok ) {
			console.error(
				`Failed to fetch merchant configuration. Status: ${ response.status }`
			);
			return null;
		}

		return await response.json();
	} catch ( error ) {
		console.error(
			'Network error while fetching merchant configuration:',
			error
		);
		return null;
	}
};

export { getMerchantConfig };
