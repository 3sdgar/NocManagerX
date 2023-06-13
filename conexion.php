<?php 
header('Content-Type: text/html; charset=UTF-8');

class GestionBaseDatos {
	
	//variables privadas globales
	  private $conexion;
 	  private $servidor;
	  private $usuario;
	  private $contraseña;
	  private $baseDatos;
	  var $tabla;
	//constructor
	
  public function conexionEstatica(){

	return	new mysqli('mysql.webcindario.com', 'nocmanager', 'edgar321','nocmanager');
	}

//hacer la conexion
function setConexion($servidor,$usuario,$contraseña,$baseDatos){

  	global $conexion; // global $servidor; global $usuario; global $contrase�a;  global $baseDatos; 
	 $conexion = new mysqli($servidor,$usuario,$contraseña,$baseDatos);

	 return $conexion;
}//fin conexion

//comprobar si he hizo la conexion
function comprobarConexion($respuesta){
	
 // if ($respuesta){ echo "Se ha podido establecer la conexion";  } else{ echo "No se ha podido hacer conexion con el servidor"; } 
     return $respuesta;
	
}//fin comprobar conexion
	

function askForTable($tabla){return "select * from ".$tabla; }//fin consulta
	
}


?>




	


