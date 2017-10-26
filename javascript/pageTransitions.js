$(document).ready(function() {
	$(".contentContainer").css('display', 'none');

    $(".contentContainer").velocity("fadeIn", { duration: 500 })
 
    $("a.transition").click(function(event){
        event.preventDefault();
        linkLocation = this.href;
        $(".contentContainer").velocity("fadeOut", { duration: 500,
        								complete: redirectPage });      
    });
         
    function redirectPage() {
        window.location = linkLocation;
    }
});
