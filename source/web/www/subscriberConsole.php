<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Clitter</title>
    <meta name="viewport" content="user-scalable=no,initial-scale = 1.0,maximum-scale = 1.0">
    <link rel="icon" type="image/png" href="images/clitterFavicon.ico">
    <link rel="stylesheet" type="text/css" href="topcoat/css/topcoat-desktop-dark.css">
    <link rel="stylesheet" type="text/css" href="topcoat/css/main.css">
    <link rel="stylesheet" type="text/css" href="topcoat/css/brackets.css">
    <script src="js/gen_validatorv4.js" type="text/javascript"></script>
  </head>
  <body class="dark">
        <header id="main-header">
          <div class="max-width">
            <hgroup>
              <h1>Clitter</h1>
              <p>Satisfy all your Entertainment needs</p>
            </hgroup>
            <nav>
              <ul>
                <li class="selected"><a href="http://localhost/index.html">Home</a></li>
                <li class="selected"><a href="http://localhost/login.html">Login</a></li>
                <li class="selected"><a href="http://localhost/blog.html">News</a></li>
              </ul>
            </nav>
          </div>
        </header>

	<div id="content" class="max-width">
	  <header>
            <h2>
	      <?php
		 echo "Hello " . $_GET["firstName"];
		 ?>
	    </h2>
          </header>
	  <form action="http://localhost/createAd.html">
              <input type="submit" class="topcoat-button--large--cta"  value="Create an Ad">
	  </form>
	</div>

	<script src="//use.edgefonts.net/source-sans-pro:n3,n4,n6;source-code-pro:n3.js"></script>
  </body>
</html>
