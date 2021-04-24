
function storeTransaction(pStoreID, pSalesPersonID, pCdID, pPricePaid) {
    this.StoreID = pStoreID;
    this.SalesPersonID = pSalesPersonID;
    this.CdID = pCdID;
    this.PricePaid = pPricePaid;
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



    // code to create a new transaction - modified by Ken Evans
    document.getElementById("get").addEventListener("click", function () {
        buildTransaction()
    });
  


    var idToFind = ""; // using the same value from the find operation for the modify

    // Code to find one hanger to change
    document.getElementById("find").addEventListener("click", function () {
        var tName = document.getElementById("modName").value;
        idToFind = "";
        for(i=0; i< HangerList.length; i++){
            if(HangerList[i].hangerName === tName) {
                idToFind = HangerList[i]._id;
           }
        }
        console.log(idToFind);
 
        $.get("/FindHanger/"+ idToFind, function(data, status){ 
            console.log(data[0].hangerName);
            document.getElementById("mname").value = data[0].hangerName;
            document.getElementById("mconstruction").value= data[0].construction;
            document.getElementById("mcolor").value = data[0].color;
            document.getElementById("msturdiness").value = data[0].sturdiness;
            document.getElementById("mpantclips").value = data[0].pantClips;
           
        });
    });



    // Code for modifying a single hanger
    document.getElementById("msubmit").addEventListener("click", function () {
        var tName = document.getElementById("mname").value;
        var tConstruction = document.getElementById("mconstruction").value;
        var tColor = document.getElementById("mcolor").value;
        var tSturdiness = document.getElementById("msturdiness").value;
        var tPantClips = document.getElementById("mpantclips").value;

        if (tPantClips != true || tPantClips != 'True') {
            tPantClips = false;
        } else {
            tPantClips = true;
        }


        var oneHanger = new storeTransaction(tName, tConstruction, tColor, tSturdiness, tPantClips);
        
            $.ajax({
                url: 'UpdateHanger/'+idToFind,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(oneHanger),
                    success: function (response) {  
                        console.log(response);  
                    },  
                    error: function () {  
                        console.log('Error in Update Operation');  
                    }  
                });   
       
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

/*    
var ul = document.getElementById('listUl');
ul.innerHTML = "";  // clears existing list so we don't duplicate old ones

//var ul = document.createElement('ul')

//  modified by Khalid Mohamed
$.get("/Hanger", function(data, status){  // AJAX get
    HangerList = data;  // put the returned server json data into our local array

    // sort array by one property
    //HangerList.sort(compare);  // see compare method below
    console.log(data);
    //listDiv.appendChild(ul);
    HangerList.forEach(ProcessOneToDo); // build one li for each item in array
    function ProcessOneToDo(item, index) {
        var li = document.createElement('li');
        ul.appendChild(li);

        li.innerHTML=li.innerHTML + index + ": " + " Hanger Name: " + item.hangerName + " Construction: " + item.construction + " Color: " + item.color + " Sturdiness: " + item.sturdiness +  " Pant Clips? "+ item.pantClips;
    }
});

function compare(a,b) {
    if (a.completed == false && b.completed== true) {
        return -1;
    }
    if (a.completed == false && b.completed== true) {
        return 1;
    }
    return 0;
}
*/
