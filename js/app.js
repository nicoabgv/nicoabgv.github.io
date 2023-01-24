var usuarios = ['nico', 'hugo', 'jaime'];
var passwds = ['123', '456', '789']; 

function onstart(){
    if(localStorage.getItem("usuario") != null){
        alert("You are logged in!");
        window.location.replace("/minijuego.html");
    }
}

function check_logged(){
    if(localStorage.getItem("usuario") == null){
        alert("You must be logged in");
        window.location.replace("/index.html");
    } else {
        document.getElementById("usuario").innerHTML = localStorage.getItem("usuario");
    }
}

function login(){
    var usuario = prompt("Enter your username:");
    var passwd = prompt("Enter your password:");

    if(usuarios.indexOf(usuario) != -1){
        if((passwds.indexOf(passwd) != -1) && (passwds.indexOf(passwd) == usuarios.indexOf(usuario))){
            alert("You are logged in!");
        } else {
            alert("Password does not match username");
        } 
    } else {
        alert("Username does not exist");
    }
    
    localStorage.setItem("usuario", usuario);
    window.location.replace("/minijuego.html");

}

function signup(){
    var usuario = prompt("Enter your username:");
    var passwd = prompt("Enter your password:");

    if(usuarios.includes(usuario)){
        alert("Username already taken");
        return;
    }
    usuarios.push(usuario);
    passwds.push(passwd);

    localStorage.setItem("usuario", usuario);
    window.location.replace("/minijuego.html");
}

function logout(){
    localStorage.clear("usuario");
    alert("You have logged out!");
    window.location.replace("/index.html");
}

function blur_background(){
    document.body.style.backgroundImage = "url(/media/background_blurred.gif";
}

function unblur_background(){
    document.body.style.backgroundImage = "url(/media/background.gif";
}

function nivel_final(){
    alert("You must complete all levels before fighting the AI");
}