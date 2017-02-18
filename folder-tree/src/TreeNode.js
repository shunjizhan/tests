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
    	childrenChecked:[],
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
    this.getCheckStatus = this.getCheckStatus.bind(this);

    this.state = {
    	checked: props.checked,
    	children: [],
    	childrenStatus:[],
    	childrenChecked: 0,				// number of direct children checked
    	level: props.level,
      open: false
    };
  }

  toggleFolder() {
  	if (this.state.children.length > 0) 
  		this.setState({ 
        children: [],
        open: false 
      });
    else 
  		this.setState({ 
        children: this.props.children,
        open:true 
      });	
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps.checked: ' + nextProps.checked);
    if (nextProps.checked !== -1) {
    	this.setState({
    		checked: nextProps.checked,
    		childrenChecked: nextProps.checked? this.getFolderNum(nextProps.children.length) : 0
    	});
    } else {
      this.setState({
        childrenChecked: nextProps.checked? this.getFolderNum(nextProps.children.length) : 0
      }); 
    }
  }

  handleCheck(e) {
  	if (e.target.checked) {
  		// console.log('childrens length: ' + this.getFolderNum(this.props.children) )
  		this.props.tellParent(1);
  		this.props.setCheck(0.5);
  		// console.log('setState 1');
  		this.setState({ 
  			checked : 1, 
  			childrenChecked: this.getFolderNum(this.props.children) 
  		});
  	}	else {
  		this.props.tellParent(-1);
  		this.props.setCheck(0.5);
  		// console.log('setState 0');
  		this.setState({ 
  			checked : 0,
  			childrenChecked: 0 
  		});
  	}
  }

	setCheck(status) {				               // mainly for children's use							
		// console.log('setCheck ' + status)
		if (status === 0) {
			this.setState ({checked : 0});
  	} else if (status === 0.5) {						
  		this.checkBox.indeterminate = true;
  		this.props.setCheck(0.5);							// recursively set parents half check
		} else if (status === 1) {
  		this.setState ({checked : 1});
  	} else 
  		console.log('check status error!')
  }

  updateChildrenChecked(num) {		// update childrenCheck count when children updates
  	// console.log('updateChildrenChecked ' + num)

		this.setState({childrenChecked: this.state.childrenChecked + num});	
    // console.log('finished set state!!!!');

		// if (this.state.childrenChecked === 0 ) {
		// 	console.log('00000')
		// 	this.setCheck(0);
		// } else if (this.state.childrenChecked === this.getFolderNum(this.state.children.length) ) {
		// 	console.log('11111')
		// 	this.setCheck(1);
		// }
  }

  getFolderNum(array) {
  	let count = 0;
  	for (let i = 0; i < array.length; i++)
  		if (array[i].category === 'folder')
  			count++;
  	return count;
  }

  getChildrenChecked(child) {
  	let checkedNum = 0;
  	if (this.state.checked === 1) {
  		for (let i = 0; i< this.props.children; i++) 
  			checkedNum++; 	
  	} 
  	return checkedNum;
  }

  getCheckStatus() {
    if (this.checkBox.indeterminate === true)
      return -1;
    else 
      return this.state.checked;
  }

 	render() {
 		console.log('render checked = ' + this.state.checked)
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
				        	checked={this.getCheckStatus()}

				        	children={child.children? child.children : []}
				        	childrenStatus={child.children? getStatusArray(this.getFolderNum(child.children.length), this.state.checked) : []} 
				        	
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