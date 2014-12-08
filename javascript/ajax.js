function getURLTOS(){
    $.ajax({
      url: $("#URL").val(),
      cache: false,
    })
      .done(function( txt ) {
        console.log( txt );
        setGameText(txt);
    }).fail( function(data, status, error){
        console.log( txt );
        setGameText(txt);     
    });
    return false;
}