import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class Tree extends Component {
  static propTypes = {
  	data: React.PropTypes.object.isRequired,	
	};

	constructor(props) {
    super(props);
    this.setRootStatus = this.setRootStatus.bind(this);
    // this.changeSelectedFiles = this.changeSelectedFiles.bind(this);

    this.state = {
    	data: props.data,
    	checked: 0
    };
  }

  setRootStatus(id, status) {
  	// console.log('set rootStatus ', status)
  	let newData = this.state.data;
  	newData.status = status;
  	this.setState({data: newData});
  }

  printSelectedFileTree() {
  	let dataCopy = JSON.parse(JSON.stringify(this.state.data));			// should exist better way to clone
 		let selectedTree = JSON.stringify(filterAllSelected(dataCopy, true));
 		console.log(selectedTree);
  }

 	render() {
 			this.printSelectedFileTree();
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
	      	checked={this.state.data.status}
	      	setCheck={() => {}}
	      	tellParent={() => {}}
	      />
	    )
	}
}

function filterAllSelected(node, rootFlag = false) {

	if (rootFlag && node.status === 0) {				// if it is root and is unchecked
		return {};
	} else if (node.children != null && node.children.length > 0) {
	  for (let i = 0; i < node.children.length; i++) {
	    node.children[i] = filterAllSelected(node.children[i]);
	  }
	  return filterNode(node);
	} else {
		return node;
	}
}

function filterNode(node) {  
	let children = node.children;                             // current node doesn't change, only filter children
	if (children != null && children.length !== 0) {

		let filteredChildren = [];
		for (let i = 0; i < children.length; i++) {
			if (children[i].status !== 0) {
				// console.log('children ', children[i].id, ' is checked!')
				filteredChildren.push(children[i]);
			}
		}

		console.log('filteredChildren: ', filteredChildren);
		node.children = filteredChildren;
	  return node;
	}
	else {
		return node;
	}
}



/*
	input: { a: 1, b: 2, c: 3 }
	const mapFunc = element => element * 2
	output: { a: 2, b: 4, c: 6 }
*/

// const mapObj = (mapFunc, obj) =>
// 	Object
// 		.keys(obj) // [a, b, c]
// 		.reduce((acc, key, index) => {
// 			const value = obj[key];
// 			return { ...acc, [key]: mapFunc(value) }
// 		}, {});


// Object.filter = function( obj, predicate) {
//     var result = {}, key;
//     // ---------------^---- as noted by @CMS, 
//     //      always declare variables with the "var" keyword

//     for (key in obj) {
//         if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
//             result[key] = obj[key];
//         }
//     }

//     return result;
// };

// function filterAllSelected(data) {
// 	// if (data.children) {
// 	// 	for (let i = 0; i < data.children.length; i++) {
// 	// 		data.children[i] = filterSelected(data.children[i]);
// 	// 	}
// 	// }
// 	// data = data.filter(child => {
// 	// 	return child.status === 1;
// 	// });

// 	return data;
// }

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
  		this.setState(changeAllChildrenStatus(this.state.children, 1));
  	}	else {
  		// console.log('setState 0');
  		this.props.setChildrenStatus(this.props.id, 0);										// own and parent's check
  		this.setState(changeAllChildrenStatus(this.state.children, 0));		// children's check
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

}

function changeAllChildrenStatus(children, status) {											// set all current and lower children's status
	// console.log('set all childrenStatus ', status)

	for (let i = 0; i < children.length; i++) {
		if (children[i].children) {
			for (let j = 0; j < children[i].children.length; j++) 
  			children[i].children = changeAllChildrenStatus(children[i].children, status)
  	}
 		children[i].status = status;
 	}

 	return children;
}

// function getFolderNum(array) {
//   	let count = 0;
//   	for (let i = 0; i < array.length; i++)
//   		if (array[i].category === 'folder')
//   			count++;
//   	return count;
//   }

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

export default Tree;