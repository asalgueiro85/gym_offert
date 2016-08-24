angular.module('controllers').controller('StaticController', function($http, $scope, $location, MyService, $state) {

    $.getJSON("../media/cities.php", function (json) {
        //console.info(utf8_encode(json[5].text)  );

        data = json;
        $("#select-city-funciona").select2({
            placeholder: "Ciudades",
            allowClear: true,
            data: json
        });
        $('b[role="presentation"]').hide();
        $('.select2-selection__arrow').append('<div style="padding-top: 5px;"> <span class="icon-localidad color-fe5923"></span> </div>');
        //$('#map').height($('#brother-map').height());

    });

    $('select').select2()
        .on("change", function (e) {
            //if(flag !=1) {
            $state.go('gimnasios-ciudades',{city: this.value});

            //}
            //flag ++;
        });
    //
    //$(".js-example-basic-single").select2();
    //$('b[role="presentation"]').hide();
    //$('.select2-selection__arrow').append('<img class="" src="img/select.png">');

});