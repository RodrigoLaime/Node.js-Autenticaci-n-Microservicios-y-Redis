const bcrypt = require('bcrypt');

const auth = require('../../../auth/index');

const TABLA = 'auth';
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  //funciona para verificar si el usuario esta registrado o no 
  async function login(username, password) {
    const data = await store.query(TABLA, {
      username: username,
    });//busca todos los que tengan el campo username y nuestro valor username
    return bcrypt.compare(password, data.password)
      .then(sonIguales => {
        if (sonIguales === true) {
          //generar token
          return auth.sign(data);// retorna el token del usuario
        } else {
          throw new Error('Informacion Invalided')
        }
      });

  }


  //funcion para crear todas la seciones
  async function upsert(data) {
    const authData = {
      id: data.id,
    }

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLA, authData);
  }; //mandamos el usuario a la tabla

  return {
    upsert,
    login
  }
};