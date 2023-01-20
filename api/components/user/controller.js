const nanoid = require('nanoid');
const auth = require('../auth');

const TABLA = 'user';

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  function list() {
    return store.list(TABLA);
  }

  function get(id) {
    return store.get(TABLA, id);
  }

  async function upsert(body) {
    const user = {
      name: body.name,
      username: body.username,
    }

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      })
    }

    return store.upsert(TABLA, user);
  }

  return {
    list,
    get,
    upsert,
  };
}
/* ################ */
/* const { nanoid } = require('nanoid')
const TABLA = 'user';

const auth = require('../auth/index')

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/mysql');
  }

  function list() {
    return store.list(TABLA)
  };

  function get(id) {
    return store.get(TABLA, id)
  };

  async function upsert(body) {
    const user = {//creamos un usuario
      name: body.name,
      username: body.username
    }

    if (body.id) {
      user.id = body.id;//si biene un id lo usamos
    } else {
      user.id = nanoid();//si no lo generamos
    }

    if (body.password || body.username) {//siempre actualizar cada ves que nos vienen estos datos
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      })
    }

    return store.upsert(TABLA, user);//mandamos el usuario a la tabla
  }

  return {
    list,
    get,
    upsert
  };
} */