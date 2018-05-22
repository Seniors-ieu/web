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
    
    btnCreate.addEventListener('click', e => {
        var docData = {
          Animals:[], 
          farmAddress: document.getElementById("farmAddress").value,
          farmCityCode: document.getElementById("farmCityCode").value,
          farmCountryCode: "TR",//document.getElementById("farmCountryCode").value,
          farmEmail: document.getElementById("farmEmail").value,
          farmFaxNumber:document.getElementById("farmFaxNumber").value,
          farmGeoCoordinate:document.getElementById("farmGeoCoordinate").value,
          farmNo: document.getElementById("farmNo").value,
          farmPhoneNumber:document.getElementById("farmPhoneNumber").value,
          name:document.getElementById("name").value,
          lastName:document.getElementById("lastName").value,
          residenceAddress:document.getElementById("residenceAddress").value,
          tc:document.getElementById("tc").value,
      };
      if(docData.name==""||docData.lastName==""||docData.tc==""){
        $('#errorModal').modal('toggle');
      }else{
        db.collection("Owners").doc(docData.tc).set(docData).then($('#exampleModal').modal('toggle'));
      }
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
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser){
        document.location.href = 'index.html';
      }
    });
    
}());