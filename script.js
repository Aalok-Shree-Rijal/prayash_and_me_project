//need some work in dataRetrieve()

let newBalance = 0;  //global variable
let myObject = {};
let descriptionArr = [];
let amountArr = [];
let typeArr = [];
let payment_methodArr = [];
let dateArr = [];


function dataModify() {
    let description = document.getElementById("description").value;
    let amount = document.getElementById("amount").value;
    let type = document.getElementById("type").value;
    let payment_method = document.getElementById("payment-method").value;
    let date = document.getElementById("date").value;
    let transactions = document.getElementById("data-container");
    let form = document.getElementById("transaction-form");
    let balance = document.getElementById("balance");
    newBalance = JSON.parse(localStorage.getItem('storedBalance'));
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


    tr.innerHTML = `
            <td>${description}</td>
            <td>Rs ${amount}</td>
            <td>${type}</td>
            <td>${payment_method}</td>
            <td>${date}</td>`;

    transactions.appendChild(tr);
    form.reset();

    balance.innerHTML = `Rs ${newBalance}`;
    localStorage.setItem('storedBalance', JSON.stringify(newBalance));

    console.log("calling updating data")
    updateStorage(description, amount, type, payment_method, date);
}

function updateStorage(description, amount, type, payment_method, date) {

    console.log("updating data")

    descriptionArr.push(JSON.stringify(description));
    amountArr.push(JSON.stringify(amount));
    typeArr.push(JSON.stringify(type));
    payment_methodArr.push(JSON.stringify(payment_method));
    dateArr.push(JSON.stringify(date));

    console.log(descriptionArr);
    console.log(amountArr);
    console.log(typeArr)
    console.log(payment_methodArr)
    console.log(dateArr);

    myObject.description = descriptionArr;
    myObject.amount = amountArr;
    myObject.type = typeArr;
    myObject.payment_method = payment_methodArr;
    myObject.date = dateArr;

    console.log(JSON.stringify(myObject));

    localStorage.setItem('Object', JSON.stringify(myObject));
    localStorage.setItem('descriptionArray', JSON.stringify(descriptionArr));
    localStorage.setItem('amountArray', JSON.stringify(amountArr));
    localStorage.setItem('typeArray', JSON.stringify(typeArr));
    localStorage.setItem('payment_methodArray', JSON.stringify(payment_methodArr));
    localStorage.setItem('dateArray', JSON.stringify(dateArr));

    console.log("data updating completed!");
}

function retrieveData() {
    console.log("data retrieval activated");

    storedData = JSON.parse(localStorage.getItem('Object'));
    storedBalance = JSON.parse(localStorage.getItem('storedBalance'));
    console.log(storedBalance);


    if (storedData === null || storedData === "") {
        console.log("exiting data retrieval, no previous records found !");
        return 0;
    }

    descriptionArr = JSON.parse(localStorage.getItem('descriptionArray'));
    amountArr = JSON.parse(localStorage.getItem('amountArray'));
    typeArr = JSON.parse(localStorage.getItem('typeArray'));
    payment_methodArr = JSON.parse(localStorage.getItem('payment_methodArray'));
    dateArr = JSON.parse(localStorage.getItem('dateArray'));

    console.log(descriptionArr);
    console.log(amountArr);
    console.log(typeArr)
    console.log(payment_methodArr)
    console.log(dateArr);

    myObject = JSON.parse(localStorage.getItem('Object'));

    console.log(JSON.stringify(myObject));

    let transactions = document.getElementById("data-container");
    let balance = document.getElementById("balance");

    balance.innerHTML = `RS ${storedBalance}`


    if (storedData && storedData.description.length > 0) {
        document.getElementsByClassName("transactions")[0].style.display = "block";
        for (i = 0; i < storedData.description.length; i++) {

            if (JSON.parse(storedData.type[i]) === "income") {
                color = "lightgreen";
            }

            else {
                color = "lightcoral";
            }

            const tr = document.createElement("tr");
            tr.style.backgroundColor = color;

            let parsedDescription = JSON.parse(storedData.description[i]);
            let parsedAmount = JSON.parse(storedData.amount[i]);
            let parsedType = JSON.parse(storedData.type[i]);
            let parsedPayment_method = JSON.parse(storedData.payment_method[i]);
            let parsedDate = JSON.parse(storedData.date[i]);

            tr.innerHTML = `
                <td>${parsedDescription}</td>
                <td>Rs ${parsedAmount}</td>
                <td>${parsedType}</td>
                <td>${parsedPayment_method}</td>
                <td>${parsedDate}</td>`

            transactions.appendChild(tr);
        }
    }
    console.log("data retrieval succesfull!")
}

window.onload = function () {
    console.log("processing data retrieval")
    retrieveData();
}