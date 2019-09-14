app.controller('AllUsersCrtl', function ($resource, $timeout, Usuarios,UsuariosBuscar) {
	'use strict';
	console.log("InicializandoControllerUsuario");
	
	var self = this;
	self.nombreUser = '';
	self.contrasenha = '';
	self.clientes = [];
	//var nuevoCliente
	self.usuarioIniciado = null;
	self.usuario = null;
	
	this.actualizarLista = function() {
		Usuarios.query(function(data) {
            self.clientes = data;
        });
    };
    
    this.actualizarLista();
	 // AGREGAR
    this.agregarCliente = function() {
    	Clientes.save(this.nuevoCliente, function(data) {
    		//console.log(this.nuevoCliente.nombre);
    		 //self.notificarMensaje('Gracias Por Registrarse');
            self.actualizarLista();
            console.log("usuarioSeAgrego" + data.nombreUsuario);
            self.nuevoCliente = null;
        });
        $("#registroModal").modal('toggle');
    };
    
   //Iniciar Session
    this.aceptar = function(){
    	if(self.nombreUser == ''|| self.contrasenha == '' ){
    		alert("Completa los campos de Inicio de Sesion")
    	}else{
    		ClientesBuscar.queryCliente({"nombreUsuario":self.nombreUser},function(data){
    		console.log("UsaurioNombreData:" + data.nombreUsuario +"Pass:"+data.password );	
    		self.usuarioIniciado = data;
    		console.log("UsuarioNombreSelf:" + self.usuarioIniciado.nombreUsuario +"Pass:"+self.usuarioIniciado.password );
    	});	
    	console.log("UsaurioNombre:" +self.nombreUser +"Pass:"+self.contrasenha );
    	$("#myModalInicioDeSesion").modal('toggle');
    	}
	};
		
    this.verDescripcion = function(cliente) {
        this.usuario = cliente;
        console.log(self.usuario.nombreUsuario);
        $("#verDescripcionClienteModal").modal({});
    };
    // FEEDBACK & ERRORES
    this.msgs = [];
    this.notificarMensaje = function(mensaje) {
        this.msgs.push(mensaje);
        this.notificar(this.msgs);
    };
    
    this.notificar = function(mensajes) {
        $timeout(function() {
            while (mensajes.length > 0) mensajes.pop();
        }, 3000);
    }
});
