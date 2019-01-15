
//use button "Login" and redirect to cognito front end and delete popup contents
function clickHandler(e) {

    chrome.tabs.create({url:"https://slant.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=68qqmdg46ulqtqffpuhjqu88ke&redirect_uri=https://psalabs.us"});
    window.close(); //
};

function upload(){

    chrome.storage.local.get(['userId'], function(result) {
      let uid = result.userId;
      console.log("TEST UID: " + uid);
      let vidReq = new XMLHttpRequest(); 

      vidReq.open('POST', 'https://3xe435ebm9.execute-api.us-east-2.amazonaws.com/Dev/video', true);
      let temp =  {
        uid: uid,
        fileName: (+new Date).toString(36) + ".mp4"
      };
      console.log("OUT" + JSON.stringify(temp));
      let output = vidReq.send(JSON.stringify(temp));
      vidReq.onreadystatechange = function ()
      {
        console.log(vidReq.responseText);
        var presignedURL = vidReq.responseText;
        var newbody = `<input id="upload" type="file" />
                         <input id="filename" type="text" />`
        document.getElementById('bodyshift').innerHTML=newbody
        document.getElementById('upload').onchange = uploadOnChange;

        function uploadOnChange() {
            var filename = this.value;
            var lastIndex = filename.lastIndexOf("\\");
            if (lastIndex >= 0) {
                filename = filename.substring(lastIndex + 1);
            }

            document.getElementById('filename').value = filename;
            console.log(presignedURL);
            presignedURL2 = presignedURL.slice(1, 346);
            console.log(presignedURL2);

            $.ajax({
                url: presignedURL2, //presinged-url which you get from server side
                type: 'PUT',
                data: filename,
                processData: false,
                contentType: false,
                headers: {'Content-Type': 'multipart/form-data'},
                success: function(result){
                    console.log(result);
                }
                
            });
        }
        
        var oldbody = 
        `<html>
          <head>
            
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            
          </head>
          <body>

          <form  action="https://s3.us-east-2.amazonaws.com/youtubedownloadsslant/" method="post" enctype="multipart/form-data">
            Key to upload: 
            <input type="input"  name="key" value="antpas/hi.jpg" /><br />
            <input type="hidden" name="success_action_redirect" value="http://www.psalabs.us" />
            Content-Type: 
            <input type="input"  name="Content-Type" value="image/jpeg" /><br />
            <input type="hidden" name="x-amz-server-side-encryption" value="AES256" /> 
            <input type="text"   name="X-Amz-Credential" value="AKIAJZSV6TCY3Q6532LA/20190114/us-east-2/s3/aws4_request" />
            <input type="text"   name="X-Amz-Algorithm" value="AWS4-HMAC-SHA256" />
            <input type="text"   name="X-Amz-Date" value="20190114T222019Z" />

            Tags for File: 
            <input type="input"  name="x-amz-meta-tag" value="" /><br />
            <input type="hidden" name="Policy" value="eyJleHBpcmF0aW9uIjoiMjAxOS0wMS0xNFQyMzoyMDoxOVoiLCJjb25kaXRpb25zIjpbeyJrZXkiOiJhbnRwYXMvaGkuanBnIn0seyJidWNrZXQiOiJ5b3V0dWJlZG93bmxvYWRzc2xhbnQifSx7IlgtQW16LUFsZ29yaXRobSI6IkFXUzQtSE1BQy1TSEEyNTYifSx7IlgtQW16LUNyZWRlbnRpYWwiOiJBS0lBSlpTVjZUQ1kzUTY1MzJMQS8yMDE5MDExNC91cy1lYXN0LTIvczMvYXdzNF9yZXF1ZXN0In0seyJYLUFtei1EYXRlIjoiMjAxOTAxMTRUMjIyMDE5WiJ9XX0" />
            <input type="hidden" name="X-Amz-Signature" value="381f5640c4aa30a7f501624748496f00b0bd05df4be496e198897688666b1a4b" />
            File: 
            <input type="file"   name="file" /> <br />
            <!-- The elements after this will be ignored -->
            <input type="submit" name="submit" value="Upload to Amazon S3" />
          </form>
        </html>`
      }
    });
};

function overall(){
    chrome.storage.local.get(['history'], function(result){
      var overallSlantHTML = `<div id="bodyshift" class="containforslant">
        <div class="card" id="cardforslant">
            <div id="SlantTitle2" class="card-header"><h5>Overall Bias</h5><span class="titleforslant2"></span></div>
            <div id="SlantSummary2" class="card-body">
                <h5>Top Sites</h5><p class="summaryforslant2"></p>
            </div>
            <ul class="list-group list-group-flush" id="SlantKeywords2">
                <li class="list-group-item"><h5>Articles Read</h5><p class="keywordsforslant2"></p></li>
            </ul>
        </div>
     </div>`;
      document.getElementById('bodyshift').innerHTML=overallSlantHTML
      let history = JSON.parse(result["history"]);
      document.getElementById("SlantTitle2").querySelector('.titleforslant2').innerHTML = history.totalBias + "% " + history.party;
      document.getElementById("SlantSummary2").querySelector('.summaryforslant2').innerHTML = history.topFive;
      document.getElementById("SlantKeywords2").querySelector('.keywordsforslant2').innerHTML = history.sourceCount;
    });
    
};

// function biasview(){

//        chrome.storage.local.get(apiReturn, function){
//         //display on document.getElementById("SlantPopup") is CLICKED
//         //MOE FILL IN UR MAGIC HERE
//      }
// }

var port = chrome.extension.connect({
   name: "Bias Data"
});

port.onMessage.addListener(function(msg) {

     console.log("message recieved " + msg);
     var tabId = msg.toString();
     chrome.storage.local.get(tabId, function(result) {

       var x = document.getElementById("SlantPopup");
       let outProb = ((result[tabId].prob - 50)) * 2
       x.querySelector('.scoreforslant').innerHTML = outProb + "%"; //current way to display labels in popup

       var y = document.getElementById("SlantPopup2");
       y.querySelector('.partyforslant').innerHTML = result[tabId].party;

       document.getElementById("SlantTitle").querySelector('.titleforslant').innerHTML = result[tabId].title;
       document.getElementById("SlantSummary").querySelector('.summaryforslant').innerHTML = result[tabId].summary;
       document.getElementById("SlantKeywords").querySelector('.keywordsforslant').innerHTML = result[tabId].keywords.slice(0, 5).join(', ');
       document.getElementById("SlantUsername").querySelector('.usernameforslant').innerHTML = result[tabId].uid;
     });
});

chrome.storage.local.get(['party'], function(result) {
  //var y = document.getElementById("SlantPopup2");
  //y.querySelector('.partyforslant').innerHTML = result.party;
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login_btn').addEventListener('click', clickHandler);
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('SendVideo').addEventListener('click', upload);
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('OverallSlant').addEventListener('click', overall);
});
