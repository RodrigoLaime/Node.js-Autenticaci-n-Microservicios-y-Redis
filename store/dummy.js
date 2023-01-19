const db = {
  'user': [
    {
      id: 1,
      name: 'Rodrigo',
    }
  ],
};

async function list(table) {
  return db[table] || [];
};
async function get(table, id) {
  let col = await list(table);//coleccion de datos 
  return col.filter(item => item.id === id)[0] || null;//traera todo un array desde el elemento 0, o no traera nada 
};
async function upsert(table, data) {
  if (!db[table]) {
    db[table] = [];
  }
  db[table].push(data);//insertamos nuestros datos

  console.log(db);
};
async function remove(tabla, id) {
  return true
};

//function para login
async function query(tabla, q) {
  let col = await list(tabla);
  let keys = Object.keys(q);
  let key = keys[0];
  return col.filter(item => item[key] === q[key])[0] || null;//filtra todo lo que venga de los item 
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
}
