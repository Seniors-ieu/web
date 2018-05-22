(function(){
    // Initialize Firebase   
    var config = {
      apiKey: "AIzaSyCmz5KApctRSYvXpIY-93BLU4U-hq1F1ck",
    authDomain: "demoproject-8d314.firebaseapp.com",
    databaseURL: "https://demoproject-8d314.firebaseio.com",
    projectId: "demoproject-8d314",
    storageBucket: "demoproject-8d314.appspot.com",
    messagingSenderId: "650020504138"
    };
    firebase.initializeApp(config);
    var db = firebase.firestore();

    const btnLogout = document.getElementById("logout");
    const btnInit = document.getElementById("initialize");
    const btnOwnerInit = document.getElementById("ownerinit");
    const btnDB = document.getElementById("database");

    const btnCall = document.getElementById("call");
    const btnReplace = document.getElementById("replace");
    const btnUpdate = document.getElementById("update");
    //Datatable
    
    
    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
    });
    btnInit.addEventListener('click', e => {
      document.location.href = 'initialize.html';
    });
    btnDB.addEventListener('click', e => {
      document.location.href = 'database.html';
    });
    btnReplace.addEventListener('click', e => {
      document.location.href = 'replace.html';
    });
    btnOwnerInit.addEventListener('click', e => {
      document.location.href = 'ownerinit.html';
    });
    setTimeout(function(){
      const username = document.getElementById("username");
      var userid = firebase.auth().currentUser.uid;
      firebase.firestore().collection("Users").doc(userid).get().then(function(doc) {
        if (doc.exists) {
          console.log(doc.data().nameLastname);
          username.innerHTML = doc.data().nameLastname;
        } else {
            // doc.data() will be undefined in this case
            console.log(doc);
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    },500);
    
    btnCall.addEventListener('click', e => {
      const id = document.getElementById("RetrieveAnimalId").value;
      console.log(id);
        //var query = db.collection("Animals").where("animalID", "==", document.getElementById("RetrieveAnimalId").value);
       // document.getElementById("animalId").value = query.animalID;
       
        db.collection("Animals").doc(id).get().then(function(doc) {
            if (doc.exists) {
                console.log("Tıklandı");
                var myData = doc.data();

                document.getElementById("animalId").value = myData.iD;
                document.getElementById("birthDate").value = new Date(myData.birthdate*1000).toString();
                document.getElementById("alumVaccine").value = myData.alumVaccine;
                document.getElementById("birthFarmNo").value = myData.birthFarmNo;
                document.getElementById("birthDate").value = myData.birthdate;
                document.getElementById("breed").value = myData.breed;
                document.getElementById("gender").value = myData.female;
                document.getElementById("brusellosisVaccine").value = myData.brusellosisVaccine;
                document.getElementById("currentFarmNo").value = myData.currentFarmNo;
                document.getElementById("deathDate").value = myData.deathDate;
                document.getElementById("deathPlace").value = myData.deathPlace;
                //document.getElementById("eSignDirector").value = myData.eSignDirector;
                //document.getElementById("eSignOwner").value = myData.eSignOwner;
                document.getElementById("exportCountryCode").value = myData.exportCountryCode;
                document.getElementById("exportDate").value = myData.exportDate;
                document.getElementById("farmChangeDate").value = myData.farmChangeDate;
                document.getElementById("motherId").value = myData.motherId;
                document.getElementById("tc").value = myData.ownerTc;
                document.getElementById("pasturellaVaccine").value = myData.pasturellaVaccine;
                document.getElementById("otherVaccine").value = myData.otherVaccine;
                //document.getElementById("operations").value = myData.Operations;

                db.collection("Owners").doc(myData.ownerTc).get().then(function(doc) {
                  if (doc.exists) {
                      console.log("Tıklandı..");
                      var myData = doc.data();
                      document.getElementById("farmAddress").value = myData.farmAddress;
                      document.getElementById("farmCityCode").value = myData.farmCityCode;
                      document.getElementById("farmEmail").value = myData.farmEmail;
                      document.getElementById("farmFaxNumber").value = myData.farmFaxNumber;
                      document.getElementById("farmGeoCoordinate").value = myData.farmGeoCoordinate;
                      document.getElementById("farmNo").value = myData.farmNo;
                      document.getElementById("farmPhoneNumber").value = myData.farmPhoneNumber;
                      document.getElementById("name").value = myData.name;
                      document.getElementById("lastName").value = myData.lastName;
                      document.getElementById("residenceAddress").value = myData.residenceAddress;
                      //document.getElementById("tc").value = myData.tc;
                      
                  } else {
                      // doc.data() will be undefined in this case
                      console.log(doc);
                  }
              }).catch(function(error) {
                  console.log("Error getting document:", error);
              });
            } else {
                // doc.data() will be undefined in this case
                console.log(doc);
                alert("Küpe numarası yanlış.");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
      
    });

    btnUpdate.addEventListener('click', e=>{
      const id = document.getElementById("RetrieveAnimalId").value;
      db.collection("Animals").doc(id).update({
                "iD" : document.getElementById("animalId").value,
                "birthdate":document.getElementById("birthDate").value,
                "alumVaccine":document.getElementById("alumVaccine").value,
                "birthFarmNo" : document.getElementById("birthFarmNo").value,
                "birthdate":document.getElementById("birthDate").value,
                "breed":document.getElementById("breed").value,
                "female":document.getElementById("gender").value,
                "brusellosisVaccine":document.getElementById("brusellosisVaccine").value,
                "currentFarmNo":document.getElementById("currentFarmNo").value,
                "deathDate":document.getElementById("deathDate").value,
                "deathPlace":document.getElementById("deathPlace").value,
                //document.getElementById("eSignDirector").value = myData.eSignDirector;
                //document.getElementById("eSignOwner").value = myData.eSignOwner;
                "exportCountryCode":document.getElementById("exportCountryCode").value,
                "exportDate":document.getElementById("exportDate").value,
                "farmChangeDate":document.getElementById("farmChangeDate").value,
                "motherId":document.getElementById("motherId").value,
                "ownerTc":document.getElementById("tc").value,
                "pasturellaVaccine": document.getElementById("pasturellaVaccine").value,
                "otherVaccine":document.getElementById("otherVaccine").value,
                //document.getElementById("operations").value = myData.Operations;
      });
      

    });
    
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser){
        document.location.href = 'index.html';
      }
    });
    
}());