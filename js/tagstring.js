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
    
    var db = firebase.firestore();
    
    const btnStr = document.getElementById("str");
    const textField = document.getElementById("text-field");
    var stringToWrite = "000";
    
    btnStr.addEventListener('click', e => {
        const id = document.getElementById("RetrieveAnimalId").value;
        console.log(id);
          //var query = db.collection("Animals").where("animalID", "==", document.getElementById("RetrieveAnimalId").value);
         // document.getElementById("animalId").value = query.animalID;
          db.collection("Animals").doc(id).get().then(function(doc) {
              if (doc.exists) {
                  var temp;
                  var myData = doc.data();
                    //id

                  stringToWrite += myData.id.replace(/ /g,"");
                //birthdate
                  stringToWrite+= dateToAscii(myData.birthdate);
                //gender
                  if(myData.isFemale){
                      stringToWrite += "F";
                  }else {
                      stringToWrite += "E";
                  }
                //breed
                stringToWrite += "0000";

                //motherID
                stringToWrite += myData.motherId.replace(/ /g,"");

                //birthfarmno
                stringToWrite += toAscii(myData.birthFarmNo);

                //currentfarmno
                stringToWrite += toAscii(myData.currentFarmNo);

                //farmchangedate
                stringToWrite+= dateToAscii(myData.farmChangeDate);

                //countrycode kodlar gelmedi
                stringToWrite += "a";
                
                //export date
                stringToWrite += dateToAscii(myData.exportDate);

                //death date
                stringToWrite += dateToAscii(myData.deathDate);

                //death place

                for(i=0; i<40-myData.deathPlace.length; i++){
                    stringToWrite += "0";
                }
                stringToWrite += myData.deathPlace;

                //vaccine

                if(myData.alumVaccine == "Yapıldı"){stringToWrite+="T";}
                else {stringToWrite+="T";}
                if(myData.brucellosisVaccine == "Yapıldı"){stringToWrite+="T";}
                else {stringToWrite+="T";}
                if(myData.pasturellaVaccine == "Yapıldı"){stringToWrite+="T";}
                else {stringToWrite+="T";}
                if(myData.otherVaccine == "Yapıldı"){stringToWrite+="T";}
                else {stringToWrite+="T";}

                //slaughter
                for(i=0; i<40-myData.slaughterhouseName.length; i++){
                    stringToWrite += "0";
                }
                stringToWrite += myData.slaughterhouseName;

                for(i=0; i<40-myData.slaughterhouseAddress.length; i++){
                    stringToWrite += "0";
                }
                stringToWrite += myData.slaughterhouseAddress;

                stringToWrite += toAscii(myData.slaughterLicenseNumber);

                stringToWrite += dateToAscii(myData.slaughterDate);
                var tc = myData.ownerTc;
                  db.collection("Owners").doc(tc).get().then(function(doc) {
                    if (doc.exists) {
                        console.log("Tıklandı");
                        var myData = doc.data();
                        //farm
                        stringToWrite += "a"; //ccode
                        stringToWrite += toAscii(23); //izmir hex

                        for(i=0; i<16-myData.name.length; i++){
                            stringToWrite += "0";
                        }
                        stringToWrite += myData.name;

                        for(i=0; i<16-myData.lastName.length; i++){
                            stringToWrite += "0";
                        }
                        stringToWrite += myData.lastName;

                        stringToWrite += toAscii(myData.tc);

                        for(i=0; i<40-myData.residenceAdress.length; i++){
                            stringToWrite += "0";
                        }
                        stringToWrite += myData.residenceAdress;

                        for(i=0; i<40-myData.farmAdress.length; i++){
                            stringToWrite += "0";
                        }
                        stringToWrite += myData.farmAdress;

                        stringToWrite += myData.farmGeoCoordinate;

                        stringToWrite += toAscii(myData.farmPhoneNumber);

                        stringToWrite += toAscii(myData.farmFaxNumber);

                        for(i=0; i<48-myData.farmEmail.length; i++){
                            stringToWrite += "0";
                        }
                        stringToWrite += myData.farmEmail;

                        for(i=0; i<182; i++){
                            stringToWrite += "0";
                        }
                        console.log(stringToWrite, stringToWrite.length);
                        textField.value = stringToWrite;
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
      
}());