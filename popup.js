
//use button "Login" and redirect to cognito front end and delete popup contents
function clickHandler(e) {

    chrome.tabs.create({url:"https://slant.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=68qqmdg46ulqtqffpuhjqu88ke&redirect_uri=https://psalabs.us"});
    window.close(); //
};

function upload(){
    var newbody = `<form id="form1" action="https://www.google.com" method="get" class="md-form"><div class="file-field"><a class="btn-floating purple-gradient mt-0 float-left"><i class="fas fa-cloud-upload-alt"></i><input type="file"><a><div class="file-path-wrapper"><div></div></form><button type="submit" form="form1" value="Submit">Submit</button>`;
    document.getElementById('bodyshift').innerHTML=newbody
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

chrome.storage.local.get(['party'], function(result) {});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login_btn').addEventListener('click', clickHandler);
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('SendVideo').addEventListener('click', upload);
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('OverallSlant').addEventListener('click', overall);
});
