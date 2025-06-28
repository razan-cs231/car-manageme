const API_URL = "https://685c216a89952852c2dc577f.mockapi.io/cars";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

if (!id) {
  alert("لم يتم تحديد المركبة.");
  location.href = "index.html";
}

let vehicle = null;

async function fetchVehicle() {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("فشل جلب بيانات المركبة");
    vehicle = await res.json();
    renderParts();
  } catch (err) {
    alert(err.message);
    location.href = "index.html";
  }
}

function renderParts() {
  const partsList = document.getElementById("partsList");
  partsList.innerHTML = "";
  if (vehicle.parts && vehicle.parts.length > 0) {
    vehicle.parts.forEach((part, idx) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.textContent = `${part.name} - ${part.date}`;

      const delBtn = document.createElement("button");
      delBtn.className = "btn btn-sm btn-danger";
      delBtn.textContent = "حذف";
      delBtn.onclick = () => removePart(idx);

      li.appendChild(delBtn);
      partsList.appendChild(li);
    });
  } else {
    partsList.innerHTML = `<li class="list-group-item">لا توجد قطع مسجلة</li>`;
  }
}

async function removePart(index) {
  vehicle.parts.splice(index, 1);
  await updateVehicle();
  renderParts();
}

async function updateVehicle() {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicle),
    });
    if (!res.ok) throw new Error("فشل تحديث المركبة");
  } catch (err) {
    alert(err.message);
  }
}

document.getElementById("partForm").addEventListener("submit", async e => {
  e.preventDefault();
  const name = document.getElementById("partName").value.trim();
  const date = document.getElementById("changeDate").value;
  if (!name || !date) {
    alert("يرجى تعبئة جميع الحقول");
    return;
  }

  if (!vehicle.parts) vehicle.parts = [];
  vehicle.parts.push({ name, date });

  await updateVehicle();
  renderParts();
  e.target.reset();
});

document.getElementById("backBtn").addEventListener("click", e => {
  e.preventDefault();
  location.href = `details.html?id=${id}`;
});

fetchVehicle();
