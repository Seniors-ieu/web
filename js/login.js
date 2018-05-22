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

const txtEmail = document.getElementById("email");
const txtPassword = document.getElementById("password");
const btnLogin = document.getElementById("login");
const errfield = document.getElementById("err");
btnLogin.addEventListener('click', e => {
  const email = txtEmail.value;
  const password = txtPassword.value;
  const auth = firebase.auth();

  const promise = auth.signInWithEmailAndPassword(email, password);

  //promise.catch(e => alert("Kullanıcı adı ya da şifre yanlış"));
  promise.catch(e => errfield.innerHTML="Hatalı kullanıcı adı ya da şifre" );
});

function userPath(uid){
  firebase.firestore().collection("Users").doc(uid).get().then(function(doc) {
    if (doc.exists) {

      if (doc.data().userType == 1){
        document.location.href = 'database.html';
      } else if (doc.data().userType == 2){
        document.location.href = 'databasevet.html';
      }
        
    } else {
        // doc.data() will be undefined in this case
        console.log(doc);
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
}
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
  if(firebaseUser){
    //document.location.href = 'database.html';
    userPath(firebaseUser.uid);
  }else{
    console.log("Not logged in");
  }
});

}());

/*
if(firebaseUser){
    //document.location.href = 'database.html';
    firebase.firestore().collection("Users").doc(firebaseUser.uid).get().then(function(doc) {
      if (doc.exists) {

        if (doc.data().userType == 1){
          document.location.href = 'database.html';
        } else if (doc.data().userType == 2){
          document.location.href = 'databasevet.html';
        }
          
      } else {
          // doc.data() will be undefined in this case
          console.log(doc);
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
    
  }else{
    console.log("Not logged in");
  }
*/