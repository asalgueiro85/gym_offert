angular.module('controllers', []).controller('FrontendController', function ($http, $scope, $location, MyService, $state, $compile, $rootScope) {

    $("body").css('overflow','auto');
    $scope.logMouseEvent = function (event) {
        switch (event.type) {
            case "mouseenter":
                console.info("Hey Mouse Entered");
                break;

            case "mouseleave":
                console.info("Mouse Gone");
                break;

            default:
                console.log(event.type);
                break;
        }
    }
    $rootScope.breadCrumb= [];

    var frontendBreadCrumb = {text: "Ofertas Gimnasios", dir: "frontend"};
    $rootScope.breadCrumb.push(frontendBreadCrumb);

    var flag = 1;
    $.getJSON("media/cities.php", function (json) {
        //console.info(utf8_encode(json[5].text)  );

        data = json;
        $("#select-city-frontend").select2({
            placeholder: "Ciudades",
            allowClear: true,
            data: json
        });
        $('b[role="presentation"]').hide();
        $('.select2-selection__arrow').append('<div style="padding-top: 5px;"> <span class="icon-localidad color-fe5923"></span> </div>');
        //$('#map').height($('#brother-map').height());

    });

    var gimnasios = [
        {
            img: ['1.jpg', '2.jpg', '3.jpg'],
            name: 'Gimnasio1',
            text: 'Ofcourse you do, and yes, there are many great carousel plugins out there. They offer a host of features and many are so customizable that you are limited only by your imagination.',
            city: 'Barcelona',
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
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
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
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos. ',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
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
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
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
            price: 25,
            lat: 40.4226162,
            long: -3.6976649000000634,
            lat_city: 40.4167754,
            long_city: -3.7037901999999576,
            activity: ['Spinning4', 'Yoga4', 'Karate4', 'Zumba4', 'Pilates4', 'Otro4'],
            buildings: ['Instalacion4', 'Instalacion42', 'Instalacion43', 'Instalacion44', 'Instalacion45', 'Instalacion46'],
            services: ['Servicio4', 'Servicio42', 'Servicio43', 'Servicio44', 'Servicio45', 'Servicio46'],
            horario: ['Lunes a Viernes de 8:00 a 22:30', 'Sábado: 09:00 a 14:00', 'Domingo: Cerrado'],
            ofertas:[
                {
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
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
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
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
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
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
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
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
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
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
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
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
                    nombre:'Nombre oferta 1',
                    img:'2.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
                    nombre:'Nombre oferta 2',
                    img:'1.jpg',
                    text:'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.',
                    old_price:'197',
                    new_price:'97',
                    info:'x 1 mes',
                    condiciones: 'Ven a probar durante un mes las instalaciones del gimnasio MI-14, en el Barrio de Salamanca , con matricula gratuita y comprobaras como su ambiente te engancha para que consigas tus objetivos.'
                },
                {
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

    //$http.get("http://localhost/Slim-2.x/api/AndoHappy/src/country?token=ando_happy")
    //    .then(function(response){
    //        console.info('console del http');
    //        console.info(response);
    //    }, function (errResponse) {
    //        console.info(errResponse);
    //    });

    //$http.get('https://www.ofertasgimnasios.com/ogapi/api/gyms/all').
    //    success(function(data) {
    //            console.info('console del http');
    //            console.info(data);
    //    });
//    var rootURL = "http://localhost/slim-example/api/wines";
//    $.ajax({
//        type: 'GET',
//        url: rootURL,
//        dataType: "json", // data type of response
//        success: renderList
//    });
//
//    function renderList(data) {
//console.info(data);
//    }

    //$http({
    //    method: "GET",
    //    async:true,
    //    crossDomain:true,
    //    url: 'https://www.ofertasgimnasios.com/ogapi/api/gyms/all',
    //    dataType : 'jsonp',
    //    //headers: {
    //    //    utok:userInfo.sessId
    //    //}
    //})
    //    .success(function(res)
    //    {
    //        console.info(res);
    //    })
    //    .error(function(msg, code)
    //    {
    //        console.info(msg);
    //    });

    //$.ajax({
    //    type: "GET",
    //    url: 'https://www.ofertasgimnasios.com/ogapi/api/gyms/all',
    //    data:{q:1},
    //    async:true,
    //    dataType : 'jsonp',   //you may use jsonp for cross origin request
    //    crossDomain:true,
    //    success: function(data, status, xhr) {
    //        console.info(data);
    //        console.info(xhr);
    //    }
    //});

    //    $.ajax({
    //    type: 'GET',
    //    url: 'https://www.ofertasgimnasios.com/ogapi/api/gyms/all',
    //    dataType: "jsonp", // data type of response
    //    success: function(data) {
    //                console.info(data);
    //            }
    //});


    angular.element(document).ready(function () {
        console.info('ready');
        $('#map').height($('#brother-map').height());

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 6,
            scrollwheel: false,
            center: new google.maps.LatLng(40.4167754, -3.7037901999999576),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var infowindow = new google.maps.InfoWindow();
        for (var i = 0; i < gimnasios.length; i++) {

            var htmlElement = "<div><div id=\"div-content-info\" class=\"div-content-info infoWindowContent\"><div class=\"swiper-wrapper\">";

            for (var j = 0; j < gimnasios[i].img.length; j++) {
                htmlElement = htmlElement + " <div class=\"swiper-slide swiper-event\"><img ui-sref=\"detalles-gimnasio({gym:'" + gimnasios[i].name + "'})\" name=\"" + gimnasios[i].name + "\" class=\"swiper-event infoWindowContent\" src=\"img/testing/" + gimnasios[i].img[j] + "\"></div>";
            }


            htmlElement = htmlElement + "</div><div id=\"div-content-info-izk\" class=\"swiper-button-prev swiper-button-prev-map\"> </div> <div id=\"div-content-info-der\" class=\"swiper-button-next swiper-button-next-map\"> </div>  " +
                "</div> <div class=\" padL10\">" + gimnasios[i].city + "</div> <div ui-sref=\"detalles-gimnasio({gym:\'" + gimnasios[i].name + "\'})\" class=\"info-label\">" + gimnasios[i].name + "</div>    <div class=\"div-circular-map text-center\"> <div class=\"marT-5\"><span class=\"span-desde-map\">desde</span></div> <div class=\"marT-5\"><span class=\"span-div-circular-map\"><strong> " + gimnasios[i].price + " &#8364; </strong></span></div>  </div>   </div>";

            var compiled = $compile(htmlElement)($scope);

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(gimnasios[i].lat, gimnasios[i].long),
                icon: 'img/icon-map.png',
                content:compiled[0] ,
                map: map
            }).addListener('click', function () {
                    infowindow.close();
                    infowindow.setContent(this.content);
                    infowindow.open(map, this);
                });

        }

        map.addListener('click', function (e) {
            infowindow.close();
            this.setOptions({scrollwheel: true});
            console.info(map.markers);
            console.info(map.getMarkers());
        });
        map.addListener('mouseout', function (e) {

            this.setOptions({scrollwheel: false});
        });
        google.maps.event.addListener(infowindow, 'domready', function () {
            var iwOuter = $('.gm-style-iw');
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

        if (screen.width > 1100) {
            map.setZoom(6);
            map.setCenter(new google.maps.LatLng(40.4167754, -3.7037901999999576));
        }
        if ((screen.width < 1100) && (screen.width > 768)) {
            map.setZoom(5);
            map.setCenter(new google.maps.LatLng(40.4167754, -3.7037901999999576));
        }
        console.info($('#map').height());


        //slick-carousel
        $('.slick_carousel').slick({
            //centerMode: true,
            //centerPadding: '60px',
            slidesToShow: 4,
            infinite: false,
            slidesToScroll: 1,
            //autoplay: true,
            //autoplaySpeed: 2000,
            //dots: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        });

        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < gimnasios[i].img.length; j++) {
                var id = 'swiper-container' + i.toString();
                var next = 'swiper-button-next' + i.toString();
                var prev = 'swiper-button-prev' + i.toString();
                var swiper = new Swiper(document.getElementById(id), {
                    pagination: '.swiper-pagination',
                    effect: 'fade',
                    simulateTouch: false,
                    speed: 10,
                    //autoplay: 300,
                    //loop:true,
                    grabCursor: false,
                    nextButton: document.getElementById(next),
                    prevButton: document.getElementById(prev)
                });


                //var htmlElement = " <div class=\"col-lg-6 col-md-6 col-sm-6 padL5 padR5 swiper-slide\"><div class=\"swiper-event\"><img name=\"" + gimnasios[i].name + "\" class=\"swiper-event\" src=\"img/testing/" + gimnasios[i].img[j] + "\"></div><div class=\"padL10 padR10 bg-div-info\"><div ui-sref=\"detalles-gimnasio({gym:'" + gimnasios[i].name + "'})\" class=\"span-carousel\"> <div class=\"div-span-carousel\" ><span> " + gimnasios[i].name + " </span></div><div class=\"div-circular text-center\"> <div class=\"marT-5\"><span class=\"fs-8\">desde</span></div> <div class=\"marT-5\"><span class=\"span-div-circular\"><strong> " + gimnasios[i].price + " &#8364; </strong></span></div>  </div> </div> <div class=\"city-carousel\"> <span>  " + gimnasios[i].city + " </span> </div> <div class=\"text-carousel\"> <p class=\"text-justify\">  " + gimnasios[i].text + " </p> </div></div></div>";

                if(j == 0)
                var htmlElement = " <div class=\"col-lg-6 col-md-6 col-sm-6 padL5 padR5 swiper-slide\"><div class=\"swiper-event\"><img ui-sref=\"detalles-gimnasio({gym:'" + gimnasios[i].name + "'})\" name=\"" + gimnasios[i].name + "\" class=\"swiper-event\" src=\"img/testing/" + gimnasios[i].img[j] + "\"></div><div class=\"padL10 padR10 bg-div-info\"><div class=\"span-carousel\"> <div class=\"div-span-carousel\" ><span ui-sref=\"detalles-gimnasio({gym:'" + gimnasios[i].name + "'})\" > " + gimnasios[i].name + " </span></div><div class=\"div-circular text-center\"> <div class=\"\"><span class=\"fs-11\">desde</span></div> <div class=\"marT-5\"><span class=\"span-div-circular\"><strong> " + gimnasios[i].price + " &#8364; </strong></span></div>  </div> </div> <div class=\"city-carousel\"> <span>  " + gimnasios[i].city + " </span> </div> <div class=\"text-carousel\"> <p class=\"text-justify\">  " + gimnasios[i].text + " </p> </div></div></div>";
                else
                var htmlElement = " <div class=\"col-lg-6 col-md-6 col-sm-6 padL5 padR5 swiper-slide\"><div class=\"swiper-event\"><img ui-sref=\"detalles-gimnasio({gym:'" + gimnasios[i].name + "'})\" name=\"" + gimnasios[i].name + "\" class=\"swiper-event\" src=\"img/testing/" + gimnasios[i].img[j] + "\"></div><div class=\"padL10 padR10 bg-div-info\"><div class=\"span-carousel\"> <div class=\"div-span-carousel\" ><span ui-sref=\"detalles-gimnasio({gym:'" + gimnasios[i].name + "'})\" > " + gimnasios[i].name + " </span></div><div class=\"div-circular text-center\"> <div class=\"\"><span class=\"fs-11\">desde</span></div> <div class=\"marT-5\"><span class=\"span-div-circular\"><strong> " + gimnasios[i].price + " &#8364; </strong></span></div>  </div> </div> </div></div>";
                var compiled = $compile(htmlElement)($scope);

                var slides = compiled[0];
                swiper.appendSlide(slides);
            }
        }

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

//console.info(gimnasios);

    console.info('no ready');

    //hasta aqui


    $('select').select2()
        .on("change", function (e) {
            //if(flag !=1) {
            $rootScope.city = this.value;
            $state.go('gimnasios-ciudades',{city: this.value});

            //}
            //flag ++;
        });

    //screen.width > 768

    $(window).on('resize', function () {
        $('#map').height($('#brother-map').height());
        if (screen.width > 1100) {
            map.setZoom(6);
            map.setCenter(new google.maps.LatLng(40.4167754, -3.7037901999999576));
        }
        if ((screen.width < 1100) && (screen.width > 768)) {
            map.setZoom(5);
            map.setCenter(new google.maps.LatLng(40.4167754, -3.7037901999999576));
        }

    });
	
	    //MOBILE HOME
    $scope.conditions=true;
    //Mostrar menú inicio mobile
    $scope.mostrarMenu= function () {
        if($scope.conditions==false)
            $scope.conditions=true;
        else $scope.conditions=false;


    }

});