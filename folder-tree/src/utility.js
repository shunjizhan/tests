const mapObj = (mapFunc, obj) =>
	Object
		.keys(obj) // [a, b, c]
		.reduce((acc, key, index) => {
			const value = obj[key];
            return Object.assign(acc, { [key]: mapFunc(value) })
		}, {});

const input = { a: 1, b: 2, c: 3, d: 4 };
const mapFunc = elem => elem * 2;

console.log('MAP OBJ', mapObj(mapFunc, input))

/*
  input: { a: 1, b: 2, c: 4, d: 4 }
  filterFunction = elem => (elem % 2) === 0
  output: { b: 2, d: 4 }
*/

function filterNode(node) {                               // current node doesn't change, only filter children
  return Object.keys(node.children).reduce((acc, key, index) => {
          const value = node.children.key;
          if value.status !== 0
            return Object.assign(acc, { [key]: tree  })
          else 
            return acc  
		}, {
      "id": node.id,
      "filename": node.filename,
      "category": node.category,
      "status": node.status,
    });
}

function filterAllSelected(node) {
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      node.children[i] = filterNode(node.children[i]);
    }
  }
  return filterNode(node);
}

console.log('FILTER OBJ', filterObj(filterFunc, input))