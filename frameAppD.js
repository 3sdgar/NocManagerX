function appDynamics4Frames() { 
     document.body.innerHTML = `  
     <html lang="en" data-darkreader-mode="dynamic" data-darkreader-scheme="dark" class="x-strict">
     <head>
     </head>
     <body>

     <!--
    <iframe src="http://192.168.131.98:8090/controller/#/location=APPS_ALL_DASHBOARD&amp;timeRange=last_30_minutes.BEFORE_NOW.-1.-1.30" 
    style="width:49%; height: 475px; float:left;"> </iframe>   
    <iframe src="http://192.168.131.98:8090/controller/#/location=APPS_ALL_DASHBOARD&amp;timeRange=last_30_minutes.BEFORE_NOW.-1.-1.30" style="width:49%; height: 475px; float:left;"> </iframe>   
    <iframe src="http://192.168.131.98:8090/controller/#/location=APPS_ALL_DASHBOARD&amp;timeRange=last_30_minutes.BEFORE_NOW.-1.-1.30" style="width:49%; height:475px; float: left;"> </iframe>   
    <iframe src="http://192.168.131.98:8090/controller/#/location=APPS_ALL_DASHBOARD&amp;timeRange=last_30_minutes.BEFORE_NOW.-1.-1.30" style="width:49%; height:475px; float: left;"> </iframe>
  -->
  
  <iframe src="http://192.168.131.98:8090/controller/#/sim/serverEvents?application=3&timeRange=last_30_minutes.BEFORE_NOW.-1.-1.30" 
  style="width:49%; height: 475px; float:left;"> </iframe> 

  <iframe src="http://192.168.131.98:8090/controller/#/location=DB_MONITORING_EVENTS&timeRange=last_30_minutes.BEFORE_NOW.-1.-1.30&application=1" 
  style="width:49%; height: 475px; float:left;"> </iframe> 

  <iframe src="http://192.168.131.98:8090/controller/#/location=APP_EVENTSTREAM_LIST&timeRange=last_30_minutes.BEFORE_NOW.-1.-1.30&application=88" 
  style="width:49%; height: 475px; float:left;"> </iframe> 

  <iframe src="http://192.168.131.98:8090/controller/#/location=APPS_ALL_DASHBOARD&amp;timeRange=last_30_minutes.BEFORE_NOW.-1.-1.30" 
  style="width:49%; height: 475px; float:left;"> </iframe>



 
    </body></html>
     `;
   }

