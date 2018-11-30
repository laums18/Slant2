/*chrome.runtime.onInstalled.addListener(function() 
{
	chrome.history.search({"text": "", "startTime": 0 , "maxResults": 1000000000}, function callback(results) 
	{ 
		//store user history to dynamo on first install
		var json= JSON.stringify(results);
		console.log(JSON.parse(json));
	}) 
});*/

chrome.tabs.getSelected(null, function(tab) 
{ //get current tab URL from extension

	var tablink = tab.url;
});

/* var apigClient = apigClientFactory.newClient({
            invokeUrl: 'https://9rautkbsa5.execute-api.us-west-2.amazonaws.com/test"'
        });

var body =
{
	"url": "https://9rautkbsa5.execute-api.us-west-2.amazonaws.com/test",
	"method": "POST",
	"data": tablink
};

apigClient.chromeurl(params, body, addtionalParams) //call api method

	.then(function(result){
      // Add success callback code here.
    }).catch( function(result){
      // Add error callback code here.
    });*/

    function checkAWSCredentials(awsCredentials, callback) //require credentials check
    {
		awsServices.init(awsCredentials.awsAccessKeyId, awsCredentials.awsSecretAccessKey, awsCredentials.awsRegion);	
	}

	function initAWSCredentials() //validate and store credentials passed in
	{
		chrome.storage.sync.get('awsCredentials', function(data) 
		{
				var awsCredentials = data.awsCredentials;
				
				if (awsCredentials && awsCredentials.awsAccessKeyId !== '' && awsCredentials.awsSecretAccessKey !== '' && awsCredentials.awsRegion !== '') 
				{
					awsServices.init(awsCredentials.awsAccessKeyId, awsCredentials.awsSecretAccessKey, awsCredentials.awsRegion);
					status = 'OK';
				}
				else
					status = 'Not configured AWS Credentials. Please configure';
			}
		);
	}

	function startExtension() 
	{
		if (!chrome.storage) 
		{
			setTimeout(startExtension, 1000);
			return;
		}
		initAWSCredentials();
	}

	setTimeout(startExtension, 1000);




