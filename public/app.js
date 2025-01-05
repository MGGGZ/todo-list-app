"use strict";

// タスクリストを保持する配列
let todoList = [];

// DOM要素を取得
const todoTitleInput = document.getElementById("todo-title");
const todoContentInput = document.getElementById("todo-content");
const addTodoButton = document.getElementById("add-todo");
const todoListElement = document.getElementById("todo-list");

// ローカルストレージキー
const STORAGE_KEY = "todoList";

// 編集中のタスクインデックス（初期値はnull）
let editingIndex = null;

// ローカルストレージからタスクリストを読み込む関数
function loadTodoList() {
  const savedList = localStorage.getItem(STORAGE_KEY);
  if (savedList) {
    todoList = JSON.parse(savedList);
  }
}

// ローカルストレージにタスクリストを保存する関数
function saveTodoList() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
}

// タスクを追加または編集する関数
function saveTodo() {
  const title = todoTitleInput.value.trim();
  const content = todoContentInput.value.trim();

  if (!title && !content) {
    alert("タイトルまたは内容を入力してください。");
    return;
  }

  // 編集中かどうかを判定
  if (editingIndex !== null) {
    // 編集中の場合、該当タスクを更新
    todoList[editingIndex].title = title;
    todoList[editingIndex].content = content;
    editingIndex = null; // 編集状態をリセット
  } else {
    // 新しいタスクを追加
    const newTodo = {
      title,
      content,
      dateTime: getCurrentDateTime(),
    };
    todoList.push(newTodo);
  }

  // タスクリストを保存して再描画
  saveTodoList();
  renderTodoList();

  // 入力欄をクリア
  todoTitleInput.value = "";
  todoContentInput.value = "";
}

// タスクリストを描画する関数
function renderTodoList() {
  todoListElement.innerHTML = "";

  todoList.forEach((todo, index) => {
    const listItem = document.createElement("li");

    // タスクのタイトル
    const titleElement = document.createElement("h3");
    titleElement.textContent = todo.title || "（タイトルなし）";
    listItem.appendChild(titleElement);

    // タスクの内容
    const contentElement = document.createElement("p");
    contentElement.textContent = todo.content || "（内容なし）";
    listItem.appendChild(contentElement);

    // 日付と時刻
    const dateTimeElement = document.createElement("p");
    dateTimeElement.style.fontSize = "12px";
    dateTimeElement.style.color = "gray";
    dateTimeElement.textContent = `作成日時: ${todo.dateTime}`;
    listItem.appendChild(dateTimeElement);

    // 編集ボタン
    const editButton = document.createElement("button");
    editButton.textContent = "編集";
    editButton.addEventListener("click", () => {
      todoTitleInput.value = todo.title;
      todoContentInput.value = todo.content;
      editingIndex = index; // 編集するタスクのインデックスを保存
    });
    listItem.appendChild(editButton);

    // 削除ボタン
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", () => {
      if (confirm("本当に削除しますか？")) {
        todoList.splice(index, 1);
        saveTodoList();
        renderTodoList();
      }
    });
    listItem.appendChild(deleteButton);

    todoListElement.appendChild(listItem);
  });
}

// 現在の日付と時刻を取得する関数
function getCurrentDateTime() {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return now.toLocaleString("ja-JP", options);
}

// 初期化関数
function init() {
  loadTodoList();
  renderTodoList();
}

// イベントリスナー
addTodoButton.addEventListener("click", saveTodo);

// 初期化の実行
init();
