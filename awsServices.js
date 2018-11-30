var awsServices = (function()
{
	var apigateway;

//initGateway: function

function initAWS(accessKeyId, secretAccessKey, region) //function handling credentials
	{
		AWS.config.region = region;
		AWS.config.accessKeyId = accessKeyId;
		AWS.config.secretAccessKey = secretAccessKey;
	}

function initGateway(region)
{
	apigateway = new AWS.APIGateway ({ region: region});
}

//define function handling url pass to api 
function payload ()
{
	var params =
	{

	}
}

function initAWSServices(key, secret, region) 
	{
		initAWS(key, secret, region);
	}

	return { // Initialize services
		
		init: function(key, secret, region) 
		{
			initAWSServices(key, secret, region);
		},
	};
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