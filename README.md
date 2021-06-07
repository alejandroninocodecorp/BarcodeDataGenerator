# BarcodeDataGenerator
Create data for barcode generation.
Code Corporation.

<h2>INSTALLATION</h2>
<div><pre>npm install barcodedatagenerator</pre></div>

<h2>IMPORT</h2>
<div><pre>import {GenerateQrCodeCRCCS, GenerateQrCodeCRQCC, GenerateQrCodeCRMKR, GenerateQrCodeAgeVerification, GenerateQrCodeSplitJavascript} from 'barcodedatagenerator';
</pre></div>

<h2>GenerateQrCodeCRCCS</h2>
<div><b>IMPLEMENTING:</b></div> 
<div><br><b><pre>GenerateQrCodeCRCCS(inputFromUser)</br></b></div>
<div>-Parameter "inputFromUser" - input from file or textbox seperated by (;) or (\r\n).</div>
<div>-returns string value contianing the generated CRCCS string.</div><br>
<div>Text file which contains the command for the reader.  If giving multiple commands in the text box, separate them with a semi-colon (";").

</div>



<h2>GenerateQrCodeCRQCC</h2>
<div><b>IMPLEMENTING:</b></div>
<div><b><br><pre>GenerateQrCodeCRQCC(inputFromUser)</b></div>
<div>-Parameter "inputFromUser" - input from textbox.</div>
<div>-returns string value containing the generated CRQCC string.</div><br>
<div>Text file which contains commands to have a CR2700 connect to an A271.  It has a slightly different encoding so that normal commands can be blocked by the connection commands permitted.

example:

000BEF123456    // Connect to Bluetooth MAC Address "000BEF123456"

</div>

<h2>GenerateQrCodeCRMKR</h2>
<div><b>IMPLEMENTING:</b></div>
<div><b><br><pre>GenerateQrCodeCRMKR(inputFromUser)</b></div>
<div>-Parameter "inputFromUser" - input from file or textbox seperated by (;) or (%).</div>
<div>-returns string value containing the generated CRMKR string.</div><br>
<div>Text file which contains head/footer/split.  Non-printable characters are represented by url encoding.


</div>
  
  <h2>GenerateQrCodeAgeVerification</h2>
<div><b>IMPLEMENTING:</b></div>
<div><b><br><pre>GenerateQrCodeAgeVerification(clockCheck, optionLock, pinValue, optionAgeVer, underageValue, overageValue, optionExVer)</b></div>
<div>-Parameter "clockCheck" - input from checkbox Set time.</div>
  <div>-Parameter "optionLock" - input from select box Lock/Unlock, options will be "lock", "unlock" and "no action".</div>
  <div>-Parameter "pinValue" - Input from textbox Pin.</div>
  <div>-Parameter "optionAgeVer" - input from Select box Age verification, options will be "enable", "disable and "no action".</div>
  <div>-Parameter "underageValue" - input from textbox Under Age Value.</div>
  <div>-Parameter "overageValue" - input from textbox Over Age Value.</div>
  <div>-Parameter "optionExVer" - input from Select box Expiration Verification, options will be "enable", "disable" and "no action".</div>
<div>-returns string value containing the generated Age Verification string.</div><br>
  
  <h2>GenerateQrCodeSplitJavascript</h2>
<div><b>IMPLEMENTING:</b></div>
<div><b><br><pre>GenerateQrCodeSplitJavascript(inputFromUser, fileName, fileSize, maxSizeJs, numberBarcodes)</b></div>
<div>-Parameter "inputFromUser" - input from file.</div>
  <div>-Parameter "fileName" - Name of the file.</div>
  <div>-Parameter "fileSize" - Full size of the file.</div>
  <div>-Parameter "maxSizeJs" - input from textbox Max Size Js.</div>
  <div>-Parameter "numberBarcodes" - Input from textbox Number of Barcodes.</div>
  
<div>-returns "splitString" - strings values containing the generated Split Javascript strings, will return as many strings as we split the javascript.</div><br>
 <div>-returns "combinerScriptString" - String for combine the javascript, will return just one string.</div><br>
  
  <div>GenerateQrCodeSplitJavascript will return two values. To receive those values have to type: <pre> [splitString, combinerScriptString] = GenerateQrCodeSplitJavascript(text, filename, filesize, maxsizejs, numberbarcodes);
</pre></div>
  <div>Where "splitString" is an array, and "combinerScriptString" is just a var: <pre>var SplitString = new Array();
      var combinerScriptString;</pre> </div>
  <div>For printing all values from splitString, have to use a FOR loop</div>
