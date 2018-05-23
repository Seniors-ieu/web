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
    const btnRegister = document.getElementById("register");
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
    
    btnRegister.addEventListener('click', e => {
        var email = document.getElementById("useremail").value;
        var password = document.getElementById("pass").value;
        var name = document.getElementById("name").value;
        let secondaryApp = firebase.initializeApp(config, "Secondary");
        secondaryApp.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          $('#errorModal').modal('toggle');
          secondaryApp.delete();
          }).then(function(firebaseUser){
            console.log("User " + firebaseUser.uid + " created successfully!");
            var docData = {
              UID: firebaseUser.uid,
              nameLastname: name,
              operatorID: Math.floor(Math.random()*100000000000),
              usertype: Number(document.getElementById("type").value)
            };
            db.collection("Users").doc(firebaseUser.uid).set(docData).then($('#exampleModal').modal('toggle'));
            
            secondaryApp.auth().signOut();
            secondaryApp.delete();  
            
          });
    });

    
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser){
        document.location.href = 'index.html';
      }
    });
    
}());