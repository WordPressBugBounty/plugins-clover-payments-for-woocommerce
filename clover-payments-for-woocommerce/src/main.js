import { registerPaymentMethod } from '@woocommerce/blocks-registry';
import { cloverCardPaymentOptions } from './app/app';

registerPaymentMethod( cloverCardPaymentOptions );
