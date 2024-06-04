import express from "express";
const router = express.Router();
//----------------------------------------------------------------
import {
  getAllTrainer,
  getAllTrainers,
  getSpecificTrainer,
  addTrainer,
  updateTrainer,
  deleteTrainer,
} from "../Controller/TrainerController.js";
//----------------------------------------------------------------
router.route("/trainer").get(getAllTrainer);
router.route("/trainers").get(getAllTrainers);
router.route("/trainers/:id").get(getSpecificTrainer);
router.route("/trainer").post(addTrainer);
router.route("/trainer/:id").put(updateTrainer);
router.route("/trainer/:id").delete(deleteTrainer);
//----------------------------------------------------------------
export default router;
