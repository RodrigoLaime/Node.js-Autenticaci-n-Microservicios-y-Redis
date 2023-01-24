const jwt = require('jsonwebtoken');
const config = require('../config');

const error = require('../utils/error')

const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, secret);
}

function verify(token) {
  return jwt.verify(token, secret)
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);

    if (decoded.id !== owner) {
      throw error('No puedes hacer esto', 401);
    }
  },

  logged: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);
  },
}

function getToken(auth) {
  if (!auth) {
    throw new Error('No viene token');
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw new Error('Formato invalido');
  }

  let token = auth.replace('Bearer ', '');
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  sign,
  check,
};
/* xxx */
/* const jwt = require('jsonwebtoken');
const config = require('../config');

const secret = config.jwt.secret;//obtenemos el secret desde la jwt

//function que crea el primer token
function sign(data) {//le pasamos la info de un usuario
  return jwt.sign(data, secret)
}

function verify(token) {
  return jwt.verify(token, secret)
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);

    //comprobar si es o no propio
    if (decoded.id !== owner) {
      throw new Error('No puedes hacer esto')
    }
  }
}


//para ver si llega el token
function getToken(auth) {
  if (!auth) {
    throw new Error('no viene token')
  }

  if (auth.indexOf('Bearer ') === -1) {//si no lo encuetra
    throw new Error('Informat invalido');
  }

  let token = auth.replace('Bearer', '');

  return token.trim();
}

//decodificar el token
function decodeHeader(req) {
  //header a recivir
  const authorization = req.headers.authorization || '';
  //sacar el token desde el tipo de cabecera
  const token = getToken(authorization);

  //verifica si el token es valido
  const decoded = verify(token);

  //lo dejamos en la reques
  req.user = decoded;

  return decoded;
}

module.exports = {
  sign,
  check,
} */