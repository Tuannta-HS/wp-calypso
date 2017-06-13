var fetchPluginInformationCalls = 0, lastRequestParams = null;

const exported = {
	deactivatedCallbacks: false,

	reset: function() {
		fetchPluginInformationCalls = 0;
		this.deactivatedCallbacks = false;
		lastRequestParams = null;
	},

	getActivity: function() {
		return {
			fetchPluginInformation: fetchPluginInformationCalls,
			lastRequestParams: lastRequestParams,
		};
	},

	fetchPluginInformation: function( pluginSlug, callback ) {
		fetchPluginInformationCalls++;
		if ( ! this.deactivatedCallbacks ) {
			setTimeout( function() {
				callback( null, {
					slug: pluginSlug,
				} );
			}, 1 );
		}
	},
};

export default exported;

export const { deactivatedCallbacks, reset, getActivity, fetchPluginInformation } = exported;
