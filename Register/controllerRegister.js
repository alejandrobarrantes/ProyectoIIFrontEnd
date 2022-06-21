// JavaScript Document
var cant=0;
var doctores= (localStorage.getItem("doctores"))? JSON.parse(localStorage.getItem("doctores")) :[];
var horarios=new Array();
var horario={day:"",estado:0, desde:"", hasta:""};
var backend="https://crudcrud.com/api/601fb27b6388452482e9104386eaa018";
var dias=["Mon","Tue","Wed","Thu","Fri"];
var i=0;
var mode='';
var selectDesde='</div><div class="schedule"><label>Desde:</label><select id="desde">';
var selectHasta='<select id="hasta">';
var doctor={id:"", password:"",name:"", speciality:"", fee:"", location:"",frecuency:"", horarios:horarios,citas:[] };
	

dias.forEach(()=>{
	horario={day:dias[i], estado:0}; 
	horarios.push(horario);
	i++;
}
);

for(i=0; i<24;i++){
	if(i<12){
		if(i<10){
		selectDesde+='<option value="'+i+'">0'+i+'am</option>';
		selectHasta+='<option value="'+i+'">0'+i+'am</option>';
		}
		else{
			selectDesde+='<option value="'+i+'">'+i+'am</option>';
			selectHasta+='<option value="'+i+'">'+i+'am</option>';
		}
	}
	else{
		selectDesde+='<option value="'+i+'">'+i+'pm</option>';
		selectHasta+='<option value="'+i+'">'+i+'pm</option>';
	}
}

selectDesde+='</select><label>Hasta:</label>';
selectHasta+='</select></select></div>';

var divSelects=selectDesde+selectHasta;

function recover(){
	if((localStorage.getItem("doctor"))){
   		doctor=JSON.parse(localStorage.getItem("doctor"));
		loadMenu();
		load(2);
		document.getElementById("user").classList.toggle("active");
   	}
	else{
		doctor={id:"", password:"",
    	name:"", speciality:"", fee:"", location:"",frecuency:"", horarios:horarios, citas:[] };
		mode='A';
	}
}
  
function load(type){
    if(type===1){
        doctor.id=document.getElementById("id").value;
        doctor.name=document.getElementById("name").value;
        doctor.password=document.getElementById("password").value;
        doctor.speciality=document.getElementById("speciality").value;
        doctor.fee=document.getElementById("fee").value;
        doctor.location=document.getElementById("location").value;
		doctor.frecuency=document.getElementById("frecuency").value;
        guardar();
		id=doctor.id;
    }
    if(type===2){
        document.getElementById("id").value=doctor.id;
        document.getElementById("name").value=doctor.name;
        document.getElementById("password").value=doctor.password;
        document.getElementById("speciality").value=doctor.speciality;
        document.getElementById("fee").value=doctor.fee;
        document.getElementById("location").value=doctor.location;
		document.getElementById("frecuency").value=doctor.frecuency;
		document.getElementById("id").readOnly = true;
		document.getElementById('register-button').removeEventListener("click",registrar);
		document.getElementById("register-button").addEventListener("click",update);
		document.getElementById("register-button").innerHTML="Update";
    }
}

function update(){
	
	load(1);
	/*
	----REQUEST PARA ACTUALIZAR DOCTOR
	const request = new Request(backend+'/doctors/'+doctor._id, {method: 'PUT', headers: { 'Content-Type': 'application/json'},body: JSON.stringify(doctor)});
    (async ()=>{
		try{
            const response = await fetch(request);
            if (!response.ok) {console.log("Error");return;}
        }
        catch(e){
            //errorMessage(NET_ERR,$("#add-modal #errorDiv"));
        }        

    })();*/  
	console.log("reg");
	var doctoresAux=doctores.filter((d)=>d.id==doctor.id);
	doctores.push(doctor);
	
	localStorage.setItem("doctor",JSON.stringify(doctor));
	localStorage.setItem("doctores",JSON.stringify(doctoresAux));
	document.location="../login/index.html";
	
}

function schedules(){
    borrar();
    render();
    document.getElementById("popup").classList.toggle("active");
	$("#d1 .day").on("click",function(e){e.target.parentNode.parentNode.querySelector(".schedule").classList.toggle("active");});
}

function guardar(){
    document.getElementById("popup").classList.toggle("active");
	
	var i=0;
	doctor.horarios=[];
	var desde=document.querySelectorAll("#desde");
	var hasta=document.querySelectorAll("#hasta");
	var checkboxes="";
	
	i=0;
	
	desde.forEach(()=>{
		var dia="#day"+i;
		checkboxes=$(dia);
		
		if (checkboxes.prop('checked')){
			horarios[i].estado=1;
		}
		else{
			horarios[i].estado=0;
		}
		horarios[i].desde=parseInt(desde[i].value);
		horarios[i].hasta=parseInt(hasta[i].value);
		
		i++;
	});

	doctor.horarios=horarios;
	borrar();
}

function registrar(){
	load(1);
	add();
	var pos=existe(doctor.id);

	if(pos!==-1){
		doctores[pos]=doctor;
	}
	else{
		doctores.push(doctor);
	}
	/*
	----REQUEST PARA AGREGAR DOCTOR
	const request = new Request(backend+'/doctors/', {method: 'POST', headers: { 'Content-Type': 'application/json'},body: JSON.stringify(doctor)});
    (async ()=>{
		try{
            const response = await fetch(request);
            if (!response.ok) {console.log("Error");return;}
        }
        catch(e){
            //errorMessage(NET_ERR,$("#add-modal #errorDiv"));
        }        

    })();*/ 
	addImagen();
	localStorage.setItem("doctores",JSON.stringify(doctores));
    localStorage.removeItem("doctor");
    document.location="../login/index.html";
}


function add(){
	const request = new Request(backend+'/doctors', {method: 'POST', headers: { 'Content-Type': 'application/json'},body: JSON.stringify(doctor)});
	(async ()=>{
		const response=await fetch(request);
	})();
 } 
    
function render(){
	 parent=document.getElementById("schedules");
	 var i=0;

	 doctor.horarios.forEach(()=>{
            d=document.createElement("div");
            d.className="schedule-container";
		 d.id="schedule-container";
		 d.innerHTML='';
		
		 if(doctor.horarios[i].estado===0){
		 	d.innerHTML='<div id="d1" class="day-input"><input class="day" id="day'+i+'" type="checkbox" value="'+i+'">'+ doctor.horarios[i].day+'';

			d.innerHTML+=divSelects;
	 	 	parent.appendChild(d);
		 }
		 if(doctor.horarios[i].estado===1){
			 d.innerHTML='<div id="d1" class="day-input"><input class="day" id="day'+i+'" checked type="checkbox" value="'+doctor.horarios[i].day+'">'+doctor.horarios[i].day+'</div>';

			 d.innerHTML+=selecteds(i);
			 parent.appendChild(d);
		 }
		 i=i+1;
	 }		 
	);
	var checkeds=document.querySelectorAll("#scl");
	var i=0;

	checkeds.forEach(()=>{checkeds[i].classList.toggle("active"); i++;});
}

function borrar(){
	var checkeds=document.querySelectorAll(".schedule-container");
	i=0;
	checkeds.forEach(()=>{checkeds[i].remove(); i++;});
}

function selecteds(i){
	var selectDesde2='</div><div id="scl" class="schedule"><label>Desde:</label><select id="desde">';
	var selectHasta2='<select id="hasta">';

	for(j=0; j<24;j++){
		if(j<12){
			if(j<10){
				if(j==doctor.horarios[i].desde){
					selectDesde2+='<option selected value="'+j+'">0'+j+'am</option>';
				}
				else{
					selectDesde2+='<option value="'+j+'">0'+j+'am</option>';
				} 
				if(j==doctor.horarios[i].hasta){
					selectHasta2+='<option selected value="'+j+'">0'+j+'am</option>';
				}
				else{
					selectHasta2+='<option value="'+j+'">0'+j+'am</option>';
				}
			}
			else{
				if(j==doctor.horarios[i].desde){
					selectDesde2+='<option selected value="'+j+'">'+j+'am</option>';
				}
				else{
					selectDesde2+='<option value="'+j+'">'+j+'am</option>';
				} 
				if(j==doctor.horarios[i].hasta){
					selectHasta2+='<option selected value="'+j+'">'+j+'am</option>';
				}
				else{
					selectHasta2+='<option value="'+j+'">'+j+'am</option>';
				}
			}
			
		}
		else{
			if(j==doctor.horarios[i].desde){
				selectDesde2+='<option selected value="'+j+'">'+j+'pm</option>';
			}
			else{
				selectDesde2+='<option value="'+j+'">'+j+'pm</option>';
			}
				 
			if(j==doctor.horarios[i].hasta){
				selectHasta2+='<option selected value="'+j+'">'+j+'pm</option>';
			}
			else{
				selectHasta2+='<option value="'+j+'">'+j+'pm</option>';
			}
		}
		
		}
		
	selectDesde2+='</select><label>Hasta:</label>';
	selectHasta2+='</select></select></div>';
	
	return selectDesde2+selectHasta2;
}

function existe(id){
	for(k=0;k<doctores.length;k++){
		if(doctores[k].id===id){
		   return k;
		}
	}
	return -1;
}

function image(e){
	let files=e.target.files;
       var fr = new FileReader();
       fr.onload = function () {
            document.getElementById("p-img").src = fr.result;
       }
       fr.readAsDataURL(files[0]);
}

 function addImagen(){
    var imagenData = new FormData();
    imagenData.append("cedula", doctor.id);
    imagenData.append("imagen", document.getElementById("in-file").files[0]); 
	 
    let request = new Request(backend+'/doctores/'+doctor.id+"/imagen", {method: 'POST',body: imagenData});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {console.log("error");return;}              
    })();    
  }


function loaded(event){	
    document.getElementById("schedule").addEventListener("click",schedules);
    document.getElementById("save-button").addEventListener("click",guardar);
    document.getElementById("register-button").addEventListener("click",registrar);
	document.getElementById("in-file").addEventListener("change",image);
	recover();
  }

 document.addEventListener("DOMContentLoaded",loaded); 