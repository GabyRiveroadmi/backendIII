import mongoose from "mongoose";
import Adoption from "../src/dao/Adoption.js"; 
import chai from "chai";

const expect = chai.expect;
mongoose.connect(`mongodb+srv://gabyriveroadmi1:Coder1234@cluster0.rrpbegd.mongodb.net/backendIII?retryWrites=true&w=majority&appName=Cluster0`);

describe("Test de Adopciones", function() {
  this.timeout(10000);
  
  let idBusqueda; 
  
  before(function() {
    this.adoptionDao = new Adoption();
  });

  beforeEach(async function() {
   
    await mongoose.connection.collections.adoptions.drop().catch(() => {});

    
    const adopcion1 = await this.adoptionDao.save({
      owner: "62fdba7b89b09c6efb53d738", 
      pet: "673d1a47def86ac51961f0b9",   
    });

    const adopcion2 = await this.adoptionDao.save({
      owner: "62fdba7b89b09c6efb53d739", 
      pet: "673d1a47def86ac51961f0ba",   
    });

    
    idBusqueda = adopcion1._id.toString();
  });

  it("Obtener todas las adopciones", async function() {
    this.timeout(8000);
    const adopciones = await this.adoptionDao.get();

    expect(Array.isArray(adopciones)).to.be.true;
    expect(adopciones.length).to.be.greaterThan(0); 
  });

  it("Buscar una adopción por ID", async function () {
    this.timeout(8000);
  
    
    const adopcionBuscada = await this.adoptionDao.getBy({
      _id: new mongoose.Types.ObjectId(idBusqueda),
    });
  
    
    expect(adopcionBuscada).to.not.be.null; 
    expect(adopcionBuscada).to.be.an("object"); 
    expect(adopcionBuscada._id.toString()).to.equal(idBusqueda); 
    expect(adopcionBuscada.owner.toString()).to.equal("62fdba7b89b09c6efb53d738"); 
    expect(adopcionBuscada.pet.toString()).to.equal("673d1a47def86ac51961f0b9"); 
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