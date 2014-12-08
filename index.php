<?php $title="TOS game" ?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title><?= $title ?></title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="css/main.css">


<link href='//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>

<!-- jquery CDN -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css" />
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>

<!-- Bootstrap CDN -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>

<script src="javascript/keyboard.js"></script>
<script src="javascript/ajax.js"></script>

</head>
<body class="php">
     <!--image preloading-->
     <?php 
        $directory = "images/stickman";
        foreach(glob($directory.'/*.*') as $file) {
            echo "<img class='hidden' src='".$file."' />";
        }
     ?>
    <div class="container">
      <div class="header">
        <nav>
          <ul class="nav nav-pills pull-right">
            <li role="presentation" class="active"><a href="#">Home</a></li>
            <li role="presentation"><a href="https://github.com/koding/global.hackathon/blob/master/Teams/MoeABM/ABOUT.md">About</a></li>
            <li role="presentation"><a href="https://github.com/moeabm">Contact</a></li>
          </ul>
        </nav>
        <h3 class="text-muted">MoeABM</h3>
      </div>

      <div class="jumbotron">
        <div class="gamearea" id="gamearea">
            <a class="btn btn-lg btn-primary" id="skip" href="#" onclick="startGame(); return false;" role="button">Skip</a>
            <div class="curtain" id="curtain"></div> 
        
            <!--Landscape-->
            <div class="skyfar" id='skyBG1'><img class="hidden" src="https://www.blueskyexhibits.com/website/wp-content/uploads/sky-home.jpg" /></div>
            <div class="sky hidden" id='skyBG2'><img src="images/clouds_quarter_scale.png" /></div>
            <div class="ground ground-base-left" id='ground-base-left'><img class="hidden" src="" /></div>
            <div class="static hidden" id='ground-base-right'><img src="" /></div>
            <div class="ground" id='spikes'><img src="images/spikes.png" /></div>
            <div class="ground" id='spikes' style="left: 1020px"><img src="images/spikes.png" /></div>
            
            
            <!--GUI -->
            <div class="GUI clock" id="clock"></div>
            <div class="GUI progress-container" > <div id="progress"></div></div>
            <div class="GUI skipped-chars" id="skipped-chars">Failed: <span id="value">0</span></div>
            
            
            <div class="marker" id="deathLine"></div>
            <div class="runner ground" id="runner"><img src="images/stickman/run0.png" /><div id="dialog">HINT!!!</div></div>
                <div class="ground" id="pretext">=============================================================================</div>
                <div class="playertext ground" id="playertext"><textarea rows="1" cols="40"></textarea></div>
            <div class="text" id="text">
                <div class="gametext ground" id="gametext"></div>
                
            </div>
        </div>
        <h1><?= $title ?></h1>
        
        <p class="lead">Type your way to (legal) safety.</p>
        
        <div id="previewarea"></div>
        
        <p class="hidden">
        <input type="text" id="URL" value="sampleTOS.txt" />
        <a class="btn btn-lg btn-primary" href="#" onclick="getURLTOS();" role="button">Get URL</a></p>
        <p><a class="btn btn-lg btn-success" href="#"  onclick="resetGame();" role="button">Start over</a></p>
        
      </div>

      <div class="row marketing hidden" >
        <div class="col-lg-6">
          <h4>Subheading</h4>
          <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>

          <h4>Subheading</h4>
          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>

          <h4>Subheading</h4>
          <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
        </div>

        <div class="col-lg-6">
          <h4>Subheading</h4>
          <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>

          <h4>Subheading</h4>
          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>

          <h4>Subheading</h4>
          <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
        </div>
      </div>

      <footer class="footer">
        <p>&copy; MoeABM 2014</p>
      </footer>

    </div> <!-- /container -->
</div>

</body>
</html>