import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class Tree extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	data: props.data
    };
  }

  propTypes: {
  	data: React.PropTypes.object.isRequired,	// doesn't five warning?g
	};

 	render() {
 			return (
	      <TreeNode 
	      	className="treeRoot"
	      	key={this.state.data.id} 
	      	catagory={this.state.data.catagory} 
	      	filename={this.state.data.filename} 
	      	children={this.state.data.children} 
	      	level={0} 
	      />
	    )
	}
}



class TreeNode extends Component {
	propTypes: {
  	catagory: React.PropTypes.string.isRequired,	// doesn't five warning?g
  	key: React.PropTypes.string.isRequired,
  	filename: React.PropTypes.string.isRequired,
  	level: React.PropTypes.number.isRequired,
  	children: React.PropTypes.array.isRequired
	};

	constructor(props) {
    super(props);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.state = {
    	children: props.children,
    	level: props.level
    };
  }

  toggleSelect() {
  	if (this.state.children.length > 0) {
  		this.setState({
  			children: []
  		});
  	}	else {
  		this.setState({
  			children: this.props.children,
  		});
  	}
  }

	getInden() {
		let iden = '', i = 0;
		while (i < this.state.level) {
			iden += ' '
			i++
		}
		return iden;
	}

 	render() {
 		// console.log('render')
 		if (this.props.catagory === 'folder') {
	 		return (
	      <div className='folder'>
	      	{this.getInden()}
	      	<a onClick={this.toggleSelect}>
		        <input type="checkbox" id="cbox1" value="first_checkbox" />
		        <FontAwesome name='folder-o'/> {this.props.filename}
	        </a>
	        <ul>{
	        	this.state.children.map( child => {
		        	return (
		        		<TreeNode 
				        	key={child.id} 
				        	catagory={child.catagory} 
				        	filename={child.filename} 
				        	level={this.state.level + 1} 
				        	children={child.children} 
			        	/>
			        )
	        })}</ul>

	      </div>
	    )
 		} else {
 			return (
	      <div className='file'>
	        {this.getInden() + '    '}
	        <a onClick={this.handleClick}>
		        <FontAwesome name='file-o'/> {this.props.filename}
	        </a>
	      </div>
	    )
 		}

  }
}

export default Tree;