// JavaScript Document
let months=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"];

function loadDates(aux){
	if(aux==1){
		date.setDate(date.getDate()+2);
	}
	if(aux==2){
		date.setDate(date.getDate()-12);
	}

	document.getElementById("month").innerHTML=months[date.getMonth()] + "  "+(date.getYear()+1900);
	
	var c=document.getElementById("calendar");
	
	var frecuencia=doctor.frecuency;
	var horas=mayorHasta()-menorDesde();
	var cant=(horas*60)/frecuencia;
	var inicio=menorDesde();
	var final=mayorHasta();
	
	c.innerHTML="";
	date.setHours(inicio);
	date.setMinutes(0);
	var t=document.createElement("div");
	t.className="time-column";
	t.innerHTML='<div class="day"><h3>Time</h3></div>';
	
	for(j=0;j<cant;j++){
		if(date.getMinutes()<10){
			t.innerHTML+='<div class="time"><h2>'+date.getHours()+':'+date.getMinutes()+'0 am</h2></div>';
		}
		else{
			t.innerHTML+='<div class="time"><h2>'+date.getHours()+':'+date.getMinutes()+' am</h2></div>';
		}
		date.setMinutes(date.getMinutes()+frecuencia);
	}	
	
	c.appendChild(t);
	

	date.setHours(inicio);
	date.setMinutes(0);
	var i=0;
	horarios.forEach((horario)=>{
		var d=document.createElement("div");
		d.className="day-column";
		d.innerHTML='<div class="day"><h3>'+horario.day+' '+ date.getDate()+'</h3></div>';
		
		date.setHours(horario.desde);
		date.setMinutes(0);
		
		if(horario.estado==1){
			for(j=0;j<cant;j++){
				var hora=''+date.getHours()+':'+date.getMinutes()+':00';//dar formato a la hora
				var fecha=(date.getYear()+1900)+'-'+(date.getMonth()+1)+'-'+date.getDate();//dar formato a la fecha
				date.setSeconds(0);
				date.setMilliseconds(0);
			
				
				var citaExiste=doctor.citas.find((c)=>new Date(c.date).getTime()==date.getTime());
				
				
				if(citaExiste){//si la cita existe, es de diferente clase
					var pAux=doctor.pacientes.find(p=>p.id==citaExiste.pId);
					d.innerHTML+='<div id="date-div" class="date-selected" data-id="'+citaExiste.id+'" data-time="'+hora+'" data-date="'+fecha+'" data-pId="'+pAux.id+'">'+pAux.nombre+'<br>ID:'+pAux.id+'</div>';
				}else{
					if(date.getHours()>= horario.desde && date.getHours()<=horario.hasta){//si está dentro del horario
						d.innerHTML+='<div id="date-div" class="in-date" data-time="'+hora+'" data-date="'+fecha+'"></div>';
					}
					else{
						d.innerHTML+='<div class="date"></div>';
					}
			}
			
			date.setMinutes(date.getMinutes()+frecuencia);
			}	
				
		}else{
			for(j=0;j<cant;j++){
			var hora=''+date.getHours()+':'+date.getMinutes()+':00';//dar formato a la hora
			var fecha=(date.getYear()+1900)+'-'+(date.getMonth()+1)+'-'+date.getDate();//dar formato a la fecha
			date.setSeconds(0);
			date.setMilliseconds(0);
			d.innerHTML+='<div class="date"></div>';
			}
		date.setMinutes(date.getMinutes()+frecuencia);	
		}
		
		
		date.setDate(date.getDate()+1);
		c.appendChild(d);
		i++;
	});
	
}

function mayorHasta(){
	var mayorHasta=0;
	var horActivos=horarios.filter((h)=>h.estado==1);
	
	horActivos.forEach((h)=>{
		if(mayorHasta==0){mayorHasta=h.hasta;}
		if(h.hasta>mayorHasta){mayorHasta=h.hasta;}
	});
	return mayorHasta;
}

function menorDesde(){
	var menorDesde=24;
	var horActivos=horarios.filter((h)=>h.estado==1);
	
	horActivos.forEach((h)=>{
		if(menorDesde==24){menorDesde=h.desde;}
		if(h.desde<menorDesde){menorDesde=h.desde;}
	});
	return menorDesde;
}