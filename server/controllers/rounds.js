import User from "../models/user.js";
import Round from "../models/round.js";

export const findRounds = async (req,res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const userId = user._id.toString();
    const rounds = await Round.find({ user: userId });
    res.json(rounds);
};

export const postRound = async (req,res) => {
    const { email } = req.body.round;
    const user = await User.findOne({ email });
    const userId = user._id.toString();
    const round = new Round({
      course: req.body.round.selectedCourse,
      numHoles: req.body.round.numHoles,
      tee: req.body.round.tee,
      score: req.body.round.score,
      date: req.body.round.newDate,
      user: userId,
    });
    await round.save();
};

export const updateRound = async (req,res) => {
    //Date and Course update not working
    const { editedRound } = req.body;
    const id = editedRound.id;
    const updatedRound = await Round.findByIdAndUpdate(id, editedRound);
    res.json(updatedRound);
};

export const getRound = async (req,res) => {
    const { id } = req.params;
    console.log(id);
    try {
      const round = await Round.findById(id);
      if (!round) {
        return res.json("Error");
      }
      res.json(round);
    } catch (e) {
      res.json(e);
    }
};

export const deleteRound = async (req,res) => {
    const { id } = req.params;
    await Round.findByIdAndDelete(id);
};