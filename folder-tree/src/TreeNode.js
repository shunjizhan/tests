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
  	catagory: React.PropTypes.string.isRequired	// doesn't five warning?
	};

	getInden() {
		let iden = '', i = 0;
		while (i < this.state.level) {
			iden += '	'
			i++
		}
		return iden;
	}

 	render() {
 		if (this.props.catagory === 'folder') {
	 		return (
	      <div className='folder'>
	      	{this.getInden()}
	        <input type="checkbox" id="cbox1" value="first_checkbox" />
	        <FontAwesome name='folder-o'/>{this.props.filename}
	      </div>
	    )
 		} else {
 			return (
	      <div className='file'>
	        {this.getInden()}
	        <FontAwesome name='file-o'/>{this.props.filename}
	      </div>
	    )
 		}

  }
}


export default TreeNode;