    <script type="text/javascript">
	function showAjaxModal(url,title)
	{
		title = title || '';
       
		// SHOWING AJAX PRELOADER IMAGE
		jQuery('#modal_ajax .modal-body').html('<div style="text-align:center;">Loading...</div>');
        jQuery('#modal_ajax .modal-title').html(title);

		// LOADING THE AJAX MODAL
		jQuery('#modal_ajax').modal({backdrop: 'static', keyboard: false}, 'show');

		// SHOW AJAX RESPONSE ON REQUEST SUCCESS
		$.ajax({
			url: url,
			success: function(response)
			{
				jQuery('#modal_ajax .modal-body').html(response);
			}
		});
		
	}    
	</script>

    <!-- (Ajax Modal)-->

<div class="modal animated zoomIn" id="modal_ajax" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="title modal-title" id="defaultModalLabel">&nbsp;</h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
            </div>
            <div class="modal-body">
                
            </div>            
        </div>
    </div>
</div>