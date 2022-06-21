// JavaScript Document

function loadMenu(){
	var d=document.getElementById("container");
	var inner=d.innerHTML;
	d.innerHTML='';
	d.innerHTML+=`<div class="nav-bar">
			<div class="nav-item" id="view-calendar">
				<a href="../Pacientes/pacientes.html"><i class="fa-solid fa-users fa-2x" style="color:white;"></i></a>
			</div>
			<div class="nav-item" id="view-calendar">
				<a href="../Calendario/calendario.html"><i class="fa-solid fa-calendar fa-2x" style="color:white;"></i></a>
			</div>
			<div class="nav-item" id="edit-doctor">
				<a href="../Register/register.html"><i class="fa-solid fa-user-doctor fa-2x" style="color:white;"></i></a>
			</div>
			<div class="nav-item" id="nav-item">
				<a href="../Login/index.html"><i class="fa-solid fa-right-from-bracket fa-2x" style="color:white;"></i></a>
			</div>
		</div>`;
	d.innerHTML+=inner;
}