import Fastify from "fastify"; 
import cors from "@fastify/cors"; 
import Sqlite3 from "better-sqlite3"; 
import JWT from "jsonwebtoken"; 

const db = Sqlite3("Front/src/db.sql"); 
const fastify = Fastify(); 
fastify.register(cors); 
const token = JWT.sign(payloadData, privateKey); 

async function hashPwd(password: string) {
  const textEncoder = new TextEncoder(); 
  // const arrayBuffer = textEncoder.encode(attrib a hacher); 
  const arrayBuffer = textEncoder.encode(password);

  //hacher avec le SHA256
  const hash = crypto.subtle.digest({name : "SHA-256"}, arrayBuffer); 

  const hexHash = Array.from(new Uint8Array(hash)).map((byte) => { 
    return byte.toString(16).padStart(2, "0"); }).join(""); 
}
  



fastify.get("/Produit", (request, reply) => {
 const query =db.prepare("SELECT * FROM Produit;")
 const result = query.all(); 
 reply.send(result);
});

type Produit = {
  name: string;
  quantite : string;
}

fastify.get("/Produit", (request, reply) => {
 //const query =db.prepare("INSERT INTO Produit;")
 //const result = query.run(); 
 const { name, quantite } = request.body as Produit; 
 //pour verif si la table est remplie
 if (!name || !quantite) {
  reply.code(500).send();
 }
 //VERIFIER SI SA existe pas
 const checkquery =db.prepare("SELECT * FROM Produit;")
 const checkresult = checkquery.all(); 
if (checkresult.length!==0){
reply.code(500).send("existe deja"); 
}
//insere l'info dans la table
 const InsertQuery = db.prepare("INSERT INTO Produit (name, quantite) VALUES(?,?,?);")
 InsertQuery.run(name, quantite);
 reply.code(200).send("stock cree"); 

});

//delete un elems
fastify.delete("/Produit", (request, reply) => { 
  try {
    const { name, quantite } = request.body as Produit; 

 //pour verif si la table est remplie
 if (!name || !quantite) {
  reply.code(500).send();
 }
 //VERIFIER SI SA existe 
 const checkquery =db.prepare("SELECT * FROM Produit;")
 const checkresult = checkquery.all(); 
//if (!results)

if (checkresult.length==0){
reply.code(404).send("existe pas"); 
}
 const delquery = db.prepare("DELETE FROM Produit WHERE name VALUES (???);")
 delquery.run(name, quantite);
reply.code(500).send(); 
  } catch (error) {
    reply.code(500).send("erroer de delete");
  }
   }); 

//lister les elems
fastify.get("/Produit", (request, reply) => {
  try {
 const query =db.prepare("SELECT * FROM Produit;")
 const result = query.all(); 
 reply.code(204).send(result);
  } catch (error) {
    reply.code(500).send("error"); 
  }
  
});

fastify.listen({port : 8080}); 