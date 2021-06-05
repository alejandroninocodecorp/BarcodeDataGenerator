module.exports = { // have to use module.exports to exports all the functions and will be readed in the main js file.
/**
 * generateQrCodeCRCCS - This generates the CRCCS barcode string. 
 * @param {*} inputFromUser - input from file or textbox seperated by (;) or (\r\n)
 * @returns string value contianing the generated CRCCS string
 */
 GenerateQrCodeCRCCS : function GenerateQrCodeCRCCS(inputFromUser)
 {
   if (inputFromUser == "")
   {
     console.log("Recieved empty input generateQrCodeCRCCS2");
     return "";
   }
   inputFromUser = inputFromUser.replace(/\n/g, '\x03');
   inputFromUser = inputFromUser.replace(/ /g, "");
   inputFromUser = inputFromUser.replace(/;/g, '\x03');
   var headerCRCCS = "\x01Y\x1d\x02";
   var footerCRCCS = "\x03\x04";
   
  
   var CRCCStextstring = headerCRCCS + inputFromUser + footerCRCCS;   //String command ready for QRCode generation
   console.log(CRCCStextstring);
   return CRCCStextstring;
 },



 /**
 * generateQrCodeCRQCC - Generates the CRQCC barcode string. 
 * @param {*} inputFromUser - input from textbox
 * @returns string value containing the generated CRQCC string
 */
GenerateQrCodeCRQCC : function GenerateQrCodeCRQCC(inputFromUser)
{
  if (inputFromUser == "")
  {
    console.log("Recieved empty input generateQrCodeCRQCC2");
    return "";
  }
  var headerCRQCC="\x01Q\x1d\x02CMMOSCMBT\x03BTCMXCA";
  var footerCRQCC="\x03\x04";
  
  
  var CRQCCstring = headerCRQCC + inputFromUser + footerCRQCC;   //String command ready for QRCode generation
  console.log(CRQCCstring);
  return CRQCCstring;
},



/**
 * generateQrCodeCRMKR - Generates the CRQCC barcode string. 
 * @param {*} inputFromUser - input from file or textbox seperated by (;) or (%)
 * @returns string value containing the generated CRMKR string
 */
 GenerateQrCodeCRMKR: function GenerateQrCodeCRMKR(inputFromUser)
 {
   if (inputFromUser == "")
   {
     console.log("Recieved empty input generateQrCodeCRQCC2");
     return "";
   }
   inputFromUser = inputFromUser.replace(/%01Y/g, '\x01Y' ).replace(/%1d/g, '\x1d').replace(/%02/g, '\x02').replace(/%03/g, '\x03').replace(/%04/g, '\x04');
   inputFromUser = inputFromUser.replace(/;/g, '\x03');
   var CRMKRstring =  inputFromUser;   //String command ready for QRCode generation
   console.log(CRMKRstring);
   return CRMKRstring;
 },



 /**
 * generateQRCodeAGEVER - Generates the Age Verification barcode string.
 * @param {*} clockCheck - input from checkbox Set time.
 * @param {*} optionLock - input from select box Lock/Unlock, options will be "lock", "unlock" and "no action".
 * @param {*} pinValue - Input from textbox Pin.
 * @param {*} optionAgeVer - input from Select box Age verification, options will be "enable", "disable and "no action".
 * @param {*} underageValue - input from textbox Under Age Value.
 * @param {*} overageValue - input from textbox Over Age Value.
 * @param {*} optionExVer - input from Select box Expiration Verification, options will be "enable", "disable" and "no action".
 * @returns string value containing the generated Age Verification string
 */
  GenerateQrCodeAgeVerification: function GenerateQrCodeAgeVerification(clockCheck, optionLock, pinValue, optionAgeVer, underageValue, overageValue, optionExVer)
  {
    
   var header = "\x01Y\x1d\x02";
   var split = "\x03";
   var footer = "\x04";
   var clockCommand = "CKDTPDT";
   var pinCommand = "CFLKXLK";
   var unLockCommand = "CFLKXUK";
   var underAgeCommand = "CKAVSUA";
   var overAgeCommand = "CKAVSOA";
   var avEnableCommand = "CKAVSEN";
   var exEnableCommand = "CKAVSEX";
   var date = new Date();
    var FinalCommandAGEVER = header;
    if (clockCheck){
 
     FinalCommandAGEVER = (FinalCommandAGEVER + clockCommand + "\"" + date.getFullYear() +"-" + (date.getMonth()+1).toString().padStart(2, "0") + "-" + 
     date.getDate().toString().padStart(2, "0") + " " + date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0") + ":" + 
     date.getSeconds().toString().padStart(2, "0") + "\"" + split);
     
   }
   if (underageValue != ''){
     FinalCommandAGEVER = FinalCommandAGEVER + underAgeCommand + underageValue + split;
   }
   if (overageValue != ''){
     FinalCommandAGEVER = FinalCommandAGEVER + overAgeCommand + overageValue + split;
   }
 
   if (optionAgeVer == 'enable'){
     FinalCommandAGEVER= FinalCommandAGEVER + avEnableCommand + '1' + split;
   }
   if (optionAgeVer == 'disable'){
     FinalCommandAGEVER= FinalCommandAGEVER + avEnableCommand + '0' + split;
   }
   if (optionExVer == 'enable'){
     FinalCommandAGEVER= FinalCommandAGEVER + exEnableCommand + '1' + split;
   }
   if (optionExVer == 'disable'){
     FinalCommandAGEVER= FinalCommandAGEVER + exEnableCommand + '0' + split;
   }
   if (optionLock == 'lock' || optionLock == 'unlock'){
     var initVector = 0x44;
       var bytePin ;
       console.log(bytePin);
       var bytePinReturn = "";
       var finalCommand ="";
       if(optionLock == 'lock') {
         finalCommand = pinCommand;
         bytePin = Array.from(pinValue);
       }
       else {
         finalCommand = unLockCommand;
         bytePin = Array.from(pinValue);
       }
 
       bytePin.forEach( element => {
         console.log("element: " + element.charCodeAt());
         initVector ^= element.charCodeAt();
         console.log("initVector: " + initVector);
         bytePinReturn = bytePinReturn + String.fromCharCode(initVector);
         console.log(initVector);
         }
       )
       console.log(bytePinReturn);
 
       var crypto = require('crypto');
       var hashString = finalCommand + bytePinReturn;
       console.log("hashString: " + hashString);
       var shasum = crypto.createHash('sha1').update(finalCommand + bytePinReturn).digest('hex');
       console.log(shasum);
 
       FinalCommandAGEVER = FinalCommandAGEVER + finalCommand + bytePinReturn.substring(0, bytePinReturn.length/2) 
                 + shasum + bytePinReturn.substring(bytePinReturn.length/2,) + split;
   }
   
     var AgeVerString = FinalCommandAGEVER + footer; // String for Age Verification ready for QrCode generation
    console.log(AgeVerString);
    return AgeVerString;
  },



/**
 * generateQRCodeSplitJavascript - Generates the SPLIT Javascript barcode string.
 * @param {*} inputFromUser - input from file.
 * @param {*} fileName - Name of the file.
 * @param {*} fileSize - Full size of the file.
 * @param {*} maxSizeJs - input from textbox Max Size Js
 * @param {*} numberBarcodes - Input from textbox Number of Barcodes.
 * @returns splitStrig - strings values containing the generated Split Javascript strings, will return as many strings as we split the javascript
 * @returns combinerScriptString - String for combine the javascript, will return just one string.
 */
 GenerateQrCodeSplitJavascript: function GenerateQrCodeSplitJavascript(inputFromUser, fileName, fileSize, maxSizeJs, numberBarcodes)
 {
   if (inputFromUser == "")
   {
     console.log("Recieved empty input generateQrCodeCRQCC2");
     return "";
   }
   var finalresult = [];
   var commandFiletype = "RDFSXFM2";
   var commandFileName = "RDFSXFN";
   var commandFileSize = "RDFSXSZ";
   var commandCRC = "RDFSXCR";
   var commandReboot = "RDFSXRB0";
   var commandData = "RDFD";
   var header = "\x01Y\x1d\x02";
   var split = "\x03";
   var footer = "\x04";
   
   if (maxSizeJs > 1500){
   console.log("error")  ;
   }
   if (maxSizeJs == ''){
     var residuo = Math.ceil(fileSize/numberBarcodes) ;
     console.log(residuo);
     maxSizeJs = residuo;
     }
   if(numberBarcodes == ''){
    numberBarcodes = Math.ceil(fileSize/maxSizeJs)  ;
    var residuo = maxSizeJs;
    console.log(residuo);
    console.log(numberBarcodes);
    
   }
   
   var i=1;
   const {crc16xmodem} = require('crc');
   console.log(crc16xmodem);
     var crcSum = crc16xmodem(inputFromUser.substring(0, maxSizeJs));
     var splitString = new Array();
     var fileName1 = fileName;
     var fileName2 = fileName;
     
   if (numberBarcodes <= 20){
     for( i = 1 ; i <= numberBarcodes ; i++){
 
       if(i === 1){
         //First code will be from 0 to maxSizeJs
         fileName1 = fileName + ".part" + (i) + "of" + numberBarcodes;
 
         finalresult[i] = header + commandFiletype + split +
         commandFileName +"\"" + fileName1 +"\"" + split + 
         commandFileSize + inputFromUser.substring(0, maxSizeJs).length  + split + 
         commandCRC + crcSum + split +
         commandReboot + split +
         commandData + inputFromUser.substring(0, maxSizeJs);
         
         
       }
       if(i > 1){
        // Rest of the code will be from maxSizeJs*[i-1] (the last number) to maxSizeJs*[i] (to the top number)
          fileName2 = fileName + ".part" + (i) + "of" + numberBarcodes;
          var crcSum2 = crc16xmodem(inputFromUser.substring(maxSizeJs*[i-1], maxSizeJs*[i]));
 
         finalresult[i] = header + commandFiletype + split +
         commandFileName +"\"" + fileName2 +"\"" + split + 
         commandFileSize + inputFromUser.substring(maxSizeJs*[i-1], maxSizeJs*[i]).length  + split + 
         commandCRC + crcSum2 + split +
         commandReboot + split +
         commandData + inputFromUser.substring(maxSizeJs*[i-1], maxSizeJs*[i]);
         
       }
 
    
     finalresult[i] = finalresult[i] + split + footer; // Split and footer will be added to all the barcodes splited
       
     
     
    
     splitString[i] = finalresult[i]; // String ready for QrCode generation
     
     
     
 }
 // Creating the combinerScript.js
     var finalString = "include(\".cra.js\");var name=\"" + fileName + "\",script=\"combinerScript.js\";throwError=function(r){throw reader.indicateError(),storage.erase(script),r};var parseStr=name+\".part[0-9]+of[0-9]+\",file=storage.findFirst(parseStr),numParts=parseInt(file.substring(file.lastIndexOf(\"of\")+2));NaN==numParts&&throwError(\"Expected File: \"+name+\".partXofY\"),storage.write(name,\"\");for(var part=1;part<=numParts;)wdt_pet(),partItr=parseInt(file.substring(file.lastIndexOf(\".\")+5,file.lastIndexOf(\"of\"))),partItr==part?(storage.append(name,storage.read(file)),storage.erase(file),part++,file=storage.findFirst(parseStr)):NaN==partItr||null==file?throwError(\"Cannot Find: \"+part+\" of \"+numParts+\" Itr: \"+partItr):file=storage.findNext();storage.erase(script);";
     var fileNameScript = "combinerScript.js";
     var maxSizeScript = 1000;
     crcSum = crc16xmodem(finalString.substring(0, maxSizeScript));
 
       var combinerScriptString = header + commandFiletype + split +
         commandFileName +"\"" + fileNameScript +"\"" + split + 
         commandFileSize + finalString.substring(0, maxSizeScript).length  + split + 
         commandCRC + crcSum + split +
         commandReboot + split +
         commandData + finalString.substring(0, maxSizeScript);
 
       var combinerScriptString = combinerScriptString + split + "JSCMXES\"combinerScript.js\"" + split + footer; //combinerScript.js is ready to be created
 
 return [splitString, combinerScriptString]; // Will return two values, the strings for the Split Javascript and the combinerScript.js

   
 
 }else{
 console.log("Error");
 }    
 }
};