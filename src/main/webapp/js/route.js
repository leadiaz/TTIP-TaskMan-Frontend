app.config(function ($stateProvider, $urlRouterProvider,$authProvider,$httpProvider) {


console.log("funco");
  $urlRouterProvider.otherwise("/");

  $httpProvider.interceptors.push(function($rootScope, $location, $q) {
    return {
      responseError: function(rejection) {
        if (rejection.status == 401 || rejection.status == 403) {
          $location.path('/login');
        }
        return rejection;
      }
    }
  });

  $stateProvider

    .state('login', {
      url: "/",
      templateUrl: "partials/paginaLogeo.html",
      controller: "LoginCtrl as ctrl"
    })

    .state('proyectos',{
      url: "/proyectos/:username",
      templateUrl:"partials/proyectosUser.html",
      controller: "ProyectosUserCtrl as ctrl"
    })
  
    .state('main', {
      url: "/main/:proyectoId/:username",
      templateUrl: "partials/main.html",
      controller: "AppCtrl as ctrl",
      resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();

            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
    })
  
  .state('main.home', {
      url: "/home",
      templateUrl: "partials/paginaPrincipal.html",
      controller: "AppCtrl as ctrl"
    })


    .state('main.issues', {
      url: "/issues",
      templateUrl: "partials/issues.html",
  	  controller: "IssuesCtrl as ctrl"
    })

    .state('main.users', {
      url: "/users",
      templateUrl: "partials/users.html",
      controller: "AppCtrl as ctrl"
    })
    
    .state('main.tasks', {
      url: "/tasks",
      templateUrl: "partials/tasks.html",
      controller: "TasksCtrl as ctrl"
    })

    .state('main.proyectos', {
      url: "/proyectos",
      templateUrl: "partials/proyectos.html",
      controller: "ProyectosCtrl as ctrl"
    })

    .state('nuevoUser',{
        url:"/users/nuevo",
        templateUrl:"partials/nuevoUser.html",
        controller: "NuevoUserCtrl as ctrl"
    })

    .state('main.nuevoTask',{
        url:"/task/nuevo",
        templateUrl:"partials/nuevaTarea.html",
        controller: "NuevoTaskCtrl as ctrl"
    })
    
    .state('main.nuevoIssue',{
        url:"/issue/nuevo",
        templateUrl:"partials/nuevoIssue.html",
        controller: "NuevoIssueCtrl as ctrl"
    })

    .state('nuevoProyecto',{
        url:"/proyecto/nuevo/:username",
        templateUrl:"partials/nuevoProyecto.html",
        controller: "NuevoProyectoCtrl as ctrl"
    })

	.state('main.editarIssue',{
        url:"/issue/:issueID",
        templateUrl:"partials/editarIssue.html",
        controller: "EditarIssueCtrl as ctrl"
    })

	.state('main.editarTask',{
        url:"/task/:taskID",
        templateUrl:"partials/editarTask.html",
        controller: "EditarTaskCtrl as ctrl"
    })

  .state('main.chat',{
        params:{miembros:[]},
        url:"/chat",
        templateUrl:"partials/chat.html",
        controller: "ChatCtrl as ctrl",
        resolve: {
          proyectData: function($stateParams,Proyecto){
            return Proyecto.query({id:$stateParams.proyectoId});
          }
        }
    })

  .state('main.whiteboard',{ 
        url: "/whiteboard",
        templateUrl: "partials/whiteboard.html",
        controller: "CanvasCtrl as ctrl"
     })

});