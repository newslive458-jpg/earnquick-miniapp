const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

let users = {}; 

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/user_data", (req, res) => {
  const { id, username, start } = req.query;

  if (!users[id]) {
    users[id] = {
      username: username || "Guest",
      total_points: 0,
      referral_count: 0,
      is_admin: false
    };
  }

  res.json({ success: true, user: users[id] });
});


app.post("/api/add_points", (req, res) => {
  const { telegramId, points } = req.body;

  if (!users[telegramId]) {
    return res.json({ success: false, message: "User not found" });
  }

  users[telegramId].total_points += parseInt(points);
  res.json({ success: true });
});


app.post("/api/request_withdraw", (req, res) => {
  const { telegramId, points, account } = req.body;

  console.log(`Withdraw request: ${telegramId}, Points: ${points}, Account: ${account}`);

  res.json({ success: true });
});


app.listen(3000, () => console.log("✅ Server running on port 3000"));
