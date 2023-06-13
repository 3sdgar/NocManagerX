

/*

document.getElementById("jiraFiltro").addEventListener("click", () => {//Boton para filtrar el contenido de los JQL de Jira

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
             "katnell.guillen"
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
          "Incidente",
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
  
         <center><input id="iceBoton" type="button" class="selectForm3" value="Gestionar" style="margin-top:2%; margin-bottom:3%"></center>

     `;

     if (sesionVal) { 
      texto +=` 
      <hr>
       <input id="cp" class="selectForm3" type="button" value="Catalogo de Peticiones" > 
       <input id="cSBPDSA" class="selectForm3" type="button" value="Casos BPD sin Asignar" > 
      
     
        <h3>Gmail Service Desk Manager</h3>

       

        <input id="gmailIRsUrl" class="selectForm3" type="button" value="Casos BPD sin Asignar" > 
      `;  
    
    }

     texto+=`
      </div>
     </div>
     <div>
     <br>
     <br>
    `;

    document.getElementById("contenedorInterno").innerHTML =texto;




    */