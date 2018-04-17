(function(){
    // Initialize Firebase   
    var config = {
      apiKey: "AIzaSyBJ4OZ8cYm-_NP6bSxRS2vsLyKagMKTCis",
      authDomain: "nfc-animal-passport-84895.firebaseapp.com",
      databaseURL: "https://nfc-animal-passport-84895.firebaseio.com",
      projectId: "nfc-animal-passport-84895",
      storageBucket: "nfc-animal-passport-84895.appspot.com",
      messagingSenderId: "498813543279"
    };
    firebase.initializeApp(config);
    var db = firebase.firestore();

    const btnLogout = document.getElementById("logout");
    const btnInit = document.getElementById("initialize");
    const btnOwnerInit = document.getElementById("ownerinit");
    const btnDB = document.getElementById("database");
    const btnVetGet = document.getElementById("vetget");
    const btnCall = document.getElementById("call");
    const btnReplace = document.getElementById("replace");

    
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
    btnVetGet.addEventListener('click', e => {
      document.location.href = 'vetgetkey.html';
    });
    
    btnCall.addEventListener('click', e => {
      const id = document.getElementById("RetrieveAnimalId").value;
      console.log(id);
        //var query = db.collection("Animals").where("animalID", "==", document.getElementById("RetrieveAnimalId").value);
       // document.getElementById("animalId").value = query.animalID;
       
        db.collection("Animals").doc(id).get().then(function(doc) {
            if (doc.exists) {
                console.log("Tıklandı");
                var myData = doc.data();
                document.getElementById("animalId").value = myData.id;
                document.getElementById("birthDate").value = myData.birthdate;
                document.getElementById("alumVaccine").value = myData.alumVaccine;
                document.getElementById("birthFarmNo").value = myData.birthFarmNo;
                document.getElementById("birthDate").value = myData.birthdate;
                document.getElementById("breed").value = myData.breed;
                document.getElementById("gender").value = myData.isFemale;
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

                db.collection("Owners").doc(document.getElementById("tc").value).get().then(function(doc) {
                  if (doc.exists) {
                      console.log("Tıklandı");
                      var myData = doc.data();
                      document.getElementById("farmAdress").value = myData.farmAdress;
                      document.getElementById("farmCityCode").value = myData.farmCityCode;
                      document.getElementById("farmEmail").value = myData.farmEmail;
                      document.getElementById("farmFaxNumber").value = myData.farmFaxNumber;
                      document.getElementById("farmGeoCoordinate").value = myData.farmGeoCoordinate;
                      document.getElementById("farmNo").value = myData.farmNo;
                      document.getElementById("farmPhoneNumber").value = myData.farmPhoneNumber;
                      document.getElementById("name").value = myData.name;
                      document.getElementById("lastName").value = myData.lastName;
                      document.getElementById("residenceAdress").value = myData.residenceAdress;
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
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
      
    });
    
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser){
        document.location.href = 'index.html';
      }
    });
    
}());