// mock-api.js - No changes needed if we just pass doneAt in updateItem
const STORAGE_KEY = "items_data";

function getItemsFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function setItemsInStorage(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

async function initializeData() {
  const existing = getItemsFromStorage();
  if (existing.length === 0) {
    const response = await fetch("data.json");
    const data = await response.json();
    setItemsInStorage(data);
  }
}

export async function getItems() {
  await initializeData();
  return Promise.resolve(getItemsFromStorage());
}

export async function createItem(newItem) {
  const items = getItemsFromStorage();
  const newId = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
  const itemToCreate = { id: newId, ...newItem };
  items.push(itemToCreate);
  setItemsInStorage(items);
  return Promise.resolve(itemToCreate);
}

export async function updateItem(updatedItem) {
  const items = getItemsFromStorage();
  const index = items.findIndex((i) => i.id === updatedItem.id);
  if (index > -1) {
    items[index] = updatedItem;
    setItemsInStorage(items);
    return Promise.resolve(updatedItem);
  } else {
    return Promise.reject("Item not found");
  }
}

export async function deleteItem(id) {
  const items = getItemsFromStorage();
  const newItems = items.filter((i) => i.id !== id);
  setItemsInStorage(newItems);
  return Promise.resolve({ deleted: true });
}

export async function clearItems() {
  setItemsInStorage([]);
  return Promise.resolve({ cleared: true });
}
