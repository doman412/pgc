<?php 
/*
php API to interface with the DB

**API reference***

//Abstract Mongo Functions
name                              param                                          returns on success/fail     tested?

addSingleDocument     ($mongoDB, $mongoCollection, $document)                           _id / 0                 yes
getSingleDocument     ($mongoDB, $mongoCollection, $query)                         document / 0                 yes           
deleteSingleDocument  ($mongoDB, $mongoCollection, $query)                                1 / 0                 yes

//Clitter Specific Functions

createSubscriber    ($firstName, $lastName, $type, $email, $password)                   _id / 0                 yes
getSubscriber       ($subscriberID)                                                document / 0                 yes
createPublisher     ($firstName, $lastName, $type, $email, $password, $subscriberID)    _id / 0                 yes
getPublishers       not tested
createClient        not tested
getClient           not tested
createAd            tested
getAds              tested
createSubscription  not tested
getSubscription     not tested
publisherLogin      not tested
subscriberLogin     tested
encrypt             tested
decrypt             tested

*/


function createSubscriber($firstName, $lastName, $type, $email, $password)
{
    //Encrypt Everything
    $emailEncrypted      = encrypt($email);
    $passwordEncrypted   = encrypt($password);

    //Create document and insert into subscriber collection
    $document = array("firstName" => $firstName, "lastName" => $lastName, "type" => $type, "password" => $passwordEncrypted, "email" => $emailEncrypted);
    $subscriberID = addSingleDocument('clitter', 'subscribers', $document);

    return $subscriberID;
}

function getSubscriber($subscriberID)
{
    $query = array('_id' => new MongoId($subscriberID));
    $document = getSingleDocument('clitter', 'subscribers', $query);
    return $document;
}


function createPublisher($firstName, $lastName, $email, $password, $subscriberID)
{
    //Encrypt Everything
    $emailEncrypted      = encrypt($email);
    $passwordEncrypted   = encrypt($password);

    //Create document and insert into publisher collection
    $document = array("firstName" => $firstName, "lastName" => $lastName, "password" => $passwordEncrypted, "email" => $emailEncrypted, "subscriberID" => $subscriberID);
    $publisherID = addSingleDocument('clitter', 'publishers', $document);
    
    return $publisherID;
}

function getPublishers($subscriberID)
{
    $mongo = new MongoClient();
    $db = $mongo->clitter;
    $collection = $db->publishers;

    $query = array('subscriberID' => $subscriberID);
    $cursor = $collection->find($query);
    return $cursor;
}

function deletePublisher($publisherID)
{
    $mongo = new MongoClient();
    $db = $mongo->clitter;
    $collection = $db->publishers;

    $query = array('_id' => new MongoId($publisherID));
    $collection->remove($query);
}

function createClient($clientPhoneID)
{
    //Get client collection from Mongo
    $mongo = new MongoClient();
    $db = $mongo->clitter;
    $collection = $db->clients;

    //Encrypt Everything
    $clientPhoneIDEncrypted = encrypt($clientPhoneID);

    //Create document and insert into client collection
    $document = array("clientPhoneID" => $clientPhoneIDEncrypted);
    $collection->insert($document);

    //Retrieve newly created client ID and Return it
    $query = array ('clientPhoneID' => $clientPhoneIDEncrypted);
    $result = $collection->findOne( $query );
    if(empty($result))
        {
            $clientID = 0;
        }
    else
        {
            $clientID = $result["_id"];
        }
    return $clientID;
}

function createAd($title, $description, $picture, $startDate, $endDate, $subscriberID)
{
    $mongo = new MongoClient();
    $db = $mongo->clitter;
    $collection = $db->ads;

    //Create document and insert into subscriber collection
    $document = array("title" => $title, "description" => $description, "picture" => $picture, "startDate" => $startDate, "endDate" => $endDate, "subscriberID" => $subscriberID);
    $collection->insert($document);

    //Retrieve newly created ad ID and Return it
    $query = array("title" => $title, "description" => $description, "startDate" => $startDate, "endDate" => $endDate, "subscriberID" => $subscriberID);
    $result = $collection->findOne( $query );
    if(empty($result))
        {
            $adID = 0;
        }
    else
        {
            $adID = $result["_id"];
        }
    return $adID;
}

function getAds($subscriberID){
    $mongo = new MongoClient();
    $db = $mongo->clitter;
    $collection = $db->ads;
    
    $query = array('subscriberID' => $subscriberID);
    $cursor = $collection->find($query);
    return $cursor;
}


function subscriberLogin($email, $password)
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

function publisherLogin($email, $password)
{

    //Get publisher collection from Mongo
    $mongo = new MongoClient();
    $db = $mongo->clitter;
    $collection = $db->publishers;

    //Encrypt Email and password to try to find a match
    $emailEncrypted      = encrypt($email);
    $passwordEncrypted   = encrypt($password);

    //Create document and insert into subscriber collection
    $query = array('email' => $emailEncrypted, 'password' => $passwordEncrypted);
    $result = $collection->findOne( $query );

    //If the query returned no results
    if(empty($result))
        {
            $publisherID = 0;
        }
        else
        {
            $publisherID = $result['_id'];
        }
        return $publisherID;
}

function addSingleDocument($mongoDB, $mongoCollection, $document)
{
    $mongo = new MongoClient('mongodb://localhost/');
    $db = $mongo->$mongoDB;
    $collection = $db->$mongoCollection;

    //Check if the document is already in the collection
    $result = $collection->findOne($document);
    if(empty($result))
        {
            $collection->insert($document);
	    $result = $collection->findOne($document);
	    return $result['_id'];
        }
	else
        {
            return 0;
        }

}

function getSingleDocument($mongoDB, $mongoCollection, $query)
{
    $mongo = new MongoClient();
    $db = $mongo->$mongoDB;
    $collection = $db->$mongoCollection;

    //Check if the query returns anything
    $result = $collection->findOne($query);
    if(empty($result))
        {
            return 0;
        }
        else
        {
	    return $result;
        }
	
}

function deleteSingleDocument($mongoDB, $mongoCollection, $query)
{
    //Get collection from Mongo
    $mongo = new MongoClient();
    $db = $mongo->$mongoDB;
    $collection = $db->$mongoCollection;
    
    //Check if the query returns anything
    $result = $collection->findOne($query);
    if(empty($result))
        {
            return 0;
        }
        else
        {
	    $collection->remove($query, array("justOne" => true));
	    return 1;
        }
}

function encrypt($plainText)
{
//    $strong = true;
//    $key_size = mcrypt_get_key_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CFB);
//    $encryption_key = file_get_contents('key', true);
//    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CFB);
//    $iv = file_get_contents('iv', true);
//
//    $encryptedText = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $encryption_key, $plainText, MCRYPT_MODE_CFB, $iv);
//    $encryptedText = base64_encode($encryptedText);
 
//    return $encryptedText;
    return $plainText;
}

function decrypt($encryptedText)
{
//    $encryption_key = file_get_contents('key', true);
//    $iv = file_get_contents('iv', true);
//    $plainText = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $encryption_key, $encryptedText, MCRYPT_MODE_CFB, $iv);
//    return $plainText;
    return $encryptedText;
}

