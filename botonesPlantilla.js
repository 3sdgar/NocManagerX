
document.getElementById("prtgTest").addEventListener("dblclick", () => {
  document.getElementById("contenedorInterno").innerHTML = `
   <iframe src="https://www.classmarker.com/online-test/start/?quiz=dgf586f907540d68" frameborder="0" class="iframe" id="iframe" 
   style="width:98%; 
   height:398px;"></iframe>`;
 });

 document.getElementById("nocManager").addEventListener("dblclick", () => {
  document.getElementById("contenedorInterno").innerHTML = `
   <iframe src="https://nocmanager.webcindario.com/appsOnlinex.php" frameborder="0" class="iframe" id="iframe" 
   style="width:98%; 
   height:398px;"></iframe>`;
 });

 document.getElementById("fondo").addEventListener("click", () => {
  document.getElementById("contenedorInterno").innerHTML = `
  
  <div class="cajaInfo2">
  <h3>Apdynamics en 4 frames</h3>
  <hr>
  <p>Divida en 1 pestaña 4 instancias de <strong>AppDynamics</strong> para tener una mejor proyección del monitoreo de diferentes
  tipos de dispositivos a la vez</p>

  </div>

  <div class="cajaInfo2">

  <h3 style="text-decoration: underline">Manejo de clicks</h3>

  <p>Con un Click en los botones se abre la ayuda de uso, con doble click se ejecuta la acción</p>

  </div>

  `;
 });


 document.getElementById("jiraFiltro").addEventListener("click", () => {//Boton para filtrar el contenido de los JQL de Jira

  try {
    
  sesionVal();
  chrome.storage.sync.get(({sesionVal}) => {

  let lista = {
       n2:["raymond.santiesteban",
           "yasenka.mirabilio",
           "paulo.escobar",
           "marcia.diaz",
           "luis.chaves",
           "carlos.pereira",
           "luisfernando.herrera",
           "alejandro.jimenez",
           "manfred.camacho",
           "oswaldo.leal",
           "ananjely.mondragon",
           "monserrath.abarca",
           "edgar.gonzalez",
           "katnell.guillen",
           "jonathan.vega",
           "danilo.alfaro",
           "roberto.rojas",
           "Todos los Ingenieros"
       ],
      estado: [
           "Creado",
           "Abierto",
           "Sin%20Asignar",
           "Notificado",
           "Cancelado",
           "Cerrado",
           "Cerrado%22%2C%22Cancelado",
           "En%20aprobación",
           "En%20proceso",
           "Ver todos sus casos"
      ],
      estadoEn:[
        "status%20in",
        "status%20not%20in"
      ],

      inNotIssueType:[
        "issuetype%20in",
        "issuetype%20not%20in",
        "Sin IssueType"
      ],

      issuetype:[
        "Solicitud%20de%20servicio",
        "Incidentes",
        "Incidencia",
        "Incidencias",
        "Incidente%2CIncidencia,Incidencias",
        "Alerta",
      ]

      }

      let texto="";
      let iceNoAsig ="";
      let ingenieros="";
      let estados="";
      let estadosEn="";
      let ichutaip="";
      let inNotIchuTaip=""


  for (let i = 0; i < lista.n2.length; i++) {        ingenieros+=`<option value="${lista.n2[i]}">${lista.n2[i].replace("."," ").charAt(0).toUpperCase() + lista.n2[i].replace("."," ").slice(1)}</option>`;}  
  for (let i = 0; i < lista.estado.length; i++) {       estados+=`<option value="${lista.estado[i]}">   ${lista.estado[i]   .replace("%2C",",").replace("%20"," ")}</option>`; }  
  for (let i = 0; i < lista.estadoEn.length; i++) {   estadosEn+=`<option value="${lista.estadoEn[i]}"> ${lista.estadoEn[i] .replace("%2C",",").replace("%20"," ").replace("%20"," ") }</option>`; }  
  for (let i = 0; i < lista.issuetype.length; i++) {   ichutaip+=`<option value="${lista.issuetype[i]}">${lista.issuetype[i].replace("%2C",",").replace("%20"," ").replace("%20"," ") }</option>`; }  
  for (let i = 0; i < lista.inNotIssueType.length; i++) {inNotIchuTaip+=`<option value="${lista.inNotIssueType[i]}">${lista.inNotIssueType[i].replace("%2C",",").replace("%20"," ").replace("%20"," ") }</option>`; }  

  //Estructura 

  texto=`
  <div class="cajaInfo4">
    <center><h3>Jira Filtro</h3></center>
    <hr class="hrGlobal">
      <p>Filtre el contenido que desea ver en Jira usando las caracteristicas establecidas</p>
  
       <div id="contenidoJF">
         <div class="form-group">

            <i class="selectForm2">Pesta&ntilde;a nueva: <input type="checkbox" id="pn" checked></i>

            <select class="selectForm2" id="inNotIssueType">
            ${inNotIchuTaip}
            </select> 

             <select class="selectForm2" id="ichutaip">
             ${ichutaip}
             </select> 
   
             <select class="selectForm2" id="estadosEn">
             ${estadosEn}
             </select>

             <select class="selectForm2" id="estados">
             ${estados}
             </select>

           <br>
          <br>

         <select class="selectForm" id="ingenieros">
         <option>Seleccione Ingeniero</option>
         ${ingenieros}
         </select>

       <center><input id="iceBoton" type="button" class="selectForm3" value="Gestionar" style="margin-top:2%; margin-bottom:3%"></center> `;

   if (sesionVal) { 
    texto +=` 
    <hr>
     <input id="cp" class="selectForm3" type="button" value="Catalogo de Peticiones" > 
     <input id="cSBPDSA" class="selectForm3" type="button" value="Casos BPD sin Asignar" > 
     <input id="gmailIRsUrl" class="selectForm3" type="button" value="Gmail ServiceDesk IRs" > 
     <input id="colaCorreos" class="selectForm3" type="button" value="Cola de Correos enviados Jira" >
   
     <div id="gmailContainer" class="listContenedor">
      <h3>Gmail Service Desk Manager</h3>
      <div id="gm">  </div>
      </div>

      <div id="cerrarCasosContainer"  class="listContenedor">
      <h3>Listado de casos por cerrar</h3>
      <div id="listCasos">  </div>
      </div>
      `;  
  }//if

   texto+=`
    </div>
   </div>
   <div>
   <br>
   <br>
  `;

  document.getElementById("contenedorInterno").innerHTML =texto;


 //------------++++----------------++++-----------------++++------------------------++++-------------------------------++++


  chrome.storage.sync.get(({ nocIrGmailList }) => { 

    let  text= `
     <center>
     <div>
     <input id="agregarIRs" class="selectForm3" type="button" value="Empezar gestion de agregado de IRs" >
     <input id="vaciarIRs" class="selectForm3" type="button"  value="Borrar Lista">
     <input id="numeroInicio" class="selectForm4" type="button"  value="Cambiar en que numero iniciar" title="Ingrese en cual numero de la lista empezar">

      <div>
      <h2><center>IRs para agregar</h2>`;
      if(nocIrGmailList.includes("N/A")){
        text +=`
        <p>No hay datos cargados, debe cargar los IR en el correo de gmail en la eltiqueta IRs, si no tiene una regla creada para que los IRs se guarden ahi, 
        creela primero y luego acceda siguiendo el siguiente link: <a href="https://mail.google.com/mail/u/0/#label/INBOX%2FIRs">ir a IRs de gmail</a></p>
        `;
      }else{
        for (let i = 0; i < nocIrGmailList.length; i++) { text += `<p id="p${i}">${i+1}) ${nocIrGmailList[i].noc} - ${nocIrGmailList[i].ir.replace("-","").trim()} </p>`; }
      }
       text +=` <br>     
      </div>
      </div>
      </center>
      `;
      document.getElementById("gm").innerHTML =text;

      document.getElementById("numeroInicio").addEventListener("click", () => { 
        
        let numeroIngresado = null;
        while (numeroIngresado == null || isNaN(numeroIngresado) || numeroIngresado <= 0) {
          numeroIngresado = prompt("Ingrese un número mayor a 0:");
          
          // Si el usuario presiona "Cancelar", salir del bucle
          if (numeroIngresado === null) {
            break;
          }
        }

        chrome.storage.local.set({ iIni: numeroIngresado-1 });

        });


      document.getElementById("vaciarIRs").addEventListener("click", () => { 

        if (confirm("Desea eliminar la lista de IRs para agregar??")) {
          chrome.storage.sync.set({nocIrGmailList : "N/A"});
         
          text= `
          <center>
          <div>
          <input id="agregarIRs" class="selectForm3" type="button" value="Empezar gestion de agregado de IRs" >
          <input id="vaciarIRs" class="selectForm3" type="button"  value="Borrar Lista">
           <div>
           <h2><center>IRs para agregar</h2>
           <p>No hay datos cargados, debe cargar los IR en el correo de gmail en la eltiqueta IRs, si no tiene una regla creada para que los IRs se guarden ahi, 
           creela primero y luego acceda siguiendo el siguiente link: <a href="https://mail.google.com/mail/u/0/#label/INBOX%2FIRs">ir a IRs de gmail</a></p>
           <br>     
           </div>
           </div>
           </center>
           `;
           document.getElementById("gm").innerHTML =text;
        }

       });
       
    document.getElementById("agregarIRs").addEventListener("click", () => {
      chrome.storage.local.get("iIni", function(result) {

      let i = result.iIni;

      setInterval(() => {
        chrome.storage.local.set({ iVal: i }, function () {
          console.clear();
          console.log("Datos almacenados correctamente");
          console.log("vuelta " + i);

          agregarIrs(nocIrGmailList, i);
       //   nocIrGmailList.splice(i, 1);
          document.getElementById("p"+i).style.color = "red";
          document.getElementById("p" + i).style.animation = "palpitar 1s ease-in-out";

          i += 1;

          let valInnerHTML = document.getElementById("p" + i).innerHTML;
          document.getElementById("p"+i).style.color = "yellow";

            let seconds = 15;
            let  countdown = function() {
              document.getElementById("p" + i).innerHTML = valInnerHTML+" ( se abrirá en... "+seconds + ")"; // Agregar el número de segundos al elemento
              seconds--; // Disminuir en uno el número de segundos restantes
              if (seconds >= 0) {
                setTimeout(countdown, 1000);
              }
            };
            countdown();
           
        });
       }, 16000);
      });
     });
    });



    //------------++++----------------++++-----------------++++------------------------++++-------------------------------++++

    chrome.storage.local.get(["nocs","solucion"], function(result) {
      
      let text = `
      <center>
      <div>
      <input id="cerrarCasos" class="selectForm3" type="button" value="Empezar gestion de cerrado de casos" >
      <input id="vaciarNOCs" class="selectForm3" type="button"  value="Borrar Lista">
       <div>
       <h2><center>Casos por cerrar</h2>
       <ul>`;
       for (let i = 0; i < result.nocs.length; i++) {   text += `<li class="listText" title="${result.nocs[i].status} - ${result.nocs[i].summary}">${result.nocs[i].key} - ${result.nocs[i].assignee}</li>`; }  
       text += `
       </ul> 
       <br>     
       </div>
       </div>
       </center>
       `;
     
      document.getElementById("listCasos").innerHTML = text;


      document.getElementById("cerrarCasos").addEventListener("click", () => { //cuado clickea el boton de cerrar casos en la plantilla
       

        let i = 0;
        let json = result.nocs;

        const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio","julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const day = (new Date().getDate()-5).toString().padStart(2, '0');
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        let solucion =`Se realiza el cierre de los casos del 01 de ${monthNames[month]} al día ${day} de ${monthNames[month]} del ${year}`;
        chrome.storage.local.set({solucion:prompt("Defina la solución para los casos que se van a cerrar, una fecha de inicio de mes,fecha de final del mes y el año", solucion)});
    
        chrome.storage.local.set({ iVal: i });
        chrome.storage.local.set({ paso: true });
     
    console.clear();


        let url = `https://soporte.datasys.la/browse/${json[i].key}`;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { tabs[0].url; chrome.tabs.update(tabs[0].id, { url: url }); });
        chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
              if (changeInfo.status === 'complete') { 

              
                chrome.scripting.executeScript({
                  target: {tabId: tabId},
                  function: (json,i,tabId)=>{


             
                  },
                  args: [json,i,tabId]
                });

                 }
            
            });
      });
  });

//Logica---o-----------------o--------------o-------------------o----------------o------------o-----------xxxx  


function cerrarCasosNOC(json, i) {
  

}




async function agregarIrs(json,i) {
    
  let url = `https://soporte.datasys.la/browse/${json[i].noc}`;

let [tab] = await chrome.tabs.query({   active: true, currentWindow: true });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { tabs[0].url; chrome.tabs.update(tabs[0].id, { url: url }); });
  chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {    
                // console.log("vuelta "+i);

        chrome.scripting.executeScript({ target: {tabId: tabId}, func: function() {
          chrome.storage.sync.get(({ nocIrGmailList }) => { 

            
              console.clear();
              chrome.storage.local.get("iVal", function(result) {
                console.log("El valor almacenado es: " + result.iVal);
            
                let i= result.iVal;

             let titulo =  document.getElementById("summary-val").innerText.split("|");
             let irIssue=titulo[titulo.length-1];
             let temp="";
             let ir = nocIrGmailList[i].ir.replace("-","").trim();

             //Valida si el titulo tiene IR o no tiene
             if (!document.getElementById("summary-val").innerText.includes(ir) ){ 
                 irIssue="";
                 irIssue= ir +" | "+ titulo[titulo.length-1];  
              
                 setTimeout(() => {
                  document.getElementsByClassName("overlay-icon aui-icon aui-icon-small aui-iconfont-edit")[0].click();
                 }, 4000);
              
                 for (let j = 0; j < titulo.length; j++) { 
                  if (j==titulo.length-1) {   temp +=irIssue; }else{ temp += titulo[j]+" | "; }           
                }//for

                 setTimeout(() => { 
                  
                    document.getElementById("summary").value = temp; 
                    document.getElementsByClassName("overlay-icon aui-icon aui-icon-small aui-iconfont-edit")[0].click();
                }, 4000);


            }//if

                  
              });
          });//storage.sync.get 
        }});//scripting.executeScript
      

    }//if

  });

}//agregarIrs

  document.getElementById("inNotIssueType").addEventListener("change", () => { 

    if ( document.getElementById("inNotIssueType").value.includes("Sin")) {
                   document.getElementById("ichutaip").disabled = true;
            }else{ document.getElementById("ichutaip").disabled = false;  }
    
  });


  //--------------------------redireccionamiento ----------x-x-x-x-x-x---------------x-x-x--x-x-x-x-----++-+-+-+--+-+-+-+-+-++--+-+-++--+---
   
          document.getElementById("iceBoton").addEventListener("click", () => { abrirPestania("bp");});
          document.getElementById("cp").addEventListener("click", () => { abrirPestania("catalogo"); }); //Catalogo de Peticiones
          document.getElementById("cSBPDSA").addEventListener("click", () => { abrirPestania("cSBPDSA"); }); //casos bpd sin asignar
          document.getElementById("gmailIRsUrl").addEventListener("click", () => { abrirPestania("gmailIRsUrl"); }); //gmail service desk tag IRs
          document.getElementById("colaCorreos").addEventListener("click", () => { abrirPestania("colaCorreos"); }); //gmail service desk tag IRs
         
  //--+-+-+-+-++-+-+-+-++-+-+-+--x-x-x-x--x-x-x-x-x--x-x-x-x----------------x-x-x-x-x-x------------------------x-x-x-x-x-x-x-x-x--x-x-----


 function abrirPestania(direccion) {

  let ing = document.getElementById("ingenieros").value;
  let estEn = document.getElementById("estadosEn").value;
  let estado = document.getElementById("estados").value;
  let inNotIssueType= document.getElementById("inNotIssueType").value;
  let issuetype = document.getElementById("ichutaip").value;
 
  let estEnMasEstado =`%20and%20${estEn}%20(%22${estado}%22)`;
  let inNotMasIssueType = `%20and%20${inNotIssueType}(%22${issuetype}%22)`;
  let ingSelecto = `%20and%20assignee%20in%20(%22${ing}%22,%22${ing.replace(".", "")}%22)`;

  if (estado.includes("Ver todos sus casos")) {  estEnMasEstado=""; }
  if (ing.includes("Todos los Ingenieros")) {    ingSelecto="";}
  if (inNotIssueType.includes("Sin")) {          inNotMasIssueType=""; }


  if (!ing.includes("Seleccione Ingeniero") || direccion == "cSBPDSA" ||  direccion == "gmailIRsUrl" || direccion == "colaCorreos") {

    if (direccion==("bp")) {
       iceNoAsig = `https://soporte.datasys.la/browse/NOC-42904?filter=11509&jql=Organizaciones%20%3D%20%22ICE%20(BPD-1834)%22${estEnMasEstado}${inNotMasIssueType}${ingSelecto}%20ORDER%20BY%20key%20ASC%2C%20updated%20DESC`;
    }else if(direccion == ("catalogo")){    
       iceNoAsig = `https://soporte.datasys.la/issues/?filter=11509&jql=project%20in%20(%22Catalogo%20de%20Peticiones%20BPDC%22)${estEnMasEstado}${inNotMasIssueType}${ingSelecto}%20ORDER%20BY%20key%20ASC%2C%20updated%20DESC`;
    }else if(direccion == ("cSBPDSA")){  
      iceNoAsig = `https://soporte.datasys.la/browse/NOC-43014?filter=11509&jql=Organizaciones%20%3D%20%22ICE%20(BPD-1834)%22%20and%20status%20in%20(%22Sin%20asignar%22)%20and%20issuetype%20not%20in(Alerta)%20%20ORDER%20BY%20key%20ASC%2C%20updated%20DESC`;
    }else if(direccion == ("gmailIRsUrl")){  iceNoAsig = `https://mail.google.com/mail/u/0/#label/INBOX%2FIRs`;
    }else if(direccion=="colaCorreos"){ iceNoAsig ="https://soporte.datasys.la/secure/admin/MailQueueAdmin!default.jspa"; 
    }//if direccion


    if (document.getElementById("pn").checked) { //Valida si debe abrir una nueva pestaña
         window.open(iceNoAsig, '_blank');
    } else {
         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { tabs[0].url; chrome.tabs.update(tabs[0].id, { url: iceNoAsig }); });
    }//if check activado
  } else { alert("Seleccione un Ingeniero"); }
}//func abrir

  }); //sesion chrome

} catch (error) {
    console.log("Funcion de gmail IR error: "+error);
}

});

    //--------o-----------------o--------------o-------------------o----------------o------------o-----------xxxx  


 document.getElementById("prtgTest").addEventListener("click", () => {
  document.getElementById("contenedorInterno").innerHTML = `
  
  <div class="cajaInfo2">
  <h3>PRTG</h3>
  <hr>
  <p>Practique y mejore su conocimiento en PRTG, click en el boton PRTG test para hacer el test</p>
  </div>

  <div class="cajaInfo2">

  <h3 style="text-decoration: underline">Manejo de clicks</h3>

  <p>Con un Click en los botones se abre la ayuda de uso, con doble click se ejecuta la acción</p>

  </div>
  `;
 });

 document.getElementById("nocManager").addEventListener("click", () => {
  document.getElementById("contenedorInterno").innerHTML = `
  
  <div class="cajaInfo2">
  <h3>NOC Manager</h3>
  <hr>
  <p>Gestione Reportes, rendimiento, control diario, indicadores gr&aacute;ficos con filtrado en tiempo real,
     tiempos de creaci&oacute;n y mucho m&aacute;s
   </p>
</div>

<div class="cajaInfo2">

<h3 style="text-decoration: underline">Manejo de clicks</h3>

<p>Con un Click en los botones se abre la ayuda de uso, con doble click se ejecuta la acción</p>

</div>
 
  `;
 });

 document.getElementById("plantilla").addEventListener("click", () => {
  document.getElementById("contenedorInterno").innerHTML = `
  
  <div class="cajaInfo2">
  <h1>Plantilla Din&aacute;mica autom&aacute;tica</h1>
  <hr>
  <p>Genere la plantilla para crear casos de manera autom&aacute;tica</p>
  </div>
  <br>
  
  <div>

  <div class="cajaInfo2">

  <h3 style="text-decoration: underline">Manejo de clicks</h3>

  <p>Con un Click en los botones se abre la ayuda de uso, con doble click se ejecuta la acción</p>

  </div>

    <div class="cajaInfo">

<h3 style="text-decoration: underline">Uso en PRTG</h3>

      <p>Capture el nombre del dispositivo clickeando en el ícono de esta extensi&oacute;n,
         luego entre en el sensor afectado al que desea crear la plantilla, estando dentro del sensor tome
         la captura de la imagen que va a llevar la plantilla en el campo retroalimentaci&oacute;n, 
         y por &uacute;ltimo para obtener el resto de la informaci&oacute;n dirijase a el log del sensor y clickee en el icono de esta
         extensi&oacute;n, ASEGURESE DE QUE LOS DATOS SEAN CORRECTOS 
      </p>
   </div>

   <div class="cajaInfo">

   <h3 style="text-decoration: underline">Uso en AppDynamics</h3>

   <p>Para alertas de memoria, cpu,JVM, si el modal de informacion contiene el nombre del servidor y la fecha y hora, mas el tipo
   de afectacion, clickee en el boton de esta extension para recopilar la informacion,
   Los business transaction se deben de crear en el overview del drilldown.

   </p>
   </div>

   <div class="cajaInfo2" style="margin-bottom:10%; float:clear;">

   <h3 style="text-decoration: underline">Uso en JIRA</h3>

   <p>
   Si necesita recolectar informacion para llenar la plantilla de casos que entran y deben colocarge en el grupo de Casos sin Asignar 
   o BPD-1834 simplemente haga click en esta extension estando en jira en el caso que desea recolectar info. 

   Si desea crear un caso y necesita agregar la info que recolectó de PRTG o AppDynamics, debe tener en Jira el modal de crear caso
   abierto, y luego clickear en el boton de esta extension, la aplicacion agregará el tiulo y la plantilla automaticamente.
   <br>
   REVICE ANTES DE PROCEDER A CREAR EL CASO QUE TODA LA INFORMACION ESTE CORRECTA

   </p>
   </div>
  `;
 });

 
document.getElementById("fondo").addEventListener("dblclick", async () => {
    let [tab] = await chrome.tabs.query({   active: true, currentWindow: true });
  if (tab.url.includes("http://192.168.131.98:8090/")){  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: appDynamics4Frames, }); }
  });


  document.getElementById("revisiones").addEventListener("click", () => {
    document.getElementById("contenedorInterno").innerHTML = `
    <div class="cajaInfo2">
    <h3>Revisones</h3>
    <hr>
    <p>Obtenga información de las últimas actualizaciones del sistema Noc Manager Xtension, novedades y cómo usar</p>
    </div>
        <div class="cajaInfo2">

  <h3 style="text-decoration: underline">Manejo de clicks</h3>

  <p>Con un Click en los botones se abre la ayuda de uso, con doble click se ejecuta la acción</p>

  </div>
    `;
   });

   document.getElementById("revisiones").addEventListener("dblclick", () => {
    document.getElementById("contenedorInterno").innerHTML = `
    <div class="cajaInfo2">
    <h3>Control de Versiones</h3>
    <hr>
    <div id="actualizaciones"></div>
    </div>
    `;
     versiones();
   });

      document.getElementById("wikinoc").addEventListener("click",function () {

    document.getElementById("contenedorInterno").innerHTML =`

    <iframe src="http://localhost/wikinoc/wikinoc.php" frameborder="0" class="iframe" id="iframe" 
    style="width:98%; 
    height:398px;"></iframe>`;  

  });

  document.getElementById("wikinoc").addEventListener("dblclick",function () {  window.open('https://nocmanager.webcindario.com/wikinoc/wikinoc.php', '_blank');  });


function capturarPantalla() {
  // Utilizar la API de captura de pantalla del navegador
  navigator.mediaDevices.getDisplayMedia({ video: true })
    .then((stream) => {
      const videoTrack = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(videoTrack);

      // Capturar el cuadro actual de la pantalla
      imageCapture.grabFrame()
        .then((imageBitmap) => {
          // Crear un elemento <canvas> para dibujar la imagen
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = imageBitmap.width;
          canvas.height = imageBitmap.height;
          context.drawImage(imageBitmap, 0, 0);

          // Abrir una nueva ventana y mostrar la imagen en ella
          const newWindow = window.open();
          newWindow.document.write(`
          
          <!DOCTYPE html>
          <html>
          <head>
            <link rel="icon" type="image/x-icon" href="images/shCamara2-removebg-preview.png">
            <title>Captura de Pantalla</title>
            <script src="https://drive.google.com/file/d/1K8tsICLbBPBYC36flUnKHtAdQhnVamKy/view?usp=sharing"></script>
            <style>
              #btnGuardar {
                position: fixed;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                background-color: blue;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                transition: background-color 0.3s ease;
              }
          
              #btnGuardar:hover {
                background-color: #3366cc;
              }
          
              hr {
                border: 2px solid blue;
              }
            </style>
          </head>
          <body>
            <div id="header">
              <button id="btnGuardar" onclick="hola()">Guardar en Portapapeles</button>
              <hr>
            </div>
          
            <img id="screenshot" src="${canvas.toDataURL('image/png')}">
          </body>
          </html>
          
          `);
        })
        .catch((error) => {
          console.error('Error al capturar el cuadro de pantalla:', error);
        });
    })
    .catch((error) => {
      console.error('Error al acceder a la pantalla:', error);
    });
}


document.getElementById("screenShot").addEventListener("click", capturarPantalla);
