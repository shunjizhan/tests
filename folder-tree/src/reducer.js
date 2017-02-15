import { createStore } from 'redux'

// move reducer to a file
function reducer(state = [], action) {
  switch (action.type) {
    case 'randomTable':
      return action.table

    case 'clearTable':
      return []

    default:
      return tableGen(3,3)
  }
}
const store = createStore(reducer, []);

export default store;





//*************** helper functions ***************//
// reducer file
function tableGen(row, colume) {
  let table = [];
  let aColume = [];
  for(let i = 0; i < row; i++) {
    for(let j = 0; j < colume; j++) {
      aColume[j] = randomColor();
    }
    table[i] = aColume;
    aColume = [];
  }
  return table;
}

function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 3; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
    // color += letters[rand(16)];
  }
  return color;
}
//************************************************//