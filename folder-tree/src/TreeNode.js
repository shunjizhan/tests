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
	      	childrenChecked={0} 
	      	level={0} 
	      	checked={0}
	      	setCheck={() => {}}
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
  	// childrenChecked: React.PropTypes.number.isRequired,
  	checked: React.PropTypes.number.isRequired,
  	// updateChildrenChecked: React.PropTypes.func.isRequired
	};

	constructor(props) {
    super(props);
    this.toggleFolder = this.toggleFolder.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.setCheck = this.setCheck.bind(this);
    this.updateChildrenChecked = this.updateChildrenChecked.bind(this);

    this.state = {
    	checked: props.checked,
    	children: [],
    	childrenStatus:[],
    	childrenChecked: 0,				// number of direct children checked
    	level: props.level
    };
  }

  toggleFolder() {
  	if (this.state.children.length > 0) 
  		this.setState({ children: [] });
    else 
  		this.setState({ children: this.props.children });	
  }

  componentWillReceiveProps(nextProps) {
  	this.setState({
  		checked: nextProps.checked,
  		childrenCheck: nextProps.checked? nextProps.children.length : 0
  	});
  }

  handleCheck(e) {
  	if (e.target.checked) {
  		this.setState({ checked : 1, childrenCheck: this.props.children.length });
  		this.props.tellParent(1);
  	}	else {
  		this.setState({ checked : 0 });
  		this.props.tellParent(-1);
  	}
  	this.props.setCheck(0.5);		// half check
  }

	setCheck(status) {							// mainly for children's use
		if (status === 0) 
			this.checkBox.checked = false;
		else if (status === 0.5)
  		this.checkBox.indeterminate = true;
  	else if (status === 1)
  		this.checkBox.checked = true;
  	else 
  		console.log('check status error!')
  }

  updateChildrenChecked(num) {		// update childrenCheck count when children updates
		this.setState({childrenChecked: this.state.childrenChecked + num});		
		if (this.state.childrenChecked === 0) 
			this.setCheck(0);
		else if (this.state.childrenChecked === this.state.children.length) 
			this.setCheck(1);
  }

  // getChildrenChecked(child) {
  // 	let checkedNum = 0;
  // 	if (this.state.checked === 1) {
  // 		for (let i = 0; i< this.props.children; i++) 
  // 			checkedNum++; 	
  // 	} 
  // 	return checkedNum;
  // }

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
				        	checked={this.state.checked}

				        	children={child.children? child.children : []}
				        	childrenStatus={child.children? getStatusArray(child.children.length, this.state.checked) : []} 
				        	
				        	setCheck={this.setCheck}
				        	tellParent={this.updateChildrenChecked}
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

  /****** structure functions ******/
  getInden() {
		let iden = '', i = 0;
		while (i < this.state.level) {
			iden += ' ';
			i++;
		}
		return iden;
	}

	getCheckBox() {
		if (this.state.checked === 1) 
			return <input type="checkbox" onChange={this.handleCheck} checked={true} ref={box => this.checkBox = box}/>
		else 
			return <input type="checkbox" onChange={this.handleCheck} checked={false} ref={box => this.checkBox = box}/>
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