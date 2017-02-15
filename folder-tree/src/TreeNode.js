import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class Tree extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	data: {}
    };
  }

  componentWillMount() {
    this.setState({data: this.props.data});
  }

  propTypes: {
  	data: React.PropTypes.object.isRequired,	// doesn't five warning?g
	};

 	render() {
 			return (
	      <TreeNode catagory={this.state.data.catagory} filename={this.state.data.filename} children={this.state.data.children} />
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
    this.state = {
    	children: [],
    	level: 0
    };
  }

  componentWillMount() {
    this.setState({
    	children: this.props.children
    });
  }

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
		        <FontAwesome name='folder-o'/> {this.props.filename}
	        </a>
	        <ul>{
	        	this.state.children.map( node => {
	        	return <TreeNode key={node.id} catagory={node.catagory} filename={node.filename} level={this.state.level + 1} children={this.state.children} />
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