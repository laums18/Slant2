
//use button "Login" and redirect to cognito front end and delete popup contents
function clickHandler(e) {

	var element = document.getElementById('text');
	element.parentNode.removeChild(element);

    chrome.tabs.create({url:"https://slant.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=68qqmdg46ulqtqffpuhjqu88ke&redirect_uri=https://psalabs.us"});
    window.close(); // 
};

function animate(){
    var c = new CountUp("target",0,30,0,1, {
        useEasing: true
    });
    c.start();
        };

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login_btn').addEventListener('click', clickHandler);
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('target').addEventListener('mouseover', animate);
});


