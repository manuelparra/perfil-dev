function loadfunctions() {
    // after the page load, we charged all this functions

    function goToByScroll(id){
        // Reove "link" from the ID

        id = id.replace("_scroll", "");

        // Scroll
        $('html, body').animate({
            scrollTop: $("#"+id).offset().top
        }, 1000);
    }

    $("#navbarText > ul > li > a").click(function(e) {
            // Prevent a page reload when a link is pressed
            if ($(this).attr('href').slice(0, 1) == "#") {
                e.preventDefault();

                // Call the scroll function
                goToByScroll($(this).attr("id"));
            }
    });

    $("a.btn-contactame").click(function(e) {
            // Prevent a page reload when a link is pressed
            e.preventDefault();
            // Call the scroll function
            goToByScroll($(this).attr("id"));
    });

    $("a.goto-next").click(function(e) {
            // Prevent a page reload when a link is pressed
            e.preventDefault();
            // Call the scroll function
            goToByScroll($(this).attr("id"));
    });
}

window.addEventListener('load', loadfunctions, false);
