/**
 * External dependencies
 */
import store from 'store';

import forOwn from 'lodash/forOwn';
/**
 * External dependencies
 */
var wpcom = require( 'lib/wp' ).undocumented();

/**
 * Internal dependencies
 */
import Dispatcher from 'dispatcher';

import PreferencesConstants from './constants';
import userUtils from 'lib/user/utils';
/**
 * Module variables
 */
var PreferencesActions = {}, _pendingUpdates = 0;

function getLocalStorage() {
	return store.get( PreferencesConstants.LOCALSTORAGE_KEY );
}

PreferencesActions.mergePreferencesToLocalStorage = function( preferences ) {
	var storage = getLocalStorage() || {};

	forOwn( preferences, function( value, key ) {
		if ( null === value ) {
			delete storage[ key ];
		} else {
			storage[ key ] = value;
		}
	} );

	store.set( PreferencesConstants.LOCALSTORAGE_KEY, storage );
};

PreferencesActions.fetch = function() {
	var localStorage = getLocalStorage();

	if ( ! userUtils.isLoggedIn() ) {
		return;
	}

	Dispatcher.handleViewAction( {
		type: 'FETCH_ME_SETTINGS',
	} );

	if ( localStorage ) {
		Dispatcher.handleServerAction( {
			type: 'RECEIVE_ME_SETTINGS',
			data: { [ PreferencesConstants.USER_SETTING_KEY ]: localStorage },
		} );
	}

	wpcom.me().settings().get( function( error, data ) {
		if ( ! error && data ) {
			PreferencesActions.mergePreferencesToLocalStorage(
				data[ PreferencesConstants.USER_SETTING_KEY ],
			);
		}

		Dispatcher.handleServerAction( {
			type: 'RECEIVE_ME_SETTINGS',
			error: error,
			data: data,
		} );
	} );
};

PreferencesActions.set = function( key, value ) {
	var preferences = {}, settings = {};

	preferences[ key ] = value;
	settings[ PreferencesConstants.USER_SETTING_KEY ] = preferences;

	Dispatcher.handleViewAction( {
		type: 'UPDATE_ME_SETTINGS',
		data: settings,
	} );

	PreferencesActions.mergePreferencesToLocalStorage( preferences );

	_pendingUpdates++;
	wpcom.me().settings().update( JSON.stringify( settings ), function( error, data ) {
		if ( --_pendingUpdates ) {
			return;
		}

		Dispatcher.handleServerAction( {
			type: 'RECEIVE_ME_SETTINGS',
			error: error,
			data: data,
		} );
	} );
};

PreferencesActions.remove = function( key ) {
	PreferencesActions.set( key, null );
};

export default PreferencesActions;

export const { mergePreferencesToLocalStorage, fetch, set, remove } = PreferencesActions;
