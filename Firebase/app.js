//Login
var provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(function () {
    firebase.auth()
        .signInWithPopup(provider)
        .then(function (result) {
            //console.log(result.user);
            guardaDatos(result.user);
            $('#login').hide();//PARA OCULTAR EL BOTON DE LOGIN
            $('#root').append("<img width='100px' src='"+result.user.photoURL+"'/>");//PARA MOSTRAR LA IMAGEN

        });
});
//ESTA FUNCION GUARDA LOS DATOS AUTOMATICAMENTE
function guardaDatos(user){
var usuario = {
    uid:user.uid,
    nombre: user.displayName,
    email:user.email,
    foto: user.photoURL
}
firebase.database().ref("informacion/"+ user.uid)
.set(usuario)
}


//ESCRIBIR EN LA BASE DE DATOS
$('#guardar').click(function(){
firebase.database().ref("informacion")
.set({
    nombre:"BlisS",
    edad:"15",
    sexo:"masculino"
 });

});

//AQUI ESTOY LEYENDO DE LA BASE DE DATOS DE FIREBASE
firebase.database().ref("informacion")
.on("child_added", function(s){
var user = s.val();
$('#root').append("<img width='100px' src='"+user.foto+"'/>");//para agregar la foto en la app
});