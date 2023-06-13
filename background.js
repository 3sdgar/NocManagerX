// background.js
let color = 'red'; // aqui se declara que cuando se instala la extension, se le da color vere al boton
const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const currentDate = new Date();
const fiveDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 5));
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = fiveDaysAgo.toLocaleString('es-ES', options);
let solucion =`Se realiza el cierre de los casos del 01 de ${monthNames[month]} al día ${fiveDaysAgo} de ${monthNames[month]} del ${year}`;

let manifiesto = { 
  cripto: {user:["edgar","monse","ana","katnell","luis","admin"], pass:["1234","1234","1234","1234","1234","admin"] },
  sesion: false,
  preferencias: {
             audios: true, 
             urlBanner: "images/B6.png"
  }
}

function textoHTML() {

  console.log('Detectacion de cambio de pestaña');
  alert('Detectacion de cambio de pestaña');
 // document.body.innerHTML = `modificando el html`;


 // Comprobamos si el navegador soporta las notificaciones
if ("Notification" in window && "serviceWorker" in navigator) {
  // Solicitamos permiso para mostrar notificaciones
  Notification.requestPermission().then(function (permission) {
    if (permission === "granted") {
      // Registramos un service worker para recibir las notificaciones
      navigator.serviceWorker.register("service-worker.js").then(function (registration) {
        // Mostramos una notificación
        registration.showNotification("Título de la notificación", {
          body: "Contenido de la notificación",
          icon: "ruta/al/icono.png" // Ruta al archivo de icono
        });
      });
    }
  });
}


}

chrome.tabs.onActivated.addListener( async function() {
 
  // Código para ejecutar en segundo plano aquí

  chrome.storage.local.set({ iIni: 0 });

    let [tab] = await chrome.tabs.query({   active: true, currentWindow: true });
    chrome.scripting.executeScript({ target: { tabId: tab.id }, func: textoHTML, });

  chrome.debugger.attach({tabId}, '1.0', function() {
    chrome.debugger.sendCommand({tabId}, 'Runtime.evaluate', {
      expression: "console.log('La extensión se ha iniciado en segundo plano')"
    });
  });

});




chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });

  chrome.storage.local.set({ iIni: 0 });
  chrome.storage.local.set({solucion});

  chrome.storage.local.set({manifiesto}).then(() => {
    console.log(manifiesto);
    console.log("Datos locales creados");
  });
  console.log('Color por defecto establecido desde el background.js en #3aa757 verde', `color: ${color}`);
});

chrome.runtime.onUpdateAvailable.addListener(function () { 
  if (prompt("Se ha detectado que hay una nueva actualización disponible, desea actualizar ya?")) {  chrome.runtime.reload();}
})


chrome.runtime.onStartup.addListener(function() {
  console.log('La extensión se ha iniciado con ejecucion en segundo plano');
  chrome.storage.local.set({solucion});
  chrome.storage.local.set({ iIni: 0 });
});

