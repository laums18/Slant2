
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
            presignedURL2 = presignedURL.slice(1,-1)
            console.log(presignedURL2);

            var file = document.getElementById('upload').files[0];

            $.ajax({
                url: presignedURL2, //presinged-url which you get from server side
                type: 'PUT',
                data: file,
                processData: false,
                contentType: false,
                headers: {'Content-Type': 'multipart/form-data'},
                success: function(result){
                    console.log(result);
                }
                
            });
        }
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
