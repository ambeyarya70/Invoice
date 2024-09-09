// javaScript file for the bill generator
// creating an class to store the items 

class item {
    // const product = new item(name.value, description.value, parseInt(unitprice.value), parseInt(itemQty.value), parseInt(discount.value), parseInt(tax.value));
    constructor(name, description, unitprice, quantity, discount, tax = 18) {
        this.name = name;
        this.description = description;
        this.unitprice = unitprice;
        this.qty = quantity;
        this.tax = tax;
        this.discount = discount;
        this.tax = tax;
        this.amount = parseFloat(((quantity * unitprice) - ((quantity * unitprice) * (discount / 100))) + ((quantity * unitprice) - ((quantity * unitprice) * (discount / 100))) * (tax / 100));
    }
}
class customer {
    constructor(name, city, State, Pin, Statecode,
        Dname, Dcontactnumber, Dcity, Dstate, Dpin, DstateCode
    ) {
        this.name = name;
        this.city = city;
        this.State = State;
        this.Pin = Pin;
        this.Statecode = Statecode;
        this.Dname = Dname;
        this.Dcontactnumber = Dcontactnumber;
        this.Dcity = Dcity;
        this.Dstate = Dstate;
        this.Dpin = Dpin;
        this.DstateCode = DstateCode;
    }
}
class Seller {
    constructor(name, city, state, pin,
        panNo, GSTNo, placeofsupply) {
        this.name = name;
        this.city = city;
        this.state = state;
        this.pin = pin;

        this.panNo = panNo;
        this.GSTNo = GSTNo;
        this.placeofsupply = placeofsupply;
    }
}
// class ends
// storage of data in local storage for the data sharing
// {1 : items}
//{2:Seller details}
//{3:Customer details}


// document.getElementById("items").innerHTML = "Items in the div";
let items = []; // stores all the items in the order


function additm() {
    event.preventDefault(); // it will stop auto refresh a webpage

    const name = document.getElementById("itemName");
    const description = document.getElementById("itemDescription");
    const unitprice = document.getElementById("unitprice");
    const itemQty = document.getElementById("itemQty");
    const itemdiscount = document.getElementById("itemdiscount");
    const tax = document.getElementById("tax");
    // 8 coloumns


    const product = new item(name.value, description.value, parseFloat(unitprice.value), parseFloat(itemQty.value), parseFloat(itemdiscount.value), parseFloat(tax.value));
    // alert(typeof (name.value) + typeof (description.value) + typeof (unitprice.value) + typeof (itemQty.value) + typeof (discount.value) + typeof (tax.value));
    let table = document.getElementById("itmtable");
    // alert(product.amount);
    items.push(product); // insertin the items in the items array

    // Create a row using the insertRow() method and
    // specify the index where you want to add the row
    let row = table.insertRow(-1); // We are adding at the end

    // Create table cells
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    let c5 = row.insertCell(4);
    let c6 = row.insertCell(5);
    let c7 = row.insertCell(6);

    // Add data to c1 and c2
    // alert(product.amount);
    c1.innerText = product.name;
    c2.innerText = product.description;
    c3.innerText = product.unitprice;
    c4.innerText = product.qty;
    c5.innerText = product.discount;
    c6.innerText = product.tax;
    c7.innerText = product.amount;
    // alert("add clicked");


    // console.log(items);
    localStorage.setItem(1, JSON.stringify(items))


}
// bill creating logic
function billCreate() {
    // first import all the datas from the form
    //seller detail
    let sellername = document.getElementById("sellername").value;
    let sellercity = document.getElementById("sellercity").value;
    let sellerstate = document.getElementById("sellerstate").value;
    let sellerPIN = parseInt(document.getElementById("sellerPIN").value);
    let sellerpan = document.getElementById("sellerpan").value;
    let sellergst = document.getElementById("sellerGST").value;
    let sellersupplyplace = document.getElementById("sellersupply").value;

    // class Seller {
    //     constructor(name, city, state, pin, 
    //         panNo, GSTNo, placeofsupply)

    let seller1 = new Seller(sellername, sellercity, sellerstate, sellerPIN, sellerpan,
        sellergst, sellersupplyplace
    ); // creating an object of seller

    localStorage.setItem(2, JSON.stringify(seller1))  // storing the seller details in local shared memory

    // customer details
    let custName = document.getElementById("customername").value;
    let custCity = document.getElementById("customercity").value;
    let custState = document.getElementById("customerstate").value;
    let custPIN = parseInt(document.getElementById("customerPIN").value);
    let custStateCode = document.getElementById("customerState/UT").value;
    // delivery details
    let delName = document.getElementById("DeliveryName").value;
    let delContact = parseInt(document.getElementById("Deliverycontact").value);
    let delCity = document.getElementById("Deliverycity").value;
    let delState = document.getElementById("deliverystate").value;
    let delPIN = parseInt(document.getElementById("deviveryPIN").value);
    let delStateCode = document.getElementById("deliveryState/UT").value;


    //creating an object of the customer
    // class customer {
    // constructor(name, City, State, Pin, Statecode,
    //     Dname, Dcontactnumber, Dcity, Dstate, Dpin, DstateCode
    // ) 
    let customer1 = new customer(custName, custCity, custState, custPIN, custStateCode,
        delName, delContact, delCity, delState, delPIN, delStateCode);

    localStorage.setItem(2, JSON.stringify(customer1))  // storing the customer details in local shared memory


    const page = window.open('invoice.html')
    page.addEventListener('DOMContentLoaded', () => {
        // Now we can access the #test element on the other page



        const seller_name_address = page.document.getElementById("seller-name-address");
        seller_name_address.textContent = sellername + " ," + sellercity + ", " + sellerstate + ", " +
            sellerPIN + ", IN";

        const seller_pan_no = page.document.getElementById("seller-pan-no");
        seller_pan_no.textContent = sellerpan;

        const gst_number = page.document.getElementById("gst-number");
        gst_number.textContent = sellergst;

        // updating of customer details in billing detail
        const customer_name = page.document.getElementById("customer_name");
        const customer_address = page.document.getElementById("customer_address");
        const state_code = page.document.getElementById("state_code");
        customer_name.textContent = custName;
        customer_address.textContent = custCity + "," + custState + "," + custPIN;
        state_code.textContent = custStateCode;


        const delivery_name = page.document.getElementById("delivery_name");
        const delivery_address = page.document.getElementById("delivery_address");
        const delivery_statecode = page.document.getElementById("delivery_statecode");
        const place_of_supply = page.document.getElementById("place_of_supply");
        const place_of_delivery = page.document.getElementById("place_of_delivery");

        delivery_name.textContent = delName;
        delivery_address.textContent = delCity + "," + delState + "," + delPIN + " ," + delContact;
        delivery_statecode.textContent = delStateCode;
        place_of_supply.textContent = sellersupplyplace;
        place_of_delivery.textContent = delState;



        let sno = 1;
        let totalamount = 0;
        let totaltaxamount = 0;
        items.forEach((element, index, array) => {
            // console.log("1");
            let invoice_table = page.document.getElementById("invoice-items");
            let rw = invoice_table.insertRow(1);

            let d1 = rw.insertCell(0);
            let d2 = rw.insertCell(1);
            let d3 = rw.insertCell(2);
            let d4 = rw.insertCell(3);
            let d5 = rw.insertCell(4);
            let d6 = rw.insertCell(5);
            let d7 = rw.insertCell(6);
            let d8 = rw.insertCell(7);
            let d9 = rw.insertCell(8);

            // Add data to c1 and c2
            // alert(product.amount);
            d1.innerText = sno; sno++;          // sl no.
            d2.innerText = element.name + "\n" + element.description; //name and description
            d3.innerText = element.unitprice // unit price
            d4.innerText = element.qty // qty
            d5.innerText = element.unitprice * element.qty;// Net amount
            if (sellersupplyplace.toUpperCase() == delState.toUpperCase()) {
                d6.innerText = "18 %";
                d7.innerText = "IGST"    // tax type
                d8.innerText = (element.amount - element.unitprice * element.qty).toFixed(2); // tax rate        // tax amount
            }
            else {
                d6.innerText = "9%" + "\n" + "9%"
                d7.innerText = "CGST " + "\n" + "SGST"    // tax type
                d8.innerText = "Rs." + ((element.amount - element.unitprice * element.qty) / 2).toFixed(2).toString() + "\n" + "Rs" + ((element.amount - element.unitprice * element.qty) / 2).toFixed(2).toString();   // tax amount
            }

            d9.innerText = element.amount.toFixed(2)    //total amount

            totalamount += element.amount;
            totaltaxamount += (element.amount - element.unitprice * element.qty);
        });

        const tax_amount = page.document.getElementById("tax-amount");
        const total_bill_amount = page.document.getElementById("total-bill-amount");

        tax_amount.textContent = "Rs " + totaltaxamount.toFixed(2).toString();
        total_bill_amount.textContent = "Rs " + totalamount.toFixed(2).toString();



        const exporter_name = page.document.getElementById("exporter_name");
        exporter_name.textContent = sellername;



        const testDiv = page.document.getElementById('amount-in-words')
        testDiv.textContent = inWords(totalamount.toFixed(0))

    })  // for updating the content to the invoice template




}

var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}
// invoice page creating using DOM
// const root = document.getElementById("root");

// reciept part
function addItemInReciept() {
    items = JSON.parse(localStorage.getItem(1));
    event.preventDefault();
    console.log(items);
    // items.forEach((element, index, array) => {
    //     console.log("1");
    //     let invoice_table = document.getElementById("invoice-items");
    //     let rw = invoice_table.insertRow(1);

    //     let d1 = rw.insertCell(0);
    //     let d2 = rw.insertCell(1);
    //     let d3 = rw.insertCell(2);
    //     let d4 = rw.insertCell(3);
    //     let d5 = rw.insertCell(4);
    //     let d6 = rw.insertCell(5);
    //     let d7 = rw.insertCell(6);
    //     let d8 = rw.insertCell(7);

    //     // Add data to c1 and c2
    //     // alert(product.amount);
    //     d1.innerText = 1; // sl no.
    //     d2.innerText = element.name + "/n" + element.description; //name and description
    //     d3.innerText = element.unitprice // unit price
    //     d4.innerText = element.qty // qty
    //     d5.innerText = element.unitprice * element.qty;// Net amount
    //     d6.innerText = element.amount - element.unitprice * element.qty; // tax rate
    //     d7.innerText = "IGST"    // tax type
    //     d8.innerText = element.amount    //total amount


    // d1.innerText = "name.value";
    // d2.innerText = "description.value"
    // d3.innerText = 12
    // d4.innerText = 10
    // d5.innerText = 0
    // d6.innerText = 12
    // d7.innerText = 120
    // });

    let amountword = document.getElementById("amount-in-words");
    amountword.innerText = "Zero";
    console.log(amountword)
    alert("Clicked");
}




// now download script





// document.getElementById('exportButton').addEventListener('click', exportHTMLtoPDF);







