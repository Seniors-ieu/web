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
    const btnVetGet = document.getElementById("vetget");
    const btnCall = document.getElementById("call");
    const btnReplace = document.getElementById("replace");
    //Datatable
    /*
    $(document).ready(function() {
      $('#example').DataTable();
  } );*/
    
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
       db.collection("Animals")
       .where("exportCountryCode", "==", "TR")
       .onSnapshot(function(snapshot) {
           
           
           snapshot.forEach(function (userSnapshot) {
            console.log(userSnapshot.data())
            $(document).ready(function() {
              $('#myTable').DataTable( {
                data:snapshot,
                columns: [
                  {data: "iD" },
                {data: "birthdate" },
                {data: "birthFarmNo"},
                {data: "breed"}]
                
            } );
          } );
           });
       });

        db.collection("Animals").doc(id).get().then(function(doc) {
            if (doc.exists) {
                console.log(doc.data());
                var myData = doc.data();
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