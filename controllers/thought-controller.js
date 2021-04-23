const { Thought, User } = require("../models");

const thoughtController = {
  getAllThought(req, res) {
    Thought.find({})
      .populate({ path: "user", select: "-__v" })
      .select("-__v")
      .populate({ path: "reactions" })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({ path: "user", select: "-__v" })
      .select("-__v")
      .then((dbThoughtData) => {
        // If no pizza is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "No user found with this username!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id }).then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }

      User.findOneAndUpdate(
        { username: dbThoughtData.username },
        { $pull: { thoughts: params.id } }
      )
        .then(() => {
          res.json({ message: "You have successfully deleted the thought" });
        })
        .catch((err) => res.status(400).json(err));
    });
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json({ message: "Successfully deleted the reaction" });
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
