import mongoose from "mongoose";
import User from "../src/dao/Users.dao.js";
import chai from "chai";

const expect = chai.expect;
mongoose.connect(`mongodb+srv://gabyriveroadmi1:Coder1234@cluster0.rrpbegd.mongodb.net/backendIII?retryWrites=true&w=majority&appName=Cluster0`);

describe("Test desde Chai", function(){
    before(function(){
        this.usersDao = new User();
    })

    beforeEach(async function(){
        await mongoose.connection.collections.users.drop();
    })

    it("el get de usuarios retorna un array", async function(){
        const resultadoChai = await this.usersDao.get();

        expect(Array.isArray(resultadoChai)).to.be.true
    })

    it("Agregar un nuevo usuario a la base de datos", async function () {
        let usuario = {
        "first_name": "Diego",
        "last_name": "Silva",
        "email": "diego.silva@gmail.com",
        "password": "1234",
    }
    const resultado = await this.usersDao.save(usuario);
    expect(resultado).to.have.property("_id");
    })


    it("Validar array de mascotas vacio", async function() {
        let usuario = {
            "first_name": "Sofia",
            "last_name": "Vega",
            "email": "sofia.vega@gmail.com",
            "password": "1234"}
        
        const resultado = await this.usersDao.save(usuario);
        expect(resultado.pets).to.deep.equal([]);
    })

    it("Obtener usuarios por el mail", async function() {
        let usuario = {
            "first_name": "Sofia",
            "last_name": "Vega",
            "email": "sofia.vega@gmail.com",
            "password": "1234"}
            
        await this.usersDao.save(usuario);
        
        const user = await this.usersDao.getBy({email: usuario.email});

        expect(user).to.be.an("object");
    })


    after(async function(){
        await mongoose.disconnect();

    })
})   