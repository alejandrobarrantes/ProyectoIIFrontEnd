// JavaScript Document
var cantCitas=0;
var horarios=[];
var horario={day:"",estado:0, desde:8, hasta:13};
var horarioAux={day:"",estado:0, desde:8, hasta:13};
var dias=["Mon","Tue","Wed","Thu","Fri"];
var date=monday();
var fecha="";
var hora="";
var cita={id:0, date:"", pId:"", estado:0, signos:"", prescripcion:"", diagnostico:"", tipo:"", motivo:""};
var citas=[];
var ev;
var paciente;

var doctor={id:"", password:"",name:"", speciality:"", fee:"", location:"", frecuencia:30, horarios:[] };

if((localStorage.getItem("doctor"))){
	doctor=JSON.parse(localStorage.getItem("doctor"));
	horarios=doctor.horarios;
	
}
var i=5;
var j=12;

function monday(){
	const date = new Date();
	
	switch(date.getDay()){
		case 1:
			return date;
			break;
		case 2:
			date.setDate(date.getDate()-1);
			return date;
			break;
		case 3:
			date.setDate(date.getDate()-2);
			return date;
			break;
		case 4:
			date.setDate(date.getDate()-3);
			return date;
			break;
		case 5:
			date.setDate(date.getDate()-4);
			return date;
			break;
		case 6:
			date.setDate(date.getDate()+2);
			return date;
			break;
		case 0:
			date.setDate(date.getDate()+1);
			return date;
			break;
	}
}

function preAgenda(e){
	hora=e.target.dataset.time;
	fecha=e.target.dataset.date;
	var auxDate=new Date(fecha+" "+hora);
	var select=document.getElementById("select");
	
		if("pid" in e.target.dataset){
			cita=doctor.citas.find(c=> c.id==e.target.dataset.id)
			var c=document.getElementById("buttons");
			c.innerHTML="";
			c.innerHTML+=`<div class='row'><div class='col-12 text-centered cooper'><input id="btn-iniciar" class="boton" type="button" value="Iniciar"></div></div>`
			c.innerHTML+=`<div class='row'><div class='col-12 text-centered cooper'><input id="btn-cancelar" class="boton2" type="button" value="Cancelar"></div></div>`
			document.getElementById("btn-iniciar").addEventListener("click",iniciar);
			document.getElementById("btn-cancelar").addEventListener("click",(e)=>{cancelar(e)});
			document.getElementById("popup").classList.toggle("active");
			document.getElementById("overlay").classList.toggle("active");
			document.getElementById("d-d").value=auxDate.getDate()+'/'+(auxDate.getMonth()+1)+'/'+(auxDate.getYear()+1900);
			document.getElementById("d-t").value=hora;
			
			paciente=doctor.pacientes.find(p=> p.id==e.target.dataset.pid);
			select.innerHTML+=`<option selected value="`+paciente.id+`">`+paciente.nombre+`</option>`;
			
		}else{
			
			ev=e;
			cita.date=auxDate;
		
			document.getElementById("popup").classList.toggle("active");
			document.getElementById("overlay").classList.toggle("active");
			
			var inner=""
			doctor.pacientes.forEach((p)=>{
				inner+=`<option value="`+p.id+`">`+p.nombre+`</option>`;
			});
			select.innerHTML=inner;
			document.getElementById("d-d").value=auxDate.getDate()+'/'+(auxDate.getMonth()+1)+'/'+(auxDate.getYear()+1900);
			document.getElementById("d-t").value=hora;

		}
		
}

function cancelar(e){
	doctor.citas=doctor.citas.filter(c=> c.id!==cita.id);

	
	localStorage.setItem("doctor",JSON.stringify(doctor));
	loadDates(0);
	document.getElementById("popup").classList.toggle("active");
	document.getElementById("overlay").classList.toggle("active");
}
function iniciar(){
	
	paciente.citas=doctor.citas.filter(c=> c.pId===paciente.id);

	localStorage.setItem("paciente",JSON.stringify(paciente));
	localStorage.setItem("doctor",JSON.stringify(doctor));
	document.location="../Paciente/paciente.html";
}
function calendarClick(e){
	if("time" in e.target.dataset) preAgenda(e);
}

function back(){
	loadDates(2);
}

function forward(){
	loadDates(1);
}

function agendar(){
	ev.target.classList.add("date-selected");
	document.getElementById("popup").classList.toggle("active");
	document.getElementById("overlay").classList.toggle("active");

	cita.motivo=document.getElementById("motivo");
	cita.tipo=document.getElementById("tipo").value;
	
	var selection = document.getElementById("select");
	var id=(selection.selectedOptions[0].value);
	var pAux=doctor.pacientes.find((p)=>p.id==id);
	
	ev.target.innerHTML=pAux.nombre+`<br>ID:`+pAux.id;
	cita.id=doctor.citas.length+3;
	cita.pId=pAux.id;

	console.log(doctor.citas);
	
	doctor.citas.push(cita);
	
	
	localStorage.setItem("doctor",JSON.stringify(doctor));
}

function loaded(event){
	 loadMenu();
	 loadDates(0);
	 document.getElementById("right-arrow").addEventListener("click",forward);
	 document.getElementById("left-arrow").addEventListener("click",back);
	 document.getElementById("btn-agendar").addEventListener("click",agendar);
	document.getElementById("calendar").addEventListener("click",(e)=>{calendarClick(e);});
	
	 document.getElementById("user").classList.toggle("active");

  }

document.addEventListener("DOMContentLoaded",loaded);