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
    const btnNew = document.getElementById("newuser");
    btnNew.addEventListener('click', e => {
      document.location.href = 'newuser.html';
    });
    
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
//set user name field
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
},1000);
//
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
          eSignDirector:"",//document.getElementById("eSignDirector").value,
          eSignOwner:"",//document.getElementById("eSignOwner").value,
          exportCountryCode:document.getElementById("exportCountryCode").value,
          exportDate:getUnixTime(document.getElementById("exportDate").value),
          farmChangeDate:getUnixTime(document.getElementById("farmChangeDate").value),
          female:gender(document.getElementById("gendermale").value),
          motherId:document.getElementById("motherId").value,
          ownerTc:document.getElementById("ownerTc").value,
          //pasturellaVaccine:document.getElementById("pasturellaVaccine").value,
          //otherVaccine:document.getElementById("otherVaccine").value,
          operations:[],//document.getElementById("operations").value
          slaughterhouseName:"",
          slaughterhouseAddress:"",
          slaughterLicenseNumber:"",
          slaughterDate:"",
          vaccines:[]
      }
      if(docData.iD==""||docData.birthdate==null||docData.breed==""||docData.ownerTc==""){
        $('#errorModal').modal('toggle');
      }else{
      db.collection("Animals").doc(docData.iD).set(docData).then($('#exampleModal').modal('toggle'));
      }
    });
    
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser){
        document.location.href = 'index.html';
      }
    });
    
}());