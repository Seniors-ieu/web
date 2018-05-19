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
    function getUnixTime (val) {
      var date = new Date (val);
      return Math.floor(date.getTime()/1000);
    }

    function gender(val){
      if (val == "M"){ return false;}
      else {return true;}
    }

    btnCreate.addEventListener('click', e => {
        var docData = {
          iD:document.getElementById("animalId").value,
          birthFarmNo: document.getElementById("birthFarmNo").value,
          birthdate: getUnixTime(document.getElementById("birthDate").value),
          breed:document.getElementById("breed").value,
          //brusellosisVaccine:document.getElementById("brusellosisVaccine").value,
          currentFarmNo:document.getElementById("currentFarmNo").value,
          deathDate:getUnixTime(document.getElementById("deathDate").value),
          deathPlace:document.getElementById("deathPlace").value,
          eSignDirector:null,//document.getElementById("eSignDirector").value,
          eSignOwner:null,//document.getElementById("eSignOwner").value,
          exportCountryCode:document.getElementById("exportCountryCode").value,
          exportDate:getUnixTime(document.getElementById("exportDate").value),
          farmChangeDate:getUnixTime(document.getElementById("farmChangeDate").value),
          female:gender(document.getElementById("gendermale").value),
          motherId:document.getElementById("motherId").value,
          ownerTc:document.getElementById("ownerTc").value,
          //pasturellaVaccine:document.getElementById("pasturellaVaccine").value,
          //otherVaccine:document.getElementById("otherVaccine").value,
          operations:[],//document.getElementById("operations").value
          slaughterhouseName:null,
          slaughterhouseAddress:null,
          slaughterLicenseNumber:null,
          slaughterDate:null,
          vaccines:[]
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
      db.collection("Animals").doc(docData.iD).set(docData);
    });
    
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser){
        document.location.href = 'index.html';
      }
    });
    
}());