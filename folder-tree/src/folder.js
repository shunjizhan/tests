import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class TreeNode extends Component {
	propTypes: {
  	catagory: React.PropTypes.string.isRequired
	};

	getInden(level) {
		let iden = '', i = 0;
		while (i < level) {
			iden += '	'
			i++
		}
		return iden;
	}

 	render() {
 		if (this.props.catagory === 'folder') {
	 		return (
	      <div className='folder'>
	        <input type="checkbox" id="cbox1" value="first_checkbox" />
	        {this.getInden(this.props.level)}<FontAwesome name='folder-o'/>{this.props.filename}
	      </div>
	    )
 		} else {
 			return (
	      <div className='file'>
	        {this.getInden(this.props.level)}<FontAwesome name='file-o'/>{this.props.filename}
	      </div>
	    )
 		}

  }
}

// class Folder extends Component {
// 	render() {
// 	    return (
// 	      <div>
// 	        <input type="checkbox" id="cbox1" value="first_checkbox" />
// 	        {this.props.level}<FontAwesome name='folder-o'/>{this.props.filename}
// 	      </div>
// 	    )
// 	  }
// }

// class File extends Component {


// 		render() {
// 	    return (
// 	      <div className='file'>
// 	        {this.getInden(2)}<FontAwesome name='file-o'/>{this.props.filename}
// 	      </div>
// 	    )
// 	  }
// }

export default TreeNode;