import {faker} from "@faker-js/faker"; 
import bcrypt from "bcrypt";

const generarUsuarios = (numUsuarios = 1) => {
    let usuarios = [];

    for (let j = 0; j < numUsuarios; j++) {
        usuarios.push({
            password: bcrypt.hashSync("coder123", 10), // Contraseña encriptada
            role: faker.helpers.arrayElement(["user", "admin"]), // Rol aleatorio entre "user" y "admin"
            pets: [] // Array vacío para mascotas
        });
    }

    return usuarios;
}

export default generarUsuarios;