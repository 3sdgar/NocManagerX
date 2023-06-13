
function dataVal(u,s) {
 
    chrome.storage.local.get(["manifiesto"]).then((data) => {

        let x=0;
        for (let i = 0; i < data.manifiesto.cripto.user.length; i++) {
          data.manifiesto.cripto.user[i];
          data.manifiesto.cripto.pass[i];
          if (data.manifiesto.cripto.user[i]==u &&  data.manifiesto.cripto.pass[i]==s) { x++;}
        }//for
         
const fecha = new Date();

if (x==1) {
   document.getElementById("info").style.display= "inline";
   document.getElementById("info").innerHTML="Se ha iniciado la sesi&oacute;n";
   data.manifiesto.sesion = true;
   document.getElementById("dat").value=data.manifiesto.sesion;
   manifiesto = data.manifiesto;

   chrome.storage.local.set({manifiesto}).then(() => {
    console.log(manifiesto);
    console.log("Datos locales actualizados");
  });

}else{
   document.getElementById("info").style.display= "inline";
   document.getElementById("info").innerHTML="El usuario no es correcto";
}


});

}//func

function sesion() { 
  
  chrome.storage.local.get(["manifiesto"]).then((data) => {
     document.getElementById("dat").value=data.manifiesto.sesion;
    if(data.manifiesto.sesion){

      let audios = data.manifiesto.preferencias.audios;

      document.getElementById("contfix").innerHTML =`
      <div class="opciones" id="opciones" title="Opciones">Opciones
      <hr>
      <input id="logout" class="logout" type="button" value="Log out" title="Cerrar Sesion">
      <input id="audioSelector" class="audioSelector" type="button" value="${audios}" title="Silenciar audios">
      </div>
    `;
 
    silenciarAudios();

  document.getElementById("logout").addEventListener("click", function() {
  document.getElementById("contfix").innerHTML =``;

  chrome.storage.local.get(["manifiesto"]).then((data) => {

    data.manifiesto.sesion = false;
    document.getElementById("dat").value=data.manifiesto.sesion;
    manifiesto = data.manifiesto;

    chrome.storage.local.set({manifiesto}).then(() => {
    console.log(manifiesto);
    console.log("Datos locales actualizados");
    loginHtml();
   });
  });
});

}
});
}

function silenciarAudios() {

  chrome.storage.local.get(["manifiesto"]).then((data) => { 

    let audios = data.manifiesto.preferencias.audios;

  document.getElementById("audioSelector").addEventListener("click", function() { 

    if (audios) { data.manifiesto.preferencias.audios = false; 
                //  document.getElementById("audios").innerHTML =``;
                 
                  manifiesto = data.manifiesto;
                  chrome.storage.local.set({manifiesto}).then(() => {
                    console.log(manifiesto);
                    console.log("Datos locales actualizados");
                   });
    }else{
                  data.manifiesto.preferencias.audios=true;
                  manifiesto = data.manifiesto;
                  chrome.storage.local.set({manifiesto}).then(() => {
                  console.log(manifiesto);
                  console.log("Datos locales actualizados");
                   });
                //  cargarAudios();
    }

  });
});
}

function datosSesion() { // Se validan los datos de la sesion

try {
  chrome.storage.local.get(["manifiesto"]).then((data) => { 

    let audios = data.manifiesto.preferencias.audios;

    if (data.manifiesto.sesion) { 

      document.getElementById("logins").innerHTML = `<div  class="lii" id="loggout"  style="background:blue; height:100%; width:100%; text-align:center">Log out</div>`;
     
          document.getElementById("loggout").addEventListener("click", function() { //al cerrar sesion
          document.getElementById("contfix").innerHTML =``;
          chrome.storage.local.get(["manifiesto"]).then((data) => {
      
          data.manifiesto.sesion = false;
          document.getElementById("dat").value=data.manifiesto.sesion;
          manifiesto = data.manifiesto;
      
          chrome.storage.local.set({manifiesto}).then(() => {
          console.log(manifiesto);
          console.log("Datos locales actualizados");
          loginHtml();
         });
       });
    }); //Fin al cerrar sesion
 
      if (!audios) {  }else{  cargarAudios(); }

  }else{
    loginHtml();
  }

});

} catch (error) {
  console.log(error);
}

}

function sesionVal() { // Se validan los datos de la sesion

    chrome.storage.local.get(["manifiesto"]).then((data) => { 
  
      let sesionVal = data.manifiesto.sesion;
           chrome.storage.sync.set({sesionVal}); 
  });
  
  
 
  
  }
