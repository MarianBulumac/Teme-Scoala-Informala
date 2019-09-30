async function draw() {

    var total = 0;
    var response = await fetch(`https://proiect-final-marian.firebaseio.com/cos/.json`);
    window.list = await response.json();
    var str = "";
    for (var i in list) {
        if (list[i] === null) continue;
        total = total + list[i].cantitate * list[i].pret;
        str += ` 
                    <tr>
                   
                        <th scope="row" name="nume"> <a href="detalii.html?id=${i}">${list[i].nume} </a></th>
                  
                        <td name="pret">${list[i].pret}</td>
                        <td name="cantitate">
                            <input type="button" value="-" class="minus" onclick="decrease(event,'${i}')">
                            <input type="number"  value="${list[i].cantitate}" class="numValue">  
                            <input type="button" value="+"  class="plus" onclick="increase(event,'${i}')"> 
                       </td>
                        <td name="subTotal">${list[i].cantitate * list[i].pret}</td>
                        <td><input type="button" value="STERGE" class="delBut" onclick="sterge(event,'${i}')"></td>
                    </tr>
    `
    }
    document.querySelector("#showProducts table tbody").innerHTML = str;

    document.querySelector("#products").innerHTML = Object.keys(list).length;
    document.querySelector("#totalPrice").innerHTML = total;
    document.querySelector("#tva").innerHTML = 19 / 100 * total;
    document.querySelector("#transport").innerHTML = Object.keys(list).length * 5;

}
async function decrease(event, i) {
    if (list[i].cantitate > 0) {
        var response = await fetch(`https://proiect-final-marian.firebaseio.com/cos/${i}/cantitate.json`, {
            method: "put",
            body: parseInt(list[i].cantitate) - 1
        });
    } else {
        alert("Stoc minim");
    }
    draw();
}
async function increase(event, i) {
    if (list[i].cantitate < list[i].stoc) {
        var response = await fetch(`https://proiect-final-marian.firebaseio.com/cos/${i}/cantitate.json`, {
            method: "put",
            body: parseInt(list[i].cantitate) + 1
        });
    } else {
        alert("Stoc maxim");
    }
    draw();
}
async function sterge(event, i) {
    var response = await fetch(`https://proiect-final-marian.firebaseio.com/cos/${i}.json`, {
        method: "delete",
    });
    alert("Esti sigur ca vrei sa stergi acest produs");
    draw();
}