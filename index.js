const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const _ = require("lodash");

async function registrarUsuarios() {
  try {
    const chalk = await import("chalk");
    const response = await axios.get("https://randomuser.me/api/?results=20");
    const data = response.data;
    const dataFormateada = formatearUsuario(data.results);
    const tipoSexo = _.partition(dataFormateada, function (user) {
      return user.sexo == "male";
    });

    const sexoUsuario = {
      males: tipoSexo[0],
      females: tipoSexo[1],
    };

    console.log(chalk.default.bgWhite.blue('Lista de usuarios registrados:'));
    console.log(sexoUsuario);
  } catch (error) {
    console.error('Error al registrar usuarios:', error.message);
  }
}

function formatearUsuario(data) {
  const dataFormateada = data.map((item) => {
    return {
        id: uuidv4(),
        nombre: item.name.first,
        apellido: item.name.last,
        timespamp: moment(item.dob.date).format("DD-MM-YYYY HH:mm:ss"),
        sexo: item.gender,
    };
  });
  return dataFormateada;
}

registrarUsuarios();
