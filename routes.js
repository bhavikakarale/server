const express = require("express");
const router = express.Router();
const User = require("./user");

//Sign-up route
router.post("/singup", async (req, res) => {
  let user = new User();
  user.email = req.body.email;
  user.password = req.body.password;

  try {
    const doc = await user.save();
    console.log(doc);
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Login route
router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = req.body.password === user.password;
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json({ message: "Login successful", user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// about route
router.put("/:userName/about", async (req, res) => {
  try {
    const { about } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { firstName: req.params.userName },
      { about: req.body.about },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "About data updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// experience route
router.put("/:userName/experience", async (req, res) => {
  try{
    const { experience } = req.body;
    const user = await User.findOne({ firstName: req.params.userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Assuming you want to add the new experience to the existing ones
    user.experiences.push(experience);
    // Save the updated user
    const updatedUser = await user.save();
    res.json({ user: updatedUser });
  } catch(err){
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
