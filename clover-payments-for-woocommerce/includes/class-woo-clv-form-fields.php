<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

Class WC_Clover_Form_Fields {

	public static function init(): void {
		$self = new self();
		add_filter( 'wc_clover_form_fields', array( $self, 'get_form_fields' ) );
	}

	public static function get_form_fields( array $initial_fields ): array {
		$new_fields = array(
			'enabled' => array(
				'title'       => __( 'Clover Payments', 'clover-payments-for-woocommerce' ),
				'type'        => 'select',
				'options' => array(
					'yes' => __( 'Enabled', 'clover-payments-for-woocommerce' ),
					'no'  => __( 'Disabled', 'clover-payments-for-woocommerce' ),
				),
				'description' => __( 'Clover Payments is available in the United States and Canada.', 'clover-payments-for-woocommerce' ),
				'default'     => 'no',
				'js_trigger'  => true,
			),
			'environment' => array(
				'title'       => __( 'Environment', 'clover-payments-for-woocommerce' ),
				'type'        => 'select',
				'description' => __( 'Use \'Sandbox\' for testing with a test account. Use \'Production\' for live payments.', 'clover-payments-for-woocommerce' ),
				'default'     => 'production',
				'options'     => array(
					'sandbox'    => __( 'Sandbox', 'clover-payments-for-woocommerce' ),
					'production' => __( 'Production', 'clover-payments-for-woocommerce' ),
				),
			),
			'test_merchant_id' => array(
				'title'       => __( 'Sandbox Merchant ID', 'clover-payments-for-woocommerce' ) . '*',
				'type'        => 'text',
				'description' => wp_sprintf(
				/* translators: %1$s: opening anchor tag, %2$s: closing anchor tag. */
				__( '%1$sLearn how%2$s to obtain a Sandbox Merchant ID.', 'clover-payments-for-woocommerce' ),
					'<a href="https://docs.clover.com/dev/docs/locating-merchant-id-1" target="_blank" rel="noopener noreferrer">',
					'</a>'
				),
				'class'       => 'clvsdfields',
			),
			'test_publishable_key' => array(
				'title'       => __( 'Sandbox Public Key', 'clover-payments-for-woocommerce' ) . '*',
				'type'        => 'text',
				'description' => wp_sprintf(
				/* translators: %1$s: opening anchor tag, %2$s: closing anchor tag. */
				__( '%1$sLearn how%2$s to obtain a Sandbox Public Key.', 'clover-payments-for-woocommerce' ),
					'<a href="https://docs.clover.com/dev/docs/setting-up-an-api-token" target="_blank" rel="noopener noreferrer">',
					'</a>'
				),
				'class'       => 'clvsdfields',
			),
			'test_private_key' => array(
				'title'       => __( 'Sandbox Private Key', 'clover-payments-for-woocommerce' ) . '*',
				'type'        => 'password',
				'description' => wp_sprintf(
				/* translators: %1$s: opening anchor tag, %2$s: closing anchor tag. */
				__( '%1$sLearn how%2$s to obtain a Sandbox Private Key.', 'clover-payments-for-woocommerce' ),
					'<a href="https://docs.clover.com/dev/docs/setting-up-an-api-token" target="_blank" rel="noopener noreferrer">',
					'</a>'
				),
				'class'       => 'clvsdfields',
			),
			'merchant_id' => array(
				'title'       => __( 'Merchant ID', 'clover-payments-for-woocommerce' ) . '*',
				'type'        => 'text',
				'description' => wp_sprintf(
				/* translators: %1$s: opening anchor tag, %2$s: closing anchor tag. */
				__( '%1$sLearn how%2$s to obtain a Merchant ID.', 'clover-payments-for-woocommerce' ),
					'<a href="https://docs.clover.com/dev/docs/locating-merchant-id-1" target="_blank" rel="noopener noreferrer">',
					'</a>'
				),
				'class'       => 'clvfields',
			),
			'publishable_key' => array(
				'title'       => __( 'Public Key', 'clover-payments-for-woocommerce' ) . '*',
				'type'        => 'text',
				'description' => wp_sprintf(
				/* translators: %1$s: opening anchor tag, %2$s: closing anchor tag. */
				__( '%1$sLearn how%2$s to obtain a Public Key.', 'clover-payments-for-woocommerce' ),
					'<a href="https://docs.clover.com/dev/docs/setting-up-an-api-token" target="_blank" rel="noopener noreferrer">',
					'</a>'
				),
				'class'       => 'clvfields',
			),
			'private_key' => array(
				'title'       => __( 'Private Key', 'clover-payments-for-woocommerce' ) . '*',
				'type'        => 'password',
				'description' => wp_sprintf(
				/* translators: %1$s: opening anchor tag, %2$s: closing anchor tag. */
				__( '%1$sLearn how%2$s to obtain a Private Key.', 'clover-payments-for-woocommerce' ),
					'<a href="https://docs.clover.com/dev/docs/setting-up-an-api-token" target="_blank" rel="noopener noreferrer">',
					'</a>'
				),
				'class'       => 'clvfields',
			),
			'payment_action' => array(
				'title'   => __( 'Payment Action', 'clover-payments-for-woocommerce' ),
				'type'    => 'select',
				'default' => 'charge',
				'options' => array(
					'charge'    => __( 'Authorize and Capture', 'clover-payments-for-woocommerce' ),
					'authorize' => __( 'Authorize', 'clover-payments-for-woocommerce' ),
				),
			),
			'apple_pay' => array(
				'title'   => __( 'Apple Pay', 'clover-payments-for-woocommerce' ),
				'label'   => __( 'Enable Apple Pay', 'clover-payments-for-woocommerce' ),
				'type'    => 'select',
				'options' => array(
					'yes' => __( 'Enabled', 'clover-payments-for-woocommerce' ),
					'no'  => __( 'Disabled', 'clover-payments-for-woocommerce' ),
				),
				'default' => 'no',
			),
			'title' => array(
				'title'       => __( 'Payment Section title', 'clover-payments-for-woocommerce' ),
				'type'        => 'text',
				'description' => __( 'Appears as the title of the payment form on the checkout page.', 'clover-payments-for-woocommerce' ),
				'default'     => __( 'Credit / Debit Card', 'clover-payments-for-woocommerce' )
			),
			'debug' => array(
				'title' => __( 'Logging', 'clover-payments-for-woocommerce' ),
				'type' => 'select',
				'options' => array(
					'yes' => __( 'Enabled', 'clover-payments-for-woocommerce' ),
					'no' => __( 'Disabled', 'clover-payments-for-woocommerce' ),
				),
				'description' => wp_sprintf(
				/* translators: %1$s: opening anchor tag, %2$s: closing anchor tag. */
				__( '%1$sView logs%2$s', 'clover-payments-for-woocommerce' ),
					wp_sprintf(
						'<a href="%s" target="_blank" rel="noopener noreferrer">',
						admin_url( 'admin.php?page=wc-status&tab=logs' )
					),
					'</a>'
				),
				'default' => 'yes',
			),
		);

		return array_merge( $new_fields, $initial_fields );
	}
}

WC_Clover_Form_Fields::init();
