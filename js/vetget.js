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
    const btnReplace = document.getElementById("replace");
    const btnEncrypt = document.getElementById("encrypt");
    
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
    btnEncrypt.addEventListener('click', e => {

        var data = document.getElementById("pass").value;
        //var key  = CryptoJS.enc.Latin1.parse('admin00000000000');
        //var iv   = CryptoJS.enc.Latin1.parse('1234567890123456');
        function addZeros (v, d){
          var z = d-v.toString().length;
          var s = "";
          for(i=0;i<z;i++){
              s+="0";
          }
          return v+s;
      }
        data = addZeros(data,16);
        var key = CryptoJS.enc.Utf8.parse('1234');
        var iv = CryptoJS.enc.Utf8.parse('1234567890123456');

        var encrypted = CryptoJS.AES.encrypt(data,key,{iv:iv,mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7});
        

        download("encrypted.txt", encrypted);
    });
 
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser){
        document.location.href = 'index.html';
      }
    });
    
}());

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
  }