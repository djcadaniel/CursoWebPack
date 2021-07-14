//para crear archivos dentro del servidor
const fs = require('fs') //fs:file system,porq vamos a trabajar con un modulo de node y esto nos permite trabajar con el s.o. y poder enviar datos

fs.writeFileSync('./.env',`API=${process.env.API}\n`) //estamos creando un archivo .env dentro del servidor, por q este script se corre dentro del servidor