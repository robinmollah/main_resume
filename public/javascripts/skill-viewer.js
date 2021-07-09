const skillViewer = document.getElementById("skill-viewer");
const list2 = document.getElementById("list2");
let skills;
let previousTarget;

fetch("skills.json").then(r =>
	r.json()
).then(res => {
	skills = res;
}).catch(error => {
	console.error(error);
});

list2.appendChild(skillItem("-----"));

function cleanupList(){
	list2.innerHTML ="";
	skillViewer.querySelectorAll("p").forEach(item => item.setAttribute("class", ""))
}



function populateList3(event){
	console.log(event.target.innerText);
}

function populateList2(event){
	let name = event.target.innerText;
	if(skills[name].length){
		for(let i = 0; i < skills[name].length; i++){
			list2.appendChild(skillItem(skills[name][i]));
		}
	} else {
		for(let item in skills[name]){
			const elem = skillItem(item);
			elem.addEventListener("mouseenter", populateList3);
			list2.appendChild(elem);
		}
	}

}

function attachEventListerToAllSkill(skill){
	skill.addEventListener("mouseenter", event => {
		cleanupList();
		event.target.setAttribute("class", "selected");
		populateList2(event);

	});
	skill.addEventListener("mouseleave", event => {
	});
}

skillViewer.querySelectorAll("p").forEach(attachEventListerToAllSkill)

function skillItem(name){
	const elem = document.createElement("p");
	elem.innerText = name;
	return elem;
}
