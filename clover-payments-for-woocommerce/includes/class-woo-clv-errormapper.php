<?php
/**
 * Error mapper class
 *
 * @package clover-payments-for-woocommerce
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class WOO_CLV_ERRORMAPPER
 */
class WOO_CLV_ERRORMAPPER {

	/**
	 * Error mapper array.
	 *
	 * @return type
	 */
	public static function get_localized_messages() {
		return apply_filters(
			'wc_clv_localized_messages',
			array(
				'amount_too_large'        => __( 'Transaction could not be processed. Please contact support.', 'clover-payments-for-woocommerce' ),
				'card_declined'           => __( 'Transaction declined. Please verify card information or use a different card.', 'clover-payments-for-woocommerce' ),
				'card_on_file_missing'    => __( 'Transaction failed; card information is incorrect.', 'clover-payments-for-woocommerce' ),
				'charge_already_captured' => __( 'The transaction has already been processed.', 'clover-payments-for-woocommerce' ),
				'charge_already_refunded' => __( 'The transaction has already been refunded.', 'clover-payments-for-woocommerce' ),
				'email_invalid'           => __( 'Email ID is invalid; please try again with a valid email ID.', 'clover-payments-for-woocommerce' ),
				'expired_card'            => __( 'Card expired: please try again with a valid card number.', 'clover-payments-for-woocommerce' ),
				'incorrect_cvc'           => __( 'Incorrect CVV: please try again with a valid CVV.', 'clover-payments-for-woocommerce' ),
				'incorrect_number'        => __( 'Incorrect card number: please try again with a valid card number.', 'clover-payments-for-woocommerce' ),
				'invalid_card_type'       => __( 'Card brand is invalid or not supported. Please use a valid card and try again.', 'clover-payments-for-woocommerce' ),
				'invalid_charge_amount'   => __( 'Invalid transaction amount. Please contact support.', 'clover-payments-for-woocommerce' ),
				'invalid_request'         => __( 'Card is invalid: please try again with a valid card.', 'clover-payments-for-woocommerce' ),
				'invalid_tip_amount'      => __( 'Invalid tip amount: please correct and try again.', 'clover-payments-for-woocommerce' ),
				'invalid_tax_amount'      => __( 'Invalid tax amount: please correct and try again.', 'clover-payments-for-woocommerce' ),
				'missing'                 => __( 'Unable to process transaction.', 'clover-payments-for-woocommerce' ),
				'order_already_paid'      => __( 'The order has already been paid for.', 'clover-payments-for-woocommerce' ),
				'processing_error'        => __( 'Transaction could not be processed.', 'clover-payments-for-woocommerce' ),
				'rate_limit'              => __( 'Transaction could not be processed. Please contact support.', 'clover-payments-for-woocommerce' ),
				'resource_missing'        => __( 'Transaction could not be processed due to incorrect or invalid information.', 'clover-payments-for-woocommerce' ),
				'token_already_used'      => __( 'Transaction could not be processed; please re-enter card details and try again.', 'clover-payments-for-woocommerce' ),
				'invalid_key'             => __( 'Unauthorized. Please contact support.', 'clover-payments-for-woocommerce' ),
				'invalid_details'         => __( 'Transaction failed; invalid information provided.', 'clover-payments-for-woocommerce' ),
				'unexpected'              => __( 'Transaction could not be processed. Please try again.', 'clover-payments-for-woocommerce' ),
			)
		);
	}

	/**
	 * Method to invoke array.
	 *
	 * @param type $response Code filter.
	 * @return type
	 */
	public static function get_localized_error_message( $response ) {
		$localized_messages        = self::get_localized_messages();
				$localized_message = isset( $localized_messages[ $response['error_code'] ] ) ? $localized_messages[ $response['error_code'] ] : $response['message'];
		return $localized_message;
	}

}
