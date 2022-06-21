// JavaScript Document
var cId="";
var paciente={};
var doctor;
if((localStorage.getItem("paciente"))){
   		paciente=JSON.parse(localStorage.getItem("paciente"));
		doctor=JSON.parse(localStorage.getItem("doctor"));
	//console.log(paciente.citas);
}


function safeDoc(){
	console.log("safe");
}

function deleteDoc(){
	document.getElementById("doc-upload").remove();
}


function pageClick(e){
	if("page" in e.target.dataset) pages(e.target.dataset.page);
}

function start(e){
	if("id" in e.target.dataset){
		reset();
		var cita=paciente.citas.find((c)=>c.id==e.target.value);
		cId=cita.id;
	
		var fecha=new Date(cita.date);
		document.querySelector('[name="date"]').innerHTML=`<h4>`+fecha.getDate()+'/'+fecha.getMonth()+'/'+(fecha.getYear()+1900)+`</h4>`;
		document.querySelector('[name="time"]').innerHTML=`<h4>`+fecha.getHours()+':'+fecha.getMinutes()+`</h4>`;
		document.querySelector('[name="name"]').innerHTML=`<h4>`+paciente.nombre+`</h4>`;
		document.querySelector('[name="place"]').innerHTML=`<h4>Alajuela</h4>`;
		document.querySelector('[name="type"]').innerHTML=`<h4>`+cita.tipo+`</h4>`;
		document.getElementById("i1").disabled=false;
		document.getElementById("i2").disabled=false;
		document.getElementById("i3").disabled=false;
		
		if(cita.estado==1){
			document.getElementById("i1").value=cita.signos;//signos de la cita
			document.getElementById("i2").value=cita.diagnostico;//;
			document.getElementById("i3").value=cita.prescripcion;
			
			document.getElementById("i1").disabled=true;
			document.getElementById("i2").disabled=true;
			document.getElementById("i3").disabled=true;
		}
		pages("3");	
		
	;};
	
}

function end(e){
		var cita=paciente.citas.find((c)=>c.id==cId);
		
		var fecha=new Date(cita.date);
		cita.signos=document.getElementById('i1').value;
		cita.diagnostico=document.getElementById('i2').value;
		cita.prescripcion=document.getElementById('i3').value;
		cita.estado=1;
		
			/*Método para actualizar cita
	const request = new Request(backend+'/citas/'+cita.id+'', {method: 'PUT', headers: { 'Content-Type': 'application/json'},body: JSON.stringify(cita)});
    (async ()=>{
		try{
            const response = await fetch(request);
            if (!response.ok) {console.log("Error");return;}
        }
        catch(e){
            //errorMessage(NET_ERR,$("#add-modal #errorDiv"));
        }        

    })();*/ 
	
		reset();
		doctor.citas.map(c=> c.id===cita.id)
		loadDates();
		localStorage.setItem("paciente",JSON.stringify(paciente));
		pages("1");		
}
function update(){
				/*Método para actualizar paciente
	const request = new Request(backend+'/citas/'+paciente.id+'', {method: 'PUT', headers: { 'Content-Type': 'application/json'},body: JSON.stringify(paciente)});
    (async ()=>{
		try{
            const response = await fetch(request);
            if (!response.ok) {console.log("Error");return;}
        }
        catch(e){
            //errorMessage(NET_ERR,$("#add-modal #errorDiv"));
        }        

    })();*/ 
}

function reset(){
	document.getElementById("i1").value="";//"signos del paciente");//signos de la cita
	document.getElementById("i2").value="";//;
	document.getElementById("i3").value="";
}

function loaded(event){
	loadMenu();
	loadPages();
	loadInfo();
	loadDates();
	pages("1");
	document.getElementById("windows").addEventListener("click",(e)=>{pageClick(e);});
	document.getElementById("in-file").addEventListener("change",file);
	
	//document.getElementById("btn-add").addEventListener("click",addAnt);
	
	document.getElementById("ant-d1").addEventListener("change",(e)=>{addAnt(e);});
	document.getElementById("p-dates").addEventListener("click",(e)=>{start(e);});
	document.getElementById("btn-end").addEventListener("click",end);
  
}

 document.addEventListener("DOMContentLoaded",loaded); 