document.getElementById("plantilla").addEventListener("dblclick", getPageInfo );

async function getPageInfo() {

let [tab] = await chrome.tabs.query({   active: true, currentWindow: true });

    if(tab.url.includes("https://monitoreo.datasys.la/") || tab.url.includes("https://172.31.242.11")){  /*if esta dentro del dominio de PRTG*/ 
    if(tab.url.includes("device.htm")){ await  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: setPRTGDeviceDispositivo, }); }
    if(tab.url.includes("sensor.htm")){ await  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: setPRTGSensorInfo, });}//if
   getPRTGSensorInfo("prtg");
  }/*if esta dentro del dominio de PRTG*/


  if(tab.url.includes("mail.google.com")){  //si se encuentra en Gmail del serviceDesk web
    await  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: getGmailSDIRInfo, });
    chrome.storage.sync.get(({ nocIrGmailList }) => { 
     let texto = `
     <center>
     <div>
      <div>
      <h2><center>Capturador IRs de casos BPD</h2>`;
        for (let i = 0; i < nocIrGmailList.length; i++) { texto += `<p> ${nocIrGmailList[i].noc} - ${nocIrGmailList[i].ir.replace("-","").trim()} </p>`; }
       texto +=` <br>     
      </div>
      </div>
      </center>
      `;
      document.getElementById("contenedorInterno").innerHTML = texto;
    });
}

  if (tab.url.includes("https://soporte.datasys.la/") ){ //Dentro del dominio de Jira


    function localizadorJira() {
      let jiraLocalizador="";

      let tipo = document.getElementById("type-val").innerText.trim();

      if ( tipo == "Solicitud de servicio" || tipo == "Incidentes" || tipo == "Requerimiento" || tipo == "Reemplazo de partes" ) {   

         jiraLocalizador = "casoEntrante"; 
         let noc = document.getElementById("key-val").innerText;
         let descripcion = document.getElementById("description-val").innerText;  
         let contacto = document.getElementById("customfield_10303-val").innerText; 
         let tel =" ( tel:";
         try {tel += document.getElementById("customfield_10310-val").innerText+")";}catch(error){ tel="";}
         let cliente ="";
         try {cliente =  document.getElementsByClassName("js_tooltip")[0].innerText; } catch (error) { console.log(error); }
      
         let proyecto =  document.getElementsByClassName("sd-organization-value")[0].innerText;
         let nSeveridad =   document.getElementById("customfield_10205-val").innerText;
         let categoria = tipo;
       
         let textoCaso =`<div class="cajaInfo2">
         Estimados     <br>                            
         Requerimos de su ayuda con el caso: <a style="color:yellow" href="https://soporte.datasys.la/browse/${noc}">NOC-${noc}</a> <br> 
         Descripción:        ${descripcion}                <br> 
         Contacto:           ${contacto}     ${tel}        <br> 
         Cliente:            ${cliente}                    <br> 
         Proyecto:           ${proyecto}                   <br> 
         Categoría:          ${categoria}                  <br> 
         Nivel de severidad: ${nSeveridad}         <br> 
         <br>
        <p>Quedamos a la espera de sus comentarios. 
        Muchas gracias.                             <br>  

         </div>`;

         chrome.storage.sync.set({textoCaso}); 

    }else if ( tipo == "Alerta") {  jiraLocalizador = "crearCaso";   }
        
         chrome.storage.sync.set({jiraLocalizador}); 

    }//func
    
  //  if (!tab.url.includes("SearchRequest.json") || !tab.url.includes("searchrequest-json")) { 
    if (!tab.url.includes("json") || !tab.url.includes(".json")) { 

  await  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: localizadorJira }); 
         chrome.storage.sync.get(({ jiraLocalizador }) => { 
      
         if (jiraLocalizador =="crearCaso") {     jiraPlantilla(); }
         if (jiraLocalizador =="casoEntrante") {  
        
          chrome.storage.sync.get(({ textoCaso}) => {

            function copiarAlPortapapeles(texto) {
              navigator.clipboard.writeText(texto)
                .then(() => {
                  console.clear();
                  console.log("Texto copiado al portapapeles: " + texto);
                })
                .catch((error) => {
                  console.clear();
                  console.error("Error al copiar al portapapeles: ", error);
                });
            }
            

            

            function copiarContenidoAlPortapapeles(textoCaso) {
              // Eliminar etiquetas HTML del texto caso
              var textoLimpio = textoCaso.replace(/<[^>]+>/g, '');
            
              // Dividir el texto en líneas
              var lineas = textoLimpio.split('\n');
            
              // Modificar cada línea
              lineas = lineas.map(function(linea) {
                // Buscar la ocurrencia de "NOC-<NUM>"
                var match = linea.match(/NOC-(\d+)/);
                if (match) {
                  // Reemplazar por el hipervínculo
                  var numeroNOC = match[1];
                  var enlace = 'soporte.datasys.la/browse/NOC-' + numeroNOC;
                  linea = linea.replace(/NOC-(\d+)/, numeroNOC+' ( '+enlace+' )');
                }
                return linea;
              });


              console.log(lineas);
              let arrTemp = [];
              for (let i = 0; i < lineas.length; i++) { arrTemp[i] = lineas[i].trim();}

              lineas = arrTemp;
            
              // Unir las líneas con un salto de línea entre ellas
              var textoFormateado = lineas.join('\n');
            
              // Crear un elemento de texto oculto
              var elemento = document.createElement('textarea');
              elemento.innerHTML = textoFormateado;
            
              // Agregar el elemento al DOM
              document.body.appendChild(elemento);
            
              // Seleccionar el texto del elemento
              elemento.select();
            
              // Copiar el contenido al portapapeles
              document.execCommand('copy');
            
              // Eliminar el elemento del DOM
              let texto = elemento;

              document.body.removeChild(elemento);

              return texto;

             
            }
            
            
            
            copiarContenidoAlPortapapeles(textoCaso);

          document.getElementById("contenedorInterno").innerHTML = `
  
          <style>
          .titulo{background: green; color: white; padding:1%; text-shadow:1px 1px 3px black; box-shadow:2px 2px 2px black;}
          </style>
         
          <h1 class="titulo"    >Plantilla de Caso entrante para Casos sin asignar</h1>
          <div id="nota"></div>
          <div class="contenido" style="user-select: none;" id="contenidoPlantilla" >${textoCaso}</div>
          `;

          document.getElementById('contenidoPlantilla').addEventListener('mouseover', () => {         
            document.getElementById('nota').innerHTML = `<h1>La plantilla ya fue copiada al portapapeles, peguelo en el grupo que quiera informar en Webex. (BPD-1834)</h1>`;
           });
        });
        }//if

      });

  //  }else if (tab.url.includes("SearchRequest.json")  || tab.url.includes("searchrequest-json")) { // Exportador de JSON a excel en Jira 
      }else if (tab.url.includes("json")) { // Exportador de JSON a excel en Jira 
      

        function jsonGet() {
          
          try { 

          chrome.storage.sync.get(({switcher}) => { 

          let json = JSON.parse(document.getElementsByTagName("pre")[0].innerHTML).projects[0].issues; 
      //  let jsonCompleto = JSON.parse(document.getElementsByTagName("pre")[0].innerHTML);

          console.log(switcher);

          const fecha = new Date();

              //incia function de exportar a excel

        let myExcelXML = (function() {
        let Workbook, WorkbookStart = '<?xml version="1.0"?><ss:Workbook  xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">';
        const WorkbookEnd = '</ss:Workbook>';
        let fs, SheetName = 'SHEET 1',
            styleID = 1, columnWidth = 80, fileName ="", uri, link;
    
            meses=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];

            if (switcher=="Reporte diario") { 
            fileName = `Reporte de casos creados de la sonda 1 y 2 ${fecha.getDate()}-${fecha.getMonth()}-${fecha.getFullYear()}`;
            }else
            if (switcher=="Reporte Llamadas") {
              fileName = `Reporte De llamadas (Reporte Diario ${fecha.getDate()} de ${meses[fecha.getMonth()]}  )  _${fecha.getDate()}-${fecha.getMonth()+(1)}-${fecha.getFullYear()}`;
            }

        class myExcelXML { 

          tablaXML;
            
            constructor(o) {
                let respArray = o;
                let finalDataArray = [];
                 

                for (let i = 0; i < respArray.length; i++) {
                    finalDataArray.push(flatten(respArray[i]));
                }
    
                let s = JSON.stringify(finalDataArray);

                fs = s.replace(/&/gi, '&amp;');
            }
    
            downLoad() {
                const Worksheet = myXMLWorkSheet(SheetName, fs);
                WorkbookStart += myXMLStyles(styleID);
                Workbook = WorkbookStart + Worksheet + WorkbookEnd;
                uri = 'data:text/xls;charset=utf-8,' + encodeURIComponent(Workbook);
                link = document.createElement("a");
                link.href = uri;
                link.style = "visibility:hidden";
                link.download = fileName + ".xls";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
    
            get fileName() { return fileName;  }
            set fileName(n) {  fileName = n;   }
            get SheetName() { return SheetName;}
            set SheetName(n) {  SheetName = n; }
            get styleID() {  return styleID; }
            set styleID(n) { styleID = n; }
        }
    
        const myXMLStyles = function(id) { let Styles = '<ss:Styles><ss:Style ss:ID="' + id + '"><ss:Font ss:Bold="1"/></ss:Style></ss:Styles>'; return Styles;  }
        const myXMLWorkSheet = function(name, o) {
            const Table = myXMLTable(o);
             tablaXML = Table;
            let WorksheetStart = '<ss:Worksheet ss:Name="' + name + '">';
            const WorksheetEnd = '</ss:Worksheet>';
    
            return WorksheetStart + Table + WorksheetEnd;
        }
    
        const myXMLTable = function(o) {
            let TableStart = '<ss:Table>';
            const TableEnd = '</ss:Table>';
    
            const tableData = JSON.parse(o);
    
            if (tableData.length > 0) {
                const columnHeader = Object.keys(tableData[0]);
                let rowData;
                for (let i = 0; i < columnHeader.length; i++) {
                    TableStart += myXMLColumn(columnWidth);
    
                }
                for (let j = 0; j < tableData.length; j++) {
                    rowData += myXMLRow(tableData[j], columnHeader);
                }
                TableStart += myXMLHead(1, columnHeader);
                TableStart += rowData;
            }
    
            return TableStart + TableEnd;
        }
    
        const myXMLColumn = function(w) {
            return '<ss:Column ss:AutoFitWidth="0" ss:Width="' + w + '"/>';
        }
    
    
        const myXMLHead = function(id, h) {
            let HeadStart = '<ss:Row ss:StyleID="' + id + '">';
            const HeadEnd = '</ss:Row>';
    
            for (let i = 0; i < h.length; i++) {
                const Cell = myXMLCell(h[i].toUpperCase());
                HeadStart += Cell;
            }
    
            return HeadStart + HeadEnd;
        }
    
        const myXMLRow = function(r, h) {
            let RowStart = '<ss:Row>';
            const RowEnd = '</ss:Row>';
            for (let i = 0; i < h.length; i++) {
                const Cell = myXMLCell(r[h[i]]);
                RowStart += Cell;
            }
    
            return RowStart + RowEnd;
        }
    
        const myXMLCell = function(n) {
            let CellStart = '<ss:Cell>';
            const CellEnd = '</ss:Cell>';
    
            const Data = myXMLData(n);
            CellStart += Data;
    
            return CellStart + CellEnd;
        }
    
        const myXMLData = function(d) {
            let DataStart = '<ss:Data ss:Type="String">';
            const DataEnd = '</ss:Data>';
    
            return DataStart + d + DataEnd;
        }
    
        const flatten = function(obj) {
            var obj1 = JSON.parse(JSON.stringify(obj));
            const obj2 = JSON.parse(JSON.stringify(obj));
            if (typeof obj === 'object') {
                for (var k1 in obj2) {
                  if (obj2.hasOwnProperty(k1)) {
                    if (typeof obj2[k1] === 'object' && obj2[k1] !== null) {  delete obj1[k1]
                    for (var k2 in obj2[k1]) {   if (obj2[k1].hasOwnProperty(k2)) {   obj1[k1 + '-' + k2] = obj2[k1][k2];  } }
                  }
                 }
                }
              
                var hasObject = false;
                for (var key in obj1) { if (obj1.hasOwnProperty(key)) { if (typeof obj1[key] === 'object' && obj1[key] !== null) {  hasObject = true; } } }
                if (hasObject) {  return flatten(obj1);  } else {  return obj1; }   
              
              } else {  return obj1; }
      
          }//func

        return myExcelXML;
    })();  //Fin function de exportar a excel

    let jsonExcel=[]

    for (let i = 0; i < json.length; i++) {
    /* delete  json[i].history;
       delete  json[i].watchers;
       delete  json[i].customFieldValues;  
       delete  json[i].priority; 
       delete  json[i].description;  */
         json[i].created = new Date(json[i].created).toLocaleDateString("en-US");
         json[i].updated = new Date(json[i].updated).toLocaleDateString("en-US");

       let arr = json[i].summary.split("|"); // el json de la pagina de jira

        //divide el resumen
      if(arr.length==5 && json[i].summary.includes("| IR")){ //normal con IR
        json[i].tipo = arr[0].trim();
        json[i].dispositivo = arr[1].trim();
        json[i].area = arr[2].trim();
        json[i].ir = arr[3].trim();
        json[i].issue = arr[4].trim();
      }else if(arr.length==4 && json[i].summary.includes("| IR")){ //servidor de externos con IR
        json[i].tipo = arr[0].trim().trim();
        json[i].dispositivo = arr[1].trim();
        json[i].area = "";
        json[i].ir = arr[2].trim();
        json[i].issue = arr[3].trim();

      }else if(arr.length==4 && !json[i].summary.includes("| IR")){ //normal sin IR
        json[i].tipo = arr[0].trim();
        json[i].dispositivo = arr[1].trim();
        json[i].area = arr[2].trim();
        json[i].ir = "";
        json[i].issue = arr[3].trim();
      }else if(arr.length==3 && !json[i].summary.includes("| IR")){ //servidor de externos sin IR
        json[i].tipo = arr[0].trim();
        json[i].dispositivo = arr[1].trim();
        json[i].area = "";
        json[i].ir = "";
        json[i].issue = arr[2].trim();
      }

     if (switcher=="Reporte diario") { 
        jsonExcel.push({NOC: json[i].key, Creada:json[i].created, Tipo: json[i].tipo, Dispositivo: json[i].dispositivo,  Area: json[i].area, IR: json[i].ir, Issue:json[i].issue });
      }else if (switcher=="Reporte Semanal") { 
        jsonExcel.push({Clave: json[i].key, Resumen: json[i].summary, Creada:json[i].created, Informador: json[i].reporter,  Estado: json[i].status, "Tipo de Incidencia": json[i].issueType  });   
      }else  if (switcher=="Reporte Llamadas") {

          let comentario = "";
          let horaLLamada ="";
          let contacto ="";
          let numero ="";
          let duracion="";
        
          try {
       
          if(json[i].comments.length>0) {
            
          if(!json[i].comments[0].body.trim() == "" || json[i].comments[0].body.trim().includes("Duración de llamadas")){
            
            comentario =  json[i].comments[0].body.split("|");
            horaLLamada = comentario[3].split("Hora de llamadas:")[1].replace("&nbsp;","").replace("a.m", '').replace("p.m", '').replace("am", '').replace("pm", '')+":00";
            duracion    = comentario[5].split("Duración de llamadas:")[1].replace (/[^0-9]/g, '');
            contacto    = comentario[9].split("Contactos:")[1].trim(); 
            numero      = comentario[7].split("Numeros:")[1].trim(); 
            detalle     = comentario[11].split("Comentarios:")[1].trim(); 
            
          }// if 

          function secondsToString(seconds) {

          if(seconds<0){  seconds = seconds*-1;} // si los segundos estan en negativo, se pasa a positivo *-1
            
            var hour = Math.floor(seconds / 3600);
            if(hour>0 && hour < 10){ hour ='0' + hour;}else if(hour > 10){ hour = hour;}
            if(hour>24){ hour= " dias "+(Math.floor(hour/24))+" ";   }
            
            var minute = Math.floor((seconds / 60) % 60);
                minute = (minute < 10)? '0' + minute : minute;
            var second = seconds % 60;
                second = (second < 10)? '0' + second : second;
            
                return hour + ':' + minute + ':' + second;
          }//func secondsToString
            
            function tiempoEnMinutos(sec) {//////////////////
            let min=0;
            if (sec < 0) {  sec = sec * (-1);}
            if (sec>=60) { min = sec/60;  }
            return min.toFixed(2);
            }//fin tiempoEnMinutos

          let alertada = new Date(json[i].updated);
          let creada =   new Date(json[i].created);

           alertada = json[i].updated.toLocaleString("es-ES",{ year: 'numeric', month: '2-digit', day: '2-digit' });
           creada =   json[i].created.toLocaleString("es-ES",{ year: 'numeric', month: '2-digit', day: '2-digit' });

 function formatoT(duracion){
      try {
      if(duracion.includes(":")){
        let tiempo = array[2].split(":");     
        for (let j = 0; j < tiempo.length; j++) {if (tiempo[j].length == 1) { tiempo[j] = "0"+tiempo[j];} }//for
        duracion = "0:"+(tiempo[0]+":"+tiempo[1]);
      }else{  duracion = secondsToString( duracion);  }
      } catch (error) { console.log("Error captado en includes (:)"); }
       return duracion;
   }//fin formatoT

           duracion = formatoT(duracion);
           jsonExcel.push({NOC: json[i].key, Creador :json[i].assignee, Creada:creada, "Hora de llamada": horaLLamada.replace("&nbsp;",""),
           Contacto:contacto, Numero: numero.replace("&nbsp;",""), Duracion: duracion, Dispositivo:  json[i].dispositivo, Issue: json[i].issue });
     
         }//if
       } catch (error) {  console.log("Caso sin comentarios"); }
    }//if
 }//for

      let myTestXML = new myExcelXML(jsonExcel);
      myTestXML.downLoad();

  })// chrome sync get

      } catch (error) { console.log("Exception: "+error);   }
        
        }//jsonGet

        document.getElementById("contenedorInterno").innerHTML = `
        
        <h1 class="apiJsonGet">Api Json to Excel v 2.4</h1>
        
        <div class="cajaInfo2">
        <h3>Exportación</h3>
        <p>Los datos se van a exportar a un excel y serán descargados automaticamente</p>
        <center>
        <input id="reporteDiario"   class="boton3"  type="button" value="Reporte diario">
        <input id="reportellamadas" class="boton3"  type="button" value="Reporte Llamadas">
        <input id="ListaNOCs" class="boton3"  type="button" value="Lista de NOCs">
        <div id="eleccion"></div>
        </center>
        </div>
        `;

      async function switcher(evt) {     

        document.getElementById("eleccion").innerHTML = `<br><div class="cajaInfo2"><h2>${evt.target.value}</h2></div>`;
          chrome.storage.sync.set({switcher : evt.target.value});
          await  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: jsonGet }); 
        }

      async  function cargadorNOCs() {

           if (confirm("Desea crear un Banco de NOCs para la aplicación de cierre de casos?")) {
              await  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: ()=>{
              let json = JSON.parse(document.getElementsByTagName("pre")[0].innerHTML).projects[0].issues; 
    
              chrome.storage.local.set({nocs: json});
              console.log(json);      
             }}); 
             alert("Se agregó el .JSON Los datos de los NOCs para el cierre de casos en el Jira Filter");
           }//if

        }//cargadorNOCs

        document.getElementById("reporteDiario").addEventListener("click",  switcher);
        document.getElementById("reportellamadas").addEventListener("click", switcher);
        document.getElementById("ListaNOCs").addEventListener("click", cargadorNOCs);
      

     }// jsonGet
     
} //getPRTGSensorInfo("jira");  if esta dentro del dominio Jira 
 

  if (tab.url.includes("8090/controller/") ){ //dominio AppDynamics    Veamos el dispo //  if (tab.url.includes("http://192.168.131.98:8090/") ){

     let urlAppCount = tab.url.trim().split("application=").length -1;
  
     if (urlAppCount>1 && !tab.url.trim().includes("APP_INCIDENT_DETAIL_MODAL")) {
   
   
    if(confirm("Se detectó que en la URL hay inconsistencias que podrían confundir el detector dinámico, por lo que la plantilla podría generarse con errores. Se va a redireccionar al dashboard principal para limpiar la URl de appDynamics, o redireccionar y actualizar \n\n Aceptar=Solo redireccionar | Cancelar=redireccionar y refrescar")){
    
    
    await  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: redir }); 
        function redir() { window.location.href = "http://192.168.131.98:8090/controller/#/location=APPS_ALL_DASHBOARD&timeRange=last_15_minutes.BEFORE_NOW.-1.-1.15";}

        }else{ //redirecciona y refresca
          await  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: redirRefresh }); 
          function redirRefresh() { window.location.href = "http://192.168.131.98:8090/controller/#/location=APPS_ALL_DASHBOARD&timeRange=last_15_minutes.BEFORE_NOW.-1.-1.15";
           location.reload();
          }
        }//if
      }//if

   let objeto = getApplicationNameById(tab.url);
   let html = {titulo:"", contenido:""}

  
   try {
      
   if(objeto.dispositivo.includes("Movil")){ objeto.dispositivo = "Banca Móvil";}

   } catch (error) {
       console.log("ERROR al intentar obtener datos. No se recibe ningun dispositivo "+error);
   }
  
   if (tab.url.includes("SERVER_LIST_PAGINATED")) { //en servidores  
           if(objeto != undefined){  html.titulo = `AppDynamics Server List ${objeto.dispositivo} `;} else{html.titulo =`AppDynamics Server List`;}
 
    }else if( tab.url.includes("SERVER_MONITORING_MACHINE_OVERVIEW")){  html.titulo = `Server OverView ${objeto.parent} ${objeto.dispositivo} `; 
 
 }else  

 if (tab.url.includes("APPS_ALL_DASHBOARD")) {  html.titulo = "AppDynamics Dashboard Insights";}else
 if (tab.url.includes("DB_MONITORING_SERVER_LIST")) {   html.titulo = "DataBase Sever List";}else

 if (tab.url.includes("APP_INFRASTRUCTURE")) {  //Detecta multiples alertas para activar plantilla multiple
  
  /* en el tears and nodes */  html.titulo = `App Tiers and Nodes (${objeto.dispositivo})`; 
    await  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: getFromAppDynamicsTiersAndNodesBusinessTransactionsGlobal}); 
    chrome.storage.local.get(["jsonEventos"]).then((data) => {   interpretadorListaGlobal(data.jsonEventos);   jsonEventos=""; chrome.storage.local.set({jsonEventos}).then(() => { }); });
  

}else

 if (tab.url.includes("APP_DASHBOARD")) { /* en el dashboard de un aplicativo */ html.titulo = `App Dashboard (${objeto.dispositivo})`;}else
 if( tab.url.includes("APP_BT_LIST")){ 
  

  /*detalle de businessTransaction*/ html.titulo = `BusinessTransactions LIST (${objeto.dispositivo}) `;
  await  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: getFromAppDynamicsTiersAndNodesBusinessTransactionsGlobal}); 
  chrome.storage.local.get(["jsonEventos"]).then((data) => {   interpretadorListaGlobal(data.jsonEventos);   jsonEventos=""; chrome.storage.local.set({jsonEventos}).then(() => { }); });

}else 

 if( tab.url.includes("APP_BT_")){ /* detalle de businessTransaction */  html.titulo = `BusinessTransaction Details (${objeto.dispositivo}) `; }else
 if( tab.url.includes("APP_SNAPSHOT_VIEWER")){ /* modal de informacion de Business transaction */
  
  // html.titulo = `SnapShot Viewer ${objeto.dispositivo} `;

  let parentServer = true;
   if(objeto != undefined){ html.titulo = `APP_SNAPSHOT_VIEWER ${objeto.dispositivo} `;}else{ html.titulo = `APP_SNAPSHOT_VIEWER`; parentServer= false;  }

    await  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: getFromAppDynamicsBusinessTransaction }); 
    chrome.storage.sync.set({objeto });
    getAppDynamicsSensorInfo("appDynamics",parentServer);

}else  if( tab.url.includes("APP_INCIDENT_DETAIL_MODAL")){ //modal de informacion de Business transaction

 let parentServer = true;
 
 chrome.storage.sync.set({
  tipoAlerta:"", 
  dispositivoAsociado: "",
  hora:"", 
  detalleAfectacion:"", 
  posibleOrigen:"",
  posiblesSoluciones:"",
  issue:"",
  bd:"",
 });

 if(objeto != undefined){ html.titulo = `Incident Detail Modal ${objeto.dispositivo} `;}else{ html.titulo = `Incident Detail Modal`; parentServer= false;  }

  await  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: getFromAppDynamicsValues }); 
  chrome.storage.sync.set({objeto });
  getAppDynamicsSensorInfo("appDynamics",parentServer);
 
 }else{   html.titulo = `Unknown Location`;  } 

//-------------------------------------------------------------------------------------------

function interpretadorListaGlobal(jsonEventos) {
  
  console.log("viendo los datos");
  console.log(jsonEventos);

     try {
      
      chrome.storage.sync.set({  plantillaMultiple: false  });
      let htmlBoton = "none";
      if(jsonEventos.length>0){ htmlBoton="inline";   }
       let html=`<div id="lista1" class="cajaInfo2" style="background:black">
                 <center>
                 <input id="alertasGlobal" style="display:${htmlBoton}" type="button" value="Agregar a la plantilla" title="Agregar a la plantilla " />
                 </center>
                 <h3>Detalle de lista de alertas </h3>`;
       let html2 = "";
       let dispositivos=[];

       for (let i = 0; i < jsonEventos.length; i++) {
         let alerta="";
         let backgound ="";

         try {

          
         if(jsonEventos[i][0].tipo.includes("critical")){

          alerta="critica";
          backgound="background:red; color: white;";

         }else if(jsonEventos[i][0].tipo.includes("warning")){

           alerta="Evento";
           backgound="background:yellow; color:black";

         }
          
         } catch (error) {
          console.log(error);
         }

 
         html +=`<div class="cajaInfo2" style="${backgound}; "> ${jsonEventos[i][0].valor}  | ${jsonEventos[i][1].valor}  | ${alerta}</div>`;
         html2 +=`<p>${jsonEventos[i][0].valor}</p>`;
         dispositivos.push(jsonEventos[i][0].valor);

       }

       console.log(dispositivos);
    
       html +=`</div>
         <br>
         <div id="lista2" class="cajaInfo2" style="background:black">
         <h3>Copia Manual</h3><br>
         <h4>También puede copiar manualmente los dispositivos o BusinessTransaction y pegarlos en la plantilla una vez que esté en Jira</h4>
         ${html2}
         </div>
       `;

      document.getElementById("contenedorInterno").innerHTML = html;
      document.getElementById("alertasGlobal").addEventListener("click", () => { //activa booleano de plantilla multiple
        let plantillaMultiple = true;
       chrome.storage.sync.set({  plantillaMultiple, jsonEventos: dispositivos });  
       document.getElementById("lista1").innerHTML = "<p style='text-align:center'>Los datos fueron agregados</p>";
       document.getElementById("lista2").innerHTML = "";
      });

     } catch (error) {
      
       console.log(error);
      
     }
}

function getFromAppDynamicsTiersAndNodesBusinessTransactionsGlobal() {// extrae datos multiples de varias alertas en los nodos


  let arrEventos = document.getElementsByClassName("adsSvgIconSmall adsCursorPointer columnHeath"); 
  let jsonEventos = []
  let tabla = document.getElementById("gridview-7484-body");
  let trColeccion = document.getElementsByTagName("tr"); 
  let tdColeccion = document.getElementsByTagName("td"); 
//  let thTabla = document.getElementById("headercontainer-7475-innerCt").innerText.split("\n");
  let thTabla = document.getElementsByClassName("x-grid-header-ct x-docked x-grid-header-ct-default x-docked-top x-grid-header-ct-docked-top x-grid-header-ct-default-docked-top x-box-layout-ct")[0].innerText.split("\n");
  
  console.log("titulos de tabla");
  console.log(thTabla);

  for (let i = 0; i < trColeccion.length; i++) { //tomando la informacion de alertas globalmente
    if (trColeccion[i].innerHTML.includes("critical.svg") || trColeccion[i].innerHTML.includes("warning.svg")) { 
      let tipo= "";
    if(trColeccion[i].innerHTML.includes("critical.svg")){tipo="images/health/critical.svg";}else if(trColeccion[i].innerHTML.includes("warning.svg")){ tipo="images/health/warning.svg"}
      let  jsonTr = trColeccion[i].innerText.split("\n\t\n");
      jsonEventos.push([]);
     for (let j = 0; j < jsonTr.length; j++) { 

      jsonEventos[jsonEventos.length-1].push({descripcion: thTabla[j], valor: jsonTr[j], tipo});
    
    }//j
   }//if
  }//i    

 // console.log(jsonEventos);
 // chrome.storage.sync.set({jsonEventos}); // se guardan en un Storage de google
  chrome.storage.local.set({jsonEventos}).then(() => {
  console.log(jsonEventos);

   });


 }//func  getFromAppDynamicsTiersAndNodesBusinessTransactionsGlobal


function getFromAppDynamicsBusinessTransaction() {
  
let arr = document.getElementsByTagName("span");
let hora="";
 for (let i = 0; i < arr.length; i++) { if (arr[i].innerText.toUpperCase().includes("(AGENT)")) { hora =  arr[i].innerText.replace("(agent)","").split("server)")[1].trim(); } }
arr  = document.getElementsByClassName("ads-display-table-cell ads-snapshot-data-value-padding adsLinkText ng-binding ng-scope");

let nodo = arr[0].innerText;
let dispositivo = nodo.split("-")[0]+"-"+nodo.split("-")[1];
let tier = arr[1].innerText;
let businessTransaction = arr[2].innerText;
let tipoAlerta ="";
let divImg = document.getElementsByClassName("ads-display-table-cell  ads-img-icon");

for (let i = 0; i < divImg.length; i++) {  //images/health/critical.svg

  if ( divImg[i].innerHTML.includes("images/health/critical.svg") || 
       divImg[i].innerHTML.includes("images/health/verySlow.svg") ||
       divImg[i].innerHTML.includes("images/health/stall.svg")    || 
       divImg[i].innerHTML.includes("images/health/normal.svg")
       ) {
           tipoAlerta ="INCIDENTE";
           break;
  }else if ( divImg[i].innerHTML.includes("images/health/warning.svg")){
           tipoAlerta ="EVENTO DE MONITOREO ORDINARIO";
           break;
  }
 
}//for

if(document.getElementsByClassName("adsInlineBlock ads-summary-font ads-snapshot-data-label-text ng-binding")[0].innerText.includes("More")){
   document.getElementsByClassName("adsInlineBlock ads-summary-font ads-snapshot-data-label-text ng-binding")[0].click();
}

let error = document.getElementsByClassName("ads-snapshot-summary-line ads-snapshot-data-value-padding ads-snapshot-data-value-text ng-binding")[5].innerText;
let detalleAfectacion =`Se presentan tiempos muy lentos en el Nodo: <strong>${nodo}</strong>, Tier: <strong>${tier}</strong>, Bussiness Transaction:<strong class="mark">${businessTransaction}</strong>. Tomar precauciones ya que podría convertirse en un incidente. Error <strong>${error}</strong>`;
let posibleOrigen =`Problemas en los tiempos del nodo los cuales son muy lentos.`;
let posiblesSoluciones="Verificar la respuesta lenta del nodo al consultar la URL o cuales procesos presentan estos inconvenientes.";

chrome.storage.sync.set({tipoAlerta, dispositivoAsociado: dispositivo,hora, detalleAfectacion, posibleOrigen,posiblesSoluciones,issue: "BUSINESS TRANSACTION",bd:false });

console.log(hora);
console.log(nodo);
console.log(dispositivo);
console.log(tier);
console.log(businessTransaction);
console.log(error);
console.log(detalleAfectacion);
console.log(posibleOrigen);
console.log(posiblesSoluciones);
console.log(tipoAlerta);

}

function getFromAppDynamicsValues() { 
  

    let arr  = document.getElementsByClassName("ads-display-table-cell ads-vertical-align ng-binding");
    let hora = "";
    for (let i = 0; i < arr.length; i++) { if( arr[i].innerText.includes("/") && arr[i].innerText.includes("-")){ hora = arr[i].innerText.split("-")[1]; };}
    
 //   let retraso = arr[10].innerText.replace("(Ongoing)","");
    let textoPuro = document.getElementsByClassName("ads-timeline-grid-summary ads-readable-text-line-height ads-expanded")[0].innerText;
    let textoPuroArr = textoPuro.split(" ");
    let texto  = document.getElementsByClassName("ads-timeline-grid-summary ads-readable-text-line-height ads-expanded")[0].innerText.replace("."," | ");
    arr = texto.split(" ");
    
    console.log("Mostrando info"); 
   console.log(arr);  //VP011-R17WEB02-MS_POS02

    let unaVez= true;
    let issueDetected = ""; 
    let issue="";
    let img = document.getElementsByClassName("ads-timeline-grid-title"); 

    let tipoAlerta = "";
    let detalleAfectacion ="";
    let posibleOrigen ="";
    let posiblesSoluciones="";
    let nodo ="";
    let tier="";
    let error="";
    let dispositivo="";
    let businessTransaction="";
    let value ="";
    let bd=false;
    
    //obtiene el tipo de alerta

    if(texto.includes("started")){     issueDetected = texto.split("|")[1].split("started")[0];    } 
    if(texto.includes("upgraded")){    issueDetected = texto.split("|")[1].split("upgraded")[0];   } 
    if(texto.includes("downgraded")){  issueDetected = texto.split("|")[1].split("downgraded")[0]; }
    if(texto.includes("BP-Business Transaction Average Response VP0118-R17WEB02-MS_POS02")){     issueDetected = "Business Transaction Average Response"; } 
    if(texto.includes("/WB_PagoServicios/frmError")){  issueDetected = "VP9999-PSEWEB05-PSE_PoolWeb-Default Web Site/WB_PagoServicios"; }

    for (let i = 0; i < img.length; i++) { 
    if(img[i].innerHTML.includes("img ng-")){  
      tipoAlerta = img[i].innerHTML;    
      
      if(tipoAlerta.includes("images/health/critical.svg")){  tipoAlerta= "INCIDENTE";  } 
      if(tipoAlerta.includes("images/health/warning.svg")){   tipoAlerta= "EVENTO DE MONITOREO ORDINARIO";     }
      if(tipoAlerta.includes("images/health/critical.svg") && texto.toUpperCase().includes("BUSINESS TRANSACTION") ){   tipoAlerta= "EVENTO DE MONITOREO CRITICO";    }//POS
    }} //fin for Obtiene tipo de evento

    //si la alerta tiene nodo se obtiene el valor, normalmente no hay nodo cuando el fallo es por businessTransaction
    for (let i = 0; i < arr.length; i++) {  if (arr[i].toUpperCase().includes("NODE") && unaVez) { nodo= arr[i+1];  unaVez=false;  } }
    for (let i = 0; i < textoPuroArr.length; i++) {   //si es un server
    
    if (textoPuroArr[i].toUpperCase().includes("SERVER") && unaVez) {  //obtiene nombre de base de datos
      if (  textoPuro.toUpperCase().includes("DB SERVER")  ) { bd=true; }  
      if (arr[i+2].includes("fp")) { dispositivo = arr[i+(1)]+""+arr[i+(2)]+""+arr[i+(4)];  unaVez=false;  }else{ dispositivo = arr[i+1];  unaVez=false;  }  
      }}
      //Si la alerta es por businessTransaction
    if (texto.toUpperCase().includes("BUSINESS TRANSACTION")) {  businessTransaction = textoPuro.split(" ")[8].split("\n")[0];} //obtiene el nombre de business
     //Si hay value obtiene el valor del pocentaje
    if(textoPuro.includes("value")){ value = (Math.trunc(textoPuro.split("value")[1].split(" ")[1]))+"%";  }

    //si el nodo contiene Default y espacio los unifica en nodoCompleto
    try {
      let nodoCompleto="";
      let partNodo=nodo.split("-");  
      let permiso = false;
      if (partNodo[2].includes("Default")) {
         for (let i = 0; i < arr.length; i++) { 
          if(arr[i].includes("-Default")){ permiso= true; }else if(arr[i].trim() == "|"){ permiso=false; break;}
          if(permiso){ nodoCompleto+=arr[i]+" ";  }
         }//for
         nodo=nodoCompleto;
      }//if
  
    } catch (error) {
      console.log(error);
    }
 

    //Clasificamos los posibles errores ...

    chrome.storage.local.get(["causasCPU",
                              "solucionesCPU",
                              "causasBloqueoPOS",
                              "solucionesBloqueoPOS",
                              "causasCargasAltasRAM",
                              "solucionesCargasAltasRAM",
                              "causasBT",
                              "solucionesBT",
                              "causasAlertasAlmacenamiento",
                              "solucionesAlertasAlmacenamiento",
                              "causasProblemasDisponibilidad",
                              "solucionesProblemasDisponibilidad",
                              "causasIndisponibilidadAgente",
                              "solucionesIndisponibilidadAgente",
                              "causasBrokenPipe",
                              "solucionesBrokenPipe",
                              "solucionesBrokenPipe",
                              "causasCLRGarbage"
                            ], function(result) {  

      let causasCPU = result.causasCPU;  
      let solucionesCPU = result.solucionesCPU;
      let causasBloqueoPOS = result.causasBloqueoPOS;
      let solucionesBloqueoPOS = result.solucionesBloqueoPOS;
      let causasCargasAltasRAM = result.causasCargasAltasRAM;
      let solucionesCargasAltasRAM = result.solucionesCargasAltasRAM;
      let causasBT = result.causasBT;
      let solucionesBT = result.solucionesBT;
      let causasAlertasAlmacenamiento = result.causasAlertasAlmacenamiento;
      let solucionesAlertasAlmacenamiento = result.solucionesAlertasAlmacenamiento;
   //   let causasProblemasDisponibilidad = result.causasProblemasDisponibilidad;
   //   let solucionesProblemasDisponibilidad = result.solucionesProblemasDisponibilidad;
      let causasIndisponibilidadAgente = result.causasIndisponibilidadAgente;
      let solucionesIndisponibilidadAgente = result.solucionesIndisponibilidadAgente;
      let causasBrokenPipe = result.causasBrokenPipe;
      let solucionesBrokenPipe = result.solucionesBrokenPipe;


    if(issueDetected.toUpperCase().includes("BP-POS DISMINUCIÓN DE LLAMADOS")){ 
      issue = "BP-POS Disminución de llamados"; 
      detalleAfectacion =`Se presentan tiempos muy lentos en el Nodo:${nodo}, Tier: ${tier}, Bussiness Transaction: <strong class="mark">${businessTransaction}</strong>. Tomar precauciones ya que podría convertirse en un incidente. Error ${error}`;
      posibleOrigen =causasBT[Math.floor(Math.random() * causasBT.length)];  
      posiblesSoluciones=solucionesBT[Math.floor(Math.random() * solucionesBT.length)]; 
    }

    if(issueDetected.toUpperCase().includes("BUSINESS TRANS")){ 
      issue = "BUSINESS TRANSACTION"; 
      detalleAfectacion =`Se presentan tiempos muy lentos en el Nodo: <strong class="mark">${nodo}</strong> , Tier: ${tier}, Bussiness Transaction:<strong class="mark">${businessTransaction}</strong>. Tomar precauciones ya que podría convertirse en un incidente. Error ${error}`;
      posibleOrigen =causasBT[Math.floor(Math.random() * causasBT.length)];  
      posiblesSoluciones=solucionesBT[Math.floor(Math.random() * solucionesBT.length)]; 
    }

    if(issueDetected.toUpperCase().includes("MACHINE AVAILABILITY") || issueDetected.toUpperCase().includes("SERVER ENABLED")){    
      let arrNodo=nodo.split("-");  
      dispositivo = arrNodo[0]+"-"+arrNodo[1];
      tier = arrNodo[2];
      issue = "INDISPONIBILIDAD DEL AGENTE";  
      detalleAfectacion=`Presenta afectación en la <strong class="mark">disponibilidad de los agentes</strong> en Appdynamics del servidor <strong>${dispositivo}</strong>.`;
      posibleOrigen= causasIndisponibilidadAgente[Math.floor(Math.random() * causasIndisponibilidadAgente.length)]; //"Problemas en la conectividad de los agentes.";
      posiblesSoluciones= solucionesIndisponibilidadAgente[Math.floor(Math.random() * solucionesIndisponibilidadAgente.length)]; //"Verificar los agentes para determinar la causa de la indisponibilidad.";
      if(tipoAlerta=="INCIDENTE"){ tipoAlerta="EVENTO DE MONITOREO CRITICO";}
    } 

    if(issueDetected.toUpperCase().includes("CONNECTIVITYEXCEPT")){ 
      let arrNodo=nodo.split("-"); 
      dispositivo = arrNodo[0]+"-"+arrNodo[1];
      tier = arrNodo[2];     
      issue = "ConnectivityException";  
      detalleAfectacion=`Se presentan tiempos muy lentos en el Nodo: <strong>${nodo}</strong> del dispositivo: <strong>${dispositivo}</strong> tier: <strong>${tier}</strong> Error: <strong>${issue}</strong>`;
      posibleOrigen =causasBT[Math.floor(Math.random() * causasBT.length)];  
      posiblesSoluciones=solucionesBT[Math.floor(Math.random() * solucionesBT.length)]; 
    }

    if(issueDetected.toUpperCase().includes("MEMOR") ){    
      let arrNodo=nodo.split("-");  
      if(!dispositivo.includes("fp") && !bd ){ dispositivo = arrNodo[0]+"-"+arrNodo[1]; tier = arrNodo[2];  }           
       issue = "RAM";  
       let textoYTier = "tier:"+tier;
       let nodoTexto =  "Nodo: <strong>"+dispositivo+"-"+tier+" </strong>";
       try {  if(tier.trim()==""){textoYTier="";} } catch (error) { tier=""; textoYTier=""; nodoTexto="" }
       if (dispositivo.includes("SISBI")) { nodoTexto="";}
       detalleAfectacion=`El uso de la <strong class="mark">Memoria RAM</strong> del dispositivo <strong>${dispositivo}</strong> <strong> ${textoYTier} </strong>  ${nodoTexto} sobrepasa el límite de uso en <strong class="mark">${value}</strong>`;
       posibleOrigen=causasCargasAltasRAM[Math.floor(Math.random() * causasCargasAltasRAM.length)]; 
       posiblesSoluciones=solucionesCargasAltasRAM[Math.floor(Math.random() * solucionesCargasAltasRAM.length)];
       if(tipoAlerta=="INCIDENTE"){ tipoAlerta="EVENTO DE MONITOREO CRITICO";}
  
    }

    if(issueDetected.toUpperCase().includes("JAVA.LANG")){  
      let arrNodo=nodo.split("-");  
      if(!dispositivo.includes("fp") && !bd ){ dispositivo = arrNodo[0]+"-"+arrNodo[1]; tier = arrNodo[2];  }      
      let ubicacion="";
      if(arrNodo[0].includes("0118")){ubicacion="Codisa" }else if(arrNodo[0].includes("0200")){ ubicacion="Monte Piedad";}            
       issue = "java.lang.ClassCastException";  
       detalleAfectacion=`Se presenta alerta de <strong class="mark">${issue}</strong> en el dispositivo <strong>${dispositivo}</strong> de <strong>(${ubicacion})</strong> en el manejado (NODO): <strong>${nodo}</strong> en el tier <strong>${tier}</strong>`;
       posibleOrigen =causasBT[Math.floor(Math.random() * causasBT.length)];  
       posiblesSoluciones=solucionesBT[Math.floor(Math.random() * solucionesBT.length)]; 
  
    }

    if(issueDetected.toUpperCase().includes("PROCESAMIENTO UTILIZADO")){ 
      let arrNodo=nodo.split("-"); 
      if(!dispositivo.includes("fp") && !bd ){ dispositivo = arrNodo[0]+"-"+arrNodo[1]; tier = arrNodo[2];  }       
      console.log("Veamos el dispo "+dispositivo);    
      issue = "CPU"; 
      detalleAfectacion=`La carga de <strong class="mark">CPU</strong> en el dispositivo <strong>${dispositivo}</strong> se encuentra en un <strong class="mark">${value}</strong>`;
      posibleOrigen= causasCPU[Math.floor(Math.random() * causasCPU.length)]; 
      posiblesSoluciones= solucionesCPU[Math.floor(Math.random() * solucionesCPU.length)]; 
      if(tipoAlerta=="INCIDENTE"){ tipoAlerta="EVENTO DE MONITOREO CRITICO";}
    }
    
    if(issueDetected.toUpperCase().includes("DISK USAGE")){ 
      let arrNodo=nodo.split("-"); 
      if(!dispositivo.includes("fp")  && !bd){ dispositivo = arrNodo[0]+"-"+arrNodo[1]; tier = arrNodo[2];  }
      issue = "ALMACENAMIENTO"; 
      let unidad = "";
      if(textoPuro.includes("Hardware Resources")){unidad = textoPuro.split("Condition")[1].replace("Hardware Resources|Volumes|","").replace("|Used (%)'s"," "); } 
      detalleAfectacion=`el porcentaje de <strong class="mark">espacio disponible</strong> esta por encima del umbral de almacenamiento establecido en el dispositivo <strong>${dispositivo}</strong> en la unidad: <strong>${unidad}</strong> `;
      posibleOrigen= causasAlertasAlmacenamiento[Math.floor(Math.random() * causasAlertasAlmacenamiento.length)];//"Insuficiente espacio de almacenamiento en la partición. Muchos archivos/datos generaron que la partición se llenara, superando el umbral establecido.";
      posiblesSoluciones= solucionesAlertasAlmacenamiento[Math.floor(Math.random() * solucionesAlertasAlmacenamiento.length)];//"Ampliar el almacenamiento de la partición. Liberar espacio de almacenamiento. Eliminar los datos innecesarios. Migrar datos a otra partición.";
      if(tipoAlerta=="INCIDENTE"){ tipoAlerta="EVENTO DE MONITOREO CRITICO";}
    }  

    if(issueDetected.toUpperCase().includes("BROKEN PIPE")){      
      let arrNodo=nodo.split("-");  
      dispositivo = arrNodo[0]+"-"+arrNodo[1];
      let ubicacion="";
      if(arrNodo[0].includes("0118")){ubicacion="Codisa" }else if(arrNodo[0].includes("0200")){ ubicacion="Monte Piedad";}  
      tier = arrNodo[2];    
      issue = "Broken Pipe";  
      detalleAfectacion=`Se presenta alerta de <strong class="mark">BROKEN PIPE</strong> en el dispositivo <strong>${dispositivo}</strong> de <strong>(${ubicacion})</strong> en el manejado (NODO): <strong>${nodo}</strong> tier: <strong>${tier}</strong>`;
      posibleOrigen= causasBrokenPipe[Math.floor(Math.random() * causasBrokenPipe.length)];//`Este problema se produce cuando la solicitud se interrumpe desde el lado del cliente. El navegador cerró el socket antes de que la respuesta fuera enviada completamente.`;
      posiblesSoluciones= solucionesBrokenPipe[Math.floor(Math.random() * solucionesBrokenPipe.length)]; //"Verificar la respuesta lenta del nodo al consultar la URL o cuales procesos presentan estos inconvenientes.";
    } 

    if(issueDetected.toUpperCase().includes("CLR GARBAGE")){      
      let arrNodo=nodo.split("-");  
      dispositivo = arrNodo[0]+"-"+arrNodo[1];
      let ubicacion="";
      if(arrNodo[0].includes("0118")){ubicacion="Codisa" }else if(arrNodo[0].includes("0200")){ ubicacion="Monte Piedad";}  
      tier = arrNodo[2];    
      issue = " CLR Garbage Collection";  
      detalleAfectacion=`<strong class="mark">CLR Garbage Collection Time is too high</strong>, la recolección de basura sobrepasa el límite (Desbordamiento de pila) en <strong>${dispositivo}</strong> NODO <strong>${nodo}</strong>, tier <strong>${tier}</strong>`;
      posibleOrigen=`El desbordamiento de memoria se excede lo que puede proporcionarle, que el sistema no puede satisfacer la demanda, por lo que se desborda.`;
      posiblesSoluciones="Re configuración de tamaño de memoria de almacenamiento dinámico";
    } 

    if(issueDetected.toUpperCase().includes("JVM HEAP")){      
      let arrNodo=nodo.split("-");  
      dispositivo = arrNodo[0]+"-"+arrNodo[1];
      let ubicacion="";
      if(arrNodo[0].includes("0118")){ubicacion="Codisa" }else if(arrNodo[0].includes("0200")){ ubicacion="Monte Piedad";}  
      tier = arrNodo[2];    
      issue = "JVM HEAP";  
      detalleAfectacion=`<strong class="mark">BP-JVM Heap</strong> sobrepasa el límite de uso en un <strong>${value}</strong>`;
      posibleOrigen=`Alto consumo de la memoria de la Máquina Virtual de Java`;
      posiblesSoluciones="Moderar la carga de trabajo o procesos realizándose.";
    } 

    if(issueDetected.toUpperCase().includes("JVM GARBAGE")){      
      let arrNodo=nodo.split("-");  
      dispositivo = arrNodo[0]+"-"+arrNodo[1];
      let ubicacion="";
      if(arrNodo[0].includes("0118")){ubicacion="Codisa" }else if(arrNodo[0].includes("0200")){ ubicacion="Monte Piedad";}  
      tier = arrNodo[2];    
      issue = "JVM GARBAGE";  
      detalleAfectacion=`<strong class="mark">BP-JVM Garbage</strong> la recolección de basura sobrepasa el límite (Desbordamiento de pila)`;
      posibleOrigen=`El desbordamiento de memoria de Java es que la memoria que solicitó asignar excede el sistema que puede proporcionarle, el sistema no puede satisfacer la demanda, por lo que se desborda.`;
      posiblesSoluciones="Re configuración de tamaño de memoria de almacenamiento dinámico";
    } 

    if(nodo.toUpperCase().includes("VP0118-R17WEB02-MS_POS02") && !texto.includes("Memory")){ 
      let arrNodo="VP0118-R17WEB02-MS_POS02".split("-");  
      dispositivo = arrNodo[0]+"-"+arrNodo[1];
      let ubicacion="";
      if(arrNodo[0].includes("0118")){ubicacion="Codisa" }else if(arrNodo[0].includes("0200")){ ubicacion="Monte Piedad";}  
      tier = arrNodo[2];    
      let afectacion = "Number of Very Slow";
      for (let i = 33; i < arr.length; i++) {  afectacion += " "+arr[i]; }
      error = afectacion;
      issue = "BUSINESS TRANSACTION"; 
      detalleAfectacion =`Se presentan tiempos muy lentos en el Nodo: <strong>${nodo}</strong> , Tier: ${tier}, Bussiness Transaction: <strong class="mark">	BP-JMS Java MS_POS</strong>. Tomar precauciones ya que podría convertirse en un incidente. Error ${error}`;
      posibleOrigen =causasBT[Math.floor(Math.random() * causasBT.length)];  
      posiblesSoluciones=solucionesBT[Math.floor(Math.random() * solucionesBT.length)]; 

      if(texto.includes("Business Transaction")){
        alert(`Se ha detectado el Nodo: VP0118-R17WEB02-MS_POS02, está llenando la plantilla desde el modal de información básica de la alerta, para brindar mejor información obtenga los datos desde el overview del modal del DrillDown`);
      }
    } 
  
    if(issueDetected.includes("VP9999-PSEWEB05-PSE_PoolWeb-Default Web Site/WB_PagoServicios")){      
      let arrNodo="VP9999-PSEWEB05-PSE_PoolWeb-Default Web Site/WB_PagoServicios".split("-");  
      dispositivo = arrNodo[0]+"-"+arrNodo[1];
      let ubicacion="";
      if(arrNodo[0].includes("0118")){ubicacion="Codisa" }else if(arrNodo[0].includes("0200")){ ubicacion="Monte Piedad";}  
      tier = arrNodo[2];    
      let afectacion = "Number of Very Slow";
      for (let i = 33; i < arr.length; i++) {  afectacion += " "+arr[i]; }
      error = afectacion;
      issue = "BUSINESS TRANSACTION"; 
      detalleAfectacion =`Se presentan tiempos muy lentos en el Nodo: <strong>${nodo}</strong> , Tier: ${tier}, Bussiness Transaction: <strong class="mark"> ${businessTransaction}	</strong>. Tomar precauciones ya que podría convertirse en un incidente. Error ${error}`;
      posibleOrigen =causasBT[Math.floor(Math.random() * causasBT.length)];  
      posiblesSoluciones=solucionesBT[Math.floor(Math.random() * solucionesBT.length)]; 
    } 


    let cantidadBloqueosPOS ="";
    if(nodo.includes("DB2Monitoring")){   
      // console.clear();
       dispositivo = nodo;
       let fecha = ""; // arr[51].split(".")[0];
       let hora = ""; //  arr[67].split(".")[0];
       let valores = texto.split("value"); 
   
      for (let i = 0; i < valores.length; i++) {
        let valor = valores[i].split(".")[0];
        if (!isNaN(valor)) { // es un numero
          if (valor.length == 9) {  fecha = valor;    /*fecha*/ } else
            if (valor.length == 7 || valor.length == 6) { hora = valor; break; /*hora*/ }//if
        }//if
      }//for
  
        let bareFecha = fecha;
        const anio = fecha.slice(0, 5);
        const mes = fecha.slice(fecha.length-4, fecha.length-2);
        const dia = fecha.slice(fecha.length-2,fecha.length );
        fecha = dia+"-"+mes+"-"+anio.trim();
        let seg = hora.slice(hora.length-2, hora.length);
        let min = hora.slice(hora.length-4, hora.length-2);
        let hour = hora.slice(0, hora.length-4);
        let amPm="a.m.";
        issue = `Bloqueos en POS`;
        let conEstado="<font color='red'>ERROR</font>";
        if (tipoAlerta.includes("EVENTO")) {conEstado="<font color='yellow'>WARM</font>"; }

       if (parseInt(hour.trim())>12) {  
        hour = (parseInt(hour.trim()) - 12);
        amPm="p.m.";
       }

           cantidadBloqueosPOS = arr[35].split(".")[0];
       if (cantidadBloqueosPOS.includes("was")) {    cantidadBloqueosPOS = arr[34].split(".")[0]; }
       if (cantidadBloqueosPOS.includes("value")) {  cantidadBloqueosPOS = arr[36].split(".")[0]; }
        if (cantidadBloqueosPOS.includes("greater")) {  cantidadBloqueosPOS = arr[33].split(".")[0]; }


     //   alert(cantidadBloqueosPOS);

        error = `
        Se están presentado <strong>${cantidadBloqueosPOS}</strong> bloqueos de DB2 Errores de tipo TimeOut, 
        en el canal POS, el evento inició el ${bareFecha}.00 (<strong> ${fecha} </strong>) a las ${hora}.00 (<strong> ${hour}:${min}:${seg} ${amPm}</strong>) horas, 
        con estado ${conEstado}.
        `;
        detalleAfectacion =`DB2 Errores de tipo TimeOut en: <strong>${nodo}</strong> ,  Error: ${error}`; 
        posibleOrigen =  causasBloqueoPOS[Math.floor(Math.random() * causasBloqueoPOS.length)]; 
        posiblesSoluciones=solucionesBloqueoPOS[Math.floor(Math.random() * solucionesBloqueoPOS.length)];
    } //if


    if ( (error.trim()=="" && tier.trim()=="" && dispositivo.trim()=="" && !issueDetected.includes("CPU") ) || (!dispositivo.trim=="DB2Monitoring-java-MA") ){
      
      error=`NO SE ENCONTRÓ NINGUN ERROR RECOPILADO `;
      tier="NO SE ENCONTRÓ NINGUN TIER RECOPILADO"; 
      dispositivo="NO SE ENCONTRÓ NINGUN DISPOSITIVO RECOPILADO";
      alert("ALERTA!!!!! DEBE TENER MAS CUIDADO!! \n\nDatos que Faltan para llenar la plantilla:\n\nError "+error+"  \ntier  "+tier+" \ndispositivo "+dispositivo+" \n\n Debe estar intentando crear un caso por businessTransaction. Tenga mas cuidado y recopile la información de donde se debe hacer correctamente, para eso siga estos pasos:\n\nClick en esta pantalla(Modal), en el link de Affects\nCapture el grafico\nDoble click en uno de los issues de la tabla inferior\nClick en algun Drill Down\nClick en OverView y vuelva a ejecutar el NocManager Extension");

  }
  
      chrome.storage.sync.set({tipoAlerta, dispositivoAsociado: dispositivo,hora, detalleAfectacion, posibleOrigen,posiblesSoluciones,issue,bd,cantidadBloqueosPOS});

       console.log("tipoAlerta: "+tipoAlerta);
       console.log("Hora: "+hora);
       console.log("Bussines Transaction: "+businessTransaction);
       console.log("Nodo: "+nodo);
       console.log("Dispositivo: "+dispositivo);
       console.log("Fallo detectado: "+issue);
       console.log("Value "+value); detalleAfectacion
       console.log(detalleAfectacion); 
       console.log(posibleOrigen);
       console.log(posiblesSoluciones);

       console.log("detalle del evento"+detalleEvento);
       console.log("Área de soporte "+areaSoporte); //se agrega la tilde

      }); //local vars
}

 

    document.getElementById("contenedorInterno").innerHTML = `<h1 class="titulo"    >${html.titulo}</h1> <div class="contenido">${html.contenido}</div>`;

  }//if esta dentro del dominio APPDY    

  
}//func

async function getAppDynamicsSensorInfo(dominio, parentServer) {

  chrome.storage.sync.get(({ plantillaMultiple, jsonEventos,objeto, tipoAlerta,dispositivoAsociado,hora, detalleAfectacion, posibleOrigen,posiblesSoluciones,issue,bd,cantidadBloqueosPOS }) => { 
    
   
    //alerta de DB2Monitoring

   /*

    if(cantidadBloqueosPOS.includes("was") || cantidadBloqueosPOS.includes("value")){

     alert(`La cantidad de bloqueos POS indicada en la plantilla es : ${cantidadBloqueosPOS.toUpperCase()} en Detalle de afectación. Este error puede haber sucedido porque se debe crear en STARTED y no en CONTINUES, pero si ocurrió aun creandolo en STARTED deberá modificarlo manualmente al agregar esta plantilla a JIRA, porque el algoritmo no fue capaz de obtenerlo dinamicamente.

      Error: Se están presentado  ${cantidadBloqueosPOS.toUpperCase()} bloqueos de DB2...
      VERIFIQUELO POR FAVOR...

     `);

    }

    */

    //fin alerta de DB2Monitoring

    console.log(objeto.dispositivo);
    console.log(tipoAlerta);
    console.log(dispositivoAsociado);
    console.log(detalleAfectacion);
    console.log(posibleOrigen);
    console.log(posiblesSoluciones);
    console.log(issue);
    console.log("Parent "+parentServer);
    console.log("bd  "+bd);
    console.log("Valor plantilla multiple :  "+plantillaMultiple);
    console.log(jsonEventos);
    console.log("cantidadBloqueosPOS "+cantidadBloqueosPOS);
    
    let text1="";
    let text2="";
    let text3="";
    let botonMultiple ="";

    if(plantillaMultiple){ // si el booleano de plantilla multiple es verdadero se agrega un boton que solamente estará disponible una vez

      botonMultiple =`
      <div id="btMultiple" class="cajaInfo2"> 
          <h3 style="background: yellow; color: black;">Ha activado la asignación multiple, si presiona el botón se agregarán los datos adicionales</h3>
          <center>
          <input id="datosMultiples" class="boton" type="button" value="agregar datos multiples" />
          <input id="datosMultiplesCancelar" class="boton3" type="button" value="cancelar" />
          <p>Tome en cuenta que solo se ejecutará una vez.</p>
          </center>
      </div>
      `;
    }

    let detalleEventoText = `Aplicativo ${objeto.dispositivo}`;
    let areaAplicativos = `Área de Aplicativos ${objeto.dispositivo}`; //se agrea la tilde en Area
    if(objeto.dispositivo.includes("T24")){ areaAplicativos = "Área de Soporte T24";}
    let ServicioAsociadoText = `Aplicativo ${objeto.dispositivo} `;
    let dispositivoAsociadoText = dispositivoAsociado;

  if (!parentServer && !bd) {  // si no tiene parent Obtiene el parent del servidor si no viene con 
   for (let i = 0; i < idServer.length; i++) {
          for (let j = 0; j < idServer[i].servers.length; j++) {
            if ( dispositivoAsociado == idServer[i].servers[j].name) {
              objeto.dispositivo = idServer[i].parent;
              chrome.storage.sync.set({ objeto });
   }}}}else if (!parentServer && bd) { 
   
    objeto.dispositivo = dispositivoAsociado;
    chrome.storage.sync.set({ objeto });

    if (dispositivoAsociado.includes("pt24")) {  //Área de Base de Datos
      detalleEventoText = "Bases de datos";
      areaAplicativos = "Área de Base de Datos";
      ServicioAsociadoText = "T24";
    }else{

      detalleEventoText = "Bases de datos";
      areaAplicativos = "Área de Base de Datos";
      ServicioAsociadoText = "No Aplica";
    }
  
   }

    let = categorizacionEvento = "";
    if (tipoAlerta.includes("INCIDENTE") || tipoAlerta.includes("CRITICO")) { categorizacionEvento="Incidente notificación"; }
    else{  categorizacionEvento="Evento"; }


    if ( issue.includes("INDISPONIBILIDAD DEL AGENTE")) { // Si es por indisponibilidad el area correspondiente y detalle del evento mas el servicio aso cambia 
      detalleEventoText ="Eventos";
      areaAplicativos="Área de Monitoreo";
      ServicioAsociadoText = "No Aplica";
    }

   //Le da el Area de Aplicativos al dispositivo en AppDy   Área de Soporte T24
    for (let i = 0; i < subAplicativos.length; i++) { 
      for (let j = 0; j < subAplicativos[i].app.length; j++) {
        if(objeto.dispositivo.trim() == subAplicativos[i].app[j].trim()){   
          objeto.dispositivo = subAplicativos[i].parent;   
          chrome.storage.sync.set({ objeto }); 
          detalleEventoText = `Aplicativo ${objeto.dispositivo}`; 
          areaAplicativos = `Área de Aplicativos ${objeto.dispositivo}`; //se agrega la tilde en Area
          if(areaAplicativos == "Área de Aplicativos T24" || objeto.dispositivo.includes("T24")){ areaAplicativos = "Área de Soporte T24";}
         
          ServicioAsociadoText = "No Aplica";
        }   
      }  
    }

    //Parches +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //POS provicional
    if(issue.includes("BUSINESS") && detalleAfectacion.includes("BP-JMS Java MS_POS") &&  tipoAlerta.includes("INCIDENTE")){  
      tipoAlerta="EVENTO DE MONITOREO CRITICO";
    }

  //JBOSS  
  if (objeto.dispositivo.includes("JBOSS")) {
    detalleEventoText = `Aplicativo T24`; 
    areaAplicativos = `Área de Soporte T24`; //
    ServicioAsociadoText = "T24";
  }
  
  // VP0118-NV1SQL01
     if(dispositivoAsociado.includes("VP0118-NV1SQL01")){
      areaAplicativos = "Área de Base de Datos";
      ServicioAsociadoText = "No aplica";
     } 

  //                 DB2Monitoring-java-MA
  if(dispositivoAsociado.includes("DB2Monitoring") && tipoAlerta.includes("EVENTO")){
    areaAplicativos = "Área de Monitoreo";
    detalleEventoText = `Aplicativo T24`; 
    ServicioAsociadoText = detalleEventoText;
   }else if(dispositivoAsociado.includes("DB2Monitoring") && tipoAlerta.includes("INCIDENTE")){

    dispositivoAsociado = " Aplicativo T24";
    areaAplicativos = `Área de Soporte T24`; 
    detalleEventoText = `Aplicativo T24`; 
    ServicioAsociadoText = detalleEventoText;
   } 

 
   if (issue.includes("ConnectivityException") ) { tipoAlerta = "EVENTO DE MONITOREO ORDINARIO"; }

     //fin de Parches *****************************************************************************************************************

// 26-01-2023 se quita la categorizacion del evento en la plantilla  <tr><td>Categorización del evento          </td><td>${categorizacionEvento}  </td></tr>


    let tituloString = `${tipoAlerta} | ${dispositivoAsociado} | ${areaAplicativos} | ${issue}`;
    let tituloS =`${botonMultiple}
    <p>Título sugerido:</p>  
    <h3 id="tituloSugerido">${tituloString}</h3>`;

    let tablaString =`<div id="contenedorTabla">
     <table id="tablaPlantilla" style="text-align:center; max-width:98%;  border-collapse: collapse;">
     <tr><td>Buenas estimado Mesa de Servicio BP                                                   </td></tr>
     <tr><td>Detalle del evento                 </td><td><strong class="mark"> ${detalleEventoText}</strong</td></tr>
     <tr><td>Área de Soporte                    </td><td><strong class="mark">${areaAplicativos}   </strong></td></tr>
     <tr><td>Timestamp                          </td><td>${hora}                                   </td></tr>
     <tr><td>Dispositivo asociado               </td><td><strong class="mark"> ${dispositivoAsociadoText}</strong></td></tr>
     <tr><td>Servicio asociado                  </td><td> ${ServicioAsociadoText}                  </td></tr>
     <tr><td>Detalle de afectación              </td><td id="dA">${detalleAfectacion}              </td></tr>
     <tr><td>Retroalimentación                  </td><td>                                          </td></tr>
     <tr><td>Posible origen                     </td><td>  ${posibleOrigen}                        </td></tr>
     <tr><td>Posibles soluciones                </td><td> ${posiblesSoluciones}                    </td></tr>
     <tr><td>Quedamos atentos a sus comentarios,                                                   </td></tr>
     </table></div>`;


function  cancelar() {
  document.getElementById("btMultiple").innerHTML="";
  document.getElementById("btMultiple").style.display = "none";
  chrome.storage.sync.set({  plantillaMultiple: false  });
}

 function cambioMultiple(plantillaMultiple, detalleAfectacion,jsonEventos) {

        let nuevoTitulo =`
          <p>Título sugerido:</p>  
          <h3 id="tituloSugerido">${tituloString}</h3>`;
          document.getElementById("btMultiple").innerHTML="";
          document.getElementById("btMultiple").style.display = "none";

      if (plantillaMultiple && detalleAfectacion.includes("Nodo:")) {
    
        if (detalleAfectacion.includes("Bussiness Transaction")) { // si tiene el nodo pero es por business
          chrome.storage.sync.set({  plantillaMultiple: false  });
      
        }else if(detalleAfectacion.includes("CPU") || detalleAfectacion.includes("Memor")){ // si tiene el nodo pero es por Memoria o CPU

          text1 = detalleAfectacion.split("Nodo:")[0].split("<strong> tier:")[0]+`en los nodos: <br>`;
          text3 = "sobrepasan "+detalleAfectacion.split("sobrepasa")[1];     
       
          for (let i = 0; i < jsonEventos.length; i++) { text2+= jsonEventos[i]+", <br>";}
      
          detalleAfectacion = "<div style = text-align:left>"+text1+" "+text2+" "+text3+"</div>";
        
          cancelar();
  
         document.getElementById("dA").innerHTML = detalleAfectacion;
         tablaString = document.getElementById("contenedorTabla").innerHTML;
         let jsonJira = { titulo: nuevoTitulo, tituloString, tabla: tablaString}
         chrome.storage.sync.set({ jsonJira });
          
        }   

      }else{ cancelar();  }
  
    }//func

document.getElementById("plantillaInterna").innerHTML = tituloS+tablaString+"   <br><br><br>";  

if (plantillaMultiple) {
   document.getElementById("datosMultiples").addEventListener("click", () => {  cambioMultiple(plantillaMultiple, detalleAfectacion,jsonEventos); });
   document.getElementById("datosMultiplesCancelar").addEventListener("click", () => {   cancelar(); });
}//if 

       let jsonJira = { titulo: tituloS, tituloString, tabla: tablaString}
       chrome.storage.sync.set({ jsonJira }); 
  });
}//func 

function getApplicationNameById(url) { 

  let nombreId ="";
  let array=[]
  if (url.includes("application") ){nombreId= "application"; array=idNames;  }else 
  if( url.includes("databaseId")  ){nombreId= "databaseId";  array=idBD;     }else 
  if( url.includes("machineId")   ){nombreId= "machineId";   array=idServer; }   

  let urlArr = url.split("&");
  let id=0;
  let dispositivo="";
  let objeto;
  let parent = "";

  for (let i = 0; i < urlArr.length; i++) { if (urlArr[i].includes(nombreId)) {  id = urlArr[i].split("=")[1]; }}//for

  if(nombreId=="machineId"){
  
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].servers.length; j++) { 
          if(array[i].servers[j].id == id){      
               dispositivo = array[i].servers[j].name;
               parent = array[i].parent;
               objeto = {parent, id, dispositivo, arrayTotal: array[i]}
        } 
      }
    }
    
  }else{

  for (let i = 0; i < array.length; i++){ 
  if(array[i].id==id){  
     dispositivo =array[i].name;
     if(id==17 &&  url.includes("&dbCluster=true")){ dispositivo="ORACLE T24"; array[i].dispositivo = dispositivo; }else 
     if(id==17 && !url.includes("&dbCluster=true")){ dispositivo="SISBI"; array[i].dispositivo= dispositivo;  }
     objeto= {dispositivo, id,  arrayTotal: array[i]};    
    }//if
  }//for
}//if
  return objeto;
}//func

function c(string) { console.log(string); }

function setPRTGDeviceDispositivo() { 
  
  let dummy  = document.getElementsByClassName("devicemenu");
  chrome.storage.sync.set({ dispositivo: dummy[0].innerText,ul:" \n \n \n \n"  }); //

}

function setPRTGSensorInfo() { 

  let ul     = document.getElementsByClassName("crumbler");
  let status = document.getElementsByClassName("status")[0].innerText;
  let tr     = document.getElementsByTagName("tr");

  let datosTr ="";
  for (let i = 0; i < tr.length; i++) {   
   if (tr[i].innerText.toUpperCase().includes("FALLO") || tr[i].innerText.toUpperCase().includes("OK") ) {
     datosTr += "+"+tr[i].innerText; }}

  chrome.storage.sync.set({ ul: ul[0].innerText });
 
  chrome.storage.sync.set({ ulHtml: ul[0].innerHTML });
  chrome.storage.sync.set({ status });
  chrome.storage.sync.set({ datosTr:datosTr });
}

async function getPRTGSensorInfo(dominio) {

  chrome.storage.sync.get(({ ul,dispositivo,ulHtml,status,datosTr }) => {   

      //  console.log(ul);

    let json = ul.split("\n");
    let disp = json[json.length-2];  
    let detalleEvento = json[json.length-4];
    let areaSoporte = json[json.length-3];
    let ServicioAsociado;
    let sensor = json[json.length-1];
    let porcentaje;
    let fallo =[]
    let confirmado =[]
    let ok=[]
    let falloYOK=[]
    let leyendaAfectacion="";
    let timestamp = "";
    let origen ="";
    let solucion="";
    let incidencia="";
   
    if(status.includes("(código: PE269)") ||  status.includes("No response (check:") || status.includes("Could not find data fo") || status.includes("SNMP exception:") ){ // snmp 

      porcentaje = "";
      leyendaAfectacion = `Problemas de comunicación mediante SNMP`;
      origen = causasFallosSNMP[Math.floor(Math.random() * causasFallosSNMP.length)];    //    "Bloqueos a los puertos correspondiente a SNMP";
      solucion=solucionesFallosSNMP[Math.floor(Math.random() * solucionesFallosSNMP.length)];    //"Verificar posibles bloqueos a nivel de SNMP en los distintos dispositivos que mediante los cuales se comunica el equipo(routers, FW, …)";
      incidencia = "EVENTO DE MONITOREO CRITICO";
      sensor = "SNMP";

    }else if(status.includes("can not open database") || sensor.toUpperCase().includes("MICROSOFT SQL")){ //Base de datos inaccesible 

      porcentaje = "";
      leyendaAfectacion = `Se presenta alerta de inaccesibilidad  en el sensor Microsoft Microsoft SQL DBMonex, Microsoft SQL SAXO, Microsoft SQL SILPOS`;
      origen = causasFallosBDInaccesible[Math.floor(Math.random() * causasFallosBDInaccesible.length)];  // "Problema en la base de datos. Se traslado la base de datos a otro servidor. La base de datos cambio su estado a off-line. Se cambio el nombre de usuario y contraseña de la base de datos.";
      solucion=solucionesFallosBDInaccesible[Math.floor(Math.random() * solucionesFallosBDInaccesible.length)]; //"Revisar en que servidor se encuentra la base de datos, de haberse cambiado de servidor por favor notificar. Revisar si la base de datos se encuentra en estado off-line, de encontrala off-line por favor encenderla y notificar. Revisar usuario y contraseña de la base de datos, de haberse cambiado por favor notificar para recuperar accesibilidad a la base de datos. Revisión a nivel interno de la base de datos.";
      incidencia = "INCIDENTE";
      sensor = "BASE DE DATOS INACCESIBLE";

   // }else{ //memoria 

  }else if(sensor.toUpperCase().includes("RAM") || sensor.toUpperCase().includes("MEMORY") || sensor.toUpperCase().includes("INFOR") && !status.includes("https://")){ 
        if(sensor.toUpperCase().includes("PHYSICAL")){ sensor = "RAM";}else{ sensor="VIRTUAL RAM"; }  
        
        sensor = "RAM";

       porcentaje = (100-((status).split("%")[0].replace("<","")))+"%";
       leyendaAfectacion = `El uso de la <strong class="mark">${sensor}</strong> sobrepasa el límite de uso en un `;
       origen =causasCargasAltasRAM[Math.floor(Math.random() * causasCargasAltasRAM.length)];//"El servidor puede tener muchas tareas realizándose al mismo tiempo.";
       solucion=solucionesCargasAltasRAM[Math.floor(Math.random() * solucionesCargasAltasRAM.length)];//"Moderar la carga de trabajo o procesos realizándose.";
       incidencia = "EVENTO DE MONITOREO CRITICO";

    }else if(sensor.toUpperCase().includes("CPU") && !status.includes("https://")){ //CPU

      porcentaje = status.split("%")[0].replace("<","")+"%";
      sensor = "CPU";
      leyendaAfectacion = `La carga de <strong class="mark">${sensor}</strong> en el dispositivo se encuentra en un `;
      origen = causasCPU[Math.floor(Math.random() * causasCPU.length)];//"Hay muchos procesos consumiendo gran cantidad del CPU.";
      solucion= solucionesCPU[Math.floor(Math.random() * solucionesCPU.length)];//"Revisar los procesos que se están corriendo. Revisar si los procesos están en la normalidad establecida.";
      incidencia = "EVENTO DE MONITOREO CRITICO";

    }else if(sensor.toUpperCase().includes("DISK FREE") && !status.includes("https://")){ //Almacenamiento

       porcentaje = (status).split("%")[0]+"%";
       let estatusSensor = sensor;
       sensor = "ALMACENAMIENTO";
       leyendaAfectacion = `Umbrales de <strong class="mark">${sensor}</strong> disponible : <strong> ${estatusSensor}  ${status}</strong>`;
       origen = causasAlertasAlmacenamiento[Math.floor(Math.random() * causasAlertasAlmacenamiento.length)]; //"Insuficiente espacio de almacenamiento en la partición. Muchos archivos/datos generaron que la partición se llenara, superando el umbral establecido.";
       solucion= solucionesAlertasAlmacenamiento[Math.floor(Math.random() * solucionesAlertasAlmacenamiento.length)]; //"Ampliar el almacenamiento de la partición. Liberar espacio de almacenamiento. Eliminar los datos innecesarios. Migrar datos a otra partición.";
       incidencia = "EVENTO DE MONITOREO CRITICO";

    }else if(sensor.toUpperCase().includes("PING") && !status.includes("https://")){ //disponibilidad

      porcentaje = "";
      sensor = "DISPONIBILIDAD";
      leyendaAfectacion = `Presenta afectación en la <strong class="mark">${sensor}</strong> del equipo`;
      origen =   causasProblemasDisponibilidad[Math.floor(Math.random() * causasProblemasDisponibilidad.length)]; //"Verificar la corriente electrica y el puerto de red.";
      solucion=  solucionesProblemasDisponibilidad[Math.floor(Math.random() * solucionesProblemasDisponibilidad.length)];  //"Verificar la corriente electrica y el puerto de red.";
      incidencia = "INCIDENTE";

    }else if(sensor.toUpperCase().includes("HTTP") && !status.includes("https://")){ //HTTP

    porcentaje = "";
    sensor = "HTTP WEB";
    leyendaAfectacion = `Se presenta alerta de disponibilidad en el servicio   <strong class="mark">${sensor}</strong>.`;
    origen =  causasProblemasHTTP[Math.floor(Math.random() * causasProblemasHTTP.length)];  //"No se tiene respuesta de la página WEB. Posible falla en la red.";
    solucion= solucionesProblemasHTTP[Math.floor(Math.random() * solucionesProblemasHTTP.length)];  //"Verificar servidores WEB que alojan la página WEB.";
    incidencia = "INCIDENTE";

    }else if(sensor.toUpperCase().includes("TRAFFIC") && !status.includes("https://")){ // trafic

      porcentaje = "";
      sensor = "TRAFFIC";
      leyendaAfectacion = `Se presenta alerta de alto consumo de ancho de banda <strong>${sensor}</strong>`;
      origen ="La cantidad de tráfico es superior a la permitida para umbral de ancho de banda permitida en este enlace.";
      solucion="Revisar el tráfico entrante/saliente de la interfaz del router, y en la medida de lo posible, realizar un balanceo de carga hacia otra ruta en la red ó reducir el consumo de ancho de banda.";
      incidencia = "INCIDENTE";  

    }else{  porcentaje="";}

  //  }//snmp

    leyendaAfectacion+=porcentaje;

    try {
     let tr = datosTr.split("+") || "";
      for (let i = 0; i < tr.length; i++) {  
         if(!tr[i].toUpperCase().includes("CONFIRMADO") && tr[i]!=""){ 
          if(tr[i].toUpperCase().includes("FALLO")){fallo.push(tr[i]);}
          if(tr[i].toUpperCase().includes("OK")){ok.push(tr[i]);}
          falloYOK.push(tr[i]);
        }else{   confirmado.push(tr[i]);  }}
          timestamp = fallo[0].split("\n");
    } catch (error) { console.trace(error); } 

    console.log(json[json.length-4]); //Soporte T24
 
      if (json[(json.length)-5].toUpperCase().includes("ROUTER")          || json[(json.length)-4].toUpperCase().includes("ROUTER")          ||  json[(json.length)-3].toUpperCase().includes("ROUTER")          ||
          json[(json.length)-5].toUpperCase().includes("SWITCHES")        || json[(json.length)-4].toUpperCase().includes("SWITCHES")        ||  json[(json.length)-3].toUpperCase().includes("SWITCHES")        ||
          json[(json.length)-5].toUpperCase().includes("SERVIDORES - CO") || json[(json.length)-4].toUpperCase().includes("SERVIDORES - CO") ||  json[(json.length)-3].toUpperCase().includes("SERVIDORES - CO") ||
          json[(json.length)-5].toUpperCase().includes("EQUIPO DE COM")   || json[(json.length)-4].toUpperCase().includes("SERVIDORES - CO") ||  json[(json.length)-3].toUpperCase().includes("EQUIPO DE COM") ) {
        
            detalleEvento = "Equipo de Comunicación";
            areaSoporte = "Área de Redes y Telecomunicaciones";
            for (let i = 0; i < arrayServicioAsociado.length; i++) {         
              if (arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-5].replace("...","")) || 
                  arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-4].replace("...","")) || 
                  arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-3].replace("...",""))) { 
                  ServicioAsociado = arrayServicioAsociado[i]; break;
               }else{  ServicioAsociado = "No aplica";  }  }//for

      }else  if (json[(json.length)-5].toUpperCase().includes("SERVIDORES - DE") || 
                 json[(json.length)-4].toUpperCase().includes("SERVIDORES - DE") || 
                 json[(json.length)-3].toUpperCase().includes("SERVIDORES - DE")) {

                  detalleEvento = "Servidores -De Externos";
                  areaSoporte = "";
                  for (let i = 0; i < arrayServicioAsociado.length; i++) {         
                    if (arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-5].replace("...","")) || 
                        arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-4].replace("...","")) || 
                        arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-3].replace("...",""))) { 
                        ServicioAsociado = arrayServicioAsociado[i]; break;
                     }else{  ServicioAsociado = "No aplica";  }  }//for

      }else  if (json[(json.length)-5].toUpperCase().includes("SERVIDORES SEGU") || 
                 json[(json.length)-4].toUpperCase().includes("SERVIDORES SEGU") || 
                 json[(json.length)-3].toUpperCase().includes("SERVIDORES SEGU")) {

                 detalleEvento = "Equipo de Seguridad";
                 areaSoporte = "Área de Seguridad Informática";
                 for (let i = 0; i < arrayServicioAsociado.length; i++) {         
                  if (arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-5].replace("...","")) || 
                      arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-4].replace("...","")) || 
                      arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-3].replace("...",""))) { 
                      ServicioAsociado = arrayServicioAsociado[i]; break;
                   }else{  ServicioAsociado = "No aplica";  }  }//for      
                 
      }else  if (
                  (
                 json[(json.length)-5].toUpperCase().includes("SERVIDORES - ÁR") || 
                 json[(json.length)-4].toUpperCase().includes("SERVIDORES - ÁR") || 
                 json[(json.length)-3].toUpperCase().includes("SERVIDORES - ÁR  ")
                  )
                  &&
                  !disp.toUpperCase().includes("R17")     

                 ) {

                detalleEvento = "Equipo de Seguridad";
                areaSoporte = "Área de Seguridad Informática";
                for (let i = 0; i < arrayServicioAsociado.length; i++) {         
                  if (arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-5].replace("...","")) || 
                      arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-4].replace("...","")) || 
                      arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-3].replace("...",""))) { 
                      ServicioAsociado = arrayServicioAsociado[i]; break;
                   }else{  ServicioAsociado = "No aplica";  }  }//for    

      }else  if (json[(json.length)-5].toUpperCase().includes("SOPORTE T24") || 
                 json[(json.length)-4].toUpperCase().includes("SOPORTE T24") || 
                 json[(json.length)-3].toUpperCase().includes("SOPORTE T24") ||    
                 disp.toUpperCase().includes("R17")) {
                  detalleEvento = "Servidor T24";
                  areaSoporte = "Área de Soporte T24"; 
                  ServicioAsociado = "T24";   
                  
      }else  if (json[(json.length)-5].toUpperCase().includes("SOPORTE - AS400") || 
                 json[(json.length)-3].toUpperCase().includes("SOPORTE - AS400") || 
                 json[(json.length)-3].toUpperCase().includes("SOPORTE - AS400")) { 

                detalleEvento = "Servidor AS400 Iseries";
                areaSoporte = "Área de Soporte Técnico AS400";
             for (let i = 0; i < arrayServicioAsociado.length; i++) {         
              if (arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-5].replace("...","")) || 
                  arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-4].replace("...","")) || 
                  arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-3].replace("...",""))) { 
                  ServicioAsociado = arrayServicioAsociado[i]; break;
               }else{  ServicioAsociado = "No aplica";  }  }//for   

      }else  if (json[(json.length)-5].toUpperCase().includes("Reportserver") || 
                 json[(json.length)-4].toUpperCase().includes("Reportserver") || 
                 json[(json.length)-3].toUpperCase().includes("Reportserver")) { 

                 detalleEvento = "Servidor Windows- Servidores Reportserver";
                 areaSoporte = "Área de Soporte Técnico";
              for (let i = 0; i < arrayServicioAsociado.length; i++) {         
                if (arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-5].replace("...","")) || 
                    arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-4].replace("...","")) || 
                    arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-3].replace("...",""))) { 
                    ServicioAsociado = arrayServicioAsociado[i]; break;
                 }else{  ServicioAsociado = "No aplica";  }  }//for   
        
      }else  if (json[(json.length)-5].toUpperCase().includes("SERVIDORES APLI") || 
                 json[(json.length)-4].toUpperCase().includes("SERVIDORES APLI") || 
                 json[(json.length)-3].toUpperCase().includes("SERVIDORES APLI")) { 

                 detalleEvento = "Servidor Windows- Servidores Aplicación";
                 areaSoporte = "Área de Soporte Técnico";
             for (let i = 0; i < arrayServicioAsociado.length; i++) {         
              if (arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-5].replace("...","")) || 
                  arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-4].replace("...","")) || 
                  arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-3].replace("...",""))) { 
                  ServicioAsociado = arrayServicioAsociado[i]; break;
               }else{  ServicioAsociado = "No aplica";  }  }//for           

      }else  if (json[(json.length)-5].toUpperCase().includes("SERVIDORES PRES") || 
                 json[(json.length)-4].toUpperCase().includes("SERVIDORES PRES") || 
                 json[(json.length)-3].toUpperCase().includes("SERVIDORES PRES")) { 

            detalleEvento = "Servidor Windows- Servidores Presentación";
            areaSoporte = "Área de Soporte Técnico";
            for (let i = 0; i < arrayServicioAsociado.length; i++) {         
             if (arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-5].replace("...","")) || 
                 arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-4].replace("...","")) || 
                 arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-3].replace("...",""))) { 
                 ServicioAsociado = arrayServicioAsociado[i]; break;
              }else{  ServicioAsociado = "No aplica";  }  }//for Servidores - Ba...

      }else  if (json[(json.length)-5].toUpperCase().includes("SERVIDORES BA")   || 
                 json[(json.length)-4].toUpperCase().includes("SERVIDORES BA")   || 
                 json[(json.length)-3].toUpperCase().includes("SERVIDORES BA")   ||

                 json[(json.length)-5].toUpperCase().includes("SERVIDORES - BA") || 
                 json[(json.length)-4].toUpperCase().includes("SERVIDORES - BA") || 
                 json[(json.length)-3].toUpperCase().includes("SERVIDORES - BA") 
                 ) { 

            detalleEvento = "Servidor Windows- Servidores Base de Datos";
            areaSoporte = "Área de Soporte Técnico";
            for (let i = 0; i < arrayServicioAsociado.length; i++) {         
              if (arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-5].replace("...","")) || 
                  arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-4].replace("...","")) || 
                  arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-3].replace("...",""))) { 
                  ServicioAsociado = arrayServicioAsociado[i]; break;
               }else{  ServicioAsociado = "No aplica";  }  }//for 

      }else  if (json[(json.length)-5].toUpperCase().includes("SQL REPORTING")   || json[(json.length)-4].toUpperCase().includes("SQL REPORTING")   ||  json[(json.length)-3].toUpperCase().includes("SQL REPORTING") ||
                 json[(json.length)-5].toUpperCase().includes("DB2")             || json[(json.length)-4].toUpperCase().includes("DB2")             ||  json[(json.length)-3].toUpperCase().includes("DB2") ||
                 json[(json.length)-5].toUpperCase().includes("ORACLE SERVER")   || json[(json.length)-4].toUpperCase().includes("ORACLE SERVER")   ||  json[(json.length)-3].toUpperCase().includes("ORACLE SERVER") ||
                 json[(json.length)-5].toUpperCase().includes("SQL SERVER MICR") || json[(json.length)-4].toUpperCase().includes("SQL SERVER MICR") ||  json[(json.length)-3].toUpperCase().includes("SQL SERVER MICR")
          ) { 

            detalleEvento = "Servidor Windows- Servidores Base de Datos";
            areaSoporte = "Área de Base de Datos"; 
            for (let i = 0; i < arrayServicioAsociado.length; i++) {         
              if (arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-5].replace("...","")) || 
                  arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-4].replace("...","")) || 
                  arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-3].replace("...",""))) { 
                  ServicioAsociado = arrayServicioAsociado[i]; break;
               }else{  ServicioAsociado = "No aplica";  }  }//for

      }else  if (json[(json.length)-5].toUpperCase().includes("SERVIDORES SUCU") || 
                 json[(json.length)-4].toUpperCase().includes("SERVIDORES SUCU") || 
                 json[(json.length)-3].toUpperCase().includes("SERVIDORES SUCU")) { 

                  detalleEvento = "Servidor Windows- Servidores Sucursales";
                  areaSoporte = "Área de Soporte Técnico";
            for (let i = 0; i < arrayServicioAsociado.length; i++) {         
              if (arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-5].replace("...","")) || 
                  arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-4].replace("...","")) || 
                  arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-3].replace("...",""))) { 
                  ServicioAsociado = arrayServicioAsociado[i]; break;
               }else{  ServicioAsociado = "No aplica";  }  }//for

      }else  if ( ( json[(json.length)-5].toUpperCase().includes("CHECKPOINT") && dispositivo=="ITIN-SEC02")  || 
                  ( json[(json.length)-4].toUpperCase().includes("CHECKPOINT") && dispositivo=="ITIN-SEC02")  || 
                  ( json[(json.length)-3].toUpperCase().includes("CHECKPOINT") && dispositivo=="ITIN-SEC02")  ||

                  ( json[(json.length)-5].toUpperCase().includes("CHECKPOINT") && dispositivo=="ITIN-SEC03")  || 
                  ( json[(json.length)-4].toUpperCase().includes("CHECKPOINT") && dispositivo=="ITIN-SEC03")  || 
                  ( json[(json.length)-3].toUpperCase().includes("CHECKPOINT") && dispositivo=="ITIN-SEC03") 
                  
                  ) { 

                    detalleEvento = "Equipo de Seguridad";
                    areaSoporte = "Área de Seguridad Informática";
                  for (let i = 0; i < arrayServicioAsociado.length; i++) {         
                   if (arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-5].replace("...","")) || 
                       arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-4].replace("...","")) || 
                       arrayServicioAsociado[i].toUpperCase().includes(json[(json.length)-3].replace("...",""))) { 
                       ServicioAsociado = arrayServicioAsociado[i]; break;
                      }else{  ServicioAsociado = "No aplica";  }  }//for

}
      
        if(detalleEvento.includes("T24")){ areaSoporte = "Área de Soporte T24";}

  document.getElementById("contenedorInterno").innerHTML = `

  <p>Título sugerido:</p>  
  <h3 id="tituloSugerido"></h3>

   <table id="tablaPlantilla" style="text-align:center;   border-collapse: collapse;" >

   <tr><td>Buenas estimado Mesa de Servicio BP</td></tr>
   <tr><td>Categorización del evento          </td><td>

   <select id="selectCategorizacion">
   <option value="Incidente notificación">Incidente notificación</option>
   <option value="Evento">Evento</option>
   <option value="critico">EVENTO DE MONITOREO CRITICO</option>
   </select>
  
   </td></tr>
   <tr><td>Detalle del evento                 </td><td><strong class="mark"><select id="selectDetalleEvento"></select></strong></td></tr>
   <tr><td>Área de Soporte                    </td><td><strong class="mark">${areaSoporte}</strong></td></tr>
   <tr><td>Timestamp                          </td><td>${timestamp[0]}                              </td></tr>
   <tr><td>Dispositivo asociado               </td><td><strong class="mark">${dispositivo}</strong> </td></tr>
   <tr><td>Servicio asociado                  </td><td><select id="selectServicioAsociado"></select></td></tr>
   <tr><td>Detalle de afectación              </td><td>${leyendaAfectacion}                         </td></tr>
   <tr><td>Retroalimentación                  </td><td>                                             </td></tr>
   <tr><td>Posible origen                     </td><td>${origen}                                    </td></tr>
   <tr><td>Posibles soluciones                </td><td>${solucion}                                  </td></tr>
   <tr><td>Quedamos atentos a sus comentarios,</td></tr>
   </table> 

<br><br><br> `;

for (let i = 0; i < arrayDetalleEvento.length; i++) {
  let selected="";
  if (detalleEvento==arrayDetalleEvento[i]) {selected="selected"; }
  document.getElementById("selectDetalleEvento").innerHTML += `<option value="${arrayDetalleEvento[i]}" ${selected}> ${arrayDetalleEvento[i]}</option>`;  
}//for


for (let i = 0; i < arrayServicioAsociado.length; i++) {
  let selected="";
 if (arrayServicioAsociado[i].includes(json[3]) || 
     arrayServicioAsociado[i].includes(json[4]) ||  
     arrayServicioAsociado[i].includes(json[5])
     ) {selected="selected"; }else if(arrayServicioAsociado[i] == ServicioAsociado ){ selected="selected";  }else{selected=""; }
  document.getElementById("selectServicioAsociado").innerHTML += `<option value="${arrayServicioAsociado[i]}" ${selected}> ${arrayServicioAsociado[i]}</option>`;  
}

document.getElementById("selectCategorizacion").addEventListener("change", () => {  
  if( document.getElementById("selectCategorizacion").value == "Evento"){ incidencia= "EVENTO DE MONITOREO ORDINARIO"}else
  if( document.getElementById("selectCategorizacion").value == "critico"){incidencia= "EVENTO DE MONITOREO CRITICO"; 
      document.getElementById("selectCategorizacion").value = "Incidente notificación";}else { incidencia= "INCIDENTE"; }
  

  if (detalleEvento=="Servidores -De Externos") {
          document.getElementById("tituloSugerido").innerHTML = `${incidencia} | ${dispositivo} | ${sensor}`;
   }else{ document.getElementById("tituloSugerido").innerHTML = `${incidencia} | ${dispositivo} | ${areaSoporte} | ${sensor}`; }//if

 });

   if (detalleEvento=="Servidores -De Externos") {
          document.getElementById("tituloSugerido").innerHTML = `${incidencia} | ${dispositivo} | ${sensor}`;
   }else{ document.getElementById("tituloSugerido").innerHTML = `${incidencia} | ${dispositivo} | ${areaSoporte} | ${sensor}`; }//if

//------------------------------------------------------------------------------------------------

    let categorizacionEvento   =  document.getElementById("selectCategorizacion").value;
    let selectDetalleEvento    =  document.getElementById("selectDetalleEvento").value; 
    let selectServicioAsociado =  document.getElementById("selectServicioAsociado").value;
  
    let tituloS =`
    <p>Título sugerido:</p>  
    <h3 id="tituloSugerido"></h3>`;

// 26-01-2023 se quita la categorizacion del evento en la plantilla  <tr><td>Categorización del evento          </td><td>${categorizacionEvento}  </td></tr>

    let tablaString =`
     <table id="tablaPlantilla" style="text-align:center;">
     <tr><td>Buenas estimado Mesa de Servicio BP                                  </td></tr>
     <tr><td>Detalle del evento                 </td><td><strong class="mark">${selectDetalleEvento}<strong></td></tr>
     <tr><td>Área de Soporte                    </td><td><strong class="mark">${areaSoporte}<strong></td></tr>
     <tr><td>Timestamp                          </td><td>${timestamp[0]}          </td></tr>
     <tr><td>Dispositivo asociado               </td><td><strong class="mark">${dispositivo}</strong></td></tr>
     <tr><td>Servicio asociado                  </td><td>${selectServicioAsociado}</td></tr>
     <tr><td>Detalle de afectación              </td><td>${leyendaAfectacion}     </td></tr>
     <tr><td>Retroalimentación                  </td><td>                         </td></tr>
     <tr><td>Posible origen                     </td><td>  ${origen}              </td></tr>
     <tr><td>Posibles soluciones                </td><td> ${solucion}             </td></tr>
     <tr><td>Quedamos atentos a sus comentarios,                                  </td></tr>
     </table>`;

let tituloSugerido = `${incidencia} | ${dispositivo} | ${areaSoporte} | ${sensor}`;
if (detalleEvento=="Servidores -De Externos") { tituloSugerido = `${incidencia} | ${dispositivo} | ${sensor}`;  }
    document.getElementById("tituloSugerido").innerHTML = tituloSugerido;

  
 let jsonJira = { titulo: tituloS, tituloString: tituloSugerido, tabla: tablaString}
 chrome.storage.sync.set({ jsonJira });

});
}//func

let sinFallo = true;
function jiraPlantilla() { //aqui se genera la tabla con la plantilla en Jira

  chrome.storage.sync.get(({ jsonJira }) => {

  //Identificacion de fallos +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    let falloBreve = "Fallo sin identificar";
    detalleFallo = "Sin detalle";
    let evidencias ="";
    evidencias = `<h3 style="background: white; color: black">${jsonJira.tituloString}</h3><br><p style="backgound:black; color: red;  user-select:none;">${jsonJira.tabla}</p>  `;
    let tablaArr = jsonJira.tabla.split("<td>");
    let disp = tablaArr[9].split("</td>")[0].replace(`<strong class="mark">`,"").replace("</strong>","");
    let ServicioAsociado = tablaArr[13].replace("/td></tr><tr>");


   if (!jsonJira.tituloString.includes("INCIDENTE") && !jsonJira.tituloString.includes("EVENTO")) {

         alert(  jsonJira.tituloString+"\n NO INCLUYE LA AFECTACION!! El titulo debe incluir si es INCIDENTE O EVENTO DE MONITOREO ORDINARIO");
         falloBreve = "NO INCLUYE LA AFECTACION!! El titulo debe incluir si es INCIDENTE O EVENTO DE MONITOREO ORDINARIO";
         detalleFallo = jsonJira.tituloString;
         sinFallo=false;
   }else{ 
    document.getElementById("contenedorInterno").innerHTML = jsonJira.titulo+jsonJira.tabla+"   <br><br><br>"; 
  }//if

  if (jsonJira.tituloString.includes("TRAFFIC") ) {
    if(!confirm(`Va a crear una alerta por TRAFFIC, estas alertas normalmente no se crean, puede ir a PRTG y presionar el boton de "Escanear ahora" eso podria desaparecer la alerta. Si esta segur@ de crear el caso presione aceptar o presione cancelar para no proceder`)){
  
                  sinFallo=false;
                  falloBreve = "Caso por Traffic";
                  detalleFallo = "Los casos por Traffic no se suelen crear";       
    }
    }else{ 
    document.getElementById("contenedorInterno").innerHTML = jsonJira.titulo+jsonJira.tabla+"   <br><br><br>"; 
    }//if

    if (jsonJira.tituloString.includes("SNMP") ) {
      if(!confirm(`Va a crear una alerta por SNMP, Debe de tener la seguridad de que esta alerta es verdadera y no un falso positivo, Con la herramienta SNMP_tester puede probar si es este el problema, recuerde agregar la "comunidad", IP, y version del snmp.\n\n Recuerde enviar un correo a 'Monitoreo TI' MonitoreoTI@bp.fi.cr informando de estas alertas \n\n para proceder a crear el caso presione Aceptar o cancelar para salir`)){
    
                    sinFallo=false;
                    falloBreve = "Caso por SNMP";
                    detalleFallo = "Para crear casos por SNMP debe estar segur@";       
      }
      }else{ 
      document.getElementById("contenedorInterno").innerHTML = jsonJira.titulo+jsonJira.tabla+"   <br><br><br>"; 
      }//if
      
      if (jsonJira.tituloString.includes("ConnectivityException") ) {
        alert("Las alertas por conectivityException no es muy normal que se creen a no ser de que sean demasiadas alertas simultaneas por esta causa. Desde el 23-05-2023 se solicitó que sean creadas como Evento de Monitoreo Ordinario");
      }//if


      if (jsonJira.tituloString.includes("NV1APP01") && !jsonJira.tituloString.includes("CONVIVENCIAS") ) {
    
        alert(`Esta a punto de crear una alerta del dispositivo ${disp}, del aplicativo NV1APP01, de este aplicativo no se crean casos, a no ser de que sea del aplicativo CON, que está tiene un business transaction (/CON_WSAppConvivencias/api) que está relacionado con CONVIVENCIAS, en ese caso si es aceptado como caso del area de aplicativos CONVIVENCIAS, de lo contrario no deberia crear el caso. \n\n para salir presione Aceptar`);
      
                      sinFallo=false;
                      falloBreve = "VP0118-NV1APP01";
                      detalleFallo = "NO SE ABREN CASOS DEL APLICATIVO VP0118-NV1APP01";       
        
        }else{ 
        document.getElementById("contenedorInterno").innerHTML = jsonJira.titulo+jsonJira.tabla+"   <br><br><br>"; 
        }//if


        if (jsonJira.tituloString.includes("VT9999")) {
    
          alert(`Esta a punto de crear una alerta del dispositivo ${disp}, de este aplicativo no se crean casos porque es un servidor de pruebas`);
        
                        sinFallo=false;
                        falloBreve = "VA A CREAR ALERTA DE SERVIDOR DE PRUEBAS VT";
                        detalleFallo = "De los servidores VT (Virtual Test) no se crean casos.";       
          
          }else{ 
          document.getElementById("contenedorInterno").innerHTML = jsonJira.titulo+jsonJira.tabla+"   <br><br><br>"; 
          }//if


        if (jsonJira.tituloString.includes("B1-VP0118-DCHAPP03") ) {
    
          alert(`Esta a punto de crear una alerta del dispositivo ${disp}, Para llegar hasta aqui es probable que no se haya fijado a que sonda pertenece este servidor `);
        
                        sinFallo=false;
                        falloBreve = `${disp} no es de sonda 1 o 2`;
                        detalleFallo = `NO SE ABREN CASOS DEL SERVIDOR ${disp}`;       
          
          }else{ 
          document.getElementById("contenedorInterno").innerHTML = jsonJira.titulo+jsonJira.tabla+"   <br><br><br>"; 
          }//if

        if (
            (
            jsonJira.tituloString.includes("RAF" ) || 
            jsonJira.tituloString.includes("CS0" ) ||
            jsonJira.tituloString.includes("CSF" ) ||
            jsonJira.tituloString.includes("RCF" ) || 
            jsonJira.tituloString.includes("RC0" ) || 
            jsonJira.tituloString.includes("SAF" ) || 
            jsonJira.tituloString.includes("SA0" ) || 
            jsonJira.tituloString.includes("SA9" ) ||  
            jsonJira.tituloString.includes("VGF0200P1-01 - Datacenter.Monte_VGF0200P1-01" ) ||            
            jsonJira.tituloString.includes("RA9" ) ||
            jsonJira.tituloString.includes("RA0" )
            ) && !jsonJira.tituloString.includes("Área de Redes y Telecomunicaciones" )
            ) {
              
              if(!jsonJira.tituloString.includes("Área de Redes y Telecomunicaciones" )){    alert(`El area está incorrecta`);  }
      
                        sinFallo=false;
                        falloBreve = "DATOS ERRONEOS ";
                        detalleFallo = `LOS DATOS AGREADOS SON ERRONEOS`;                      
          }else{ 
          document.getElementById("contenedorInterno").innerHTML = jsonJira.titulo+jsonJira.tabla+"   <br><br><br>"; 
          }//if    
   
          if (jsonJira.tituloString.includes("SQL") && !jsonJira.tituloString.includes("Área de Base de Datos") ) { //agrega los SQL a la lista que quieras descartar
              if (!jsonJira.tituloString.includes("RFISQL") && 
                  !jsonJira.tituloString.includes("ORISQL") &&
                  !jsonJira.tituloString.includes("OPRSQL") &&
                  !jsonJira.tituloString.includes("AVRSQL") && 
                  !jsonJira.tituloString.includes("NFCSQL") && 
                  !jsonJira.tituloString.includes("NV1SQL") 
             ){
              
              sinFallo=false;
              falloBreve = "DATOS ERRONEOS ";
              detalleFallo = `LOS DATOS AGREADOS SON ERRONEOS`;    

             }else if( (jsonJira.tituloString.includes("RFISQL01") || jsonJira.tituloString.includes("ORISQL01")) &&  (jsonJira.tituloString.includes("Área")) ){

             console.log(ServicioAsociado); //</td></tr>
             sinFallo=false;
             falloBreve = "AREA ERRONEA";
             detalleFallo = `SERVIDORES DE EXTERNOS NO TIENEN UN AREA ESTABLECIDA`;    

            }else if( (jsonJira.tituloString.includes("OPRSQL01") || 
                       jsonJira.tituloString.includes("OPRSQL02")) &&  
                      (!jsonJira.tituloString.includes("Área de Soporte Técnico")) ){

             alert("Los servidores OPRSQL01 y OPRSQL02 pertenecen al area de soporte tecnico y no a la de base de datos");
              sinFallo=false;
              falloBreve = "DATOS ERRONEOS ";
              detalleFallo = `LOS DATOS AGREADOS SON ERRONEOS`;    
             }
                  
          }else{ 
          document.getElementById("contenedorInterno").innerHTML = jsonJira.titulo+jsonJira.tabla+"   <br><br><br>"; 
         
           try {
            /*La opcion de crear casos de un mismo dispositivo pero con diferentes nodos, casos multiples genera este botón que se viene en el titulo
             de jsonJira, si existe se elimina, sino no pasa nada. se implemente en la function getAppDynamicsSensorInfo
            */
            document.getElementById("btMultiple").innerHTML="";
            document.getElementById("btMultiple").style.display = "none";            
           } catch (error) {console.log("El boton btMultiple no se encuentra "+error); }
          }//if    
    
      try {

      let tablaArr = jsonJira.tabla.split("<td>")
      let fecha = tablaArr[9].split("</td>")[0];
      let disp = tablaArr[11].split("</td>")[0];

      if ( !fecha.includes("/")) {   //fecha.trim() == "undefined" || fecha.trim() == ""
        sinFallo=false;
        falloBreve = "DATOS SIN AGREGAR (NO AGREGÓ LA FECHA)";
        detalleFallo = fecha;
      }

      if (disp.trim() == "undefined" || disp.trim() == "" || disp.trim() == `<strong class="mark"> </strong>`) {
        sinFallo=false;
        falloBreve = "DATOS SIN AGREGAR (NO AGREGÓ EL DISPOSITIVO)";
        detalleFallo = "SIN DISPOSITIVO";
      }

     } catch (error) {
      sinFallo=false;
      falloBreve = "DATOS SIN AGREGAR ("+error+")";
      detalleFallo = "error";
     }
        

     let stringErrorTitulo = `
   
     <div style="background:black; color:white; text-align:center; height: ;" class="cajaInfo2" >
     <h1  class="advertencia">NO SE PUEDE PROCEDER</h1><br>
     <h2  class="advertencia" color: yellow">${falloBreve}</h2><br>
     <p>Algo sucedió!! es probable que usted no siguiera los procedimientos correctos para el llenado de la plantilla 
      y se posicionara en alguna parte donde no se pueda capturar bien el contenido, o puede haber sucedido un error en
      la aplicación, si no es posible generar la plantilla con esta app, deberá generarla manualmente con la plantilla manual.
     </p>
   
     <br>
     <h1 class="advertencia">${detalleFallo}</h1>
     <h4 style="background:green; width: max-content;">Revise usted mismo:</h4>
     <div style="background:black; color:white;  user-select:none;">${evidencias}</div>
     </div>
     `;

  if (sinFallo) { jiraWriterAsync(); }else{ 
    
    document.getElementById("contenedorInterno").innerHTML = stringErrorTitulo;

  }

  });

    async function jiraWriterAsync() {
      let [tab] = await chrome.tabs.query({   active: true, currentWindow: true });
           await  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: jiraWriter });
            }//func

function jiraWriter() {
chrome.storage.sync.get(({ jsonJira }) => {    

         document.getElementById("summary").value = jsonJira.tituloString;
         document.getElementById("customfield_10605-textarea").value = ``;
         document.getElementsByTagName('iframe')[2].contentDocument.getElementsByTagName("p")[0].outerHTML = 
         `<p>${jsonJira.tabla.replace(`<strong class="mark">`,"").replace(`</strong>`,"")
                             .replace(`<strong class="mark">`,"")
                            }<p>`;             
});
}//func jiraWriter

try {
chrome.storage.local.get(["manifiesto"]).then((data) => { 
     let audios = data.manifiesto.preferencias.audios;  
   
     if (audios) {  
      let azar =  Math.round(Math.random() * (70)); 
       document.getElementById("audio"+azar).play(); 
    }
   });
 } catch (error) { console.log(error); }
}//jiraPlantilla


function getGmailSDIRInfo() { //Aplicacion de Gmail de aqui en adelante

  let tabla = document.getElementsByClassName("F cf zt")[0].innerText;

   console.log(tabla);

  let palabras = tabla.split("DTI - INCIDENTE REGISTRADO:");
  let arrIR=[];
  let arrNOC=[];
  let jsonData=[];

  for (let i = 0; i < palabras.length; i++) { 
    arrIR[i] =  palabras[i].split("\nEstimad@")[0].trim();
       if (palabras[i].split("Título:")[1]==undefined || palabras[i].split("Título:")[1]== "undefined") { arrNOC[i] = "N/A "; 
      }else{ arrNOC[i] = palabras[i].split("Título:")[1].trim();  }
        if(!arrIR[i].includes("notificaciones")){jsonData.push({noc: arrNOC[i].split(" ")[0], ir: arrIR[i] });}
  }//for

  console.log(jsonData);
  chrome.storage.sync.set({nocIrGmailList : jsonData});

}//getGmailSDIRInfo

window.onload = function () { 

  fondos();
  getPageInfo();
  cargarAudios(); 
  sesion();
  datosSesion();
}

function cargarAudios() {
  let html="";
  for (let i = 0; i < 71; i++) {
    html  += `
    <audio id="audio${i}" controls style="visibility:hidden">
    <source src="audio/v (${i}).mp3" type="audio/ogg">
    <source src="audio/v (${i}).mp3" type="audio/mp3">
    <source src="audio/v (${i}).mp3" type="audio/mpeg">
  </audio>`;   
  }
  document.getElementById("audios").innerHTML = html;
}//cargarAudios

function fondos() {let azar =  Math.round(Math.random() * (11));/*document.getElementById("body").style.backgroundImage = `url(images/fondos/i${azar}.jpg)`; */}

function loginHtml() {

  document.getElementById("logins").innerHTML = `<div  class="liiSegmento" style="background:red; width:100%; text-align:center" id="login">Log in</div>`;
  document.getElementById("login").addEventListener("click", function() {
  
  document.getElementById("llamarA").style.top = "560px";
  document.getElementById("contenedorInterno").innerHTML =`
  
  <div class="cajaInfo3" style="margin-top:5%"> 
  <h3>Iniciar sesi&oacute;n</h3><br>
   <label>User</label><input id="user" class="inputs" type="text" placeholder="User "><br>
   <label>Pass</label><input id="pass" class="inputs" type="password" placeholder="Password">
   <br><br>  
   <input type="button" id="btnLogin" class="boton3" value="Acceder">
   <div id="info" class="cajaInfo2" style="margin-top:5%; display: none;"> </div>
  </div>
  `;
      document.getElementById("btnLogin").addEventListener("click", function() {
       let u =  document.getElementById("user").value;
       let s =  document.getElementById("pass").value;
       dataVal(u,s);
   }); });    

  }// loginHtml

  document.getElementById("i").addEventListener("dblclick", listaDirectorio );


  function getDirectorio(titulo,array) {
    let texto=`<br><div>${titulo}<br></div>`;
   
    for (let i = 0; i < array.length; i++) {
     texto+= ` 
     <div  class="lii">
   
     <div class="liiSegmento" style="width:60%; text-align:center; font-size:11px">
     ${array[i].nombre} ${array[i].numero}
     </div>
   
     <div class="liiSegmento"  style="width:20% " title="Abrir una conversacion con ${array[i].nombre} en whatsapp">
     <a   target="_blank" href="https://wa.me/${array[i].numero}">
     <img class="icoTel" src="https://iconarchive.com/download/i82978/limav/flat-gradient-social/Whatsapp.ico">
     </a> 
     </div>
   
     <div class="liiSegmento"  style="width:20%" title="Llamar a ${array[i].nombre} enviar llamada a tu teléfono">
     <a   target="_blank" href="tel:+${array[i].numero}">
     <img class="icoTel" src="https://iconarchive.com/download/i83649/pelfusion/long-shadow-media/Phone.ico">
     </a>
     </div>
   
     </div> 
    `;
    }//for
   
   return texto;
   
   }//getDirectorio


  function listaDirectorio() { // se sube el directorio de llamadas

    document.getElementById("llamarA").style.top = "300px";
    document.getElementById("llamarA").style.transition = "Top 1s";

  document.getElementById("cajalii").innerHTML =  getDirectorio("Directorio Banco",directorioBanco)+getDirectorio("Directorio Datasys",directorioDatasys)+ ` <div  class="lii" style="width:100%;" id="logins"></div>`;
   
  try {
    loginHtml();
    datosSesion(); 
  } catch (error) {
    console.log("Un error ocurrió"+error);
  }


} 

//VP9999-S06SQL01

document.getElementById("busquedaDirectorio").addEventListener("keyup",busquedaDirectorio);

function unificarDirectorio() { 
  let arr=[]
  for (let i = 0; i < directorioDatasys.length; i++) {  arr.push(directorioDatasys[i]); }
  for (let i = 0; i < directorioBanco.length; i++)   {  arr.push(directorioBanco[i]); }
  return arr;
}

function busquedaDirectorio() {

  let val = document.getElementById("busquedaDirectorio").value;


  let array = unificarDirectorio();
  let narray =[];

    for (let i = 0; i < array.length; i++) {
        if ( array[i].nombre.trim().toUpperCase().includes(val.toUpperCase().trim() ) ) {  narray.push({nombre: array[i].nombre, numero: array[i].numero}); }
        else if(val.toUpperCase().trim()==""){ listaDirectorio();}
    }

    document.getElementById("cajalii").innerHTML = getDirectorio("Resultados de busqueda", narray);
    narray =[];
}


  document.getElementById("i").addEventListener("click", function() {
       document.getElementById("llamarA").style.top = "560px";
       document.getElementById("cajalii").innerHTML ="";
    } );

    try { loginHtml(); } catch (error) { console.log(error);   }

