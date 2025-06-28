const API_URL = "https://685c216a89952852c2dc577f.mockapi.io/cars";


async function fetchVehicles() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("حدث خطأ في جلب البيانات");
    return await res.json();
  } catch (err) {
    alert(err.message);
    return [];
  }
}

function renderVehicles(vehicles) {
  const tbody = document.getElementById("vehicleTableBody");
  tbody.innerHTML = "";

  vehicles.forEach(vehicle => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${vehicle.plate}</td>
      <td>${vehicle.type}</td>
      <td>${vehicle.date}</td>
      <td>
        <button class="btn btn-info btn-sm me-1" onclick="location.href='details.html?id=${vehicle.id}'">عرض</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("addVehicleBtn").addEventListener("click", () => {
  location.href = "add.html";
});

(async () => {
  const vehicles = await fetchVehicles();
  renderVehicles(vehicles);
})();
