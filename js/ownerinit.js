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
          farmAdress: document.getElementById("farmAdress").value,
          farmCityCode: document.getElementById("farmCityCode").value,
          farmEmail: document.getElementById("farmEmail").value,
          farmFaxNumber:document.getElementById("farmFaxNumber").value,
          farmGeoCoordinate:document.getElementById("farmGeoCoordinate").value,
          farmNo: document.getElementById("farmNo").value,
          farmPhoneNumber:document.getElementById("farmPhoneNumber").value,
          name:document.getElementById("name").value,
          lastName:document.getElementById("lastName").value,
          residenceAdress:document.getElementById("residenceAdress").value,
          tc:document.getElementById("tc").value,
      };
      db.collection("Owners").doc(docData.tc).set(docData);
    });
    
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser){
        document.location.href = 'index.html';
      }
    });
    
}());