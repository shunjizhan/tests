import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Checkbox from './Checkbox'

class TreeNode extends Component {
	static propTypes = {
  	category: React.PropTypes.string.isRequired,	
  	filename: React.PropTypes.string.isRequired,
  	level: React.PropTypes.number.isRequired,
  	children: React.PropTypes.array.isRequired,
  	checked: React.PropTypes.number.isRequired,
  	id: React.PropTypes.number.isRequired,
  	setChildrenStatus: React.PropTypes.func.isRequired
	};

	constructor(props) {
    super(props);
    this.toggleFolder = this.toggleFolder.bind(this);
    this.handleCheck = this.handleCheck.bind(this);

    this.state = {
    	children: props.children,							
    	level: props.level,
    	// checked: 0,
      open: false
    };
  }

  toggleFolder() {
  		this.setState(prevState => ({ open: !prevState.open }));
  }

  handleCheck(e) {																
  	if (e.target.checked) {
  		// console.log('setState 1');
  		this.props.setChildrenStatus(this.props.id, 1);
  		this.setState(this.changeAllChildrenStatus(this.state.children, 1));
  	}	else {
  		// console.log('setState 0');
  		this.props.setChildrenStatus(this.props.id, 0);										// own and parent's check
  		this.setState(this.changeAllChildrenStatus(this.state.children, 0));		// children's check
  	}
  }

  setChildrenStatus = (id, status) => {									// recursively update all parent's children data
  	// console.log('set childrenStatus ', status)

  	let children = this.state.children;
  	if (children) {
	  	for (let i = 0; i < children.length; i++) {
	  		if (children[i].id === id) 
	  			children[i].status = status;
	  	}
	  }
  	this.setState({ children: children });

  	// console.log(this.getCheckedStatus())
  	this.props.setChildrenStatus(this.props.id, this.getCheckedStatus(status));
  }

  getCheckedStatus = (prevStatus) => {
  	if (prevStatus === 0.5) {
  		return 0.5;
  	}

  	let selectedChildrenSum = 0;
  	for (let i = 0; i < this.state.children.length; i++) {
  		selectedChildrenSum += this.state.children[i].status;
  	}

  	// const selectedChildren = this.state.children.filter(child => {
  	// 	// return child.status === 1 && child.category === 'folder';
  	// 	return child.status === 1;
  	// });

  	console.log('selectedChildrenSum: ', selectedChildrenSum)

  	// if (selectedChildren.length === getFolderNum(this.state.children)) {
  	if (selectedChildrenSum === this.state.children.length) {
  		return 1;
  	} else if (selectedChildrenSum === 0) {
  		return 0;
  	} else {
  		return 0.5;
  	}
  }

 	render() {
 		// console.log('render checked = ' + this.state.checked)
 		if (this.props.category === 'folder') {
	 		return (
	      <div className='folder'>
	      	{this.getInden()}
	      	<Checkbox status={this.props.checked} handleCheck={this.handleCheck} />
	      	<a onClick={this.toggleFolder}>
		        <FontAwesome name={this.state.open? 'folder-open': 'folder'}/> {this.props.filename}
	        </a>
	        <ul>
	        {this.state.open && 
	        	this.state.children.map( (child, i) => {
	        		// console.log('child status: ', child.status)
		        	return (
		        		<TreeNode 
		        			className="aFolder"
				        	id={child.id}
				        	key={child.id}
				        	level={this.state.level + 1} 
				        	category={child.category} 
				        	filename={child.filename} 				    
				        	checked={child.status}
				        	children={child.children? child.children : []}
				        	setChildrenStatus={this.setChildrenStatus}
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
	        {this.getInden()}
	        <Checkbox status={this.props.checked} handleCheck={this.handleCheck} />
		      <FontAwesome name='file-o'/> {this.props.filename}
	      </div>
	    )
 		}
  }

  getInden() {
		let iden = '', i = 0;
		while (i < this.state.level) {
			iden += ' ';
			i++;
		}
		return iden;
	}

	changeAllChildrenStatus(children, status) {							// set all current and lower children's status
		// console.log('set all childrenStatus ', status)
		for (let i = 0; i < children.length; i++) {
			if (children[i].children) {
				for (let j = 0; j < children[i].children.length; j++) 
	  			children[i].children = this.changeAllChildrenStatus(children[i].children, status)
	  	}
	 		children[i].status = status;
	 	}
	 	return children;
	}

}

export default TreeNode;