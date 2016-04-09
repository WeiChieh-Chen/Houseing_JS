<?php 
 header("Access-Control-Allow-Origin: http://localhost ");
   // header("Content-Type: application/json");
 ?>
<html>
   <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
      <meta charset="utf-8">
      <base href="<?php //echo base_url();?>">
      <!-- css 檔案連結 -->
      <link rel="stylesheet" type="text/css" href="<?=base_url("css/bootstrap.css")?>" />
      <link rel="stylesheet" type="text/css" href="<?=base_url("css/main.css")?>" />
      <!-- <script src="js/bootstrap-checkbox.js"/> -->
      <!-- <link rel="stylesheet" type="text/css" media="screen" href="css/bootstrap-checkbox.css"> -->
      <!-- javascript 檔案連結 -->
      <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
      <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&libraries=places"></script>
      <script src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/src/markerclusterer.js"></script>
      <script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>
      <title>雲端租屋生活APP</title>

   </head>
   <body>
      <div class="navbar navbar-default navbar-static-top" role="navigation">
         <div class="container">
            <div class="navbar-header">

                     <img class="top-logo" src="<?=base_url("img/Header.png")?>"/>
                             <!--目錄-->
               <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
               </button>
               <!--左邊列表-->
               <p class="pull-left">
                  <button type="button" class="navbar-toggle" data-toggle="offcanvas">
                  <img border="0" src="http://maselab318.ddns.net/bikelife/bikebook/image/icon/search.png">
                  </button>
               </p>

            </div>

            <div class="navbar-collapse collapse">
               <ul class="nav navbar-nav navbar-right">
                  <li><a class=""href="<?php echo base_url();?>">租屋資訊</a></li>
                  <li><a class=""href="<?php echo base_url('campus');?>">生活一點靈</a></li>
                  <li><a class=""href="<?php echo base_url('security');?>">安全專區</a></li>
               </ul>
            </div>
         </div>
      </div>
         <div class="container-fluid map-container">
         <div class="row row-offcanvas row-offcanvas-left">
