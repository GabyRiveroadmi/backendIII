import supertest from "supertest";
import chai from "chai";
import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://gabyriveroadmi1:Coder1234@cluster0.rrpbegd.mongodb.net/backendIII?retryWrites=true&w=majority&appName=Cluster0`);

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Test de la web adoptame", () => {
    describe("Test mascotas: ", () => {
        it ("Endpoint POST /api/pets debe crear una mascota correctamente", async () => 
            {
          const nieveMock = {
            name: "Nieve",
            specie: "calle",
            birthDate: "1999-3-3"
          }
          const {statusCode, ok, _body} = await requester.post("/api/pets").send (nieveMock);

          console.log(statusCode);
          console.log(ok);
          console.log(_body);

          expect(_body.payload).to.have.property("_id");
        })
    })
})