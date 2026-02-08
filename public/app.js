async function loadNumbers() {
  const res = await fetch("/api/gateway/numbers");
  const data = await res.json();

  const container = document.getElementById("numbersList");
  container.innerHTML = "";

  data.forEach(n => {
    container.innerHTML += `
      <div class="number-card">
        <h4>${n.number}</h4>
        <p>${n.country}</p>
        <p>$${n.price}</p>
        <button onclick="buyNumber('${n.id}', ${n.price})">Buy</button>
      </div>
    `;
  });
}

async function buyNumber(id, price) {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/gateway/buy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": token
    },
    body: JSON.stringify({ numberId: id, price })
  });

  const data = await res.json();
  alert(data.msg);
  loadNumbers();
}
