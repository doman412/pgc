,<?PHP
//TODO - If add is already created, tell the Subscriber

require_once "formvalidator.php";

if(isset($_POST['Submit']))
{
	$validator = new FormValidator();
	$validator->addValidation("title","req","Please enter a title for your add");
        $validator->addValidation("title","maxlen=20", "Title cannot be longer than 20 characters");
        $validator->addValidation("title","alnum_s", "Title can only contiain alphanumeric characters");
        $validator->addValidation("description","req","Please enter a description for your add");
        $validator->addValidation("description","alnum_s","Descriptions can only contain alphanumeric characters");
	$validator->addValidation("description","maxlen=80", "Description cannot be longer than 80 characters");
	$validator->addValidation("radius", "selone_radio", "Select at least one Radius");
	$validator->addValidation("startDate", "req", "Select a Start Date to run your ad");
        $validator->addValidation("endDate", "req", "Select an End Date to run your ad");
	
	if($validator->ValidateForm())
	{

		//Get MongoDB instance and collection
		$mongo = new MongoClient();
		$db = $mongo->clitter;
		$collection = $db->ads;
		
		//Retrieve and Sanitize Form inputs
		$title       = $_POST['title'];
		$description = $_POST['description'];
		$radius      = $_POST['radius'];
		$stardDate   = $_POST['startDate'];
		$endDate     = $_POST['endDate'];

		echo $radius;
		echo "\n";  echo "\n"; echo $stardDate; echo "\n"; echo "\n"; echo $endDate;


		//Check if this Ad is already in the DB
		$query = array( 'title' => $title, 'description' => $description, 'radius'=> $radius, 'startDate' => $stardDate, 'endDate' => $endDate );
                $result = $collection->find( $query );

                //If Ad is already in the data base, tell the Subscriber
                if ($result->hasNext())
		    {
			echo "already in DB";
			//TODO create notification telling Subscriber duplicate ad.
		    }
		else 
		    {
			$document = array( 'title' => $title, 'description' => $description, 'radius'=> $radius, 'startDate' => $stardDate, 'endDate' => $endDate );
                        $collection->insert($document);
			//TODO create notification with Ad confirmation and Ad ID.
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