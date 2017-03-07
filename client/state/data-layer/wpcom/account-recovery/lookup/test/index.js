/**
 * External dependencies
 */
import { assert } from 'chai';
import { identity } from 'lodash';
import sinon from 'sinon';

/**
 * Internal dependencies
 */
import {
	fromApi,
	onSuccess,
	onError,
} from '../';

import {
	ACCOUNT_RECOVERY_RESET_OPTIONS_RECEIVE,
	ACCOUNT_RECOVERY_RESET_OPTIONS_ERROR,
} from 'state/action-types';

const next = identity;

describe( 'onSuccess()', () => {
	const dispatch = sinon.spy();

	it( 'should dispatch the receiving action.', () => {
		const response = {
			primary_email: 'a****@example.com',
			secondary_email: 'b*****@example.com',
			primary_sms: '+1******456',
			secondary_sms: '+8*******456',
		};

		onSuccess( { dispatch }, {}, next, response );

		assert.isTrue( dispatch.calledWith( {
			type: ACCOUNT_RECOVERY_RESET_OPTIONS_RECEIVE,
			items: fromApi( response ),
		} ) );
	} );
} );

describe( 'onError()', () => {
	const dispatch = sinon.spy();

	it( 'should dispatch the error action', () => {
		const error = {
			message: 'Something wrong!',
			status: 404,
		};

		onError( { dispatch }, {}, next, error );

		assert.isTrue( dispatch.calledWith( {
			type: ACCOUNT_RECOVERY_RESET_OPTIONS_ERROR,
			error,
		} ) );
	} );
} );