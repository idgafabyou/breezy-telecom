const router = require("express").Router();
const axios = require("axios");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const BASE = process.env.GATEWAY_BASE_URL;

// GET AVAILABLE NUMBERS
router.get("/numbers", async (req, res) => {
  try {
    const response = await axios.post(BASE, {
      apikey: process.env.GATEWAY_API_KEY,
      action: "getNumbers"
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ msg: "Gateway error" });
  }
});

// BUY NUMBER
router.post("/buy", auth, async (req, res) => {
  try {
    const { numberId, price } = req.body;

    const user = await User.findById(req.user.id);

    if (user.wallet < price)
      return res.status(400).json({ msg: "Insufficient balance" });

    const response = await axios.post(BASE, {
      apikey: process.env.GATEWAY_API_KEY,
      action: "buyNumber",
      id: numberId
    });

    if (response.data.status !== "success")
      return res.status(400).json({ msg: "Gateway purchase failed" });

    user.wallet -= price;
    await user.save();

    await Transaction.create({
      userId: user._id,
      type: "purchase",
      amount: price,
      description: "Purchased virtual number"
    });

    res.json({ msg: "Number purchased successfully" });

  } catch (err) {
    res.status(500).json({ msg: "Purchase error" });
  }
});

module.exports = router;
