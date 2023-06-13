              function guardarEnPortapapeles() {
                var screenshot = document.getElementById("screenshot");
                var imageSrc = screenshot.src;
          
                navigator.clipboard.writeText(imageSrc).then(function() {
                  alert("La imagen ha sido copiada al portapapeles.");
                }, function() {
                  alert("No se pudo copiar la imagen al portapapeles.");
                });
              }
              
              
              function hola(){
              
              alert("hola");
              
              }