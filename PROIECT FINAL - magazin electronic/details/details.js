var list = [];
var i = window.location.search.substring(4);
async function detalii() {

    var response = await fetch(
        `https://proiect-final-marian.firebaseio.com/produse/${i}.json`
    );
    window.produse = await response.json();
    var str = "";

    str += `
    <div class="column"><img class="imgProd" src="${produse.imagine}" alt="${produse.nume}"></div>
                
                <div class="column">
                   <p id="adaugaNume">${produse.nume}</p>
                   <p id="">${produse.descriere}</p>
                   <p id="adaugaPret">Pret: ${produse.pret} RON</p>
                   <hr>
                   <p>In stoc: ${produse.stoc}</p>
                   <label>Cantitate: </label><input type="number" name="cantitate" value="1" min="1" style="width:50px"/>
                   
                   <div><button onclick="addCos();" class="adaugaButton" type="button">ADAUGA IN COS</button></div>
                </div>
                
     
 `;
    document.querySelector("#afisareLista").innerHTML = str;

}

async function addCos() {
    var obj = {
        nume: produse.nume,
        pret: produse.pret,
        cantitate: document.querySelector("[name='cantitate']").value
    }
    var response = await fetch(
        `https://proiect-final-marian.firebaseio.com/cos/${i}.json`, {
            method: "put",
            body: JSON.stringify(obj)
        }
    );
    alert("Produsul a fost adaugat in cosul de cumparaturi");
}