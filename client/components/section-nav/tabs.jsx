/**
 * External dependencies
 */
import { debounce } from 'lodash';
import ReactDom from 'react-dom';
import React from 'react';
import classNames from 'classnames';

/**
 * Internal Dependencies
 */
import DropdownItem from 'components/select-dropdown/item';
import SelectDropdown from 'components/select-dropdown';
import viewport from 'lib/viewport';

/**
 * Internal Variables
 */
const MOBILE_PANEL_THRESHOLD = 480;

/**
 * Main
 */
const NavTabs = React.createClass( {

	propTypes: {
		selectedText: React.PropTypes.string,
		selectedCount: React.PropTypes.number,
		label: React.PropTypes.string,
		hasSiblingControls: React.PropTypes.bool
	},

	getDefaultProps: function() {
		return {
			hasSiblingControls: false
		};
	},

	getInitialState: function() {
		return {
			isDropdown: false
		};
	},

	componentDidMount: function() {
		this.setDropdown();
		this.debouncedAfterResize = debounce( this.setDropdown, 300 );

		window.addEventListener( 'resize', this.debouncedAfterResize );
	},

	componentWillReceiveProps: function() {
		this.setDropdown();
	},

	componentWillUnmount: function() {
		window.removeEventListener( 'resize', this.debouncedAfterResize );
	},

	render: function() {
		const tabs = React.Children.map( this.props.children, function( child, index ) {
			return child && React.cloneElement( child, { ref: 'tab-' + index } );
		} );

		const tabsClassName = classNames( {
			'section-nav-tabs': true,
			'is-dropdown': this.state.isDropdown,
			'is-open': this.state.isDropdownOpen,
			'has-siblings': this.props.hasSiblingControls
		} );

		const innerWidth = viewport.getWindowInnerWidth();

		return (
			<div className="section-nav-group" ref="navGroup">
				<div className={ tabsClassName }>
					{ this.props.label &&
						<h6 className="section-nav-group__label">
							{ this.props.label }
						</h6>
					}
					<ul
						className="section-nav-tabs__list"
						role="menu"
						onKeyDown={ this.keyHandler }
					>
						{ tabs }
					</ul>

					{
						this.state.isDropdown &&
						innerWidth > MOBILE_PANEL_THRESHOLD &&
						this.getDropdown()
					}
				</div>
			</div>
		);
	},

	getTabWidths: function() {
		let totalWidth = 0;

		React.Children.forEach( this.props.children, function( child, index ) {
			if ( ! child ) {
				return;
			}
			const tabWidth = ReactDom.findDOMNode( this.refs[ 'tab-' + index ] ).offsetWidth;
			totalWidth += tabWidth;
		}.bind( this ) );

		this.tabsWidth = totalWidth;
	},

	getDropdown: function() {
		const dropdownOptions = React.Children.map(
		this.props.children, function( child, index ) {
			if ( ! child ) {
				return null;
			}
			return (
				<DropdownItem { ...child.props } key={ 'navTabsDropdown-' + index }>
					{ child.props.children }
				</DropdownItem>
			);
		} );

		return (
			<SelectDropdown
				className="section-nav-tabs__dropdown"
				selectedText={ this.props.selectedText }
				selectedCount={ this.props.selectedCount }
			>
				{ dropdownOptions }
			</SelectDropdown>
		);
	},

	setDropdown: function() {
		let navGroupWidth;

		if ( window.innerWidth > MOBILE_PANEL_THRESHOLD ) {
			if ( ! this.refs.navGroup ) {
				return;
			}

			navGroupWidth = this.refs.navGroup.offsetWidth;

			if ( ! this.tabsWidth ) {
				this.getTabWidths();
			}

			if ( navGroupWidth <= this.tabsWidth && ! this.state.isDropdown ) {
				this.setState( {
					isDropdown: true
				} );
			} else if ( navGroupWidth > this.tabsWidth && this.state.isDropdown ) {
				this.setState( {
					isDropdown: false
				} );
			}
		} else if ( window.innerWidth <= MOBILE_PANEL_THRESHOLD && this.state.isDropdown ) {
			this.setState( {
				isDropdown: false
			} );
		}
	},

	keyHandler: function( event ) {
		switch ( event.keyCode ) {
			case 32: // space
			case 13: // enter
				event.preventDefault();
				document.activeElement.click();
				break;
		}
	}
} );

module.exports = NavTabs;
