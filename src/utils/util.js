import {faker} from "@faker-js/faker"; 
import bcrypt from "bcrypt";

const generarUsuarios = (numUsuarios = 1) => {
    let usuarios = [];

    for (let j = 0; j < numUsuarios; j++) {
        usuarios.push({
            password: bcrypt.hashSync("coder123", 10), 
            role: faker.helpers.arrayElement(["user", "admin"]), 
            pets: [] /
        });
    }

    return usuarios;
}

export default generarUsuarios;