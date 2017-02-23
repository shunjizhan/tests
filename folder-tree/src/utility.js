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

const filterObj = (filterFunc, obj) =>
  Object
		.keys(obj) // [a, b, c]
		.reduce((acc, key, index) => {
          const value = obj[key];
          if (filterFunc(value))
            return Object.assign(acc, { [key]: value  })
          else 
            return acc  
		}, {});

const filterFunc = elem => (elem % 2) === 0;

console.log('FILTER OBJ', filterObj(filterFunc, input))