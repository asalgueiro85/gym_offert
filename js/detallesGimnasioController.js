angular.module('controllers').controller('DetallesGimnasioController', function ($http, $scope, $location, MyService, $stateParams,  $compile, $rootScope, $state) {

    $('#map-gym').height($(window).height() - 60);
    $('#brother-map-gym-container').height($(window).height() - 145);

    $scope.videoLabel = 'Video';
    $("body").css('overflow','hidden');
    console.info($stateParams.gym);
    if ($stateParams.gym != null)
        $rootScope.gym = $stateParams.gym;
    else
        $rootScope.gym = 'Gimnasio4';

    $scope.gymOrigim = $rootScope.gym;
    if($rootScope.city != null)
    $scope.frompage = $rootScope.city;
    else
    $scope.frompage = 'Madrid';
//({city: 'Madrid'})
    var posFlag = -1;

    //$rootScope.breadCrumb = []; //borrar
    for (var i = 0; i < $rootScope.breadCrumb.length; i++) {
        if ($rootScope.breadCrumb[i].text == $scope.gymOrigim) {console.info('entra bread');
            posFlag = i;
            break;
        }
        //(i > posFlag) &&

    }
    console.info(posFlag);

    //$('#video-gym').click(function(){this.paused?this.play():this.pause();});

    if ((posFlag != -1)) {
        $rootScope.breadCrumb.splice(posFlag, $rootScope.breadCrumb.length - posFlag)
    }

    var cityBreadCrumb = {text: $scope.gymOrigim, dir: "detalles-gimnasio({gym: \""+$scope.gymOrigim+"\"})"};
    $rootScope.breadCrumb.push(cityBreadCrumb);
    $scope.breadCrumb = $rootScope.breadCrumb;

    $scope.video = 0;
    $scope.cuponId = -1;

    $scope.activity = false;
    $scope.gym = true;
    $scope.horario = true;
    $scope.services = true;
    $scope.buildings = true;

    $scope.conditions = -1;
    $scope.span_conditions = -1;

    $scope.activeValue = 'activity';

    $scope.showConditions = function(index)
    {
        $scope.conditions = index;
        $scope.span_conditions = index;
        $scope.span_conditions_show = index;
    }
    $scope.hideConditions = function(index)
    {
        $scope.conditions = -1;
        $scope.span_conditions = -1;
        $scope.span_conditions_show = -1;
    }
    $scope.changeInfo = function( element){

//console.info($event.currentTarget);
        //$(".div").removeClass("div-button-active");
        // $(".tab").addClass("active"); // instead of this do the below
        //$event.currentTarget.removeClass("div-button");
        //$event.currentTarget.addClass("div-button-active");
$scope.activeValue = element;
        switch (element){
            case 'gym':
                $scope.activity = true;
                $scope.gym = false;
                $scope.horario = true;
                $scope.services = true;
                $scope.buildings = true;
                $scope.video = 0;
                $('#video-gym').get(0).pause();
                $scope.videoLabel = 'Video';
                break;
            case 'horario':
                $scope.activity = true;
                $scope.gym = true;
                $scope.horario = false;
                $scope.services = true;
                $scope.buildings = true;
                $scope.video = 0;
                $('#video-gym').get(0).pause();
                $scope.videoLabel = 'Video';
                break;
            case 'services':
                $scope.activity = true;
                $scope.gym = true;
                $scope.horario = true;
                $scope.services = false;
                $scope.buildings = true;
                $scope.video = 0;
                $('#video-gym').get(0).pause();
                $scope.videoLabel = 'Video';
                break;
            case 'buildings':
                $scope.activity = true;
                $scope.gym = true;
                $scope.horario = true;
                $scope.services = true;
                $scope.buildings = false;
                $scope.video = 0;
                $('#video-gym').get(0).pause();
                $scope.videoLabel = 'Video';
                break;
            case 'video':
                if($scope.videoLabel == 'Video'){
                    $scope.video = 1;
                    $('#video-gym').get(0).play();
                    $scope.videoLabel = 'Fotos';
                }else{
                    $scope.video = 0;
                    $('#video-gym').get(0).pause();
                    $scope.videoLabel = 'Video';
                }
                $scope.activity = true;
                $scope.gym = true;
                $scope.horario = true;
                $scope.services = true;
                $scope.buildings = true;



                break;
            default :
                $scope.activity = false;
                $scope.gym = true;
                $scope.horario = true;
                $scope.services = true;
                $scope.buildings = true;
                $scope.video = 0;
                $('#video-gym').get(0).pause();
                $scope.videoLabel = 'Video';
        }
    }

    $scope.ofertaId = function(id){
        console.info(id);
        $scope.cuponId = id;
    }
    $scope.loadCupon = function() {
        console.info('modal');
        $('#myModal').modal('toggle');
        window.setTimeout(slowModal, 500);
    }
    function slowModal() {
        $('#myModal1').modal('toggle');
    }

        $scope.functionModal = function(){
            console.info('modal');
            $('#myModal1').modal('hide');
        }

    //$('select').select2()
    //    .on("change", function (e) {
    //        //if(flag !=1) {
    //        $rootScope.city = this.value;
    //        $state.go('gimnasios-ciudades',{city: this.value});
    //
    //        //}
    //        //flag ++;
    //    });

    $scope.refreshPage = function(name){
        actBreadCrumbs();
        $state.go('detalles-gimnasio',{gym: name});
    }

    var map, infowindow = null;
    var allMarkers = [];
    var flag = 1;

    var data;
    $.getJSON("media/cities.php", function (json) {
        //console.info(utf8_encode(json[5].text)  );

        data = json;
        $("#select-city-select").select2({
            placeholder: "Ciudades",
            allowClear: true,
            data: json
        });
        $('#select-barrios-select').select2({
            placeholder: "Todos los barrios",
            allowClear: true
        });

        $('#select-activity-select').select2({
            placeholder: "Todas las actividades",
            allowClear: true
        });

        $('#select-gym-select').select2({
            placeholder: "Todos los gimnasios",
            allowClear: true
        });

        $('b[role="presentation"]').hide();

        var select_city = $('#select-city').children(':nth-child(2)').children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(2)');
        select_city.append('<div style="padding-top: 8px;"> <span class="icon-localidad "></span> </div>');

        var select_barrio = $('#select-barrios').children(':nth-child(2)').children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(2)');
        select_barrio.append('<div style="padding-top: 8px;"> <span class="icon-barrio "></span> </div>');

        var select_activity = $('#select-activity').children(':nth-child(2)').children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(2)');
        select_activity.append('<div style="padding-top: 8px;"> <span class="icon-actividadesmenu "></span> </div>');

        var select_gym = $('#select-gym').children(':nth-child(2)').children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(2)');
        select_gym.append('<div style="padding-top: 8px;"> <span class="icon-gimnasios "></span> </div>');

        //style in select2 change
        $('.select2').css('height', '40px');
        $('.selection').css('height', '38px');
        $('.select2-selection').css('height', '38px');
        $('.select2-selection__rendered').css('padding-top', '5px');

        $("#select-city-select").val($scope.frompage).change();

    });
    var gimnasios = [
        {
            img: ['1.jpg', '2.jpg', '3.jpg'],
            name: 'Gimnasio1',
            text: 'Ofcourse you do, and yes, there are many great carousel plugins out there. They offer a host of features and many are so customizable that you are limited only by your imagination.',
            city: 'Barcelona',
            barrio: 'Barrio ejemplo',
            price: 22,
            lat: 41.4097751,
            long: 2.153920200000016,
            lat_city: 41.38506389999999,
            long_city: 2.1734034999999494,
            activity: ['Spinning1', 'Yoga1', 'Karate1', 'Zumba1', 'Pilates1', 'Otro1'],
            buildings: ['Instalacion1', 'Instalacion12', 'Instalacion13', 'Instalacion14', 'Instalacion15', 'Instalacion16'],
            services: ['Servicio1', 'Servicio12', 'Servicio13', 'Servicio14', 'Servicio15', 'Servicio16'],
            horario: ['Lunes a Viernes de 8:00 a 22:30', 'Sábado: 09:00 a 14:00', 'Domingo: Cerrado'],
            ofertas:[
                {
                    id:'1',
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'2',
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'3',
                    nombre:'Nombre oferta 3',
                    img:'3.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                }
            ]
        }, {
            img: ['4.jpg', '5.jpg', '6.jpg'],
            name: 'Gimnasio2',
            text: 'Ofcourse you do, and yes, there are many great carousel plugins out there. They offer a host of features and many are so customizable that you are limited only by your imagination.',
            city: 'Barcelona',
            barrio: 'Barrio ejemplo',
            price: 23,
            lat: 41.3903033,
            long: 2.109121400000049,
            lat_city: 41.38506389999999,
            long_city: 2.1734034999999494,
            activity: ['Spinning2', 'Yoga2', 'Karate2', 'Zumba2', 'Pilates2', 'Otro2'],
            buildings: ['Instalacion2', 'Instalacion22', 'Instalacion23', 'Instalacion24', 'Instalacion25', 'Instalacion26'],
            services: ['Servicio2', 'Servicio22', 'Servicio23', 'Servicio24', 'Servicio25', 'Servicio26'],
            horario: ['Lunes a Viernes de 8:00 a 22:30', 'Sábado: 09:00 a 14:00', 'Domingo: Cerrado'],
            ofertas:[
                {
                    id:'4',
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos. ',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'5',
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'6',
                    nombre:'Nombre oferta 3',
                    img:'3.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                }
            ]
        }, {
            img: ['7.jpg', '8.jpg', '9.jpg'],
            name: 'Gimnasio3',
            text: 'Ofcourse you do, and yes, there are many great carousel plugins out there. They offer a host of features and many are so customizable that you are limited only by your imagination.',
            city: 'Barcelona',
            barrio: 'Barrio ejemplo',
            price: 24,
            lat: 41.430246,
            long: 2.189836199999945,
            lat_city: 41.38506389999999,
            long_city: 2.1734034999999494,
            activity: ['Spinning3', 'Yoga3', 'Karate3', 'Zumba3', 'Pilates3', 'Otro3'],
            buildings: ['Instalacion3', 'Instalacion32', 'Instalacion33', 'Instalacion34', 'Instalacion35', 'Instalacion36'],
            services: ['Servicio3', 'Servicio32', 'Servicio33', 'Servicio34', 'Servicio35', 'Servicio36'],
            horario: ['Lunes a Viernes de 8:00 a 22:30', 'Sábado: 09:00 a 14:00', 'Domingo: Cerrado'],
            ofertas:[
                {
                    id:'7',
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'8',
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'9',
                    nombre:'Nombre oferta 3',
                    img:'3.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                }
            ]
        }, {
            img: ['10.jpg', '12.jpg', '11.jpg'],
            name: 'Gimnasio4',
            text: 'Ofcourse you do, and yes, there are many great carousel plugins out there. They offer a host of features and many are so customizable that you are limited only by your imagination.',
            city: 'Madrid',
            barrio: 'Barrio ejemplo',
            price: 25,
            lat: 40.4226162,
            long: -3.6976649000000634,
            lat_city: 40.4167754,
            long_city: -3.7037901999999576,
            activity: ['Spinning4', 'Yoga4', 'Karate4', 'Zumba4', 'Pilates4', 'Otro4'],
            buildings: ['Instalacion4', 'Instalacion42', 'Instalacion43', 'Instalacion44', 'Instalacion45', 'Instalacion46', 'Instalacion47', 'Instalacion48', 'Instalacion49', 'Instalacion50', 'Instalacion51'],
            services: ['Servicio4', 'Servicio42', 'Servicio43', 'Servicio44', 'Servicio45', 'Servicio46'],
            horario: ['Lunes a Viernes de 8:00 a 22:30', 'Sábado: 09:00 a 14:00', 'Domingo: Cerrado'],
            ofertas:[
                {
                    id:'10',
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'11',
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'12',
                    nombre:'Nombre oferta 3',
                    img:'3.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                }
            ]
        }, {
            img: ['1.jpg', '2.jpg', '3.jpg'],
            name: 'Gimnasio5',
            text: 'Ofcourse you do, and yes, there are many great carousel plugins out there. They offer a host of features and many are so customizable that you are limited only by your imagination.',
            city: 'Madrid',
            barrio: 'Barrio ejemplo',
            price: 26,
            lat: 40.4344286,
            long: -3.7131782000000157,
            lat_city: 40.4167754,
            long_city: -3.7037901999999576,
            activity: ['Spinning5', 'Yoga5', 'Karate5', 'Zumba5', 'Pilates5', 'Otro5'],
            buildings: ['Instalacion5', 'Instalacion52', 'Instalacion53', 'Instalacion54', 'Instalacio55', 'Instalacion56'],
            services: ['Servicio5', 'Servicio52', 'Servicio53', 'Servicio54', 'Servicio55', 'Servicio56'],
            horario: ['Lunes a Viernes de 8:00 a 22:30', 'Sábado: 09:00 a 14:00', 'Domingo: Cerrado'],
            ofertas:[
                {
                    id:'13',
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'14',
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'15',
                    nombre:'Nombre oferta 3',
                    img:'3.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                }
            ]
        }, {
            img: ['7.jpg', '8.jpg', '9.jpg'],
            name: 'Gimnasio6',
            text: 'Ofcourse you do, and yes, there are many great carousel plugins out there. They offer a host of features and many are so customizable that you are limited only by your imagination.',
            city: 'Madrid',
            barrio: 'Barrio ejemplo',
            price: 27,
            lat: 40.34676659999999,
            long: -3.827773200000024,
            lat_city: 40.4167754,
            long_city: -3.7037901999999576,
            activity: ['Spinning6', 'Yoga6', 'Karate6', 'Zumba6', 'Pilates6', 'Otro6'],
            buildings: ['Instalacion6', 'Instalacion62', 'Instalacion63', 'Instalacion64', 'Instalacion65', 'Instalacion66'],
            services: ['Servicio6', 'Servicio62', 'Servicio63', 'Servici64', 'Servicio65', 'Servicio66'],
            horario: ['Lunes a Viernes de 8:00 a 22:30', 'Sábado: 09:00 a 14:00', 'Domingo: Cerrado'],
            ofertas:[
                {
                    id:'16',
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'17',
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'18',
                    nombre:'Nombre oferta 3',
                    img:'3.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                }
            ]
        }, {
            img: ['7.jpg', '8.jpg', '9.jpg'],
            name: 'Gimnasio7',
            text: 'Ofcourse you do, and yes, there are many great carousel plugins out there. They offer a host of features and many are so customizable that you are limited only by your imagination.',
            city: 'Sevilla',
            barrio: 'Barrio ejemplo',
            price: 28,
            lat: 37.40117300000001,
            long: -6.0321883999999955,
            lat_city: 37.3890924,
            long_city: -5.984458899999936,
            activity: ['Spinning7', 'Yoga7', 'Karate7', 'Zumba7', 'Pilates7', 'Otro7'],
            buildings: ['Instalacion2', 'Instalacion22', 'Instalacion23', 'Instalacion24', 'Instalacion25', 'Instalacion26'],
            services: ['Servicio2', 'Servicio22', 'Servicio23', 'Servicio24', 'Servicio25', 'Servicio26'],
            horario: ['Lunes a Viernes de 8:00 a 22:30', 'Sábado: 09:00 a 14:00', 'Domingo: Cerrado'],
            ofertas:[
                {
                    id:'19',
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'20',
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'21',
                    nombre:'Nombre oferta 3',
                    img:'3.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                }
            ]
        }, {
            img: ['4.jpg', '5.jpg', '6.jpg'],
            name: 'Gimnasio8',
            text: 'Ofcourse you do, and yes, there are many great carousel plugins out there. They offer a host of features and many are so customizable that you are limited only by your imagination.',
            city: 'Sevilla',
            barrio: 'Barrio ejemplo',
            price: 29,
            lat: 37.33954140000001,
            long: -5.934189800000013,
            lat_city: 37.3890924,
            long_city: -5.984458899999936,
            activity: ['Spinning8', 'Yoga8', 'Karate8', 'Zumba8', 'Pilates8', 'Otro8'],
            buildings: ['Instalacion2', 'Instalacion22', 'Instalacion23', 'Instalacion24', 'Instalacion25', 'Instalacion26'],
            services: ['Servicio2', 'Servicio22', 'Servicio23', 'Servicio24', 'Servicio25', 'Servicio26'],
            horario: ['Lunes a Viernes de 8:00 a 22:30', 'Sábado: 09:00 a 14:00', 'Domingo: Cerrado'],
            ofertas:[
                {
                    id:'22',
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'23',
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'24',
                    nombre:'Nombre oferta 3',
                    img:'3.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                }
            ]
        }, {
            img: ['10.jpg', '12.jpg', '11.jpg'],
            name: 'Gimnasio9',
            text: 'Ofcourse you do, and yes, there are many great carousel plugins out there. They offer a host of features and many are so customizable that you are limited only by your imagination.',
            city: 'Valencia',
            barrio: 'Barrio ejemplo',
            price: 30,
            lat: 39.5084152,
            long: -0.40673609999998916,
            lat_city: 39.4699075,
            long_city: -0.3762881000000107,
            activity: ['Spinning1', 'Yoga1', 'Karate1', 'Zumba1', 'Pilates1', 'Otro1'],
            buildings: ['Instalacion2', 'Instalacion22', 'Instalacion23', 'Instalacion24', 'Instalacion25', 'Instalacion26'],
            services: ['Servicio2', 'Servicio22', 'Servicio23', 'Servicio24', 'Servicio25', 'Servicio26'],
            horario: ['Lunes a Viernes de 8:00 a 22:30', 'Sábado: 09:00 a 14:00', 'Domingo: Cerrado'],
            ofertas:[
                {
                    id:'25',
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'26',
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'27',
                    nombre:'Nombre oferta 3',
                    img:'3.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                }
            ]
        }, {
            img: ['10.jpg', '12.jpg', '11.jpg'],
            name: 'Gimnasio10',
            text: 'Ofcourse you do, and yes, there are many great carousel plugins out there. They offer a host of features and many are so customizable that you are limited only by your imagination.',
            city: 'Valencia',
            barrio: 'Barrio ejemplo',
            price: 31,
            lat: 39.4128091,
            long: -0.5163311999999678,
            lat_city: 39.4699075,
            long_city: -0.3762881000000107,
            activity: ['Spinning1', 'Yoga1', 'Karate1', 'Zumba1', 'Pilates1', 'Otro1'],
            buildings: ['Instalacion2', 'Instalacion22', 'Instalacion23', 'Instalacion24', 'Instalacion25', 'Instalacion26'],
            services: ['Servicio2', 'Servicio22', 'Servicio23', 'Servicio24', 'Servicio25', 'Servicio26'],
            horario: ['Lunes a Viernes de 8:00 a 22:30', 'Sábado: 09:00 a 14:00', 'Domingo: Cerrado'],
            ofertas:[
                {
                    id:'28',
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'29',
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    id:'30',
                    nombre:'Nombre oferta 3',
                    img:'3.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                }
            ]
        }
    ];


    var cities = [
        {
            city: 'Madrid',
            desc: 'Test',
            lat: 40.4167754,
            long: -3.7037901999999576
        },
        {
            city: 'Barcelona',
            desc: 'Test',
            lat: 41.38506389999999,
            long: 2.1734034999999494
        }
    ];

    var city_center;

    //$('.swiper-button-next').css('background-image', 'url(../img/der.png)');
    //$('.swiper-button-prev').css('background-image', 'url(../img/izk.png)');
    //$('.swiper-button-prev').css('left', '30px');
    //$('.swiper-button-next').css('right', '30px');
    //


    for (var i = 0; i < gimnasios.length; i++) {
        if (gimnasios[i].name == $scope.gymOrigim) {
            $scope.gimnasio = gimnasios[i];
            var swiper = new Swiper(document.getElementById('swiper-gym'), {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                effect: 'fade',
                simulateTouch: false,
                speed: 10,
                grabCursor: false,
                nextButton: document.getElementById('next-swiper-gym'),
                prevButton: document.getElementById('prev-swiper-gym')
            });
            //var swiper = new Swiper(document.getElementById(id), {
            //    pagination: '.swiper-pagination',
            //    paginationClickable: true,
            //    effect: 'fade',
            //    simulateTouch: false,
            //    speed: 10,
            //    grabCursor: false,
            //    nextButton: document.getElementById(idnext),
            //    prevButton: document.getElementById(idprev)
            //});


            for (var j = 0; j < gimnasios[i].img.length; j++) {

                var slides = ' <div class="col-lg-6 col-md-6 col-sm-6 padL5 padR0 swiper-slide">' +
                    '<div class=""><img name="' + gimnasios[i].name + '" class="swiper-event-gym" src="img/testing/' + gimnasios[i].img[j] + '"></div></div>';
                swiper.appendSlide(slides);

            }
        }

    }

    $(".swiper-container-horizontal")
        .mouseenter(function () {
            //for (var i = 0; i < allMarkers.length; i++) {
            //    if (allMarkers[i].gym == allMarkers[i].gym)
            //        if ($(this).attr('name') == allMarkers[i].gym) {
            //            allMarkers[i][Object.keys(allMarkers[i])[0]].setIcon('img/pin_selected.png');
            //        }
            //}
            $(this).children(':nth-child(2)').addClass('show-arrows-slider');
            $(this).children(':nth-child(3)').addClass('show-arrows-slider');

        });
    $(".swiper-container-horizontal")
        .mouseleave(function () {
            //for (var i = 0; i < allMarkers.length; i++) {
            //    if ($(this).attr('name') == allMarkers[i].gym) {
            //        allMarkers[i][Object.keys(allMarkers[i])[0]].setIcon('img/pin_unselected.png');
            //    }
            //}
            $(this).children(':nth-child(2)').removeClass('show-arrows-slider');
            $(this).children(':nth-child(3)').removeClass('show-arrows-slider');
        });

    angular.element(document).ready(function () {

        var modal = $('.modal-dialog');
        modal.css({'padding-top': '100px'});

        map = new google.maps.Map(document.getElementById('map-gym'), {
            zoom: 13,
            scrollwheel: false,
            center: new google.maps.LatLng(40.4167754, -3.7037901999999576),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        infowindow = new google.maps.InfoWindow();

        //for (var i = 0; i < gimnasios.length; i++) {
        //    if (gimnasios[i].name == $scope.gymOrigim) {
        //        city_center = gimnasios[i];
        //        var marker = new google.maps.Marker({
        //            position: new google.maps.LatLng(gimnasios[i].lat, gimnasios[i].long),
        //            icon: 'img/icon-map.png',
        //            content: '<div class="div-content-info"> <img name="' + gimnasios[i].name + '" class="infoWindowContent" src="img/testing/' + gimnasios[i].img[0] + '"> </div>' +
        //            '<div class="info-label">' + gimnasios[i].name + '</div>',
        //            map: map
        //        }).addListener('click', function () {
        //                infowindow.close();
        //                infowindow.setContent(this.content);
        //                infowindow.open(map, this);
        //            });
        //        marker.gym = gimnasios[i].name;
        //        marker.city = gimnasios[i].city;
        //        allMarkers.push(marker);
        //        map.setCenter(new google.maps.LatLng(gimnasios[i].lat, gimnasios[i].long));
        //    }
        //}
        for (var i = 0; i < gimnasios.length; i++) {
            if (gimnasios[i].city == $scope.frompage) {

                var htmlElement = "<div><div id=\"div-content-info\" class=\"div-content-info infoWindowContent\"><div class=\"swiper-wrapper\">";

                for (var j = 0; j < gimnasios[i].img.length; j++) {
                    htmlElement = htmlElement + " <div class=\"swiper-slide \"><img ng-click=\"refreshPage('"+gimnasios[i].name+"')\" name=\"" + gimnasios[i].name + "\" class=\"swiper-event infoWindowContent\" src=\"img/testing/" + gimnasios[i].img[j] + "\"></div>";
                }


                htmlElement = htmlElement + "</div><div id=\"div-content-info-izk\" class=\"swiper-button-prev swiper-button-prev-map\"> </div> <div id=\"div-content-info-der\" class=\"swiper-button-next swiper-button-next-map\"> </div>  " +
                    "</div> <div class=\" padL10\">" + gimnasios[i].city + "</div> <div ng-click=\"refreshPage(\'"+gimnasios[i].name+"\')\" class=\"info-label\">" + gimnasios[i].name + "</div>    <div class=\"div-circular-map text-center\"> <div class=\"marT-5\"><span class=\"span-desde-map\">desde</span></div> <div class=\"marT-5\"><span class=\"span-div-circular-map\"><strong> " + gimnasios[i].price + " &#8364; </strong></span></div>  </div>   </div>";

                var compiled = $compile(htmlElement)($scope);
                if (gimnasios[i].name == $scope.gymOrigim){
                    city_center = gimnasios[i];
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(gimnasios[i].lat, gimnasios[i].long),
                        icon: 'img/pin_selected.png',
                        content: compiled[0],
                        map: map
                    }).addListener('click', function () {
                            infowindow.close();
                            //this.setIcon('img/pin_visited.png');
                            infowindow.setContent(this.content);
                            infowindow.open(map, this);


                        });
                }else{
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(gimnasios[i].lat, gimnasios[i].long),
                        icon: 'img/pin_unselected.png',
                        content: compiled[0],
                        map: map
                    }).addListener('click', function () {
                            infowindow.close();
                            //this.setIcon('img/pin_visited.png');
                            infowindow.setContent(this.content);
                            infowindow.open(map, this);


                        });
                }


                marker.gym = gimnasios[i].name;
                marker.city = gimnasios[i].city;
                allMarkers.push(marker);

            }
        }
        map.setCenter(new google.maps.LatLng(city_center.lat, city_center.long));

        map.addListener('click', function (e) {
            infowindow.close();
            this.setOptions({scrollwheel: true});
        });
        map.addListener('mouseout', function (e) {

            this.setOptions({scrollwheel: false});
        });
        google.maps.event.addListener(infowindow, 'domready', function () {
            var iwOuter = $('.gm-style-iw');
            iwOuter.children(':nth-child(1)').css({'overflow': 'hidden'});
            var iwBackground = iwOuter.prev();
            iwBackground.children(':nth-child(2)').css({'display': 'none'});
            iwBackground.children(':nth-child(4)').css({'display': 'none'});
            var iwCloseBtn = iwOuter.next();
            iwCloseBtn.css({'display': 'none'});

            var swiper = new Swiper(document.getElementById("div-content-info"), {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                effect: 'fade',
                simulateTouch: false,
                speed: 10,
                //autoplay: 300,
                //loop:true,
                grabCursor: false,
                nextButton: document.getElementById("div-content-info-der"),
                prevButton: document.getElementById("div-content-info-izk")
            });
            $(".swiper-container-horizontal")
                .mouseenter(function () {
                    $(this).children(':nth-child(2)').addClass('show-arrows-slider');
                    $(this).children(':nth-child(3)').addClass('show-arrows-slider');

                });
            $(".swiper-container-horizontal")
                .mouseleave(function () {
                    $(this).children(':nth-child(2)').removeClass('show-arrows-slider');
                    $(this).children(':nth-child(3)').removeClass('show-arrows-slider');
                });

        });

        if ((screen.width > 1100) && map) {

            map.setZoom(13);
            map.setCenter(new google.maps.LatLng(city_center.lat, city_center.long));


        }
        if ((screen.width < 1100) && (screen.width > 768) && (map != null)) {
            map.setZoom(8);
            map.setCenter(new google.maps.LatLng(city_center.lat, city_center.long));
        }
        $('#div-activity-scroll, #div-gym-scroll, #div-horario-scroll, #div-build-scroll, #div-services-scroll').mCustomScrollbar({
            theme: "dark-3",
            scrollButtons:{ enable: true },
            mouseWheel:{
                enable: true,
                scrollAmount: 500
            }
        });
        //$("#div-gym").mCustomScrollbar({
        //    theme: "dark-3",
        //    scrollButtons:{ enable: true },
        //    mouseWheel:{
        //        enable: true,
        //        scrollAmount: 500
        //    }
        //});

    });



    $("select").select2()
        .on("change", function (e) {
            if (this.value) {
                $('#'+this.id).next().children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(2)').addClass('icon-combo-add');
                //$('#'+this.id).addClass('icon-combo-add');
            }else
                $('#'+this.id).next().children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(2)').removeClass('icon-combo-add');
        });


    $("#select-gym-select").select2()
        .on("change", function (e) {
            if (flag != 1) {
                $scope.frompage = this.value;
                $rootScope.city = this.value;
                $scope.$apply();

                clearOverlays();
                paintMarkers();
                //paintSliders();
                actBreadCrumbs();

            }
            flag++;
        });

    function clearOverlays() {
        //console.info('clear');
        for (var i = 0; i < allMarkers.length; i++) {
            //allMarkers[i].Nb.setMap(null);
            allMarkers[i][Object.keys(allMarkers[i])[0]].setMap(null);
        }
        allMarkers.length = 0;
    }

    function paintMarkers() {
        //console.info('paint');
        if (map != null) {

            for (var i = 0; i < gimnasios.length; i++) {
                if (gimnasios[i].name == $scope.gymOrigim) {
                    city_center = gimnasios[i];
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(gimnasios[i].lat, gimnasios[i].long),
                        icon: 'img/icon-map.png',
                        content: '<div class="div-content-info"> <img name="' + gimnasios[i].name + '" class="infoWindowContent" src="img/testing/' + gimnasios[i].img[0] + '"> </div>' +
                        '<div class="info-label">' + gimnasios[i].name + '</div>',
                        map: map
                    }).addListener('click', function () {
                            infowindow.close();
                            infowindow.setContent(this.content);
                            infowindow.open(map, this);
                        });
                    marker.gym = gimnasios[i].name;
                    marker.city = gimnasios[i].city;
                    allMarkers.push(marker);
                }
            }
            map.setCenter(new google.maps.LatLng(city_center.lat, city_center.long));
            //console.info(city_center);
            //console.info(allMarkers);
        }
    }

    function actBreadCrumbs() {

        $rootScope.breadCrumb.splice($rootScope.breadCrumb.length - 1);

        //var cityBreadCrumb = {text: $scope.gymOrigim, dir: "detalles-gimnasio({gym: \""+$scope.gymOrigim+"\"})"};
        //$rootScope.breadCrumb.push(cityBreadCrumb);
        //$scope.breadCrumb = $rootScope.breadCrumb;
        //$scope.$apply();
    }


    //function paintSliders(){
    //    var thelist = document.getElementById("mCSB_1_container");
    //    while (thelist.hasChildNodes()){
    //        thelist.removeChild(thelist.lastChild);
    //    }
    //    //$("#mCSB_1_container").empty();
    //
    //
    //    for(var i = 0; i < gimnasios.length; i++){
    //        if(gimnasios[i].city == $scope.frompage){
    //            city_center = gimnasios[i];
    //            var id = 'div-slide'+ i;
    //            var idnext = 'div-slide-next'+ i;
    //            var idprev = 'div-slide-prev'+ i;
    //            $('#mCSB_1_container').append('<div id="' + id + '" class="col-lg-6 padB20"><div class="swiper-wrapper"></div><div class="swiper-button-prev" id="' + idprev + '"></div><div class="swiper-button-next" id="' + idnext + '"></div></div>');
    //
    //        }
    //
    //    }
    //    $('.swiper-button-next').css('background-image', 'url(../img/der.png)');
    //    $('.swiper-button-prev').css('background-image', 'url(../img/izk.png)');
    //    $('.swiper-button-prev').css('left', '30px');
    //    $('.swiper-button-next').css('right', '30px');
    //
    //
    //    for(var i = 0; i < gimnasios.length; i++){
    //        if(gimnasios[i].city == $scope.frompage) {
    //            var id = 'div-slide' + i;
    //            var idnext = 'div-slide-next' + i;
    //            var idprev = 'div-slide-prev' + i;
    //
    //            var swiper = new Swiper(document.getElementById(id), {
    //                pagination: '.swiper-pagination',
    //                paginationClickable: true,
    //                effect: 'flip',
    //                grabCursor: true,
    //                nextButton: document.getElementById(idnext),
    //                prevButton: document.getElementById(idprev)
    //            });
    //            for (var j = 0; j < gimnasios[i].img.length; j++) {
    //
    //                var slides = ' <div class="col-lg-6 col-md-6 col-sm-6 padL5 padR5 swiper-slide">' +
    //                    '<div class="swiper-event"><img name="' + gimnasios[i].name + '" class="swiper-event" src="img/testing/' + gimnasios[i].img[j] + '"></div>' +
    //                    '<div class="padL10 padR10 bg-div-info">' +
    //                    '<div class="span-carousel"> <span> ' + gimnasios[i].name + ' </span>' +
    //                    ' <div class="div-circular text-center"> <span class="span-div-circular"><strong> ' + gimnasios[i].price + ' &#8364; </strong></span> </div> </div> ' +
    //                    '<div class="city-carousel"> <span class="">  ' + gimnasios[i].city + ' </span> </div> ' +
    //                    '<div class="text-carousel"> <p class="text-justify">  ' + gimnasios[i].text + ' </p> </div>' +
    //                    ' </div></div>';
    //                swiper.appendSlide(slides);
    //
    //            }
    //        }
    //
    //    }
    //
    //    $( ".swiper-event" )
    //        .mouseenter(function() {
    //            for(var i = 0; i < allMarkers.length; i++){
    //                if($(this).attr('name') == allMarkers[i].gym){
    //                    // allMarkers[i].setIcon('img/icon-map-blue.png');
    //                    allMarkers[i][Object.keys(allMarkers[i])[0]].setIcon('img/icon-map-blue.png');
    //                }
    //            }
    //        });
    //    $( ".swiper-event" )
    //        .mouseleave(function() {
    //            for(var i = 0; i < allMarkers.length; i++){
    //                if($(this).attr('name') == allMarkers[i].gym){
    //                    //allMarkers[i].setIcon('img/icon-map.png');
    //                    allMarkers[i][Object.keys(allMarkers[i])[0]].setIcon('img/icon-map.png');
    //                }
    //            }
    //        });
    //
    //    $('#map-gym').height($('#brother-map-gym').height());
    //
    //
    //}


    var video = document.getElementById('video-gym'),
        //wrapper = document.getElementById('wrapper'),
        //image = document.getElementById('image_background'),
        playButton = document.getElementById("play-pause"),
        videos = document.getElementsByTagName("video"),
        fraction = 0.8,
        needReplay = false; // boolean flag

    //video.addEventListener(
    //    'ended',
    //    function() {
    //        playButton.innerHTML = "<img src='http://c.dryicons.com/images/icon_sets/pixelistica_blue_icons/png/128x128/replay.png' />";
    //        needReplay = true;
    //    },
    //    false
    //);

    playButton.addEventListener(
        "click",
        function() {
            //if (needReplay) {
            //    video.style.display = 'block';
            //    image.style.display = 'none';
            //    needReplay = false;
            //}

            if (video.paused) {
                video.play();
                playButton.innerHTML = "<img src='img/video_pause.png' />";
            } else {
                video.pause();
                playButton.innerHTML = "<img src='img/video_play.png' />";
            }
        }
    );

});