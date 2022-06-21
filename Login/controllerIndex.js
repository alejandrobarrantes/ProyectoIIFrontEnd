var pacientes=[];
var paciente={};
var paciente1={id:"123456", nombre:"Alejandro Barrantes Castro", email:"ale13bc@outlook.com", citas:[], edad:20, altura:180, peso:79, fecNac:"02/02/02",sexo:"Masculino", telefono:"62088253", citas:[]};
var paciente2={id:"654321", nombre:"Juan Solano Mendoza", email:"Juancho@outlook.com", citas:[], edad:20, altura:180, peso:79, fecNac:"02/02/02",sexo:"Masculino", telefono:"62088253"};
var paciente3={id:"789654", nombre:"Carlos Enrique Bolaños", email:"carlitos@outlook.com", citas:[], edad:20, altura:180, peso:79, fecNac:"02/02/02",sexo:"Masculino", telefono:"62088253"};
pacientes.push(paciente1);
pacientes.push(paciente2);
pacientes.push(paciente3);
/*pacientes.push(paciente4);
var date=new Date("2022/09/11 10:30:00");
var citas=[];
var cita1={id:"12345", date:new Date("2022/06/13 10:30:00"), estado:1};
var cita2={id:"12346", date:new Date("2022/06/15 12:00:00"), estado:0};
var cita3={id:"12347", date:new Date("2022/06/14 14:30:00"),estado:1};
citas.push(cita1);citas.push(cita2);citas.push(cita3);
//paciente1.citas=citas;*/
var cant=0;
var doctor;
var doctores=[];
var backend="https://crudcrud.com/api/6c60ed1100f3427092b69980801a07c5";

function load(){
    doctor={
        id:document.getElementById("id").value, 
        nombre:document.getElementById("name").value,
		password:document.getElementById("password").value,
		speciality:document.getElementById("speciality").value,
		fee:document.getElementById("fee").value,
		location:document.getElementById("location").value,
		citas:[]
    };  
}


 function login(){
	id=document.getElementById("id").value; 

	 
    /* Request al backend para sacar los doctores, con las citas del doctor
	const request = new Request(backend+'/doctors', {method: 'GET', headers: { }});

	(async ()=>{
		const response=await fetch(request);
		doctores=await response.json();
	})();*/
	 
    doctores= (localStorage.getItem("doctores"))? JSON.parse(localStorage.getItem("doctores")) : [];
	 
	doctor=doctores.find((d)=>d.id==id);
	 doctor.pacientes=pacientes;
	 
     if(doctor){
         localStorage.setItem("doctor",JSON.stringify(doctor));
         document.location="../Calendario/calendario.html";
     }
	 else{
		 //---Lanza mensaje de excepción
	 }

 } 

function register(){
	localStorage.removeItem("doctor");
	document.location="../register/register.html";
}

function loaded(event){	
    document.getElementById("bLogin").addEventListener("click",login);
	document.getElementById("bRegister").addEventListener("click",register);
  }

 document.addEventListener("DOMContentLoaded",loaded); 