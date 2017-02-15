import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class TreeNode extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	level: 0,
			children: []
    };
  }

	propTypes: {
  	catagory: React.PropTypes.string.isRequired	// doesn't five warning?g
	};

	getInden() {
		let iden = '', i = 0;
		while (i < this.state.level) {
			iden += '	'
			i++
		}
		return iden;
	}

	handleClick(e) {
		console.log('clicked!!')
	}

 	render() {
 		if (this.props.catagory === 'folder') {
	 		return (
	      <div className='folder'>
	      	{this.getInden()}
	      	<a onClick={this.handleClick}>
		        <input type="checkbox" id="cbox1" value="first_checkbox" />
		        <FontAwesome name='folder-o'/>{this.props.filename}
	        </a>
	      </div>
	    )
 		} else {
 			return (
	      <div className='file'>
	        {this.getInden()}
	        <a onClick={this.handleClick}>
		        <FontAwesome name='file-o'/>{this.props.filename}
	        </a>
	      </div>
	    )
 		}

  }
}

export default TreeNode;