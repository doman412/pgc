<?PHP
//TODO Encrypt passwords
//TODO Send error notifications

require_once "formvalidator.php";
require_once "mongoAPI.php";

if(isset($_POST['Submit']))
{
	$validator = new FormValidator();
	$validator->addValidation("firstName","req","Please enter your First Name");
	$validator->addValidation("firstName","alpha","Only use alphabetic Characters in your First Name");
	$validator->addValidation("firstName","maxlen=30","First name can be no more than 30 characters");
	$validator->addValidation("lastName","req","Please enter your Last Name");
	$validator->addValidation("lastName","alpha","Only use alphabetic Characters in your First Name");
	$validator->addValidation("lastName","maxlen=30","Last name can be no more than 30 characters");
	$validator->addValidation("email1","req","Please enter your email");
	$validator->addValidation("email1","email", "Please enter a valid email");
	$validator->addValidation("email1","eqelmnt=email2", "Emails do not match");
	$validator->addValidation("email2","req","Please confirm your email");
	$validator->addValidation("email2","email", "Please enter a valid email");
	$validator->addValidation("password1","req","Please enter a password");
	$validator->addValidation("password1","alnum","Passwords can only contain alphanumeric characters");
	$validator->addValidation("password1","eqelmnt=password2", "Passwords do not match");
	$validator->addValidation("password2","req","Please confirm your password");
	$validator->addValidation("password2","alnum","Passwords can only contain alphanumeric characters");
	
	if($validator->ValidateForm())
	{

	    //Get MongoDB instance and collection
	    $mongo = new MongoClient();
	    $db = $mongo->clitter;
	    $collection = $db->subscribers;

	    //Retrieve and Sanitize Form inputs
	    $firstName = $_POST['firstName'];
	    $lastName  = $_POST['lastName'];
	    $password  = $_POST['password1'];
	    $email     = $_POST['email1'];
	    
	    //Encrypt email and see if there is a registered Subscriber already using the email
            $emailEncrypted  = encrypt($email);
	    
	    $query = array( "email" => $emailEncrypted );
	    $result = $collection->find( $query );
	    
	    //If Subscriber is already registered 
	    if ($result->hasNext())
		{
		    //TODO - Send error message to user, return to newSubscriber.html
		    echo "email address is already in use";
		}
	    else 
		{
		    //If Unique Subscriber is not already in DB, create it
		    $subscriberID = createSubscriber($firstName, $lastName, $email, $password);
		    echo "subscriberID: ";
		    echo $subscriberID;

		    //If Subscriber was successfully created, redirect to subscriberConsole.html with subscriberID. 
		    if ($subscriberID == null)
			{
			    //TODO send notification error message to user, return to newSubscriber.html
			    echo "error when creating subscriber";
			}
		    else
			{
			    //TODO ReDirect to subscriberConsole.html with Subscriber ID
			    header('Location: http://localhost/subscriberConsole.php?subscriberID=' . $subscriberID . "&firstName=" . $firstName );
			}
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
    
?>