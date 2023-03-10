const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.profilePic = `../profile-pic/toy-${Math.floor(Math.random()*16) + 1}.jpg`;
  req.body.password = hashedPass;

  const newUser = new User(req.body);
  const { username } = req.body;

  try {
    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res.status(400).json("User already exists!");
    } else {
      const user = await newUser.save();
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json("Invalid Email or Password.");
      } else {
        res.status(200).json(user);
      }
    } else {
      res.status(404).json("User does not exists!");
    }
  } catch (error) {
    res.sendStatus(500).json({ message: error.message });
  }
});

module.exports = router;
