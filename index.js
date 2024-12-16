/**
 * Tres formas de almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante y no se puede modificar
 */

// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");

// Inicializamos la aplicación
const app = express();

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});

// Definimos una estructura de datos
// (temporal hasta incorporar una base de datos)
let concesionarios = [
  {
    nombre: "Concesionario A",
    direccion: "Calle Falsa 123",
    coches: [
      { modelo: "Opel Corsa", cv: 100, precio: 15000 },
      { modelo: "Ford Focus", cv: 120, precio: 18000 },
    ],
  },
  {
    nombre: "Concesionario B",
    direccion: "Avenida Real 456",
    coches: [
      { modelo: "Renault Clio", cv: 90, precio: 12000 },
      { modelo: "BMW X5", cv: 250, precio: 45000 },
    ],
  },
];

// Endpoints

// 1. GET /concesionarios - Obtener todos los concesionarios
app.get("/concesionarios", (req, res) => {
  res.json(concesionarios);
});

// 2. POST /concesionarios - Crear un nuevo concesionario
app.post("/concesionarios", (req, res) => {
  const nuevoConcesionario = req.body;
  concesionarios.push(nuevoConcesionario);
  res.json({ message: "Concesionario creado" });
});

// 3. GET /concesionarios/:id - Obtener un concesionario por su ID
app.get("/concesionarios/:id", (req, res) => {
  const id = req.params.id;
  const concesionario = concesionarios[id];
  if (concesionario) {
    res.json(concesionario);
  } else {
    res.status(404).json({ message: "Concesionario no encontrado" });
  }
});

// 4. PUT /concesionarios/:id - Actualizar un concesionario por su ID
app.put("/concesionarios/:id", (req, res) => {
  const id = req.params.id;
  const concesionario = concesionarios[id];
  if (concesionario) {
    concesionarios[id] = req.body;
    res.json({ message: "Concesionario actualizado" });
  } else {
    res.status(404).json({ message: "Concesionario no encontrado" });
  }
});

// 5. DELETE /concesionarios/:id - Borrar un concesionario por su ID
app.delete("/concesionarios/:id", (req, res) => {
  const id = req.params.id;
  concesionarios = concesionarios.filter((_, index) => index !== parseInt(id));
  res.json({ message: "Concesionario eliminado" });
});

// 6. GET /concesionarios/:id/coches - Obtener todos los coches de un concesionario por su ID
app.get("/concesionarios/:id/coches", (req, res) => {
  const id = req.params.id;
  const concesionario = concesionarios[id];
  if (concesionario) {
    res.json(concesionario.coches);
  } else {
    res.status(404).json({ message: "Concesionario no encontrado" });
  }
});

// 7. POST /concesionarios/:id/coches - Añadir un coche a un concesionario
app.post("/concesionarios/:id/coches", (req, res) => {
  const id = req.params.id;
  const concesionario = concesionarios[id];
  if (concesionario) {
    concesionario.coches.push(req.body);
    res.json({ message: "Coche añadido al concesionario" });
  } else {
    res.status(404).json({ message: "Concesionario no encontrado" });
  }
});

// 8. GET /concesionarios/:id/coches/:cocheId - Obtener un coche específico de un concesionario
app.get("/concesionarios/:id/coches/:cocheId", (req, res) => {
  const id = req.params.id;
  const cocheId = req.params.cocheId;
  const concesionario = concesionarios[id];
  if (concesionario) {
    const coche = concesionario.coches[cocheId];
    if (coche) {
      res.json(coche);
    } else {
      res.status(404).json({ message: "Coche no encontrado" });
    }
  } else {
    res.status(404).json({ message: "Concesionario no encontrado" });
  }
});

// 9. PUT /concesionarios/:id/coches/:cocheId - Actualizar un coche específico de un concesionario
app.put("/concesionarios/:id/coches/:cocheId", (req, res) => {
  const id = req.params.id;
  const cocheId = req.params.cocheId;
  const concesionario = concesionarios[id];
  if (concesionario) {
    const coche = concesionario.coches[cocheId];
    if (coche) {
      concesionario.coches[cocheId] = req.body;
      res.json({ message: "Coche actualizado" });
    } else {
      res.status(404).json({ message: "Coche no encontrado" });
    }
  } else {
    res.status(404).json({ message: "Concesionario no encontrado" });
  }
});

// 10. DELETE /concesionarios/:id/coches/:cocheId - Eliminar un coche específico de un concesionari
app.delete("/concesionarios/:id/coches/:cocheId", (req, res) => {
  const id = req.params.id;
  const cocheId = req.params.cocheId;
  const concesionario = concesionarios[id];
  if (concesionario) {
    concesionario.coches = concesionario.coches.filter(
      (_, index) => index !== parseInt(cocheId),
    );
    res.json({ message: "Coche eliminado" });
  } else {
    res.status(404).json({ message: "Concesionario no encontrado" });
  }
});
