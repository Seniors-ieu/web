(function(){
    // Initialize Firebase
    
    function toAscii(input) {
        input = input.toString(2);
		var result = "";
		var arr = input.match(/.{1,8}/g);
		for (var i = 0; i < arr.length; i++) {
			result += String.fromCharCode(parseInt(arr[i], 2).toString(10));
        }
        while(result.length%4 != 0){
            result = "0"+result;
        }
		return result;
    }
    
    function dateToAscii(date){
        temp = date;
        var d = new Date(temp.slice(6), temp.slice(3,5), temp.slice(0,2),0,0,0);//S, ms will come
        d = Math.floor(d.getTime()/1000);
        return toAscii(d);
    }

    function setLength (v, d){
        if(v == undefined || v== null){
            return setLength("",d);
        }
        if(v.length==d){
            return v;
            
        }
        if(v.length>d){
            console.log(v + " alanı büyük");
            return v;
            
        }
        var z = d-v.toString().length;
        var s = "";
        for(i=0;i<z;i++){
            s+="$";
        }
        return s+v;
    }
    
    var db = firebase.firestore();
    
    const btnStr = document.getElementById("str");
    const btnWrite = document.getElementById("write");
    const textField = document.getElementById("text-field");
    var stringToWrite = "";
    
    btnStr.addEventListener('click', e => {
        const id = document.getElementById("RetrieveAnimalId").value;
        console.log(id);
          //var query = db.collection("Animals").where("animalID", "==", document.getElementById("RetrieveAnimalId").value);
         // document.getElementById("animalId").value = query.animalID;
          db.collection("Animals").doc(id).get().then(function(doc) {
              if (doc.exists) {
                  stringToWrite="";
                  var temp;
                  var myData = doc.data();
                    //id

                  stringToWrite += setLength(myData.iD.replace(/ /g,""),11);
                //birthdate
                  stringToWrite+= setLength(myData.birthdate,10);
                //gender
                  if(myData.isFemale){
                      stringToWrite += "F";
                  }else {
                      stringToWrite += "M";
                  }
                //breed
                //stringToWrite += setLength(myData.breed,4);
                stringToWrite += setLength("33",4);
                //motherID
                stringToWrite += setLength(myData.motherId.replace(/ /g,""),11);

                //birthfarmno
                stringToWrite += setLength(myData.birthFarmNo,10);

                //currentfarmno
                stringToWrite += setLength(myData.currentFarmNo,10);

                //farmchangedate
                stringToWrite+= setLength(myData.farmChangeDate,10);

                //countrycode !
                stringToWrite += setLength(myData.countryCode,2);
                
                //export date
                stringToWrite += setLength(myData.exportDate,10);

                //death date
                stringToWrite += setLength(myData.deathDate,10);

                //death place
                stringToWrite += setLength(myData.deathPlace,40);

                //vaccine !
                  /*
                if(myData.alumVaccine == "Yapıldı"){stringToWrite+="T";}
                else {stringToWrite+="T";}
                if(myData.brucellosisVaccine == "Yapıldı"){stringToWrite+="T";}
                else {stringToWrite+="T";}
                if(myData.pasturellaVaccine == "Yapıldı"){stringToWrite+="T";}
                else {stringToWrite+="T";}
                if(myData.otherVaccine == "Yapıldı"){stringToWrite+="T";}
                else {stringToWrite+="T";}

*/
                  stringToWrite += "FFFFFFFFFFF"; //Aşılar boş atıyor
                //slaughter
                stringToWrite += setLength(myData.slaughterhouseName,40);

                stringToWrite += setLength(myData.slaughterhouseAddress,40);

                stringToWrite += setLength(myData.slaughterLicenseNumber,10);

                stringToWrite += setLength(myData.slaughterDate,10);
                var tc = myData.ownerTc;
                  db.collection("Owners").doc(tc).get().then(function(doc) {
                    if (doc.exists) {
                        console.log("Tıklandı");
                        var myData = doc.data();
                        //farm
                        stringToWrite += setLength(myData.farmCountryCode,2);
                        stringToWrite += setLength(myData.farmCityCode,2);
                        stringToWrite += setLength(myData.name,16);
                        stringToWrite += setLength(myData.lastName,16);
                        stringToWrite += setLength(myData.tc,11);
                        stringToWrite += setLength(myData.residenceAddress,40);
                        stringToWrite += setLength(myData.farmAddress,40);
                        stringToWrite += setLength(myData.farmGeoCoordinate,22);
                        stringToWrite += setLength(myData.farmPhoneNumber,10);
                        stringToWrite += setLength(myData.farmFaxNumber,10);
                        stringToWrite += setLength(myData.farmEmail,48);

                        stringToWrite += setLength("",148);
                        stringToWrite += Math.floor(new Date().getTime()/1000);
                        stringToWrite += setLength("",12);
                        stringToWrite += Math.floor(new Date().getTime()/1000);
                        stringToWrite += "9999"
                        for(x=0;x<12;x++){
                        stringToWrite += Math.floor(new Date().getTime()/1000);
                        }
                        //stringToWrite += setLength("",110);

                        console.log(stringToWrite, stringToWrite.length);
                        textField.value = stringToWrite;
/*
                        // Stringi arraya çevirme kısmı. Array olarak yollayıp serverda koda çevirmeye çalışacağım
                        var hexstring="";
                        for(i=0;i<stringToWrite.length;i++){
                            hexstring += stringToWrite.charCodeAt(i).toString(16);
                            //ar.push(stringToWrite.charCodeAt(i).toString(16))
                        }
                        console.log(hexstring);
*/
                        
                    } else {
                        // doc.data() will be undefined in this case
                        console.log(doc);
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
              } else {
                  // doc.data() will be undefined in this case
                  console.log(doc);
              }
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
          
        
      });

      btnWrite.addEventListener('click', e => {
        const str = document.getElementById("text-field").value;
        //Socket kısmı
        var connection = new WebSocket('ws://127.0.0.1:9999');

        connection.onopen = function () {
        connection.send(str);
        connection.close();
        };
      });
      
}());