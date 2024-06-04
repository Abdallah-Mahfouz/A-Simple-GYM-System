import fs from "fs";
import Member from "../Member.json" assert { type: "json" };
import Trainer from "../Trainer.json" assert { type: "json" };

//----------------------------------------------------------------1
//get all members
const getAllMember = (req, res) => {
  res.json(Member);
};
//----------------------------------------------------------------2
// Get all Members and Member’sTrainer
const getAllMembers = (req, res) => {
  const m$t = Member.map((member) => {
    const trainer = Trainer.find((e) => e.id === member.trainerId);
    return { ...member, trainer };
  });

  res.json(m$t);
};

// ----------------------------------------------------------------3
// Get all revenues of all members.
const getAllTotalCost = (req, res) => {
  const totalCost = Member.reduce(
    (total, member) => total + member.membership.cost,
    0
  );
  res.json({ totalCost });
};
//----------------------------------------------------------------4
// Get the revenues of a specific trainer.
const getTotalCost = (req, res) => {
  const index = Trainer.find((trainer) => trainer.id == req.params.id);
  if (!index) {
    return res.status(404).json({ message: "Trainer not found" });
  }
  const trainerMemberCost = Member.reduce((total, member) => {
    if (member.trainerId == req.params.id) {
      return total + member.membership.cost;
    }
    return total;
  }, 0);
  res.json({
    trainerId: req.params.id,
    trainerName: index.name,
    trainerMemberCost,
  });
};
//----------------------------------------------------------------5
// - Get a specific Member (if his membership expired return “this member is not allowed to enter the gym”)
const getSpecificMember = (req, res) => {
  let index = Member.find((e) => e.id == req.params.id);
  if (!index) {
    return res.status(404).json({ message: "Index not found" });
  }
  const currentDate = new Date().toISOString().slice(0, 10);
  const membershipExpired = index.membership.to < currentDate;
  if (membershipExpired) {
    res.status(403).json({ message: "not allowed to enter the gym" });
  } else {
    res.status(200).json({ message: "  allowed to enter" });
  }
};
//----------------------------------------------------------------6
//  Add Member (must be unique in nationalId )
const addMember = (req, res) => {
  let index = Member.find((e) => e.nationalId === req.body.nationalId);
  if (index) {
    return res.status(400).json({ message: "National ID already exists" });
  }
  req.body.id = Member.length + 1;
  Member.push(req.body);
  fs.writeFile("./Member.json", JSON.stringify(Member), (err) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "added Member", user: req.body });
  });
};
//----------------------------------------------------------------7
// UpdateMember (name, membership, trainer id)
const updateMember = (req, res) => {
  let index = Member.findIndex((e) => e.id == req.params.id);
  if (index == -1) {
    return res.status(404).json({ message: "Index not found" });
  }
  Member[index].name = req.body.name;
  Member[index].membership = req.body.membership;
  Member[index].trainerId = req.body.trainerId;
  fs.writeFile("./Member.json", JSON.stringify(Member), (err) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json({ message: "update", user: Member[index] });
  });
};
//----------------------------------------------------------------8
// DeleteMember
const deleteMember = (req, res) => {
  let index = Member.findIndex((e) => e.id == req.params.id);
  if (index == -1) {
    return res.status(404).json({ message: "Index not found" });
  }
  Member.splice(index, 1);
  fs.writeFile("./Member.json", JSON.stringify(Member), (err) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json({ message: "deleted" });
  });
};
//----------------------------------------------------------------
export {
  getAllMember,
  getAllMembers,
  getSpecificMember,
  getAllTotalCost,
  getTotalCost,
  addMember,
  updateMember,
  deleteMember,
};
