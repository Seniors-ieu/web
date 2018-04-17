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

const txtEmail = document.getElementById("email");
const txtPassword = document.getElementById("password");
const btnLogin = document.getElementById("login");

btnLogin.addEventListener('click', e => {
  const email = txtEmail.value;
  const password = txtPassword.value;
  const auth = firebase.auth();

  const promise = auth.signInWithEmailAndPassword(email, password);

  promise.catch(e => console.log(e.message));
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
    document.location.href = 'database.html';
  }else{
    console.log("Not logged in");
  }
});

}());