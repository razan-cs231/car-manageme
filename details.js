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
    renderDetails();
  } catch (err) {
    alert(err.message);
    location.href = "index.html";
  }
}

function renderDetails() {
  const container = document.getElementById("vehicleDetails");
  container.innerHTML = `
    <p><strong>رقم اللوحة:</strong> ${vehicle.plate}</p>
    <p><strong>نوع المركبة:</strong> ${vehicle.type}</p>
    <p><strong>تاريخ الصيانة:</strong> ${vehicle.date}</p>
  `;
}

document.getElementById("editBtn").addEventListener("click", () => {
  document.getElementById("editForm").style.display = "block";
  document.getElementById("editPlate").value = vehicle.plate;
  document.getElementById("editType").value = vehicle.type;
  document.getElementById("editDate").value = vehicle.date;
});

document.getElementById("cancelEdit").addEventListener("click", () => {
  document.getElementById("editForm").style.display = "none";
});

document.getElementById("editForm").addEventListener("submit", async e => {
  e.preventDefault();
  const updatedVehicle = {
    plate: document.getElementById("editPlate").value.trim(),
    type: document.getElementById("editType").value.trim(),
    date: document.getElementById("editDate").value,
  };
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedVehicle),
    });
    if (!res.ok) throw new Error("فشل تحديث المركبة");
    vehicle = await res.json();
    renderDetails();
    alert("تم تعديل البيانات بنجاح");
    document.getElementById("editForm").style.display = "none";
  } catch (err) {
    alert(err.message);
  }
});

document.getElementById("deleteBtn").addEventListener("click", async () => {
  if (!confirm("هل أنت متأكد من حذف المركبة؟")) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("فشل حذف المركبة");
    alert("تم حذف المركبة");
    location.href = "index.html";
  } catch (err) {
    alert(err.message);
  }
});

document.getElementById("changePartBtn").addEventListener("click", () => {
  location.href = `change-part.html?id=${id}`;
});

fetchVehicle();
