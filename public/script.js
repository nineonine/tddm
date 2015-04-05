<script>
$(document).ready(function() {
  file_selected = false;

  $('#uploadForm').submit(function() {

    
    if(file_selected) {
      console.log("DEBUG")
      $(this).ajaxSubmit({

        error: function(xhr) {
          status('Error: ' + xhr.status);
        },

        success: function(response) {
          console.log(response);

        }
      });
      //Very important line, it disable the page refresh.
      return false;

    }

  });    

});
</script>