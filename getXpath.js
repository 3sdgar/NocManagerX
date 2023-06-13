/*
document.getElementById("contenedor").onclick = function(event) {
    var xpath = getXPath(event.target); // obtener el XPath del elemento clickeado
    console.log(xpath);
    highlightElement(xpath);
  }
  */
  
  function getXPath(element) {
    var xpath = '';
    var parentNode = element.parentNode;
  
    while (parentNode != null) {
      var index = getElementIndex(element);
      var tagName = element.tagName.toLowerCase();
  
      xpath = '/' + tagName + '[' + index + ']' + xpath;
      element = parentNode;
      parentNode = element.parentNode;

      // Si el elemento está dentro de un iframe, agregar la información del iframe al XPath
      if (element.tagName === 'IFRAME') {
      
        var frameIndex = getElementIndex(element);
        element.setAttribute('id',"frame"); 
        var frameId = element.getAttribute('id'); // || element.getAttribute('name');
        xpath = '/iframe[' + frameIndex + ']' + '[@id="' + frameId + '"]' + xpath;
        element = element.contentDocument.documentElement;
        parentNode = element.parentNode;
      }
    
    }
  
    return xpath;
  }
  
  function getElementIndex(element) {
    var siblings = element.parentNode.childNodes;
    var index = 1;
  
    for (var i = 0; i < siblings.length; i++) {
      var sibling = siblings[i];
  
      if (sibling === element) {
        return index;
      }
  
      if (sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === element.tagName) {
        index++;
      }
    }
  
    return -1;
  }
  
  function highlightElement(xpath) {
    var element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    element.classList.add("highlighted");
    var id = element.getAttribute("id");
    console.log("ID del elemento: " + id);

 // Modificar la fuente del elemento
 var el = document.getElementById(id);
 if (el) {
   if (el.contentWindow) {
     // Si el elemento está dentro de un iframe, acceder al window del iframe
     el.contentWindow.document.getElementById(id).style.width = "200px";
     alert(id);
   } else {
     // Si el elemento está en el documento principal, modificar su estilo de fuente
    // el.style.fontFamily = "Arial, sans-serif";
    document.getElementById(id).style.width = "200px";
   }

 }
  }

 /*
 
        document.getElementById("agregarIRs").addEventListener("click", () => { 
        irFunc();
      });

      async function irFunc() {
        let [tab] = await chrome.tabs.query({   active: true, currentWindow: true });
        await  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: agregarIrs, });

      }

      
    function agregarIrs() {
      chrome.storage.sync.get(({ nocIrGmailList }) => {  
      console.log("agregar IRs");
      console.log(nocIrGmailList);
      let url = `https://soporte.datasys.la/browse/${nocIrGmailList[0].noc}`;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { tabs[0].url; chrome.tabs.update(tabs[0].id, { url: url }); });

    });
  }

        window.addEventListener('load', function() {
        console.log('La página se ha cargado completamente');
        document.body.innerHTML = '<div><h1>Bienvenido a mi página</h1><p>Esta es una página de ejemplo</p></div>';
      });

        async function agregarIrs(json) {
      
    console.log("agregar IRs");
    console.log(json);
    let url = `https://soporte.datasys.la/browse/${json[0].noc}`;

  let [tab] = await chrome.tabs.query({   active: true, currentWindow: true });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { tabs[0].url; chrome.tabs.update(tabs[0].id, { url: url }); });
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      if (changeInfo.status === 'complete') {
 

        chrome.scripting.executeScript({
          target: { tabId: tabId }, func: function () {
            console.clear();
            console.log('Valores de NocExtensionManager ->');

            chrome.storage.sync.get(({ nocIrGmailList }) => {

           //   for (let i = 0; i < nocIrGmailList.length; i++) {
            for (let i = 0; i < 2; i++) {
   
              
                  let noc = nocIrGmailList[i].noc;

                 setTimeout(() => {  
                 
               //   document.getElementById("quickSearchInput").click();
                  document.getElementById("quickSearchInput").value = noc;
                }, 1000);

                
                  setTimeout(() => {               
                    presionarEnter();
                  }, 2000);

                  function presionarEnter() {
                    var input = document.getElementById("quickSearchInput");
                    var event = new Event("keydown");
                    event.key = "Enter";
                    event.keyCode = 13;
                    event.which = 13;
                    input.dispatchEvent(event);
                    console.log("ejecutado");
                  }

                //  setTimeout(() => {  document.getElementsByClassName("quick-search-result-item")[0].click();  }, 3000);
 
              setTimeout(() => {
                console.log("esperando ejecucion final y reinicio");
              }, 5000);
     


                
                let intervalo=2000;
                setTimeout(() => {
                  
                let titulo = document.getElementById("summary-val").innerText.split("|");
                let paginaNoc =  document.getElementById("key-val").innerText; 
                let irIssue = titulo[titulo.length - 1];
                let temp = "";
                let ir = nocIrGmailList[i].ir.replace("-", "").trim();

                //Valida si el titulo tiene IR o no tiene

                console.log("comparacion de nocs"+paginaNoc+" "+noc)

                if (paginaNoc == noc) {
                if (!document.getElementById("summary-val").innerText.includes(ir)) {

                  console.log("No tiene IR");

                  irIssue = ir + " | " + titulo[titulo.length - 1];
                  document.getElementById("summary-val").click();

                  for (let j = 0; j < titulo.length; j++) { if (j == titulo.length - 1) { temp += irIssue; } else { temp += titulo[j] + " | "; } }//for
                
                  setTimeout(() => {
                    document.getElementById("summary").value = temp;
                    document.getElementsByClassName("aui-button submit")[0].click();
                  }, 3000);

                  console.log("Se agregó el IR");

                }else{  console.log("Detecta que si tiene IR");  }
               }//if


              }, intervalo);


              

              }//for

            });

          }
        });
      }//if
    });
  


  }//agregarIrs




                function accionClassTAGClick(timeout,id,i) {  setTimeout(() => {  document.getElementsByClassName(id)[i].getElementsByTagName('a')[0].click(); }, timeout); }
                function accionIdArrayClick(timeout,id,i) {        setTimeout(() => { document.getElementById(id)[i].click(); }, timeout); }
                function accionIdClick(timeout,id) {        setTimeout(() => { document.getElementById(id).click(); }, timeout); }
                function querySelector(timeout,id) {          setTimeout(() => {document.querySelector(id).click(); }, timeout); }

                function accionClassClick(timeout,id,i) {     setTimeout(() => { document.getElementsByClassName(id)[i].click(); }, timeout); }




              let json = result.nocs;
                let i = result.iVal;
                let solucion = result.solucion;
                let array = document.getElementsByClassName("trigger-label");
                let valBoton = document.getElementsByClassName("trigger-label")[4].innerText;
                let timeout = 3000;

                let summary = json[i].summary;
                let key = json[i].key;
                let asignado = json[i].assignee;

                let html = ` 
              
                <p>Estimado/a <a href="https://soporte.datasys.la/secure/ViewProfile.jspa?name=MonitoreoTI%40bp.fi.cr" class="user-hover" rel="MonitoreoTI@bp.fi.cr">Monitoreo BP (BP - Todo)</a>,</p>
                <p>Le informamos que se procede con el cierre del caso <a href="https://soporte.datasys.la/browse/${key}" 
                title="${summary}" class="issue-link" data-issue-key="${key}">${key}</a>, a continuación le indicamos un breve resumen del mismo,</p>
                <ul>
                <li><b>Descripción:</b>   
                <span class="sd-inline-noformat">${summary}</span></li>
                <li><b>Solución:</b>${solucion}</li>
                <li><b>Colaborador Datasys: <a class="user-hover" tabindex="-1" title="Seguir el enlace" contenteditable="false" href="/secure/ViewProfile.jspa?name=${asignado}" rel="${asignado}" data-mce-href="/secure/ViewProfile.jspa?name=${asignado}" data-mce-selected="1">${asignado}</a>
                </b></li>
    
    
                </ul><p>En caso de necesitar re-abrir el caso no dude en contactarnos y con gusto lo atenderemos,</p>
                <p>Saludos cordiales.</p><br data-mce-bogus="1"></p>
               
               `;


                if (valBoton.includes("Solicitar informaci")) {

              //   accionClassClick(3000,"trigger-label",4); 
               //   accionClassClick(6000,"trigger-label",5); 
              //   multipleEjecucion(json,solucion,timeout);
                  
                } else if (valBoton.includes("Requiere ayuda")) {


                      setTimeout(() => { document.getElementsByClassName("trigger-label")[5].click(); }, 3000);

                      setTimeout(() => {
                        let xpath='//*[@id="sd-comment-tabs"]/li[2]/a';
                        var element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
                        element.click();
                      }, 5000);


                      setTimeout(() => {
                        let xpath='//*[@id="crLink"]/span';
                        var element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
                        element.click();
                      }, 8000);

                          console.log("HAY UN BUCLE POR AQUI QUE REPITE TODO");
                      
                      /*
                      setTimeout(() => {
                        document.getElementsByTagName('iframe')[1].contentDocument.getElementsByTagName("p")[0].outerHTML = html
                      }, 8000);
                    
                      */

/*

                      setTimeout(() => {
                        let xpath= '//*[@id="issue-workflow-transition-submit"]';
                        var element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
                        element.click();
                      }, 12000);

                        

                     

} else if (valBoton.includes("Coordinar")) {

  //  accionClassClick(3000, "trigger-label", 3);
  //  multipleEjecucion(json, solucion, timeout);

//     setTimeout(() => { document.getElementsByClassName("trigger-label")[3].click(); }, 4000);



} else if (document.getElementsByClassName("trigger-label")[3].innerText.includes("Retomar trabajos")) {




//     accionClassClick(3000,"trigger-label",5);  
//  multipleEjecucion(json,solucion,timeout);

alert("si si estoy aqui");

agregarComent("mce_7_ifr",json,solucion,timeout);



}//if













      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { tabs[0].url; chrome.tabs.update(tabs[0].id, { url: url }); });
      chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status === 'complete') {

          chrome.scripting.executeScript({
            target: { tabId: tabId }, func: function () {
              chrome.storage.local.get(["nocs","iVal","solucion"], function (result) {

                let json = result.nocs;
                let i = result.iVal;
                let solucion = result.solucion;
                let array = document.getElementsByClassName("trigger-label");
                let valBoton = document.getElementsByClassName("trigger-label")[4].innerText;
                let timeout = 3000;

                let summary = json[i].summary;
                let key = json[i].key;
                let asignado = json[i].assignee;

                let html = ` 
              
                <p>Estimado/a <a href="https://soporte.datasys.la/secure/ViewProfile.jspa?name=MonitoreoTI%40bp.fi.cr" class="user-hover" rel="MonitoreoTI@bp.fi.cr">Monitoreo BP (BP - Todo)</a>,</p>
                <p>Le informamos que se procede con el cierre del caso <a href="https://soporte.datasys.la/browse/${key}" 
                title="${summary}" class="issue-link" data-issue-key="${key}">${key}</a>, a continuación le indicamos un breve resumen del mismo,</p>
                <ul>
                <li><b>Descripción:</b>   
                <span class="sd-inline-noformat">${summary}</span></li>
                <li><b>Solución:</b>${solucion}</li>
                <li><b>Colaborador Datasys: <a class="user-hover" tabindex="-1" title="Seguir el enlace" contenteditable="false" href="/secure/ViewProfile.jspa?name=${asignado}" rel="${asignado}" data-mce-href="/secure/ViewProfile.jspa?name=${asignado}" data-mce-selected="1">${asignado}</a>
                </b></li>
    
    
                </ul><p>En caso de necesitar re-abrir el caso no dude en contactarnos y con gusto lo atenderemos,</p>
                <p>Saludos cordiales.</p><br data-mce-bogus="1"></p>
               
               `;
            
              
                 if (valBoton.includes("Solicitar informaci")) { 


                  console.log("LA REPETICION SIGUE AQUI "+html);


                  } else if (valBoton.includes("Requiere ayuda")) {


                    clickElement("trigger-label",5,3000).then((message) => { console.log(message); }).catch((error) => { console.error(error); });
                    clickXpath('//*[@id="sd-comment-tabs"]/li[2]/a',3000).then((message) => { console.log(message); }).catch((error) => { console.error(error); });

                    



                  } else if (valBoton.includes("Coordinar")) { 



                   }



                   function clickElement(id,indice,timeout) {
               
                    return new Promise((resolve, reject) => {
                     
                      const element = document.getElementsByClassName(id)[indice];
                   
                      if (element) {
                        element.click();
                        setTimeout(() => {
                          resolve(`El click se ha ejecutado y se ha esperado ${timeout} segundos`);
                        }, timeout); // Esperar 30 segundos
                      } else {
                        reject("No se encontró ningún elemento con la clase 'trigger-label'");
                      }
                    });
                  }
    
    
                 
    
                  function clickXpath(xpath, timeout) {
                    return new Promise((resolve, reject) => {
              
                      let element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                  
                      if (element) {
                        element.click();
                        setTimeout(() => {
                          resolve("El click se ha ejecutado y se ha esperado " + timeout + " segundos");
                        }, timeout); // Convertir el tiempo en segundos a milisegundos
                      } else {
                        reject("No se encontró ningún elemento con el xpath proporcionado");
                      }
                    });
                  }



              }); //local get
            }
          }); //scripting
        };  //if complete
      });//onloadedListener







    async function cerrarCasosNOC(json, i) {

      console.log(json);
      console.log(i);

        let url = `https://soporte.datasys.la/browse/${json[i].key}`;  
     //  let url = `https://soporte.datasys.la/browse/NOC-44529`;
      if (json[i].status.includes("Cerrado") ) {  //&& !url.includes("NOC-44529")
         
        document.getElementsByClassName("listText")[i].innerText = "Esta cerrado";
      
      }else{


        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        let tabPromise = new Promise((resolve) => {
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            resolve(tabs[0]);
          });
        });
        
        tabPromise.then((tab) => {
          chrome.tabs.update(tab.id, { url: url });
          chrome.tabs.onUpdated.addListener(function onTabUpdate(tabId, changeInfo, tab) {
            if (changeInfo.status === "complete" && tab.id === tabId) {
              
              chrome.tabs.onUpdated.removeListener(onTabUpdate);
              chrome.scripting.executeScript(
                {
                  target: { tabId: tabId },
                  func: function () {
                    // Coloque aquí todo el código de la función original
                    chrome.storage.local.get(["nocs","iVal","solucion"], function (result) {

                    let json = result.nocs;
                    let i = result.iVal;
                    let solucion = result.solucion;
                    let array = document.getElementsByClassName("trigger-label");
                    let valBoton = document.getElementsByClassName("trigger-label")[4].innerText;
                    let timeout = 3000;

                    console.clear();
                    console.log("La i es "+i);
                    console.log(json);
    
                    let summary = json[i].summary;
                    let key = json[i].key;
                    let asignado = json[i].assignee;
    
                    let html = ` 
                  
                    <p>Estimado/a <a href="https://soporte.datasys.la/secure/ViewProfile.jspa?name=MonitoreoTI%40bp.fi.cr" class="user-hover" rel="MonitoreoTI@bp.fi.cr">Monitoreo BP (BP - Todo)</a>,</p>
                    <p>Le informamos que se procede con el cierre del caso <a href="https://soporte.datasys.la/browse/${key}" 
                    title="${summary}" class="issue-link" data-issue-key="${key}">${key}</a>, a continuación le indicamos un breve resumen del mismo,</p>
                    <ul>
                    <li><b>Descripción:</b>   
                    <span class="sd-inline-noformat">${summary}</span></li>
                    <li><b>Solución:</b>${solucion}</li>
                    <li><b>Colaborador Datasys: <a class="user-hover" tabindex="-1" title="Seguir el enlace" contenteditable="false" href="/secure/ViewProfile.jspa?name=${asignado}" rel="${asignado}" data-mce-href="/secure/ViewProfile.jspa?name=${asignado}" data-mce-selected="1">${asignado}</a>
                    </b></li>
        
        
                    </ul><p>En caso de necesitar re-abrir el caso no dude en contactarnos y con gusto lo atenderemos,</p>
                    <p>Saludos cordiales.</p><br data-mce-bogus="1"></p>
                   
                   `;
                
                  
                     if (valBoton.includes("Solicitar informaci")) { 
    
    
                      console.log("LA REPETICION SIGUE AQUI "+html);
    
    
                      } else if (valBoton.includes("Requiere ayuda")) {
    
                        var interval = setInterval(clickButton("trigger-label",5), 100);
                        var interval2 = setInterval(clickXpath('//*[@id="sd-comment-tabs"]/li[2]/a'), 10);

                     
                      } else if (valBoton.includes("Coordinar")) { 
    
    
    
                       }//if
    


                       function clickXpath(xpath) {
                    
                        console.log("En el es pas");

                          let element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                          if (element) {
                             element.click(); 
                             console.log("Ya lo clickeó mano, el expath");
                             clearInterval(interval2);
                            }else{

                              console.log("No lo ha clickeado en el expath");
                            }
                    }
    

                 
                       function clickButton(id,index) {

                        console.log("En el click boton");

                        var button = document.getElementsByClassName(id)[index];
                        if (button) {
                           button.click();
                           console.log("Ya lo clickeó mano el click boton");
                         // clearInterval(interval);
                        }
                      }



                  });//storagelocal


                  },
                },
                function (results) {
                  console.log("El script se ha ejecutado en la pestaña actual");
                }
              );
            }
          });
        });
        

    }//cerrado





            let i = 0;
        let arrJson = result.nocs;

        const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio","julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const day = (new Date().getDate()-5).toString().padStart(2, '0');
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        let solucion =`Se realiza el cierre de los casos del 01 de ${monthNames[month]} al día ${day} de ${monthNames[month]} del ${year}`;
        chrome.storage.local.set({solucion:prompt("Defina la solución para los casos que se van a cerrar, una fecha de inicio de mes,fecha de final del mes y el año", solucion)});
    
        chrome.storage.local.set({ iVal: i });
        cerrarCasosNOC(arrJson, i);




        /*

        setInterval(() => {
          chrome.storage.local.set({ iVal: i }, function () {
       //     console.log("Datos almacenados correctamente");
         //   console.log("vuelta " + i);
       //     cerrarCasosNOC(arrJson, i);

            i += 1;
          });
        }, 15000);






---------------------------------------------------------------------------------------------------------------------------------








  
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

        <div id="excelContainer"  class="listContenedor">
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

      chrome.storage.sync.get(({ nocIrGmailList }) => {

        let text = `
       <center>
       <div>
       <input id="agregarIRs" class="selectForm3" type="button" value="Empezar gestion de agregado de IRs" >
       <input id="vaciarIRs" class="selectForm3" type="button"  value="Borrar Lista">
        <div>
        <h2><center>IRs para agregar</h2>
        <ul>`;
        if (nocIrGmailList.includes("N/A")) {
          text += `
          <p>No hay datos cargados, debe cargar los IR en el correo de gmail en la eltiqueta IRs, si no tiene una regla creada para que los IRs se guarden ahi, 
          creela primero y luego acceda siguiendo el siguiente link: <a href="https://mail.google.com/mail/u/0/#label/INBOX%2FIRs">ir a IRs de gmail</a></p>
          `;
        } else {
          for (let i = 0; i < nocIrGmailList.length; i++) { text += `<li> ${nocIrGmailList[i].noc} - ${nocIrGmailList[i].ir.replace("-", "").trim()} </li>`; }
        }
        text += `</ul>
        <br>     
        </div>
        </div>
        </center>
        `;
        document.getElementById("gm").innerHTML = text;


        document.getElementById("agregarIRs").addEventListener("click", () => {
          console.clear();
          let i = 0;

          setInterval(() => {
            chrome.storage.local.set({ iVal: i }, function () {
              console.log("Datos almacenados correctamente");
              console.log("vuelta " + i);
              agregarIrs(nocIrGmailList, i);
              i += 1;
            });
          }, 16000);
        });

      });


      chrome.storage.local.get("nocs", function(result) {

        console.log(result.nocs[0]);

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

              
      document.getElementById("cerrarCasos").addEventListener("click", () => {
        console.clear();
        let i = 0;
        let arrJson = result.nocs;
      
        setInterval(() => {
          chrome.storage.local.set({ iVal: i }, function () {
            console.log("Datos almacenados correctamente");
            console.log("vuelta " + i);
            cerrarCasosNOC(arrJson, i);

            i += 1;
          });
        }, 10000);


      });

        
      });




//---++++---------+-+-+--++-+-++-+-+-+-+--+- Sigue segment de vaciado de las listas -----xxx--x-x-x-x------------x-x--x-x-x--x-x-x--xx-x--x-x----------x

      document.getElementById("vaciarIRs").addEventListener("click", () => {

        if (confirm("Desea eliminar la lista de IRs para agregar??")) {
          chrome.storage.sync.set({ nocIrGmailList: "N/A" });

          text = `
          <center>
              <div>
               <input id="agregarIRs" class="selectForm3" type="button" value="Empezar gestion de agregado de IRs" >
               <input id="vaciarIRs" class="selectForm3" type="button"  value="Borrar Lista">
              <div>
        
                 <h2><center>IRs para agregar</h2>
                  <p>No hay datos cargados, debe cargar los IR en el correo de gmail en la eltiqueta IRs, si no tiene una regla creada para que los IRs se guarden ahi, 
                     creela primero y luego acceda siguiendo el siguiente link: <a href="https://mail.google.com/mail/u/0/#label/INBOX%2FIRs">ir a IRs de gmail</a>
                  </p>
                  <br>     
               </div>
             </div>
          </center>
           `;
          document.getElementById("gm").innerHTML = text;
        }

      });

  //Logica---o-----------------o--------------o-------------------o----------------o------------o-----------xxxx  


  async function cerrarCasosNOC(json,i) {

    console.log(json);
    console.log(i);

    let url = `https://soporte.datasys.la/browse/${json[i].key}`;

    let [tab] = await chrome.tabs.query({   active: true, currentWindow: true });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { tabs[0].url; chrome.tabs.update(tabs[0].id, { url: url }); });
    chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
      if (changeInfo.status === 'complete') {  

        chrome.scripting.executeScript({ target: {tabId: tabId}, func: function() {

          console.clear();

        let array =  document.getElementsByClassName("trigger-label");
        let valStatus="";
       
        for (let i = 0; i < array.length; i++) { if (array[i].innerText.includes("Re-abrir")) {  }
          
        }
       
        console.log(array[i].innerText);


        }}); //scripting


      };  //if complete
    });//onloadedListener
   }//fin cerrarCasosNoc
   

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
                
                   //   document.getElementById("summary-val").click();
                   setTimeout(() => {
                    document.getElementsByClassName("overlay-icon aui-icon aui-icon-small aui-iconfont-edit")[0].click();
                   }, 4000);
                


                   for (let j = 0; j < titulo.length; j++) { 
                   
                    if (j==titulo.length-1) { 
                      
                      temp +=irIssue;
                    
                    }else{
                      
                      temp += titulo[j]+" | ";
                    
                    
                    } 
                  
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


            function copiarContenidoAlPortapapeles(textoCaso) {
              // Eliminar etiquetas HTML del texto caso
              var textoLimpio = textoCaso.replace(/<[^>]+>/g, '');
            
              // Dividir el texto en líneas
              var lineas = textoLimpio.split('\n');
            
              // Eliminar espacios en blanco al inicio y final de cada línea
              lineas = lineas.map(function(linea) {
                return linea.trim();
              });
            
              // Unir las líneas con un salto de línea entre ellas
              var textoFormateado = lineas.join('\n');
            
              // Crear un elemento de texto oculto
              var elemento = document.createElement('textarea');
              elemento.value = textoFormateado;
            
              // Agregar el elemento al DOM
              document.body.appendChild(elemento);
            
              // Seleccionar el texto del elemento
              elemento.select();
            
              // Copiar el contenido al portapapeles
              document.execCommand('copy');
            
              // Eliminar el elemento del DOM
              document.body.removeChild(elemento);
            }
            
            
            copiarContenidoAlPortapapeles(textoCaso);




 */