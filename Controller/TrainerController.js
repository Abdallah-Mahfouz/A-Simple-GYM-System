import fs from "fs";
import Member from "../Member.json" assert { type: "json" };
import Trainer from "../Trainer.json" assert { type: "json" };

//----------------------------------------------------------------1
// getAllTrainer
const getAllTrainer = (req, res) => {
  res.json(Trainer);
};
// ----------------------------------------------------------------2
// getAllTrainers and trainer’s members
const getAllTrainers = (req, res) => {
  const t$m = Trainer.map((trainer) => {
    const member = Member.find((e) => e.id === trainer.id);
    return { ...trainer, member };
  });

  res.json(t$m);
};
// ----------------------------------------------------------------3
// getSpecificTrainer and trainer’s members
const getSpecificTrainer = (req, res) => {
  const trainer = Trainer.find((trainer) => trainer.id == req.params.id);
  if (!trainer) {
    return res.status(404).json({ message: "Trainer not found" });
  }
  const member = Member.filter((member) => member.trainerId == trainer.id);

  res.json({ ...trainer, member });
};
// ----------------------------------------------------------------4
// add trainer
const addTrainer = (req, res) => {
  req.body.id = Trainer.length + 1;
  Trainer.push(req.body);
  fs.writeFile("./Trainer.json", JSON.stringify(Trainer), (err) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Trainer added ", Trainer: req.body });
  });
};
// ----------------------------------------------------------------5
//  Update trainer
const updateTrainer = (req, res) => {
  let index = Trainer.findIndex((e) => e.id == req.params.id);
  if (index == -1) {
    return res.status(404).json({ message: "Index not found" });
  }
  Trainer[index].name = req.body.name;
  Trainer[index].duration = req.body.duration;
  fs.writeFile("./Trainer.json", JSON.stringify(Trainer), (err) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json({ message: "update", user: Trainer[index] });
  });
};

//----------------------------------------------------------------6
// Delete  trainer
const deleteTrainer = (req, res) => {
  let index = Trainer.findIndex((e) => e.id == req.params.id);
  if (index == -1) {
    return res.status(404).json({ message: "Index not found" });
  }
  Trainer.splice(index, 1);
  fs.writeFile("./Trainer.json", JSON.stringify(Trainer), (err) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "deleted" });
  });
};

//----------------------------------------------------------------
export {
  getAllTrainer,
  getAllTrainers,
  getSpecificTrainer,
  addTrainer,
  updateTrainer,
  deleteTrainer,
};
