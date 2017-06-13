/**
 * External dependencies
 */
import React from 'react';

import i18n from 'i18n-calypso';
import find from 'lodash/find';

/**
 * Internal dependencies
 */
import SectionNav from 'components/section-nav';

import NavTabs from 'components/section-nav/tabs';
import NavItem from 'components/section-nav/item';

export default React.createClass( {
	propTypes: {
		path: React.PropTypes.string.isRequired,
	},

	getNavtabs: function() {
		var tabs = [
			{
				title: i18n.translate( 'Password', { textOnly: true } ),
				path: '/me/security',
			},
			{
				title: i18n.translate( 'Two-Step Authentication', { textOnly: true } ),
				path: '/me/security/two-step',
			},
			{
				title: i18n.translate( 'Connected Applications', { textOnly: true } ),
				path: '/me/security/connected-applications',
			},
			{
				title: i18n.translate( 'Account Recovery', { textOnly: true } ),
				path: '/me/security/account-recovery',
			},
		];

		return tabs;
	},

	getFilteredPath: function() {
		var paramIndex = this.props.path.indexOf( '?' );
		return paramIndex < 0 ? this.props.path : this.props.path.substring( 0, paramIndex );
	},

	getSelectedText: function() {
		var text = '',
			filteredPath = this.getFilteredPath(),
			found = find( this.getNavtabs(), { path: filteredPath } );

		if ( 'undefined' !== typeof found ) {
			text = found.title;
		}

		return text;
	},

	onClick: function() {
		window.scrollTo( 0, 0 );
	},

	render: function() {
		return (
			<SectionNav selectedText={ this.getSelectedText() }>
				<NavTabs>
					{ this.getNavtabs().map( function( tab ) {
						return (
							<NavItem
								key={ tab.path }
								onClick={ this.onClick }
								path={ tab.path }
								selected={ tab.path === this.getFilteredPath() }
							>
								{ tab.title }
							</NavItem>
						);
					}, this ) }
				</NavTabs>
			</SectionNav>
		);
	},
} );
