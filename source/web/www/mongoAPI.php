<?php 

//php API to interface with the DB


//createSubscriber returns Subscriber ID on success, on fail returns 0
function createSubscriber($firstName, $lastName, $email, $password)
{
    //Get subscriber collection from Mongo
    $mongo = new MongoClient();
    $db = $mongo->clitter;
    $collection = $db->subscribers;
    
    //Encrypt Everything
    $firstNameEncrypted = encrypt($firstName);
    $lastNameEncrypted   = encrypt($lastName);
    $emailEncrypted      = encrypt($email);
    $passwordEncrypted   = encrypt($password);

    //Create document and insert into subscriber collection
    $document = array("firstName" => $firstNameEncrypted, "lastName" => $lastNameEncrypted, "password" => $passwordEncrypted, "email" => $emailEncrypted);
    $collection->insert($document);

    //Retrieve newly created subscriber ID and Return it
    $query = array ('email' => $emailEncrypted);
    $cursor = $collection->find( $query );
    foreach($cursor as $document) 
    {
	$subscriberID = $document["_id"];
    }
    return $subscriberID;
}

function login($email, $password)
{

    //Get subscriber collection from Mongo
    $mongo = new MongoClient();
    $db = $mongo->clitter;
    $collection = $db->subscribers;
    
    //Encrypt Email and password to try to find a match 
    $emailEncrypted      = encrypt($email);
    $passwordEncrypted   = encrypt($password);

    //Create document and insert into subscriber collection
    $query = array('email' => $emailEncrypted, 'password' => $passwordEncrypted);
    $result = $collection->findOne( $query );

    //If the query returned no results
    if(empty($result))
	{
	    $subscriberID = 0;
	}
	else
	{
	    $subscriberID = $result['_id'];
	}

	return $subscriberID;
}



function encrypt($plainText)
{
    $strong = true;
    $key_size = mcrypt_get_key_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CFB);
    $encryption_key = file_get_contents('key', true);
    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CFB);
    $iv = file_get_contents('iv', true);
    $encryptedText = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $encryption_key, $plainText, MCRYPT_MODE_CFB, $iv);    
    //echo "Before base64: " . $encryptedText;
    $encryptedText = base64_encode($encryptedText);
    //echo "After base64: " . $encryptedText;
    return $encryptedText;
}

