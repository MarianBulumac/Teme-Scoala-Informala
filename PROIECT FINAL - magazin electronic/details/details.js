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
                   <label>Cantitate: </label><input type="number" name="cantitate" value="1" min="1" max="${produse.stoc}"style="width:50px"/>
                   
                   <div><button onclick="addCos(event,'${i}');" class="adaugaButton" type="button">ADAUGA IN COS</button></div>
                </div>
                
     
 `;
    document.querySelector("#afisareLista").innerHTML = str;

}

async function addCos() {
    var obj = {
        nume: produse.nume,
        pret: produse.pret,
        stoc: produse.stoc,
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

// async function addCos(event, i) {
//     event.preventDefault();
//     var response = await fetch(`https://proiect-final-marian.firebaseio.com/cos.json`);
//     window.produseCos = await response.json();
//     var found = false;
//     var val = document.querySelector("['name='cantitate']").value;
//     for (j in produseCos) {
//         if (list[i].nume === produseCos[j].nume) {
//             var response = await fetch(`https://proiect-final-marian.firebaseio.com/cos/${j}/cantitate.json`, {
//                 method: "put",
//                 body: produseCos[j].cantitate + parseInt(val)
//             });
//             found = true;
//         }
//     }
//     if (!found) {
//         var obj = {
//             imagine: list[i].imagine,
//             nume: list[i].nume,
//             pret: list[i].pret,
//             cantitate: document.querySelector("[name='cantitate']").value,
//             stoc: list[i].stoc
//         }
//         var response = await fetch(`https://proiect-final-marian.firebaseio.com/cos.json`, {
//             method: "post",
//             body: JSON.stringify(obj)

//         });
//         alert("produsul a fost adaugat in cos")
//     }


// }