import mongoose from "mongoose";
import Adoption from "../src/dao/Adoption.js"; 
import chai from "chai";

const expect = chai.expect;
mongoose.connect(`mongodb+srv://gabyriveroadmi1:Coder1234@cluster0.rrpbegd.mongodb.net/backendIII?retryWrites=true&w=majority&appName=Cluster0`);

describe("Test de Adopciones", function() {
  this.timeout(10000);
  before(function() {
    this.adoptionDao = new Adoption();
  });

  beforeEach(async function() {
    
    await mongoose.connection.collections.adoptions.drop();

   
    await this.adoptionDao.save({
      owner: "62fdba7b89b09c6efb53d738", 
      pet: "673d1a47def86ac51961f0b9",   
    });

    await this.adoptionDao.save({
      owner: "62fdba7b89b09c6efb53d739", 
      pet: "673d1a47def86ac51961f0ba",   
    });
  });

  it("Obtener todas las adopciones", async function() {
    this.timeout(8000);
    const adopciones = await this.adoptionDao.get();

    expect(Array.isArray(adopciones)).to.be.true;
    expect(adopciones.length).to.be.greaterThan(0); 
  });

  it("Buscar una adopción por ID", async function() {
    this.timeout(8000);
    const idBusqueda = "673d1b49def86ac51961f0c2";  
  
    const adopcionBuscada = await this.adoptionDao.getBy({ _id: mongoose.Types.ObjectId(idBusqueda) });
  
    expect(adopcionBuscada).to.be.an("object");
    expect(adopcionBuscada._id.toString()).to.equal(idBusqueda); 
  });

  


  it("Crear una nueva adopción", async function() {
    this.timeout(8000);
    const nuevaAdopcion = await this.adoptionDao.save({
      owner: "62fdba7b89b09c6efb53d73a", 
      pet: "673d1a47def86ac51961f0bb",   
    });

    expect(nuevaAdopcion).to.have.property("_id");
    expect(nuevaAdopcion.owner.toString()).to.equal("62fdba7b89b09c6efb53d73a");
    expect(nuevaAdopcion.pet.toString()).to.equal("673d1a47def86ac51961f0bb");
  });

  after(async function() {
 
    await mongoose.disconnect();
  });
});

