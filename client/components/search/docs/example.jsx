/**
 * External dependencies
 */
import React from 'react';

import PureRenderMixin from 'react-pure-render/mixin';

/**
 * Internal dependencies
 */
import Search from 'components/search';

import SearchCard from 'components/search-card';

/**
 * Globals
 */
var noop = () => {};

var SearchDemo = React.createClass( {
	displayName: 'Search',

	mixins: [ PureRenderMixin ],

	render: function() {
		return (
			<div>
				<Search onSearch={ noop } placeholder="Placeholder text..." />
				<h2>Search Card</h2>
				<SearchCard onSearch={ noop } placeholder="Placeholder text..." />
			</div>
		);
	},
} );

export default SearchDemo;
