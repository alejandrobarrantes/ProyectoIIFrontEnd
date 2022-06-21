// JavaScript Document
var pId="";
var cita={id:0, date:"", pId:"", estado:0, signos:"", prescripcion:"", diagnostico:"", tipo:"", motivo:""};

var paciente={id:"", nombre:"", email:"", edad:0, altura:0, peso:0,sexo:"", telefono:"", citas:[], fecNac:""};

if((localStorage.getItem("doctor"))){
   		doctor=JSON.parse(localStorage.getItem("doctor"));
		
}

function loadPatients(pPacientes){
	var container=document.getElementById("patients-container");
	var inner="";
	pPacientes.forEach((p)=>{
		inner+=`<div id="pat" class="patient">
					<div id="p-i-1" class="patient-info">
						<i style="margin-top: 15px; margin-right: 5px;" class="fa-solid fa-user" ></i>
						<a style="text-decoration: none; color: white;"  href="#"><h3 style="margin-top: 13px;" data-id="`+p.id+`">`+p.nombre+`</h3></a>
					</div>
					<div class="patient-info">
						<i style="margin-top: 15px; margin-right: 5px;" class="fa-solid fa-envelope"></i>
						<h3 style="margin-top: 13px;">`+p.email+`</h3>
					</div>
					<div class="patient-info">
						<i style="margin-top: 15px; margin-right: 5px;" class="fa-solid fa-phone"></i>
						<h3 style="margin-top: 13px;">`+p.telefono+`</h3>
					</div>
					<div class="patient-info">
						<button data-iniciar="`+p.id+`" id="btn-iniciar" class="btn-Consulta">Agendar Consulta</button>
					</div>
				</div>`;
	});
	container.innerHTML=inner;
}

function view(id){

	paciente=doctor.pacientes.find(p=>p.id==id);
	paciente.citas=doctor.citas.filter((c)=>c.pId===paciente.id);
	console.log(paciente);
	
	localStorage.setItem("paciente",JSON.stringify(paciente));
	
	localStorage.setItem("doctor",JSON.stringify(doctor));
	document.location="../Paciente/paciente.html";
}

function patientClick(e){
	if("id" in e.target.dataset) view(e.target.dataset.id);
	if("iniciar" in e.target.dataset) popupS(e.target.dataset.iniciar);
}


function popupS(id){
	paciente=doctor.pacientes.find((p)=>p.id==id);
	pId=paciente.id;
	document.getElementById("pac-name").innerHTML="Paciente:  " + paciente.nombre;
	document.getElementById("popup").classList.toggle("active");
}

function agendar(id){
	var fecha=document.querySelector('[name="date"]').value;
	var hora=document.querySelector('[name="time"]').value;
	
	cita.motivo=document.querySelector('[name="motive"]').value;
	cita.tipo=document.querySelector('[name="type"]').value;
	cita.id=doctor.citas.length+3;
	cita.pId=pId;
	delete cita.e;
	cita.date=new Date(fecha+" "+hora);
	doctor.citas.push(cita);

	
		/*Método para agregar cita
	const request = new Request(backend+'/citas/', {method: 'POST', headers: { 'Content-Type': 'application/json'},body: JSON.stringify(cita)});
    (async ()=>{
		try{
            const response = await fetch(request);
            if (!response.ok) {console.log("Error");return;}
        }
        catch(e){
            //errorMessage(NET_ERR,$("#add-modal #errorDiv"));
        }        

    })();*/ 
	
	document.getElementById("popup").classList.toggle("active");
	localStorage.setItem("doctor",JSON.stringify(doctor));
	sessionStorage.setItem("doctor",JSON.stringify(doctor));
}

function image(e){
	let files=e.target.files;
       var fr = new FileReader();
       fr.onload = function () {
            document.getElementById("p-img").src = fr.result;
       }
       fr.readAsDataURL(files[0]);
}

function add(){
	paciente.id=document.querySelector('[name="id"]').value;
	paciente.nombre=document.querySelector('[name="name"]').value;
	paciente.email=document.querySelector('[name="email"]').value;
	paciente.telefono=document.querySelector('[name="phone"]').value;
	paciente.fecNac=document.querySelector('[name="dateB"]').value;
	paciente.edad=(new Date().getYear()-new Date(paciente.fecNac).getYear());
	
	/*Método para agregar paciente
	const request = new Request(backend+'/pacientes/', {method: 'POST', headers: { 'Content-Type': 'application/json'},body: JSON.stringify(paciente)});
    (async ()=>{
		try{
            const response = await fetch(request);
            if (!response.ok) {console.log("Error");return;}
        }
        catch(e){
            //errorMessage(NET_ERR,$("#add-modal #errorDiv"));
        }        

    })();*/ 
	doctor.pacientes.push(paciente);
	loadPatients(doctor.pacientes);
	localStorage.setItem("doctor",JSON.stringify(doctor));
	showHide();
}

function showHide(){
	document.getElementById("popup2").classList.toggle("active");
	console.log("esconde");
}


function loaded(event){	
	loadMenu();
    loadPatients(doctor.pacientes);
	document.getElementById("patients-container").addEventListener("click",(e)=>{patientClick(e);});
	document.getElementById("in-file").addEventListener("change",image);
	document.getElementById("add-p").addEventListener("click",showHide);
	//buttonListeners();
	document.getElementById("btn-agendar").addEventListener("click",agendar);
	document.getElementById("btn-agregar").addEventListener("click",add);
	//dates();
	document.getElementById("user").classList.toggle("active");
}


 document.addEventListener("DOMContentLoaded",loaded); 