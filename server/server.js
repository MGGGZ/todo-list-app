"use strict";

const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// タスクを保存するファイル
const dataFile = "./server/database.json";

// タスクを追加
app.post("/add-task", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ success: false, error: "No task provided" });

  const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  data.tasks.push(task);
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

  res.json({ success: true });
});

// サーバ起動
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
