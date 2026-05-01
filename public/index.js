const domain = "http://localhost:8080";
const checkboxGrid = document.getElementById("checkbox-grid");
const socket = io();

const fetchCheckboxes = async () => {
  try {
    const response = await fetch(`${domain}/checkboxes`);
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const createCheckbox = (checked, index, handler) => {
  const className = `size-10 bg-red-400`;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = className.replace(/\s+/g, " ").trim();
  checkbox.checked = checked;
  checkbox.id = `checkbox-${index}`;

  checkbox.addEventListener("change", handler);
  return checkbox;
};
const onChangeHandler = (checkboxId) => {
  try {
    const checkbox = document.getElementById(checkboxId);
    const value = checkbox.checked;
    socket.emit("UPDATE", { key: checkboxId.split("-")[1], value });
  } catch (error) {}
};

async function main() {
  const { checkboxes } = await fetchCheckboxes();
  if (!checkboxes) return;

  checkboxes.forEach((checked, index) => {
    const checkbox = createCheckbox(checked, index, () =>
      onChangeHandler(checkbox.id),
    );
    checkboxGrid.appendChild(checkbox);
  });

  socket.on("UPDATE", ({ key, value }) => {
    checkboxes[key] = value;
    document.getElementById(`checkbox-${key}`).checked = value;
  });
}

window.addEventListener("DOMContentLoaded", main);
