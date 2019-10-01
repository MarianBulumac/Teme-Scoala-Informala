var list = [];

async function draw() {
  var response = await fetch(
    "https://proiect-final-marian.firebaseio.com/produse.json"
  );
  window.list = await response.json();

  var str = "";
  for (var i in list) {
    if (list[i] === null) {
      continue;
    }
    str += `
        <tbody>
        <tr>
        <td>${list[i].nume}</td>
        <td>${list[i].stoc}</td>
        <td>${list[i].pret}</td>
        <td><a href="edit.html?id=${i}"><button class="modificaButton">EDIT</button></a><button onclick="sterge(event,'${i}');" class="stergeButton">DELETE</<button></td>
        </tr>
        </tbody>
        `;
  }
  document.querySelector("#listaProduse").innerHTML = str;
}

async function addProdus(event) {
  event.preventDefault();

  var obj = {
    nume: document.querySelector("[name='nume']").value,
    imagine: document.querySelector("[name='imagine']").value,
    stoc: document.querySelector("[name='stoc']").value,
    pret: document.querySelector("[name='pret']").value,
    descriere: document.querySelector("[name='descriere']").value
  };

  var response = await fetch(
    "https://proiect-final-marian.firebaseio.com/produse.json", {
      method: "post",
      body: JSON.stringify(obj)
    }
  );

  draw();
  document.querySelector("#addForm").reset();
}

async function sterge(event, i) {
  event.preventDefault();
  if (confirm("Esti sigur ca vrei sa stergi produsul?")) {
    var response = await fetch(
      `https://proiect-final-marian.firebaseio.com/produse/${i}.json`, {

        method: "delete"
      }
    )
    draw();
  };

  // location.href = "admin.html";
}