let foe = document.getElementById("field-of-expertise");
let experiences = document.getElementById("experiences");
let education = document.getElementById("education");

let tabs = [foe, experiences, education];
let sections = document.getElementsByClassName("tab");
for(let elem of sections){
	elem.addEventListener("click", (elem) => {
		let sectionId;
		for(let otherElem of sections){
			$(otherElem).removeClass("tab-active");
			sectionId = $(otherElem).attr("section");
			console.log(sectionId);
			$("#" + sectionId).css("display", "none");
		}
		$(elem.target).addClass("tab-active");
		sectionId = $(elem.target).attr("section");
		$("#" + sectionId).css("display", 'block');
	})
}