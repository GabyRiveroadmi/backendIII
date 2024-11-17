import User from "../src/dao/Users.dao.js";
import mongoose from "mongoose";
import assert from "assert";


mongoose.connect(`mongodb+srv://gabyriveroadmi1:Coder1234@cluster0.rrpbegd.mongodb.net/backendIII?retryWrites=true&w=majority&appName=Cluster0`);

describe("Test DAO de usuarios", function () {
    before(function () {
        this.usersDao = new User ();
    })

    this.beforeEach(async function (){
        await mongoose.connection.collections.users.drop();
    })

    it("El get de usuarios debe retornar un array", async function() {
        const resultado = await this.usersDao.get();

        assert.strictEqual(Array.isArray(resultado), true)
    })

    it("Agregar un nuevo usuario a la base de datos", async function () {
        let usuario = {
        "first_name": "Diego",
        "last_name": "Silva",
        "email": "diego.silva@gmail.com",
        "password": "1234",
    }
    const resultado = await this.usersDao.save(usuario);
    assert.ok(resultado._id);
    })
    
    it("Validar array de mascotas vacio", async function() {
        let usuario = {
            "first_name": "Sofia",
            "last_name": "Vega",
            "email": "sofia.vega@gmail.com",
            "password": "1234"}
        
        const resultado = await this.usersDao.save(usuario);
        assert.deepStrictEqual(resultado.pets, []);
    })

    it("Obtener usuarios por el mail", async function() {
        let usuario = {
            "first_name": "Sofia",
            "last_name": "Vega",
            "email": "sofia.vega@gmail.com",
            "password": "1234"}
            
        await this.usersDao.save(usuario);
        
        const user = await this.usersDao.getBy({email: usuario.email});

        assert.strictEqual(typeof user, "object");
    })

    after(async function(){
        await mongoose.disconnect();
    })
})
