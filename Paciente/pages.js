// JavaScript Document
function pages(t){
	switch (t){
		case '1':
				document.getElementById("ficha").className+=" s-p";//mostrar pagina seleccionada
				document.getElementById("fichaB").style.display="block";
				document.getElementById("fichaB").style.visibility="visible";
			
			
				document.getElementById("antecedentes").classList.remove("s-p");//remueve la seleccion de otras paginas
				document.getElementById("gabinete").classList.remove("s-p");
				document.getElementById("consulta").classList.remove("s-p");
			
			//document.getElementById("antec").style.display="none";
				document.getElementById("antec").style.display="none";
				document.getElementById("gab").style.display="none";
				document.getElementById("cons").style.display="none";
			break;
		case '2':
				document.getElementById("antecedentes").className+=" s-p";//mostrar pagina seleccionada
				document.getElementById("antec").style.display="block";
				document.getElementById("antec").style.visibility="visible";
			
			
				document.getElementById("ficha").classList.remove("s-p");//remueve la seleccion de otras paginas
				document.getElementById("gabinete").classList.remove("s-p");
				document.getElementById("consulta").classList.remove("s-p");
			
				//document.getElementById("antec").style.display="none";
				document.getElementById("fichaB").style.display="none";
				document.getElementById("gab").style.display="none";
				document.getElementById("cons").style.display="none";
			break;
		case '3':
				document.getElementById("consulta").className+=" s-p";//mostrar pagina seleccionada
				document.getElementById("cons").style.display="block";
				document.getElementById("cons").style.visibility="visible";
			
				document.getElementById("ficha").classList.remove("s-p");//remueve la seleccion de otras paginas
				document.getElementById("gabinete").classList.remove("s-p");
				document.getElementById("antecedentes").classList.remove("s-p");
			
				document.getElementById("antec").style.display="none";
				document.getElementById("fichaB").style.display="none";
				document.getElementById("gab").style.display="none";
			break;
		case '4':
				document.getElementById("gabinete").className+=" s-p";//pagina seleccionada
				document.getElementById("gab").style.display="block";
				document.getElementById("gab").style.visibility="visible";
			
			
				document.getElementById("antecedentes").classList.remove("s-p");//quita lo seleccionado a las otras páginas
				document.getElementById("ficha").classList.remove("s-p");
				document.getElementById("consulta").classList.remove("s-p");
			
				document.getElementById("antec").style.display="none";
				document.getElementById("cons").style.display="none";
				document.getElementById("fichaB").style.display="none";
			break;
		default:
			break;
	}
}

function loadPages(){
	var panel=document.getElementById("panel");
	panel.innerHTML+=`<div id="fichaB" class="ficha">;
					<div class="pi-info">
						<div>
							<h4 >`+paciente.nombre+`</h4><br>
							<h4 >`+paciente.fecNac+`</h4><br>
							<h4 >`+paciente.sexo+`</h4><br>
						</div>
						<div class="p-contact">
							<i style="margin-top: 15px; margin-right: 5px;" class="fa-solid fa-envelope"></i>
							<h4 style="margin-top: 13px; margin-right: 25px;">`+paciente.email+`</h4>
							<i style="margin-top: 15px; margin-right: 5px;" class="fa-solid fa-phone"></i>
							<h4 style="margin-top: 13px; margin-right: 25px;">`+paciente.telefono+`</h4>
						</div>
					</div>
					<div class="pi-notes">
						<div class="p-notes">
							<span >Notas Privadas</span><br>
						</div>
						<input class="notes" type="text" placeholder="Escribir nota">
					</div>
				</div>
				<div id="antec" class="antecedentes">
					<h3 style="font-size: 30px;">Antecedentes Médicos</h3>
					<div id="ant-d1" class="ant-d1">
						<div class="ante">
							<h3 style="margin-left: 40px; margin-right: 40px; margin-top: 7px;">Tabaco</h3>
							<select data-ant="tabaco"  name="select-ant" class="ant-select">
								<option value="0">NO</option>
								<option value="1">SI</option>
							</select>
							<h3 style="margin-left: 40px; margin-right: 40px; margin-top: 7px;">Alcohol</h3>
							<select data-ant="alcohol"  name="select-ant" class="ant-select">
								<option value="0">NO</option>
								<option value="1">SI</option>
							</select>
							<h3 style="margin-left: 40px; margin-right: 40px; margin-top: 7px;">Drogas</h3>
							<select data-ant="drogas"  name="select-ant" class="ant-select">
								<option value="0">NO</option>
								<option value="1">SI</option>
							</select>
							<h3 style="margin-left: 40px; margin-right: 20px; margin-top: 7px;">Actividad Física</h3>
							<select data-ant="actividadFisica"  name="select-ant" class="ant-select">
								<option value="0">NO</option>
								<option value="1">SI</option>
							</select>
						</div>
						<div class="ante">
							<h3 style="margin-left: 40px; margin-right: 28px; margin-top: 7px;">Alergias</h3>
							<select data-ant="alergias"  name="select-ant" class="ant-select">
								<option value="0">NO</option>
								<option value="1">SI</option>
							</select>
							<h3 style="margin-left: 40px; margin-right: 40px; margin-top: 7px;">Cirugías</h3>
							<select data-ant="cirugias"  name="select-ant" class="ant-select">
								<option value="0">NO</option>
								<option value="1">SI</option>
							</select>
							<h3  style="margin-left: 20px; margin-right: 20px; margin-top: 7px;">Tratamiento</h3>
							<select data-ant="tratamientos" name="select-ant" class="ant-select">
								<option value="0">NO</option>
								<option value="1">SI</option>
							</select>
							<h3  style="margin-left: 40px; margin-right: 20px; margin-top: 7px;">Golpes/Caídas</h3>
							<select data-ant="golpes" name="select-ant" class="ant-select">
								<option value="0">NO</option>
								<option value="1">SI</option>
							</select>
						</div>
					</div>
				</div>
				<div id="cons" class="consulta">
					<div class="date-info">
						<h4>Información de Cita</h4>
						<div class="div-inf-container">
							<div class="div-info"><i name="date" class="fa-solid fa-calendar" style="margin-top: 0px;"></i></div>
							<div class="div-info"><i name="time" class="fa-solid fa-clock" style="margin-top: 0px;"></i></div>
							<div class="div-info"><i name="name" style="margin-top: 0px;" class="fa-solid fa-user"></i></div>
							<div class="div-info"><i name="place" style="margin-top: 0px;" class="fa-solid fa-location-dot"></i></div>
							<div class="div-info"><i name="type" style="margin-top: 0px;" class="fa-solid fa-house-medical-circle-check"></i></div>
						</div>
					</div>
					<div class="date-container">
						<div><h3>Signos</h3>
						<input id="i1" class="notes" type="text" placeholder="Qué siente el paciente?">
						</div>
						<div><h3>Diagnóstico</h3>
						<input id="i2" class="notes" type="text" placeholder="">
						</div>
						<div><h3>Prescripciones</h3>
						<input id="i3" class="notes" type="text" placeholder="">
						</div>
						<div class="buttons">
							<button id="btn-end" class="btn-subir"><i style="margin-top: 0px" class="fa-solid fa-calendar-check"></i><h4>Finalizar</h4></button>
						</div>
					</div>
				</div>
				<div id="gab" class="gabinete">
					<div class="title">
						<h3 class="t-gab">Gabinete</h3>
						<div class="file-select" id="src-file1" >
  							<input id="in-file" type="file" name="src-file1" aria-label="Archivo">
						</div>
					</div>
					<div class="div-down">
						<div class="div-dl">
							<div class="titles">
								<h5 class="t">Nombre</h5>
								<h5 class="t">Asociado a</h5>
							</div>
							<div class="docs-container">
								<div class="doc-container">
									<div class="doc-info">
										<h5 class="doc-h5">Rayos X</h5>
									</div>
									<div class="doc-info">
									<h5 class="doc-h5">Fecha</h5>
									</div>
									<a href="#"><i style="margin-top: 5px;" class='fa-solid fa-file-pdf fa-2x'></i></a><br>
								</div>
							</div>
						</div>
						<div id="div-dr" class="div-dr">
						</div>
						
					</div>
				</div>`;
				
	
}

function loadInfo(){
	var container =document.getElementById("info-container");	
	container.innerHTML="";
	container.innerHTML=`<div class="p-info1">
					<div class="p-img"><img class="p-img" src="../imagen.PNG"></div>
					<div class="p-info2">
						<h3 class="info">Nombre:</h3><h4>`+paciente.nombre+`</h4><br>
					</div>
					<div class="p-info2">
						<h3 class="info">Edad:</h3><h4>`+paciente.edad+` años</h4><br>
					</div>
					<div class="p-info2">
						<h3 class="info">ID:</h3><h4>`+paciente.id+`</h4>
					</div>
					<div class="p-info2">
						<h3 class="info">Altura:</h3><input class="input-info" value="`+paciente.altura+`"><h4>cm</h4>
					</div>
					<div class="p-info2">
						<h3 class="info">Peso:</h3><input class="input-info" value="`+paciente.peso+`"><h4>Kg</h4>
					</div>
				</div>	
				<div class="p-t">
					<h2 style="margin-top: 0px;">Citas</h2>
				</div>
				<div id="p-dates" class="p-dates">
					
				</div>`;
}

function loadDates(){
		var citas=document.getElementById("p-dates");
		var inner="";
		citas.innerHTML="";
	
		paciente.citas.forEach((cita)=>{
			var date=new Date(cita.date);
			var fecha=date.getDate()+"/"+(date.getMonth()+1)+"/"+(date.getYear()+1900);
			var hora=date.getHours()+":"+date.getMinutes();
			
			if(cita.estado==0){
				inner+=`<div class="date">
							<div class="textD" >`+hora+"<br> "+fecha+`</div>;
							<div class="btn-NC">
								<button data-id=".." type="button" class="btn-nueva btn-start" value="`+cita.id+`">Iniciar</button>
							</div>
						</div>`;
			}else{
				inner+=`<div style="background-color:gray;" class="date">
							<div class="textD" >`+hora+"<br> "+fecha+`</div><div class="btn-VC">
								<button data-id=".." type="button" class="btn-nueva btn-start" value="`+cita.id+`">Detalles</button>
							</div>
						</div>`;
			}
			
		});	
	citas.innerHTML+=inner;
	//console.log(inner);
			//citas.innerHTML=inner;
	
}

function file(e){
	let file=e.target.files;
	let div=document.getElementById("div-dr");
	div.innerHTML+=`<div id="doc-upload">
							<i class='fa-solid fa-file-pdf fa-10x'></i><br>
							<input  style="margin-top: 10px;" type="text" id="f-name" >
							<input style="margin-top: 10px" type="text" id="f-tags" placeholder="Etiquetas" >
							<div class="asociar">
							<h5>Asociar a cita</h5>
							</div>
							<div class="content-select">
								<select>
									<option>Cita 1</option>
									<option>Cita 2</option>
									<option>Cita 3</option>
								</select>
								<i></i>
							</div>
							<button id="btn-safe" class="btn-subir">Guardar</button>
							<button id="btn-delete" style="background-color: red;" class="btn-subir">Cancelar</button></div>`;
	
	let output=document.getElementById("f-name").value=file[0].name;
	document.getElementById("btn-safe").addEventListener("click",safeDoc);
	document.getElementById("btn-delete").addEventListener("click",deleteDoc);
}