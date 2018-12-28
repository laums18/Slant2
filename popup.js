//create user pool object
/*var poolData =
{
	UserPoolId: 'us-west-2_4MZyMwRcR'
	ClientId: '68qqmdg46ulqtqffpuhjqu88ke'
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var userData =
{
	Username: 'test1218', Pool: userPool
};
*/

//use button "Login" and redirect to cognito front end and delete popup contents
function clickHandler(e) {

	var element = document.getElementById('text');
	element.parentNode.removeChild(element);

    chrome.tabs.create({url:"https://slant.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=68qqmdg46ulqtqffpuhjqu88ke&redirect_uri=https://psalabs.us"});
    window.close(); // 
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login_btn').addEventListener('click', clickHandler);
});

// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('gauge_bar').addEventListener(meter);
// });

// function meter {

// 	var opts = {
//   	angle: 0.15, /// The span of the gauge arc
//  	lineWidth: 0.44, // The line thickness
//   	pointer: {
//     length: 0.9, // Relative to gauge radius
//     strokeWidth: 0.035 // The thickness
//   	},
//   	colorStart: '#6FADCF',   // Colors
//   	colorStop: '#8FC0DA',    // just experiment with them
//   	strokeColor: '#E0E0E0'   // to see which ones work best for you
// };
// 	var target = document.getElementById('gauge_bar'); // your canvas element
// 	var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
// 	gauge.maxValue = 3000; // set max gauge value
// 	gauge.setMinValue(0);  // set min value
// 	gauge.set(1250); // set actual value
// }




