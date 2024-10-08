import express from "express";
import {
  getTotalCamps,
  getTotalPatients,
  getPatientInfectionStatus,
  getTopCampLocations,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/totalCamp", getTotalCamps);
router.get("/total", getTotalPatients);
router.get("/infection-status", getPatientInfectionStatus);
router.get("/top-locations", getTopCampLocations);

export default router;
