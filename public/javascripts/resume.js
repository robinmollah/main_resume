let foe = document.getElementById("field-of-expertise");
let experiences = document.getElementById("experiences");
let education = document.getElementById("education");

let tabs = [foe, experiences, education];
let sections = document.getElementsByClassName("tab");

activateTab();

function activateTab(target = document.getElementById("field-of-expertise-tab")){
	console.log("target", target);
	let sectionId;
	for(let otherElem of sections){
		$(otherElem).removeClass("tab-active");
		sectionId = $(otherElem).attr("section");
		console.log(sectionId);
		$("#" + sectionId).css("display", "none");
	}
	$(target).addClass("tab-active");
	sectionId = $(target).attr("section");
	$("#" + sectionId).css("display", 'block');
}


for(let elem of sections){
	elem.addEventListener("click", (elem) => {
		activateTab(elem.target);
	})
}