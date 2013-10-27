<?PHP
//TODO - Passwords will be encrypted, Update this file to encrypt $password, then compare hash.

require_once "formvalidator.php";
require_once "mongoAPI.php";

if(isset($_POST['Submit']))
{
	$validator = new FormValidator();
	$validator->addValidation("email","req","Please enter your email");
	$validator->addValidation("email","email", "Please enter a valid email");
	$validator->addValidation("password","req","Please enter a password");
	$validator->addValidation("password","alnum","Passwords can only contain alphanumeric characters");
	
	if($validator->ValidateForm())
	{

		//Get MongoDB instance and collection
		$mongo = new MongoClient();
		$db = $mongo->clitter;
		$collection = $db->subscribers;
		
		//Retrieve and Sanitize Form inputs
		$password  = $_POST['password'];
		$email     = $_POST['email'];
		
		//Call login, get subscriberID
		$subscriberID = login($email, $password);
		echo $subscriberID;
                //If email and password hash does not match any entry
                if ($subscriberID == 0)
		    {
			//TODO send notification that the email/pass was incorrect
			//header('Location: login.html');
		    }
		else 
		    {
			header('Location: http://localhost/subscriberConsole.php?subscriberID=' . $subscriberID );
		    }
		    
	}
        else
        {
		echo "<B>Validation Errors:</B>";
 
		$error_hash = $validator->GetErrors();
        	foreach($error_hash as $inpname => $inp_err)
        	{
			echo "<p>$inpname : $inp_err</p>\n";
	        }
        }
}
 
if(true == $show_form)
{
}


?>