const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

router.post("/fund", auth, async (req, res) => {
  const { amount } = req.body;

  const user = await User.findById(req.user.id);
  user.wallet += amount;
  await user.save();

  res.json({ wallet: user.wallet });
});

module.exports = router;
