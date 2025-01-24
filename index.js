/**
 * Tres formas de almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante y no se puede modificar
 */

// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const helmet = require("helmet");

const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');

// Inicializamos la aplicación
const app = express();
const uri = "mongodb+srv://patriciabf89:S6JapciHED9vJxJv@cluster0.v4wlb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Activar las configuraciones de seguridad predeterminadas de Helmet
app.use(helmet());



// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8081;

// Arrancamos la aplicación
app.listen(port, async () => {
  await client.connect();
  db = await client.db("mi_proyecto");

  console.log(`Servidor desplegado en puerto: ${port}`);
});





// 1. GET /concesionarios - Obtener todos los concesionarios
app.get("/concesionarios", async (req, res) => {
  const concesionarios = await db.collection("concesionarios").find().toArray();
  res.json(concesionarios);
});

// 2. POST /concesionarios - Crear un nuevo concesionario
app.post("/concesionarios", async (req, res) => {
  const resultado = await db.collection("concesionarios").insertOne(req.body);
  res.json({ message: "Concesionario creado", id: resultado.insertedId });
});

// 3. GET /concesionarios/:id - Obtener un concesionario por su ID
app.get("/concesionarios/:id", async (req, res) => {
  const id = req.params.id;
  const concesionario = await db.collection("concesionarios").findOne({ _id: new ObjectId(id) });
  if (concesionario) {
    res.json(concesionario);
  } else {
    res.status(404).json({ message: "Concesionario no encontrado" });
  }
});

// 4. PUT /concesionarios/:id - Actualizar un concesionario por su ID
app.put("/concesionarios/:id", async (req, res) => {
  const id = req.params.id;
  const resultado = await db
    .collection("concesionarios")
    .updateOne({ _id: new ObjectId(id) }, { $set: req.body });
  if (resultado.matchedCount > 0) {
    res.json({ message: "Concesionario actualizado" });
  } else {
    res.status(404).json({ message: "Concesionario no encontrado" });
  }
});

// 5. DELETE /concesionarios/:id - Borrar un concesionario por su ID
app.delete("/concesionarios/:id", async (req, res) => {
  const id = req.params.id;
  const resultado = await db.collection("concesionarios").deleteOne({ _id: new ObjectId(id) });
  if (resultado.deletedCount > 0) {
    res.json({ message: "Concesionario eliminado" });
  } else {
    res.status(404).json({ message: "Concesionario no encontrado" });
  }
});

// 6. GET /concesionarios/:id/coches - Obtener todos los coches de un concesionario
app.get("/concesionarios/:id/coches", async (req, res) => {
  const id = req.params.id;
  const concesionario = await db.collection("concesionarios").findOne({ _id: new ObjectId(id) });
  if (concesionario) {
    res.json(concesionario.coches || []);
  } else {
    res.status(404).json({ message: "Concesionario no encontrado" });
  }
});

// 7. POST /concesionarios/:id/coches - Añadir un coche a un concesionario
app.post("/concesionarios/:id/coches", async (req, res) => {
  const id = req.params.id;
  const coche = req.body;
  const resultado = await db.collection("concesionarios").updateOne(
    { _id: new ObjectId(id) },
    { $push: { coches: coche } }
  );
  if (resultado.matchedCount > 0) {
    res.json({ message: "Coche añadido al concesionario" });
  } else {
    res.status(404).json({ message: "Concesionario no encontrado" });
  }
});

// 8. GET /concesionarios/:id/coches/:cocheId - Obtener un coche específico de un concesionario
app.get("/concesionarios/:id/coches/:cocheId", async (req, res) => {
  const id = req.params.id;
  const cocheId = parseInt(req.params.cocheId);
  const concesionario = await db.collection("concesionarios").findOne({ _id: new ObjectId(id) });
  if (concesionario && concesionario.coches && concesionario.coches[cocheId]) {
    res.json(concesionario.coches[cocheId]);
  } else {
    res.status(404).json({ message: "Coche no encontrado" });
  }
});

// 9. PUT /concesionarios/:id/coches/:cocheId - Actualizar un coche específico de un concesionario
app.put("/concesionarios/:id/coches/:cocheId", async (req, res) => {
  const id = req.params.id;
  const cocheId = parseInt(req.params.cocheId);
  const concesionario = await db.collection("concesionarios").findOne({ _id: new ObjectId(id) });
  if (concesionario && concesionario.coches && concesionario.coches[cocheId]) {
    concesionario.coches[cocheId] = req.body;
    await db.collection("concesionarios").updateOne(
      { _id: new ObjectId(id) },
      { $set: { coches: concesionario.coches } }
    );
    res.json({ message: "Coche actualizado" });
  } else {
    res.status(404).json({ message: "Coche no encontrado" });
  }
});

// 10. DELETE /concesionarios/:id/coches/:cocheId - Eliminar un coche específico de un concesionario
app.delete("/concesionarios/:id/coches/:cocheId", async (req, res) => {
  const id = req.params.id;
  const cocheId = parseInt(req.params.cocheId);
  const concesionario = await db.collection("concesionarios").findOne({ _id: new ObjectId(id) });
  if (concesionario && concesionario.coches && concesionario.coches[cocheId]) {
    concesionario.coches = concesionario.coches.filter((_, index) => index !== cocheId);
    await db.collection("concesionarios").updateOne(
      { _id: new ObjectId(id) },
      { $set: { coches: concesionario.coches } }
    );
    res.json({ message: "Coche eliminado" });
  } else {
    res.status(404).json({ message: "Coche no encontrado" });
  }
});

