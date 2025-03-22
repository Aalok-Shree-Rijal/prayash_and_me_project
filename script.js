//need some work in dataRetrieve()

let newBalance = 0;  //global variable
let myObject = {};
myObject.description = [];
myObject.amount = [];
myObject.type = [];
myObject.payment_method = [];
myObject.date = [];
myObject.id = [];
let x = 0;


function dataModify() {
    let description = document.getElementById("description").value;
    let amount = document.getElementById("amount").value;
    let type = document.getElementById("type").value;
    let payment_method = document.getElementById("payment-method").value;
    let date = document.getElementById("date").value;
    let transactions = document.getElementById("data-container");
    let form = document.getElementById("transaction-form");
    let balance = document.getElementById("balance");
    newBalance = JSON.parse(localStorage.getItem('storedBalance')) || 0;
    document.getElementsByClassName("transactions")[0].style.display = "block";

    if (description === "" || description === null || amount === "" || amount === null || date === "" || date === null) {
        alert("please fill the information before submittting!");
        return 0;
    }

    if (type === "income") {
        color = "lightgreen";
        newBalance = newBalance + Number(amount);
    }

    else {
        color = "lightcoral";
        newBalance = newBalance - Number(amount);
    }

    const tr = document.createElement("tr");
    tr.style.backgroundColor = color;
    x++;
    let id = "row" + x;
    tr.setAttribute("id", id);


    tr.innerHTML = `
            <td>${description}</td>
            <td>Rs ${amount}</td>
            <td>${type}</td>
            <td>${payment_method}</td>
            <td>${date}</td>
            <td><button onclick="deleteTodo('${id}')" class="delete-button">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
                            viewBox="0,0,256,256">
                            <g fill-opacity="0" fill="currentcolor" fill-rule="nonzero" stroke="none" stroke-width="1"
                                stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray=""
                                stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none"
                                text-anchor="none" style="mix-blend-mode: normal">
                                <path d="M0,256v-256h256v256z" id="bgRectangle"></path>
                            </g>
                            <g fill="currentcolor" fill-rule="nonzero" stroke="none" stroke-width="1"
                                stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray=""
                                stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none"
                                text-anchor="none" style="mix-blend-mode: normal">
                                <g transform="scale(10.66667,10.66667)">
                                    <path
                                        d="M10,2l-1,1h-6v2h18v-2h-6l-1,-1zM4.36523,7l1.70313,15h11.86328l1.70313,-15z">
                                    </path>
                                </g>
                            </g>
                        </svg>
                    </button>
                    </td>`;

    transactions.appendChild(tr);
    form.reset();

    balance.innerHTML = `Rs ${newBalance}`;
    localStorage.setItem('storedBalance', JSON.stringify(newBalance));

    console.log("calling updating data")
    updateStorage(description, amount, type, payment_method, date, id);
}

function updateStorage(description, amount, type, payment_method, date, id) {

    console.log("updating data")

    myObject.description.push(description);
    myObject.amount.push(amount);
    myObject.type.push(type);
    myObject.payment_method.push(payment_method);
    myObject.date.push(date);
    myObject.id.push(id);

    console.log(JSON.stringify(myObject));

    localStorage.setItem('Object', JSON.stringify(myObject));
    console.log(myObject);

    console.log("data updating completed!");
}

function retrieveData() {
    console.log("data retrieval activated");

    let storedData = JSON.parse(localStorage.getItem('Object'));
    storedBalance = JSON.parse(localStorage.getItem('storedBalance')) || 0;
    console.log("previously stored balace is ", storedBalance);
    console.log(JSON.stringify(storedData));


    if (storedData === null || storedData === "") {
        console.log("exiting data retrieval, no previous records found !");
        return 0;
    }

    let transactions = document.getElementById("data-container");
    let balance = document.getElementById("balance");

    balance.innerHTML = `RS ${storedBalance}`


    if (storedData && storedData.description.length > 0) {
        document.getElementsByClassName("transactions")[0].style.display = "block";
        for (i = 0; i < storedData.description.length; i++) {

            let type = storedData.type[i];
            console.log(type);
            if (type === "income") {
                color = "lightgreen";
            }

            else {
                color = "lightcoral";
            }
            console.log(color)

            let id = storedData.id[i];

            const tr = document.createElement("tr");
            tr.style.backgroundColor = color;
            tr.setAttribute("id", id);

            tr.innerHTML = `
                <td>${storedData.description[i]}</td>
                <td>Rs ${storedData.amount[i]}</td>
                <td>${storedData.type[i]}</td>
                <td>${storedData.payment_method[i]}</td>
                <td>${storedData.date[i]}</td>
                <td><button onclick="deleteTodo('${id}')" class="delete-button">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
                            viewBox="0,0,256,256">
                            <g fill-opacity="0" fill="currentcolor" fill-rule="nonzero" stroke="none" stroke-width="1"
                                stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray=""
                                stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none"
                                text-anchor="none" style="mix-blend-mode: normal">
                                <path d="M0,256v-256h256v256z" id="bgRectangle"></path>
                            </g>
                            <g fill="currentcolor" fill-rule="nonzero" stroke="none" stroke-width="1"
                                stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray=""
                                stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none"
                                text-anchor="none" style="mix-blend-mode: normal">
                                <g transform="scale(10.66667,10.66667)">
                                    <path
                                        d="M10,2l-1,1h-6v2h18v-2h-6l-1,-1zM4.36523,7l1.70313,15h11.86328l1.70313,-15z">
                                    </path>
                                </g>
                            </g>
                        </svg>
                    </button>
                    </td>`

            transactions.appendChild(tr);
        }
    }
    console.log("data retrieval succesfull!")
}

window.onload = function () {
    console.log("processing data retrieval")
    retrieveData();
}

function deleteTodo(id) {
    console.log('deleting task !');

    let myObject = JSON.parse(localStorage.getItem('Object'));
    let storedBalance = JSON.parse(localStorage.getItem('storedBalance'));
    console.log(storedBalance);

    for (let i = 0; i < myObject.description.length; i++) {
        if (myObject.id[i] === id) {

            if (myObject.type[i] === "income") {
                storedBalance = storedBalance - Number(myObject.amount[i]);
            }
            else {
                storedBalance = storedBalance + Number(myObject.amount[i]);
            }

            myObject.description.splice(i, 1);
            myObject.amount.splice(i, 1);
            myObject.type.splice(i, 1);
            myObject.payment_method.splice(i, 1);
            myObject.date.splice(i, 1);
            myObject.id.splice(i, 1);
        }
    }
    document.getElementById(id).remove();

    if (storedBalance === 0) {
        document.getElementsByClassName("transactions")[0].style.display = "none";
    }

    localStorage.setItem('Object', JSON.stringify(myObject));
    localStorage.setItem('storedBalance', JSON.stringify(storedBalance));

    window.location.reload();
    retrieveData();
    console.log('task deleted !');
}