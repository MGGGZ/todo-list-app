"use strict";

// DOM要素の取得
const titleInput = document.getElementById("todo-title");
const contentInput = document.getElementById("todo-content");
const addButton = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

// ローカルストレージからタスクをロード
const loadTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(todo => addTodoToDOM(todo));
};

// タスクを追加
const addTodoToDOM = (todo) => {
  // リストアイテムの作成
  const li = document.createElement("li");

  const title = document.createElement("h3");
  title.textContent = todo.title;

  const content = document.createElement("p");
  content.textContent = todo.content;

  // 編集ボタン
  const editButton = document.createElement("button");
  editButton.textContent = "編集";
  editButton.className = "edit";
  editButton.addEventListener("click", () => {
    titleInput.value = todo.title;
    contentInput.value = todo.content;
    li.remove();
    saveTodos();
  });

  // 削除ボタン
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "削除";
  deleteButton.className = "delete";
  deleteButton.addEventListener("click", () => {
    li.remove();
    saveTodos();
  });

  // 要素をリストアイテムに追加
  li.appendChild(title);
  li.appendChild(content);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  // リストにアイテムを追加
  todoList.appendChild(li);
};

// タスクを保存
const saveTodos = () => {
  const todos = Array.from(todoList.children).map(li => ({
    title: li.querySelector("h3").textContent,
    content: li.querySelector("p").textContent,
  }));
  localStorage.setItem("todos", JSON.stringify(todos));
};

// イベントリスナー: タスクの追加
addButton.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (title && content) {
    const newTodo = { title, content };
    addTodoToDOM(newTodo);
    saveTodos();
    titleInput.value = "";
    contentInput.value = "";
  } else {
    alert("タイトルと内容を入力してください。");
  }
});

// 初期化: ページロード時にタスクをロード
window.addEventListener("load", loadTodos);
