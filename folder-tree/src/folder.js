import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class Folder extends Component {
	render() {
	    return (
	      <div>
	        <input type="checkbox" id="cbox1" value="first_checkbox" />
	        {this.props.level}<FontAwesome name='folder-o'/>{this.props.filename}
	      </div>
	    )
	  }
}

class File extends Component {
		render() {
	    return (
	      <div className='file'>
	        {this.props.level}<FontAwesome name='file-o'/>{this.props.filename}
	      </div>
	    )
	  }
}

export { Folder, File };