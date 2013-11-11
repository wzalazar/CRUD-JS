window.onload = function(){

var form             = document.getElementById("form");
var inputIdStudent   = document.getElementById("idStudent");
var inputFirstname   = document.getElementById("firstname");
var labelFirstname   = document.getElementById("labelFirstname");
var inputLastname    = document.getElementById("lastname");
var labelLastname    = document.getElementById("labelLastname");
var btnCreateStudent = document.getElementById("createStudent");
var btnDeleteStudent = document.getElementById("deleteStudent");
var btnEditStudent   = document.getElementById("editStudent");
var btnCancel        = document.getElementById("cancelEdit");
var listStudents     = document.getElementById("listStudents");
var json             = document.getElementById("json");
var searchWord       = document.getElementById("search");


function Student(id,firstname,lastname){
	this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
}

		Student.prototype = {
			setId : function (value){
				this.id = value;
			},
			getId : function(){
				return this.id;
			},
			setFirstname : function (value){
				this.firstname = value;
			},
			getFirstname : function(){
				return this.firstname;
			},
			setLastname : function (value){
				this.lastmame = value;
			},
			getLastname : function(){
				return this.lastname;
			}
		}

function ControllerStudent(){
    this.listStudents = []; 
	this.id = 0;
}

		ControllerStudent.prototype = {
			create : function(firstname,lastname){
				var student = new Student(this.id,firstname,lastname);
				this.listStudents.push(student);
				this.id += 1;
				return student;
			},
			search : function(id){
				var student = null;
				for (x=0;x<this.listStudents.length;x++)
				{
					if (this.listStudents[x].getId()==id)
					{
						student = this.listStudents[x];
					}
				}
				return student;
			},
			delete : function(student){				
				elementList = document.querySelectorAll("tr");
				var idStudent = student.getId();
				for (x=0;x<elementList.length;x++){
						if (elementList[x].getAttribute("id") == idStudent )
						{
							this.listStudents.splice(x,1);
							listStudents.removeChild(elementList[x]);
						}
				}
				
			},
			update : function(student){
				var oldStudent = this.search(student.getId());
				for (x=0;x<this.listStudents.length;x++)
				{
					if (this.listStudents[x].id == oldStudent.getId())
					{
						this.listStudents[x] = student;	
					}
				}
				
			},
			listAll : function(){
				return listStudents;
			},
			showAll : function(){
				
				var contoller = this;
				
				for (x=0;x<this.listStudents.length;x++){
					var ul = document.createElement("ul");
					ul.setAttribute("id",this.listStudents[x].getId());
					var liId = document.createElement("li");
					liId.innerHTML = this.listStudents[x].getId();
					
					var liFirstname = document.createElement("li");
					liFirstname.innerHTML = this.listStudents[x].getFirstname();
					
					var liLastname = document.createElement("li");
					liLastname.innerHTML = this.listStudents[x].getLastname();
					
					ul.appendChild(liId);
					ul.appendChild(liFirstname);
					ul.appendChild(liLastname);
					
					listStudents.appendChild(ul);
					
					ul.onclick = function(){
						var id = this.getAttribute("id");
						var student = contoller.search(id);
						inputIdStudent.value = student.getId();
						inputFirstname.value = student.getFirstname();
						inputLastname.value  = student.getLastname();
						btnCancel.style.display = "block";
						btnEditStudent.style.display = "block";
						btnDeleteStudent.style.display = "block";
						btnCreateStudent.style.display = "none";
					}
				}
			},
			show : function(newStudent){
					var contoller = this;
				
					elementList = document.querySelectorAll("tr");
					var idStudent = newStudent.getId();
					
					var tr = document.createElement("tr");
					tr.setAttribute("id",newStudent.getId());
					
					var liId = document.createElement("td");
					liId.innerHTML = newStudent.getId();
					
					var liFirstname = document.createElement("td");
					liFirstname.innerHTML = newStudent.getFirstname();
					
					var liLastname = document.createElement("td");
					liLastname.innerHTML = newStudent.getLastname();
					
					var action = document.createElement("td");
					var editing = document.createElement("span");
					editing.setAttribute("class","label label-info");
					editing.innerHTML = "Editing";
					action.appendChild(editing);
					editing.style.visibility = "hidden";
					editing.setAttribute("id","edit"+newStudent.getId());
											
					tr.appendChild(liId);
					tr.appendChild(liFirstname);
					tr.appendChild(liLastname);
					tr.appendChild(action);
					
					var find = false;
					for (x=0;x<elementList.length;x++){
						if (elementList[x].getAttribute("id") == idStudent )
						{
							listStudents.replaceChild(tr,elementList[x]);
							var find = true;
						}
					}
					
					if (!find) listStudents.appendChild(tr);
					
					tr.onclick = function(){
						editing = document.getElementById("edit"+inputIdStudent.value);
						if (editing!=null)	editing.style.visibility = "hidden";
						
						var id = this.getAttribute("id");
						var student = contoller.search(id);
						inputIdStudent.value = student.getId();
						inputFirstname.value = student.getFirstname();
						inputLastname.value  = student.getLastname();
						btnCancel.style.display = "block";
						btnEditStudent.style.display = "block";
						btnDeleteStudent.style.display = "block";
						btnCreateStudent.style.display = "none";
						btnCreateStudent.style.display = "none";
						editing = document.getElementById("edit"+id);
						editing.style.visibility = "visible";
					}
				
			}
		}
	
	
	
	



var controllerStudent = new ControllerStudent();

btnCreateStudent.onclick = function(event){	
	event.preventDefault();
	if (inputFirstname.value!="" && inputLastname.value!="")
	{
		var newStudent = controllerStudent.create(inputFirstname.value,inputLastname.value);
		controllerStudent.show(newStudent);
		inputFirstname.value = "";
		inputLastname.value = "";
		json.innerHTML = JSON.stringify(newStudent);
	}
	else{
		
	}
}

form.onsubmit = function(event){
	event.preventDefault();
}

btnEditStudent.onclick = function(event){
	event.preventDefault();
	var student = new Student(inputIdStudent.value,inputFirstname.value,inputLastname.value);
	controllerStudent.update(student);
	controllerStudent.show(student);
	json.innerHTML = JSON.stringify(student);
}

btnCancel.onclick = function(event){
	event.preventDefault();
	btnCancel.style.display = "none";
	btnEditStudent.style.display = "none";
	btnDeleteStudent.style.display = "none";
	btnCreateStudent.style.display = "block";	
	inputFirstname.value = "";
	inputLastname.value = "";
	editing = document.getElementById("edit"+inputIdStudent.value);
	editing.style.visibility = "hidden";
}

btnDeleteStudent.onclick = function(event){
	event.preventDefault();
	var student = new Student(inputIdStudent.value,inputFirstname.value,inputLastname.value);
	controllerStudent.delete(student);
	btnCancel.style.display = "none";
	btnEditStudent.style.display = "none";
	btnDeleteStudent.style.display = "none";
	btnCreateStudent.style.display = "block";
	inputFirstname.value = "";
	inputLastname.value = "";

}

searchWord.onkeyup = function(){
	var searchw = this.value;
	var students = controllerStudent.listStudents;
	for (x=0;x<students.length;x++){
		var lengthWord = searchw.length;
		var tr = document.getElementById(students[x].getId());
		if (searchw != (students[x].getFirstname()).substring(0,lengthWord))
		{			
			tr.style.display = "none";
		}
		else
		{
			tr.style.display = "table-row";
		}
	}
	
	
}
}