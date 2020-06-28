const express = require("express");
const User = require("../models/users");
const router = express.Router(); // Assigning Router
// Getting all Users From DB
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting Certain Users From DB
router.get("/:id", getUser, (req, res) => {
  res.status(200).json(res.user);
});

// Inserting User Into DB
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    userName: req.body.name + "-copyleg",
    age: req.body.age,
  });
  try {
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Updating Certain Users In DB
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
    res.user.userName = res.user.name + "-copyleg";
  }
  if (req.body.age != null) {
    res.user.age = req.body.age;
  }
  try {
    const updatedUser = await res.user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Deleteing certain User From DB
router.delete("/:id", getUser, async (req, res) => {
  try {
    const deletedUser = await res.user.remove();
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json("cannot find user");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;