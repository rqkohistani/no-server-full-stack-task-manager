// app.js
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  clearItems,
} from "./mock-api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const itemList = document.getElementById("item-list");
  const addForm = document.getElementById("add-form");
  const editForm = document.getElementById("edit-form");
  const editModal = document.getElementById("edit-modal");
  const closeEditModalBtn = document.getElementById("close-edit-modal");
  const deleteAllBtn = document.getElementById("delete-all-btn");
  const markAllDoneBtn = document.getElementById("mark-all-done-btn");
  const markAllUndoneBtn = document.getElementById("mark-all-undone-btn");

  let currentEditId = null;

  async function loadAndRenderItems() {
    let items = await getItems();
    items = sortItems(items);
    renderItems(items);
  }

  function sortItems(items) {
    const undoneTasks = items.filter((i) => !i.completed);
    const doneTasks = items
      .filter((i) => i.completed)
      .sort((a, b) => (a.doneAt || 0) - (b.doneAt || 0));
    return [...undoneTasks, ...doneTasks];
  }

  function renderItems(items) {
    itemList.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");

      const contentDiv = document.createElement("div");
      contentDiv.classList.add("task-content");

      const titleSpan = document.createElement("span");
      titleSpan.classList.add("task-title");
      if (item.completed) {
        titleSpan.classList.add("completed");
      }
      titleSpan.textContent = item.title;

      const statusSpan = document.createElement("span");
      statusSpan.classList.add("task-status");
      statusSpan.textContent = item.completed ? "(Completed)" : "(Pending)";

      contentDiv.appendChild(titleSpan);
      contentDiv.appendChild(statusSpan);

      const buttonGroup = document.createElement("div");
      buttonGroup.classList.add("button-group");

      if (!item.completed) {
        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.addEventListener("click", () => handleDone(item));
        buttonGroup.appendChild(doneBtn);
      }

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => openEditModal(item));

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => handleDelete(item.id));

      buttonGroup.appendChild(editBtn);
      buttonGroup.appendChild(deleteBtn);

      li.appendChild(contentDiv);
      li.appendChild(buttonGroup);
      itemList.appendChild(li);
    });
  }

  async function handleDone(item) {
    await updateItem({ ...item, completed: true, doneAt: Date.now() });
    loadAndRenderItems();
  }

  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = addForm.querySelector('input[name="title"]').value.trim();
    if (!title) return;
    await createItem({ title, completed: false });
    addForm.reset();
    loadAndRenderItems();
  });

  function openEditModal(item) {
    currentEditId = item.id;
    editForm.querySelector('input[name="title"]').value = item.title;
    editForm.querySelector('input[name="completed"]').checked = item.completed;
    editModal.style.display = "flex";
  }

  closeEditModalBtn.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = editForm.querySelector('input[name="title"]').value.trim();
    const completed = editForm.querySelector('input[name="completed"]').checked;
    const items = await getItems();
    const item = items.find((i) => i.id === currentEditId);
    let updatedItem = { id: currentEditId, title, completed };

    if (completed && !item.doneAt) {
      updatedItem.doneAt = Date.now();
    } else if (!completed) {
      updatedItem.doneAt = undefined;
    } else {
      updatedItem.doneAt = item.doneAt;
    }

    await updateItem(updatedItem);
    editModal.style.display = "none";
    loadAndRenderItems();
  });

  async function handleDelete(id) {
    await deleteItem(id);
    loadAndRenderItems();
  }

  deleteAllBtn.addEventListener("click", async () => {
    await clearItems();
    loadAndRenderItems();
  });

  // Mark all tasks as done
  markAllDoneBtn.addEventListener("click", async () => {
    const items = await getItems();
    const updates = items.map((i) => {
      if (!i.completed) {
        return updateItem({ ...i, completed: true, doneAt: Date.now() });
      } else {
        return Promise.resolve(i);
      }
    });
    await Promise.all(updates);
    loadAndRenderItems();
  });

  // Mark all tasks as undone
  markAllUndoneBtn.addEventListener("click", async () => {
    const items = await getItems();
    const updates = items.map((i) => {
      if (i.completed) {
        return updateItem({ ...i, completed: false, doneAt: undefined });
      } else {
        return Promise.resolve(i);
      }
    });
    await Promise.all(updates);
    loadAndRenderItems();
  });

  loadAndRenderItems();
});
