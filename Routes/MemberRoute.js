import express from "express";
const router = express.Router();
//----------------------------------------------------------------
import {
  getAllMember,
  getAllMembers,
  getSpecificMember,
  getAllTotalCost,
  getTotalCost,
  addMember,
  updateMember,
  deleteMember,
} from '../Controller/MemberController.js';
//----------------------------------------------------------------
router.route("/Member").get(getAllMember);
router.route("/Members").get(getAllMembers);
router.route("/Members/:id").get(getSpecificMember);
router.route("/total-cost/:id").get(getTotalCost);
router.route("/total-cost").get(getAllTotalCost);
router.route("/Member").post(addMember);
router.route("/Member/:id").put(updateMember);
router.route("/Member/:id").delete(deleteMember);
//----------------------------------------------------------------
export default router;
