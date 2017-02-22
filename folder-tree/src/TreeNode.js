import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class Tree extends Component {
  static propTypes = {
  	data: React.PropTypes.object.isRequired,	// doesn't five warning?g
	};

	constructor(props) {
    super(props);
    this.setRootStatus = this.setRootStatus.bind(this);

    this.state = {
    	data: props.data,
    	checked: 0,
    	selectedFolders: []	// array of object
    };
  }

  setRootStatus(id, status) {
  	console.log('set rootStatus ', id)
  	this.setState({checked: status});
  }

 	render() {
 			return (
	      <TreeNode 
	      	className="treeRoot"
	      	key={this.state.data.id} 
	      	category={this.state.data.category} 
	      	filename={this.state.data.filename} 
	      	children={this.state.data.children? this.state.data.children : []} 
	      	id={this.state.data.id}
	      	setChildrenStatus={this.setRootStatus}
	      	level={0} 
	      	checked={this.state.checked}
	      	setCheck={() => {}}
	      	tellParent={() => {}}
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
  	checked: React.PropTypes.number.isRequired,
  	id: React.PropTypes.number.isRequired,
  	setChildrenStatus: React.PropTypes.func.isRequired
	};

	constructor(props) {
    super(props);
    this.toggleFolder = this.toggleFolder.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    // this.changeAllChildrenStatus = this.changeAllChildrenStatus.bind(this);

    this.state = {
    	children: props.children,							// {status: 0, data: []}
    	level: props.level,
    	checked: 0,
      open: false
    };
  }

  // componentDidMount() {
  // 	this.changeAllChildrenStatus(this.props.checked);
  // }

  // componentWillReceiveProps(nextProps) {
  // 	if (nextProps.checked === 1) {
  // 		this.changeAllChildrenStatus(1);
  // 	}
  // }

  toggleFolder() {
  		this.setState(prevState => ({ open: !prevState.open }));
  }

  handleCheck(e) {																// handle this level's check
  	if (e.target.checked) {
  		// console.log('setState 1');
  		this.props.setChildrenStatus(this.props.id, 1);
  		this.setState(changeAllChildrenStatus(this.state.children, 1));
  	}	else {
  		// console.log('setState 0');
  		this.props.setChildrenStatus(this.props.id, 0);										// own check
  		this.setState(changeAllChildrenStatus(this.state.children, 0));		// children's check
  	}
  }

  setChildrenStatus = (id, status) => {									// child use it to update its status
  	console.log('set childrenStatus ', status)

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
  	// const halfCheckedChildren = this.state.children.filter(child => {
  	// 	return child.status === 0.5;
  	// });

  	if (prevStatus === 0.5) {
  		return 0.5;
  	}

  	const selectedChildren = this.state.children.filter(child => {
  		return child.status === 1;
  	});


  	if (selectedChildren.length === getFolderNum(this.state.children)) {
  		return 1;
  	} else if (selectedChildren.length === 0) {
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
	        {this.getInden() + '    '}
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

}

function changeAllChildrenStatus(children, status) {											// set all current and lower children's status
	console.log('set all childrenStatus ', status)

	for (let i = 0; i < children.length; i++) {
		if (children[i].children) {
			for (let j = 0; j < children[i].children.length; j++) 
  			children[i].children = changeAllChildrenStatus(children[i].children, status)
  	}
 		children[i].status = status;
 	}

 	return children;
}

function getFolderNum(array) {
  	let count = 0;
  	for (let i = 0; i < array.length; i++)
  		if (array[i].category === 'folder')
  			count++;
  	return count;
  }










class Checkbox extends React.Component {
	static propTypes = {
  	handleCheck: React.PropTypes.func.isRequired,	
  	status: React.PropTypes.number.isRequired
	};

	constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
  }

	componentDidUpdate(prevProps, prevState) {
		// console.log('Checking indeterminate status', this.props.status);
		if (this.props.status === 0.5) 
			this.checkBox.indeterminate = true;
		else
			this.checkBox.indeterminate = false;
	}

	componentDidMount() {
		// console.log('Checking indeterminate status', this.props.status);
		if (this.props.status === 0.5) 
			this.checkBox.indeterminate = true;
		else
			this.checkBox.indeterminate = false;
	}

	handleCheck(e) {
		this.props.handleCheck(e);
	}

	render() {
		return <input type="checkbox" onChange={this.handleCheck} checked={this.props.status !== 1? false : true} ref={box => this.checkBox = box}/>
	}
}


// function getStatusArray(n, status) {
//   	let statusArray = [];
//   	if (status === 0.5) {
//   		for (let i = 0; i < n; i++) {
// 	  		if (i === 0)
// 	  			statusArray[i] = 0.5;
// 	  		else
// 	  			statusArray[i] = 0;	
// 	  	}
//   	} else {
// 	  	for (let i = 0; i < n; i++) {
// 	  		statusArray[i] = status;		// defult to unchecked
// 	  	}
// 	  }
//   	return statusArray;
//   }

export default Tree;