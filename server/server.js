"use strict";

const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// すべてのネットワークインターフェースからの接続を許可
const HOST = "0.0.0.0";

// 静的ファイルの提供
app.use(express.json());
app.use(express.static("public"));

// タスクを保存するファイル
const dataFile = "./server/database.json";

// タスクを追加するエンドポイント
app.post("/add-task", (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ success: false, error: "No task provided" });
  }

  try {
    const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
    data.tasks.push(task);
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    res.json({ success: true, task });
  } catch (error) {
    console.error("Error writing to file:", error);
    res.status(500).json({ success: false, error: "Failed to save task" });
  }
});

// タスクを取得するエンドポイント
app.get("/tasks", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
    res.json({ success: true, tasks: data.tasks });
  } catch (error) {
    console.error("Error reading from file:", error);
    res.status(500).json({ success: false, error: "Failed to load tasks" });
  }
});

// サーバーの起動
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
