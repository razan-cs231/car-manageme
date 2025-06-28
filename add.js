const API_URL = "https://685c216a89952852c2dc577f.mockapi.io/cars";


document.getElementById("addVehicleForm").addEventListener("submit", async e => {
  e.preventDefault();
  const plate = document.getElementById("plate").value.trim();
  const type = document.getElementById("type").value.trim();
  const date = document.getElementById("date").value;

  if (!plate || !type || !date) {
    alert("يرجى تعبئة جميع الحقول");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plate, type, date, parts: [] }),
    });
    if (!res.ok) throw new Error("فشل في إضافة المركبة");
    alert("تمت إضافة المركبة بنجاح");
    location.href = "index.html";
  } catch (err) {
    alert(err.message);
  }
});
