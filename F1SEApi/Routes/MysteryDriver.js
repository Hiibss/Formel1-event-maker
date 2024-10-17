// import express from "express";
// const router = express.Router();

// import DriverModel from "../Models/Driver";

// // endepunkt for å hente random driver
// router.get("/random", async (req, res) => {
//   try {
//     const drivers = await DriverModel.find(); // henter alle drivere fra databasen
//     const randomIndex = Math.floor(Math.random() * drivers.length); // en random driver blir valgt
//     const randomDriver = drivers[randomIndex];
//     res.json(randomDriver); // sender random driver tilbake til bruker
//   } catch (error) {
//     res.status(500).send("Serverfeil: " + error.message);
//   }
// });

// export default router;
