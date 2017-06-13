/**
* External dependencies
*/
import React from 'react';

import PureRenderMixin from 'react-pure-render/mixin';

/**
 * Internal dependencies
 */
import SectionHeader from 'components/section-header';

import Button from 'components/button';

var Cards = React.createClass( {
	displayName: 'SectionHeader',

	mixins: [ PureRenderMixin ],

	render: function() {
		return (
			<div>
				<SectionHeader label={ this.translate( 'Team' ) } count={ 10 }>
					<Button compact primary>
						{ this.translate( 'Primary Action' ) }
					</Button>
					<Button compact>
						{ this.translate( 'Manage' ) }
					</Button>
					<Button
						compact
						onClick={ function() {
							alert( 'Clicked add button' );
						} }
					>
						{ this.translate( 'Add' ) }
					</Button>
				</SectionHeader>

				<h3>Clickable SectionHeader</h3>

				<SectionHeader
					label={ this.translate( 'Team' ) }
					count={ 10 }
					href="/devdocs/design/section-header"
				/>
			</div>
		);
	},
} );

export default Cards;
