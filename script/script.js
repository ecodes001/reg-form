document.getElementById("contributionForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("memberName").value.trim();
  const id = document.getElementById("memberID").value.trim();
  const month = document.getElementById("contributionMonth").value;
  const amount = document.getElementById("amount").value;

  if (!name || !id || !month || !amount) return;

  const entry = { name, id, month, amount: parseFloat(amount) };

  // Save to localStorage
  const contributions = JSON.parse(localStorage.getItem("contributions")) || [];
  contributions.push(entry);
  localStorage.setItem("contributions", JSON.stringify(contributions));

  document.getElementById("contributionForm").reset();
  renderTable();
});

function renderTable() {
  const tbody = document.getElementById("contributionTableBody");
  tbody.innerHTML = "";

  const contributions = JSON.parse(localStorage.getItem("contributions")) || [];

  contributions.forEach(({ name, id, month, amount }) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${id}</td>
      <td>${month}</td>
      <td>KSh ${amount.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });
}

window.addEventListener("load", renderTable);
