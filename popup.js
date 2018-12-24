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

    chrome.tabs.create({url: "https://slant.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=68qqmdg46ulqtqffpuhjqu88ke&redirect_uri=https://slant.test.cognito.staticpage.s3-website-us-west-2.amazonaws.com/"});
    window.close(); // 
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login_btn').addEventListener('click', clickHandler);
});