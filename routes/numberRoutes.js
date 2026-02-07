const router = require("express").Router();
const auth = require("../middleware/auth");
const Number = require("../models/Number");
const User = require("../models/User");

router.get("/", async (req, res) => {
  const numbers = await Number.find({ status: "available" });
  res.json(numbers);
});

router.post("/buy/:id", auth, async (req, res) => {
  const number = await Number.findById(req.params.id);
  const user = await User.findById(req.user.id);

  if (user.wallet < number.price)
    return res.status(400).json({ msg: "Insufficient balance" });

  user.wallet -= number.price;
  number.status = "sold";

  await user.save();
  await number.save();

  res.json({ msg: "Number purchased successfully" });
});

module.exports = router;
