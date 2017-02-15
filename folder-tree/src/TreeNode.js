import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class Tree extends Component {
  static propTypes = {
  	data: React.PropTypes.object.isRequired,	// doesn't five warning?g
	};

	constructor(props) {
    super(props);
    this.state = {
    	data: props.data,
    	selectedFolders: []	// array of object
    };
  }

 	render() {
 			return (
	      <TreeNode 
	      	className="treeRoot"
	      	key={this.state.data.id} 
	      	category={this.state.data.category} 
	      	filename={this.state.data.filename} 
	      	children={this.state.data.children} 
	      	level={0} 
	      />
	    )
	}
}



class TreeNode extends Component {
	static propTypes = {
  	category: React.PropTypes.string.isRequired,	// doesn't five warning?g
  	filename: React.PropTypes.string.isRequired,
  	level: React.PropTypes.number.isRequired,
  	children: React.PropTypes.array.isRequired
	}

	constructor(props) {
    super(props);
    this.toggleFolder = this.toggleFolder.bind(this);
    this.state = {
    	children: [],
    	level: props.level
    };
  }

  toggleFolder(e) {
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
 		if (this.props.category === 'folder') {
	 		return (
	      <div className='folder'>
	      	{this.getInden()}
	      	<input type="checkbox"/>
	      	<a onClick={this.toggleFolder}>
		        <FontAwesome name='folder'/> {this.props.filename}
	        </a>
	        <ul>{
	        	this.state.children.map( child => {
		        	return (
		        		<TreeNode 
		        			className="aFolder"
				        	key={child.id} 
				        	category={child.category} 
				        	filename={child.filename} 
				        	level={this.state.level + 1} 
				        	children={child.children? child.children: []} 
			        	/>
			        )
	        })}</ul>

	      </div>
	    )
 		} else {
 			return (
	      <div className='file'>
	        {this.getInden() + '    '}
		      <FontAwesome name='file-o'/> {this.props.filename}
	      </div>
	    )
 		}

  }
}

export default Tree;