import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class Tree extends Component {
  static propTypes = {
  	data: React.PropTypes.object.isRequired,	// doesn't five warning?g
	};

	constructor(props) {
    super(props);
    this.state = {
    	open: false,
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
	      	checked={0}
	      />
	    )
	}
}



class TreeNode extends Component {
	static propTypes = {
  	category: React.PropTypes.string.isRequired,	
  	filename: React.PropTypes.string.isRequired,
  	level: React.PropTypes.number.isRequired,
  	children: React.PropTypes.array.isRequired,
  	checked: React.PropTypes.number.isRequired
	};

	constructor(props) {
    super(props);
    this.toggleFolder = this.toggleFolder.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.state = {
    	checked: props.checked,
    	children: [],
    	level: props.level
    };
  }

  toggleFolder() {
  	if (this.state.children.length > 0) {
  		this.setState({
  			open: false,
  			children: []
  		});
  	}	else {
  		this.setState({
  			open: true,
  			children: this.props.children,
  		});
  	}  	
  }

  handleCheck(e) {
  	// console.log(this)
  	if (e.target.checked) {
  		this.setState({checked : 1});
  		console.log('checked');
  		// e.target.checked = false;
  	} else {
  		this.setState({checked : 0});
  		console.log('uncheck');
  		// e.target.checked = true;
  	}
  }

  componentWillReceiveProps(nextProps) {
  	console.log(nextProps.checked)
  	this.setState({checked: nextProps.checked});
  }

	getInden() {
		let iden = '', i = 0;
		while (i < this.state.level) {
			iden += ' '
			i++
		}
		return iden;
	}



	getCheckBox() {
		if (this.state.checked === 0) {
			console.log('this.state.checked === 0')
			return <input type="checkbox" onClick={this.handleCheck} checked={false}/>
		} else {
			return <input type="checkbox" onClick={this.handleCheck} checked={true}/>
		}
	}

 	render() {
 		console.log('render')
 		if (this.props.category === 'folder') {
	 		return (
	      <div className='folder'>
	      	{this.getInden()}
	      	{this.getCheckBox()}
	      	<a onClick={this.toggleFolder}>
		        <FontAwesome name={this.state.open? 'folder-open': 'folder'}/> {this.props.filename}
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
				        	children={child.children? child.children : []} 
				        	checked={this.state.checked}
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