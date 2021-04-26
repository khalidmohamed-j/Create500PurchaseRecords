
function storeTransaction(pStoreID, pSalesPersonID, pCdID, pPricePaid) {
    this.StoreID = pStoreID;
    this.SalesPersonID = pSalesPersonID;
    this.CdID = pCdID;
    this.PricePaid = pPricePaid;
    this.HourPurch = 0;
    this.DayPurch = 0;
  }
  


var StoreIDList = [98053, 98007, 98077, 98055, 98011, 98046];             // array holding store IDs
var CdIDList = [123456, 123654, 321456, 321654, 654123, 654321, 543216, 354126, 621453, 623451];      // array holding CD IDs



document.addEventListener("DOMContentLoaded", function (event) {

    // code to create and save a new transaction - modified by Ken Evans
    document.getElementById("submit").addEventListener("click", function () {
        
        buildTransaction();

        var tStoreID = document.getElementById("storeID").value;
        var tSalesPersonID = document.getElementById("salesPersonID").value;
        var tCdID = document.getElementById("cdID").value;
        var tPricePaid = document.getElementById("pricePaid").value;
        
        var oneTransaction = new storeTransaction(tStoreID, tSalesPersonID, tCdID, tPricePaid);

        $.ajax({
            url: '/NewTransaction' ,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(oneTransaction),
            success: function (result) {
                console.log("added new transaction")
            }

        });
    });




    // code to Submit 500Transcations - modified by Khalid Mohamed
    document.getElementById("fiveHdSubmit").addEventListener("click", function () {
        
        var counter = 0;

        while(counter < 500){
            var newTranscation = SubmitFiveHundredTransaction();
            $.ajax({
                url: '/FiveHundredTransactions' ,
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(newTranscation),
                success: function (result) {
                    console.log("added new transaction")
                }
            });
            counter++;
        }
       
        
    });


    // code to create a new transaction - modified by Ken Evans
    document.getElementById("get").addEventListener("click", function () {
        buildTransaction()
    });
  
    // create a new transaction for page load - modified by Ken Evans
    buildTransaction();

});



// Code for generating one transaction and updating the UI - modified by Ken Evans
function buildTransaction() {

    var tSalesPersonID = (Math.floor(Math.random() * 24) + 1);
    var tStoreID = StoreIDList[Math.floor(((tSalesPersonID + 3) / 4) - 1)];
    var tCdID = CdIDList[Math.floor(Math.random() * 10)];
    var tPricePaid = (Math.floor(Math.random() * 11) + 5);

    document.getElementById("storeID").value = tStoreID;
    document.getElementById("salesPersonID").value = tSalesPersonID;
    document.getElementById("cdID").value = tCdID;
    document.getElementById("pricePaid").value = tPricePaid;
   
}


// Code for generating one transaction - modified by Khalid Mohamed
function SubmitFiveHundredTransaction() {

    
    var tSalesPersonID = (Math.floor(Math.random() * 24) + 1);
    var tStoreID = StoreIDList[Math.floor(((tSalesPersonID + 3) / 4) - 1)];
    var tCdID = CdIDList[Math.floor(Math.random() * 10)];
    var tPricePaid = (Math.floor(Math.random() * 11) + 5);

    var fiveHundredTransactions = new storeTransaction(tSalesPersonID, tStoreID, tCdID, tPricePaid);

    return fiveHundredTransactions;

}

