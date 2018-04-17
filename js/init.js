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
    const btnReplace = document.getElementById("replace");
    const btnCreate = document.getElementById("create");
    
    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
    });
    btnInit.addEventListener('click', e => {
      document.location.href = 'initialize.html';
    });
    btnOwnerInit.addEventListener('click', e => {
      document.location.href = 'ownerinit.html';
    });
    btnDB.addEventListener('click', e => {
      document.location.href = 'database.html';
    });
    btnReplace.addEventListener('click', e => {
      document.location.href = 'replace.html';
    });
    
    btnCreate.addEventListener('click', e => {
        var docData = {
          alumVaccine: document.getElementById("alumVaccine").value,
          birthFarmNo: document.getElementById("birthFarmNo").value,
          birthdate: document.getElementById("birthDate").value,
          breed:document.getElementById("breed").value,
          brusellosisVaccine:document.getElementById("brusellosisVaccine").value,
          currentFarmNo:document.getElementById("currentFarmNo").value,
          deathDate:document.getElementById("deathDate").value,
          deathPlace:document.getElementById("deathPlace").value,
          eSignDirector:null,//document.getElementById("eSignDirector").value,
          eSignOwner:null,//document.getElementById("eSignOwner").value,
          exportCountryCode:document.getElementById("exportCountryCode").value,
          exportDate:document.getElementById("exportDate").value,
          farmChangeDate:document.getElementById("farmChangeDate").value,
          id:document.getElementById("animalId").value,
          isFemale:document.getElementById("gender").value,
          motherId:document.getElementById("motherId").value,
          ownerTc:document.getElementById("ownerTc").value,
          pasturellaVaccine:document.getElementById("pasturellaVaccine").value,
          otherVaccine:document.getElementById("otherVaccine").value,
          operations:null,//document.getElementById("operations").value
          slaughterhouseName:null,
          slaughterhouseAddress:null,
          slaughterLicenseNumber:null,
          slaughterDate:null
          /* Örnek
          stringExample: "Hello world!",
          booleanExample: true,
          numberExample: 3.14159265,
          dateExample: new Date("December 10, 1815"),
          arrayExample: [5, true, "hello"],
          nullExample: null,
          objectExample: {
              a: 5,
              b: {
                  nested: "foo"
              }
          }
          */
      };
      db.collection("Animals").doc(docData.id).set(docData);
    });
    
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser){
        document.location.href = 'index.html';
      }
    });
    
}());