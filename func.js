var jsonData;
var zmcode;
$('#btn').click(function() {
    $('#weatherarea').empty();
    let data;
    let cityname =$('#cityname').val();
    console.log(cityname)
    $.getJSON("https://api.wunderground.com/api/10a334466f8c5e10/geolookup/conditions/forecast/q/"+cityname+".json", function(data, status){
        this.data = data;
        console.log(data);
        jsonData = data;
        if(data.response.results instanceof Array){
            console.log("there are more cities of the same name")
            $("#weatherarea").append("<p id=\"sevinf\">There are more cities of the same name.\n</p>")
            let i=0;
            data.response.results.forEach(element => {
                let txt = "<p class=\"winfo\">Did you mean: "+element.city+" in <a href=\"javascript:void(0);\" id=\"newsearch\" >"+element.state+"</a>\n?</p>"
                $("#sevinf").after(txt)

            }
    );
        } else if(data.response.error != null ||typeof $('#cityname').val() == 'number' || data == null) {
            let txt = "<p class=\"winfo\">No cities match your search query</p>"
            $("#weatherarea").append(txt)
        }else {
            let txt = "<p class=\"winfo\">Weather in "+data.location.city+" is "+data.current_observation.temp_c+"*C</p>"
            $("#weatherarea").append(txt)
        }
            
        
    });

});
//TO DO: przerobic klik na wyszukane miasto wielokrotne aby obpytywalo api po miescie i state
    jQuery(function ($) {
        $(document).on("click", "a#newsearch", function () {
            $('#weatherarea').empty();
            console.log(jsonData);
            let statename = $(this).text();
            console.log(statename)
           jsonData.response.results.forEach(element => {
            if(element.state === statename){
                zmcode = element.zmw;
                console.log(zmcode)
            }
           
           });
           $.getJSON("https://api.wunderground.com/api/10a334466f8c5e10/geolookup/conditions/forecast/q/zmw:"+zmcode+".json", function(data, status){
            this.data = data;
            console.log(data)
            if(data.response.results instanceof Array){
                console.log("there are more cities of the same name")
                $("#weatherarea").append("<p id=\"sevinf\">There are more cities of the same name.\n</p>")
                let i=0;
                data.response.results.forEach(element => {
                    let txt = "<p class=\"winfo\">Did you mean: "+element.city+" in <a href=\"javascript:void(0);\" id=\"newsearch\" >"+element.state+"</a>\n?</p>"
                    $("#sevinf").after(txt)
    
                }
        );
            } else {
                let txt = "<p class=\"winfo\">Temperature in "+data.location.city+","+data.location.state+","+data.location.country+" is "+data.current_observation.temp_c+"*C</p>"
                $("#weatherarea").append(txt)
            }
       
           });
            
        });
    });