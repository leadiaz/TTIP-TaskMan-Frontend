app.factory('Usuarios', function($resource) {
    return $resource('/Usuarios/:nombreUsuario', {'nombreUsuario': '@nombreUsuario'}, {
    	'query': { method: 'GET', isArray: true},
        'save': { method:'POST' }
    });
});

app.factory('UsuarioBuscar', function($resource) {
    return $resource('/UsuarioBuscar', {}, {
    	'queryUsuario': { method: 'GET'},
    });
});
