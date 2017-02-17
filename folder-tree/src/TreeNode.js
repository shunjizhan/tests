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
    	childrenCheck:[],
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
	      	children={this.state.data.children? this.state.data.children : []} 
	      	childrenStatus={this.state.data.children? getStatusArray(this.state.data.children.length, 0) : []} 
	      	level={0} 
	      	checked={0}
	      	setHalfCheck={() => {}}
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
  	childrenStatus: React.PropTypes.array.isRequired,
  	checked: React.PropTypes.number.isRequired
	};

	constructor(props) {
    super(props);
    this.toggleFolder = this.toggleFolder.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.setHalfCheck = this.setHalfCheck.bind(this);
    this.state = {
    	checked: props.checked,
    	children: [],
    	childrenStatus:[],
    	level: props.level
    };
  }

  toggleFolder() {
  	if (this.state.children.length > 0) {
  		this.setState({
  			children: []
  		});
  	}	else {
  		this.setState({
  			children: this.props.children
  		});
  	}  	
  }

  handleCheck(e) {
  	if (e.target.checked) {
  		this.setState({
  			checked : 1,
  			childrenStatus: getStatusArray(this.props.children.length, 1)
  		});
  		// e.target.checked = false;
  	} else {
  		this.setState({
  			checked : 0,
  			childrenStatus: getStatusArray(this.props.children.length, 0)
  		});
  		// e.target.checked = true;
  	}
  	this.props.setHalfCheck(true);
  }

  componentWillReceiveProps(nextProps) {
  	// console.log(nextProps.checked)
  	this.setState({
  		checked: nextProps.checked,
  	});
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
		if (this.state.checked === 1) {
			return <input type="checkbox" onChange={this.handleCheck} checked={true} ref={box => this.checkBox = box}/>
		} else {
			return <input type="checkbox" onChange={this.handleCheck} checked={false} ref={box => this.checkBox = box}/>
		}
	}

	setHalfCheck(status) {
  	this.checkBox.indeterminate = status;
  }

 	render() {
 		// console.log('render')
 		if (this.props.category === 'folder') {
	 		return (
	      <div className='folder'>
	      	{this.getInden()}
	      	{this.getCheckBox()}
	      	<a onClick={this.toggleFolder}>
		        <FontAwesome name={this.state.open? 'folder-open': 'folder'}/> {this.props.filename}
	        </a>
	        <ul>
	        {
	        	this.state.children.map( (child, i) => {
		        	return (
		        		<TreeNode 
		        			className="aFolder"
				        	key={child.id} 
				        	category={child.category} 
				        	filename={child.filename} 
				        	level={this.state.level + 1} 
				        	children={child.children? child.children : []}
				        	childrenStatus={child.children? getStatusArray(child.children.length, this.state.checked) : []} 
				        	checked={this.state.checked}
				        	setHalfCheck={this.setHalfCheck}
			        	/>
			        )
	        	})
	        }
	        </ul>

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

function getStatusArray(n, status) {
  	let statusArray = [];
  	for (let i = 0; i < n; i++) {
  		statusArray[i] = status;		// defult to unchecked
  	}
  	return statusArray;
  }

export default Tree;