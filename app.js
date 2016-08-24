'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    //'ngCookies',
    'ngAnimate',
    'truncate',
    'controllers'
])
.run(function ($rootScope) {
    document.addEventListener('deviceready', onDeviceReady, false);

    function isPhoneGap() {

        return document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    }

    function onDeviceReady() {
        console.info("App started");
    }
})
.factory("MyService", function() {
    return {
        data: {}
    };
})
.config(['$stateProvider','$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

if(screen.width > 768){
    $urlRouterProvider.otherwise('/');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('frontend', {
            url: '/',
            templateUrl: 'views/desktop/frontend.html',
            controller: 'FrontendController',
            ncyBreadcrumb: {
                label: 'Home'
            }
        })

        // nested list with custom controller
        .state('nuestra-mision', {
            url: '/nuestra-mision',
            templateUrl: 'views/desktop/mision.html',
            controller: 'StaticController',
            ncyBreadcrumb: {
                label: 'Nuestra Mision'
            }
        })
        .state('preguntas-frecuentes', {
            url: '/preguntas-frecuentes',
            templateUrl: 'views/desktop/question.html',
            controller: 'StaticController',
            ncyBreadcrumb: {
                label: 'Preguntas frecuentes'
            }
        })
        .state('politica-de-privacidad', {
            url: '/politica-de-privacidad',
            templateUrl: 'views/desktop/privacidad.html',
            controller: 'StaticController',
            ncyBreadcrumb: {
                label: 'Politica de privacidad'
            }
        })
        .state('condiciones-generales-de-contratacion', {
            url: '/condiciones-generales-de-contratacion',
            templateUrl: 'views/desktop/contratacion.html',
            controller: 'StaticController',
            ncyBreadcrumb: {
                label: 'Condiciones generales de contratacion'
            }
        })
        .state('como-funciona', {
            url: '/como-funciona',
            templateUrl: 'views/desktop/funciona.html',
            controller: 'StaticController',
            ncyBreadcrumb: {
                label: 'Como funciona'
            }
        })
        .state('gimnasios-ciudades', {
            url: '/gimnasios-ciudades',
            params: {
                city: null,
            },
            templateUrl: 'views/desktop/gimnasios_ciudad.html',
            controller: 'GimnasiosCiudadesController',
            ncyBreadcrumb: {
                label: 'Gimnasios'
            }
        }).state('detalles-gimnasio', {
            url: '/detalles-gimnasio',
            params: {
                gym: null,
            },
            templateUrl: 'views/desktop/detalles_gimnasio.html',
            controller: 'DetallesGimnasioController',
            ncyBreadcrumb: {
                label: 'Detalles'
            }
        }).state('area-gimnasios', {
            url: '/area-gimnasios',
            templateUrl: 'views/desktop/area_gimnasios.html',
            controller: 'AreaGimnasiosController',
            ncyBreadcrumb: {
                label: 'Area gimnasios'
            }
        }).state('atencion-cliente', {
            url: '/atencion-cliente',
            templateUrl: 'views/desktop/atencion_cliente.html',
            controller: 'AreaGimnasiosController',
            ncyBreadcrumb: {
                label: 'Area gimnasios'
            }
        });


    }else{
    $urlRouterProvider.otherwise('/');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('frontend', {
            url: '/',
            templateUrl: 'views/mobile/frontend.html',
            controller: 'FrontendController'
        })

        // nested list with custom controller
        .state('nuestra-mision', {
            url: '/nuestra-mision',
            templateUrl: 'views/mobile/mision.html',
            controller: 'StaticController'
        })
        .state('preguntas-frecuentes', {
            url: '/preguntas-frecuentes',
            templateUrl: 'views/mobile/question.html',
            controller: 'StaticController'
        })
        .state('politica-de-privacidad', {
            url: '/politica-de-privacidad',
            templateUrl: 'views/mobile/privacidad.html',
            controller: 'StaticController'
        })
        .state('condiciones-generales-de-contratacion', {
            url: '/condiciones-generales-de-contratacion',
            templateUrl: 'views/mobile/contratacion.html',
            controller: 'StaticController'
        })
        .state('como-funciona', {
            url: '/como-funciona',
            templateUrl: 'views/mobile/funciona.html',
            controller: 'StaticController'
        })
        .state('gimnasios-ciudades', {
            url: '/gimnasios-ciudades',
            params: {
                city: null,
            },
            templateUrl: 'views/mobile/gimnasios_ciudad.html',
            controller: 'GimnasiosCiudadesController'
        });
    }

          if(window.history && window.history.pushState){
$locationProvider.html5Mode(true);
  }
}]);
