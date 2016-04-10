<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript">


// $.getJSON("Latlng.json",function(results) {
//     $.each(results,function(i) {
//         console.log(results[i].Address);
//     })
// })

$.ajax({
    url: "Latlng.json",
    type: "POST",
    data: "json",
    catch: false,

    success: function(results){
        $(results).each(function(i) {
            console.log(results[i].Address);
        })
    },
    error: function() {
        console.log("not found");
    }

})

</script>