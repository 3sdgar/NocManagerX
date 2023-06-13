function versiones(){ 
    document.getElementById("actualizaciones").innerHTML = `

    <div class="cajaVersion">
    <h1> V/ 8 : </h1>
    <p>Se repara el bug greater en Bloqueos POS</p>
    </div>

    <div class="cajaVersion">
    <h1> V/ 7.9 : Textos en PRTG, Flor de loto mini, fixed bug de plantilla AppDy (08-06-2023)</h1>
    <p>Se agregan los textos randomizados en PRTG, una flor en el banner, y se repara el bug que no permitia recopilar datos en la plantilla de AppDy</p>
    </div>

    <div class="cajaVersion">
    <h1> V/ 7.8 : Textos y SplitAppDy, fixed bug Bloqueos POS de Was y Value (07-06-2023)</h1>
    <p>Se generan textos generidos dinamicos para posibles causas y posibles soluciones para cada ISSUE en la plantilla, esto le 
    da mas naturalidad y vuelve mas humano el mecanismo de comunicaci&oacute;n con el cliente </p> 
    <p>Se modifica el SplitAppDy para que vaya directamente los iframes a eventos de servidores, bases de datos t24 y aplicativos</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 7.7 : url a appD</h1>
    <p>Se generaliza la ruta como controller</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 7.6 : Fix bug DB2Monitoring en INCIDENTE</h1>
    <p>Se repara el bug que aparecia en el titulo de dispositivo en INCIDENTE</p> 
    </div> 

    <div class="cajaVersion">
    <h1> V/ 7.5 : Reparación de bug SQL</h1>
    <p>Se agregan exclusiones de servidores de SQL</p> 
    </div> 


    <div class="cajaVersion">
    <h1> V/ 7.4 : BD2 correccion de Bugs</h1>
    <p>Correccion de Bug que cambiaba el titulo todo a T24</p> 
    </div> 

    <div class="cajaVersion">
    <h1> V/ 7.2 : BD2</h1>
    <p>Se crea la plantilla para servidor BD2 para generar alertas de POS</p> 
    </div> 

    <div class="cajaVersion">
    <h1> V/ 7.1 : Rediseño del Scroll</h1>
    <p>Se cambia el grosor y el color de los Scroll</p> 
    </div> 

    <div class="cajaVersion">
    <h1> V/ 7.0 : Nuevo diseño</h1>
    <p>Cambio de interfaz</p> 
    </div> 

    <div class="cajaVersion">
    <h1> V/ 6.9 : Iframe crear caso</h1>
    <p>Cambio de Indice de IFrame de 1 a 2, el 15-05-2023</p> 
    </div> 

    <div class="cajaVersion">
    <h1> V/ 6.8 : Reparación Fitro de Jira y cuadro numerico</h1>
    <p>Ahora puede agregar el numero donde desea iniciar el agregado de IRs 1.3</p> 
    </div> 

    <div class="cajaVersion">
    <h1> V/ 6.7 : Reparación Fitro de Jira</h1>
    <p>Se repararon algunos bugs 1.2</p> 
    </div> 

    <div class="cajaVersion">
    <h1> V/ 6.6 : Agregador automático de IRs (23-04-2023)</h1>
    <p>Agrege los IR a los casos del BPD con tan solo un click</p> 
    <hr>
    <p>Esto solo funciona con usuarios logeados</p> 
    <p>Debe cargar el banco de IR en el correo gmail de su cuenta personal de Datasys o de service desk, tome en cuenta que debe tener una regla predeterminada </p> 
    <p>que pase los correos de los IR a una etiqueta llamada (IRs) para que la aplicación pueda obtener estos datos, si no es asi, no va a funcionar la carga de IRs</p> 
    <p>Hay un boton dentro del dashboard del Jira Filter con opciones para usuarios logeados como ir a la carpeta de IRs de Gmail, y ademas el boton de </p>
    <p>gestión de IRs, que abre los casos en Jira automaticamente y agrega el IR correspondiente, con un intervalo de 15 segundos para iniciar y por cada uno de ellos</p>
   <hr>
   <p>TOME EN CUENTA QUE ES LA VERSION BETA</p>
   <p>1.1 Si encuentra algun error al usarla por favor comuniquelo a Edgar Fabian Gonzalez 3sdgar@gmail.com</p>
   <img  class="imgCaja" src="https://lh3.google.com/u/0/d/1QQXhkym0wA2IAaNO6i6EZfH3okFACKrG=w1920-h902-iv1" alt=img" aria-hidden="true">
   
    </div> 

    <div class="cajaVersion">
    <h1> V/ 6.5 : Fitro de Jira</h1>
    <p>Ahora puede filtrar listados de casos en Jira desde el NocManager X</p> 
    </div> 

    <div class="cajaVersion">
    <h1> V/ 6.4 : Limites en businessTransactions</h1>
    <p>Se evita la posibilidad de crear casos por BusinessTransaction donde no hay suficiente informaci&oacute;n</p> 
    <img  class="imgCaja" src="https://lh3.google.com/u/0/d/1A7Isavcf3vPmHqobjTRFn1SY87mpkWEM=w1920-h902-iv1" alt=img" aria-hidden="true">
    </div> 

    <div class="cajaVersion">
    <h1> V/ 6.3 : Segundo Plano</h1>
    <p>Inician metodos de segundo plano (11-04-2023)</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 6.2 : Exception para Objeto,dispositivo</h1>
    <p>Se corrige bug al intentar validar el dispositivo (04-04-2023)</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 6.1 : Apariencia | tildes en plantilla | audios nuevos</h1>
    <p>Correccion en plantilla de Jira (04-04-2023)</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 6.0 : Apariencia | tildes en plantilla | audios nuevos</h1>
    <p>Nuevos audios agregados como Merlina Addams, Cambio en el Banner y recuperaci&oacuate; de tilde en Area (04-04-2023)</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 5.8 : SQL</h1>
    <p>Se agrega servidor que no era aceptado (06-03-2023)</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 5.7 : Reparaci&oacute;n de fecha</h1>
    <p>Se repara la fecha en el reporte de llamadas (22-02-2023)</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 5.6 :Cambio de manejo de botones</h1>
    <p>Los botones del menú superior muestran el modo de uso con un click, y con doble click se ejecuta su acci&oacute;n (20-02-2023)</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 5.5 : Soporte Linux</h1>
    <p>Soporte para sensores Linux de memoria</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 5.4 : Modificacion para uso en https://172.31.242.11</h1>
    <p>Compatibilidad para PRTG https://172.31.242.11</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 5.3 : Banner estandar | Agente de Maquina</h1>
    <p>Se restaura a banner estandar, y se cambia en la plantilla el detalle del evento y area de soporte para casos de indisponibilida de agente, tambien se crea el aviso de nueva actualizaci&oacute;n</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 5.2 : Cambio de Nombre de Eventos y Eventos Criticos</h1>
    <p>Se Se cambian los nombres de los eventos criticos y los eventos (14-02-2023)</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 5.1 : Correccion para Servidores B1-</h1>
    <p>Bloqueo de creaci&oacute;n de casos para servidores B1- que pertenecesn a Sonda 3</p> 
    <img  class="imgCaja" src="https://lh3.google.com/u/0/d/1_HnfF4d2K-kFpV11IE74eIF_zcJcKtG4=w1920-h902-iv1" alt="Mostrando scrnli_12_12_2022_10-00-06.png" aria-hidden="true">
    <img  class="imgCaja" style=" text-align: center;   height: 200px;" src="https://lh3.google.com/u/0/d/10LtzL5SMiEssSbVf0HEZbA8JuvCn0RB1=w1920-h1080-iv1" alt="Mostrando scrnli_12_12_2022_10-00-06.png" aria-hidden="true">

    </div> 

    <div class="cajaVersion">
    <h1> V/ 5.0 : Banner 14 de febrero</h1>
    <p>Se agrega banner temporal para 14 de febrero, se actualiza directorio telefonico, Numero Ananjely y Katnell</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 4.9 : Cambio de titulo en Eventos Criticos </h1>
    <p>01 de febrero de 2023 Se cambia de EVENTO CRITICO a EVENTO_CRITICO</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 4.8 : Categorizacion del evento</h1>
    <p>27 de Enero de 2023 se remueve totalmente la linea de la tabla en la plantilla.</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 4.7 : Categorizacion del evento</h1>
    <p>26 de Enero de 2023 se remueve la Categorizacion del evento en la plantilla, el campo va vacio.</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 4.6 : Reporte de llamadas</h1>
    <p>Error de reporte semanal en reporte de llamadas corregido</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 4.5 : Link Iframe wikiNoc</h1>
    <p>Reparación del exportador JSON</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 4.4 : Json api</h1>
    <p>Reparación del exportador JSON</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 4.3 : Implentacion de wikiNoc en nueva pestaña</h1>
    <p>Al clickear una vez se habre la wikiNoc en la aplicación y al darle doble click en una pestaña nueva</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 4.2 : Mejoras en la aplicación de llamadas | WikiNoc (en desarrollo) </h1>
    <p>Ahora puede filtrar los contactos (Barra de busqueda, filtrado inteligente, vínculo de todos los contactos a whatsapp y envio de llamadas al dispositivos insalados o vinculados) por medio de la barra de busqueda, se agregaron mas contactos del equipo de Datasys y del equipo de Banco Popular. clickeando
    en el botón de whatsapp podrá acceder rapidamente al chat del contacto seleccionado de manera web si no tiene la aplicación desktop. recuerde que el directorio se abre presionando doble click</p>
    <p>La nueva aplicacion web WikiNoc: puede acceder dandole doble click al icono de la aplicación, proximamente podrá encontrar muchisima información importante, 
    pudiendo encontrar lo que busca de una manera mas rapida y eficiente</p> 
    <center>
    <img  class="imgCaja" src=" https://lh3.google.com/u/0/d/1fN6Y1NpTd_fFjO8eVr6i-mH7gG1r5hAX=w1920-h902-iv1" alt="Mostrando scrnli_12_12_2022_10-00-06.png" aria-hidden="true">
    </center>
    <br>
    </div>

    <div class="cajaVersion">
    <h1> V/ 4.1 : Aplicación de llamadas</h1>
    <p>Se incorpora la nueva aplicacion con el directorio de telefonos importantes</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 4.0 : Reparación de JSON asyncronomo para Casos Multiples</h1>
    <p>Los datos ya no son asincronomos en los casos multiples. Ahora se almacenan localmente por unos instantes mientras se crea el ticket</p> 
    </div>

    <div class="cajaVersion">
    <h1> V/ 3.9 : Inicio de Sesión</h1>
    <p>Ahora puede Iniciar sesión si es un usuario registrado. Para iniciar sesión debe introducir los datos de su usuario, al estar loggeado  tendrá acceso a 
    la pestaña de opciones, donde podrá cambiar las configuraciones establecidas, como silenciar audios y mas </p> 
    <center>
    <img  class="imgCaja" src="https://lh3.google.com/u/0/d/1FBRGjsa6Out0TLB_1ckbrW-VoOCj82JL=w1920-h902-iv1" alt="Mostrando scrnli_12_12_2022_10-00-06.png" aria-hidden="true">
    <img  class="imgCaja" src="https://lh3.google.com/u/0/d/12fFG3uFwbJf1--4DT80WXPDay1aPDswp=w1433-h902-iv1" alt="Mostrando scrnli_12_12_2022_10-00-06.png" aria-hidden="true">
    <img  class="imgCaja" src="https://lh3.google.com/u/0/d/1zoNWPa8WAlvi6ZPOfhtOJZsG_bGtwRz-=w1090-h902-iv1" alt="Mostrando scrnli_12_12_2022_10-00-06.png" aria-hidden="true">
    </center>
    <br>
    </div>

    <div class="cajaVersion">
    <h1> V/ 3.8 : Reparación de URL para Json</h1>
    <p>Se repara la URL para exportar Json como excel</p> 

    </div>

    <div class="cajaVersion">
    <h1> V/ 3.7 : Llamadas telefonicas</h1>
    <p>Abra el directorio de llamadas con doble click, y seleccione el numero de la persona que desea llamar, si tiene sus dispositivos sincronizados puede 
    enviar la llamada a su telefono, o abrir desde whatsapp desktop o web.</p> 
    <center>
    <img  class="imgCaja" src="https://lh3.google.com/u/0/d/1MObsG4ySONzni8lLuJorTmd-tEuYHCBu=w1920-h902-iv1" alt="Mostrando scrnli_12_12_2022_10-00-06.png" aria-hidden="true">
   
    <p>Puede seleccionar entre sus dispositivos vinculados para hacer la gestion con el numero telefonico registrado</p>
    <img  class="imgCaja" src="https://lh3.google.com/u/0/d/1EmDQtaC914eO0yYxq00VHdPvRpLjjcS6=w1075-h902-iv1" alt="Mostrando scrnli_12_12_2022_10-00-06.png" aria-hidden="true">
    <p>02-01-2023</p>
    </center>
    <br>
    </div>


    <div class="cajaVersion">
    <h1> V/ 3.6 : Diseño 2023</h1>
    <p>Nuevo diseño de GUI, colores, apariencia, botones mejor ubicados </p> 
    <center>
    <img  class="imgCaja" src="https://lh3.google.com/u/0/d/14G2vz-EoKo2tjyXg7DpJNgdgSvfQFtfa=w1920-h902-iv1" alt="Mostrando scrnli_12_12_2022_10-00-06.png" aria-hidden="true">
    </center>
    <br>
    </div>

    <div class="cajaVersion">
    <h1> V/ 3.4 : Reporte de llamadas</h1>
    <p>Generador de Reporte de llamadas </p> 
    <center>
    <img  class="imgCaja" src=" https://lh3.google.com/u/0/d/1eShRfBWqDVuxztk__KL7CPQ3tO5Ueztt=w1920-h830-iv1" alt="Mostrando scrnli_12_12_2022_10-00-06.png" aria-hidden="true">
    <img  style=" text-align: center;   height: 200px;" src=" https://lh3.google.com/u/0/d/1amhmxUg1KcOucaz543P_CEDEZsgcC3HW=w1075-h830-iv1" alt="Mostrando scrnli_12_12_2022_10-00-06.png" aria-hidden="true">

    </center>
    <br>
    </div>

    <div class="cajaVersion">
    <h1> V/ 3.3 : Edición para año nuevo</h1>
    <p>Creación de Banner wide para año nuevo 2023</p> 
    <center>
    <img  class="imgCaja" src=" https://lh3.google.com/u/0/d/14Y5Zkh82Pc3RFQsqXwosR8jYBHQpfQ1y=w1920-h902-iv1" alt="Mostrando scrnli_12_12_2022_10-00-06.png" aria-hidden="true">
    </center>
    <br>
    </div>

    <div class="cajaVersion">
    <h1> V/ 3.2 : Solución para servidores SQL de Area de Soporte Técnico</h1>
    <p>VP9999-OPRSQL01 y VP9999-OPRSQL02 pertenecen al Area de Soporte Técnico, se repara el limite que impedia aproceder por ser de esta área</p> 
    <center>
    <img  style=" text-align: center;   height: 200px;" src="https://lh3.google.com/u/0/d/1qQFunA411yc0pc7yUamKomAN3iGZnHv8=w1902-h860-iv1" alt="Mostrando scrnli_12_12_2022_10-00-06.png" aria-hidden="true">
    <img class="imgCaja" style=" text-align: center;   height: 400px;   width: max-content;" src="https://lh3.google.com/u/0/d/174h4ws-zpRxCllnIBJ6Er4wwWBX1D0sj=w1350-h860-iv1"  alt="Mostrando scrnli_12_12_2022_9-59-59.png" aria-hidden="true">
    </center>
    <br>
    </div>

    <div class="cajaVersion">
      <h1> V/ 3.1 : Plantillas multiples</h1>
      <p>Ahora puede crear tickets aun más rápido mediante las plantillas multiples. Las alertas con el mismo dispositivo (Servidor)
      pueden ser creadas en un mismo ticket, creando una plantilla que incluya la informacion de los nodos involucrados</p> 
      <center>
      <img class="imgCaja" src="https://lh3.googleusercontent.com/fife/AAbDypA-f0dccBHnodezVL8PJgoy7mplFOUVUE81HS9EepbdcUeCIB5bp-UDE4dykaiBexMfWxxTqP8DQk8G2_ZF1y-DWDwPlEbQKcN-_LZF6j2OjWMb2hokWO45bxirV9gz7g0HjcGVTTV-WZVWOadK405cM4mIPg1i8SGmmzEZRUC7So2MKB3dYu7DM33QR1HhJMr4UOmb-QksTGgTGxcQvo-EGnnjVg348eWmnIxZqX2IGHy9JaWde82nNjN9ZphaB0EQXrnYIfjf_H_2A5HPOzvTkypLEVAAFTU5zWJmQVVy43cpUKfcZZGZe3KO9M8AZbcpdPf93OPGwzEQLZDoLoD08uAHjD9-Kg4RRS0Qf7U6j7zmGHWWyhSVDBctMRSZF5t9PHckr7MBFTzd_uf5SHmp-1zlc6_bK6hjOVxDeaIL5nRDn5nJ6mxlEJPiaAlP2k2mc75dv8qMxiDLUYg_ZSx3axMoQE7jrOjhGWRJpVGZosG0KeMnyhlIyk53x1uqbJtm40FoAyOq_Co3hpWtM0rxL6DMEFqrGg2M4ydzssmpwj0HmiFEQijy67lQrBMBW8ZADTnk0ZJDqxext5VXADqt5Micg9gnMU0fLtIxXhINtw6AIPDMYFWEF_poROWGiG0bauAePTngh_V4ygAEeja_xZ88Ucl0AuPOxl-q6vlmIqL52W7TwfkpXrfO-YipIRnTpx8AAZOmE8HClOXyXqTZqPNjBF9ZosWkxmbsLMGclVy1xCp0X1Eue_VBMtizj8Ib6sTcDkX0JXcuSobm_Okbxt3UQRWGmHe9Lmp3uWGAj38Qp_l-xRTQZYbbNyf4Ovxbf3hV2TRFfLuGeYCSF46itjIT4w4RIDVdAiJkjMXS2igdtsKoQXfrZ_SAMUYdeMv73i6oik2bzy-l3z2hAb9ZyZbGob7wS0QsnI2g0J0IoF8TtE0ODSsAVbd07bsxyOiHSsVFNyDTEmna6wxkjZRI76GOjByhPpaUs0-b1Oa8snK-TkZ0eb6miCU_opg5rJBLAbRW1pndlc9b6st7EbnKnMQ9tBaysr9Qe_dgUMMDcd6y4nz-UtYMad7DQ2GdB9BRJB9wXyoxdm6WGTlW3K1rYzNAUMx_ZzYmLs_FGszPrMlbdNF6tSv25TG9RLGrSQp5mtW4i_RGGWKVGIco991ajFjIZW6sj1QCzzMaRa_jkAmNz05qC-HGQ7umnVYL4FPcTDdKsJqEoCUS-Apn2W0n7Ob_DbxyOe3P3_40lO9dcGMJotg1VPXRoOqVZPIg9cUT0MH2SXWvjrg9bTswR0ibJBE8C0WutWf2nWM2nwrGOiG5sLP7IEVZoOxlMyGGyU7865NUUvSpFgEKa8xDT0fXx_JkVB1WioPR7MYKKhcqV1OMWpFMkd4otUl_MVymaX4pI0f7GnmulbyEKAzSex1JD49tDWg017tBS4QH4PCTOTkW0cVd6lmk3y6t7aM5sJd5Tp8igq-hdpi4a4QvBg=w1920-h902" alt="" srcset="">
      </center>
      <br>
      <p>Solamente debe presionar el boton agregar datos adicionales para que se agreguen al storage, luego entre a cualquiera de las alertas
      de las que va a crear un caso multiple,  </p>
      <center>
      <img  class="imgCaja" src="https://lh3.google.com/u/0/d/1z3F0jKW6BowAoRjZQoiuAwNMEF4K6-L1=w1920-h902-iv1" class="a-b-ta-Ua" alt="Mostrando v3.1-2.PNG" aria-hidden="true">
      </center>
      <p>Va a encontrar la plantilla normal que se crea dinamicamente con los datos individuales de la alerta que normalmente crearía, pero 
      en la parte superior se va a encontrar con el nuevo botón agregar datos multiples, este le permite transformar esa plantilla individual a multiple, agregarndo
      los todos los nodos que anteriormente aceptó agregar <br> Vea como se ve la plantilla una vez agregados los nodos alertados</p>
      <center>
      <img class="imgCaja" src="https://lh3.google.com/u/0/d/1D9M7x-aMjG7SWBppAKqQL8_x8rLBwNo3=w1367-h902-iv1" class="a-b-ta-Ua" alt="Mostrando v3.1-3.PNG" aria-hidden="true">
      </center>
      </div>

      <div class="cajaVersion">
      <h1> V/ 3.0 : Audios de aviso</h1>
      <p>Se incluyeron nuevos audios (50) para llamar mas la atención del user e instar a que haga una revisión de los datos previamente a crear el caso</p> 
      <br>
      </div>

      <div class="cajaVersion">
      <h1> V/ 2.9 : Reparación de area T24 2</h1>
      <p>Se soluciona el error semántico del area erronea en T24, de aplicatios t24 a soporte t24</p> 
      <br>
      </div>

      <div class="cajaVersion">
      <h1> V/ 2.8 : Reparación de area T24</h1>
      <p>Se soluciona el error semántico del area erronea en T24, de aplicatios t24 a soporte t24</p> 
      <br>
      </div>

    `;

}
