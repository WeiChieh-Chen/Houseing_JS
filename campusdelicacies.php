<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>

<?php
   $this->load->view('header');
   $this->load->view('rentinfo');

?>
<!-- <div class="col-xs-12 col-sm-9" id="map-content">
    <img class='img-responsive' src='<?php echo base_url('img/4Q4.gif'); ?>'></img>
</div> -->
   <script type="text/javascript"> var pages = <?= $pages ?></script>
      <div class="col-xs-10 col-sm-7" id="map-content">
         <div id="map-canvas"></div>

         <div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
               <div class="modal-content">
               </div>
            </div>
         </div>
      </div>
    <div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar-search" role="navigation">
        <form role="form" id="formSearch">
            <div class="sidebar-right well sidebar-nav">
                    <div class="form-group">

                    </div>
            </div>
        </form>
    </div>

<?php
	$this->load->view('footer');
?>
