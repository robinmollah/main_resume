const skillViewer = document.getElementById("skill-viewer");
const list2 = document.getElementById("list2");
const list1 = document.getElementById("list1");
let skills;
let previousTarget;

fetch("skills.json")
  .then((r) => r.json())
  .then((res) => {
    console.log(res);
    skills = res;
  })
  .catch((error) => {
    console.error(error);
  });

if (window.innerWidth >= 610) {
  addList3();
}
skillViewer.querySelectorAll("p").forEach(attachEventListerToAllSkill);

function cleanupList(listId) {
  if (listId === 2) {
    let list3 = document.getElementById("list3");
    list3.innerHTML = "";
    list2
      .querySelectorAll("p")
      .forEach((item) => item.setAttribute("class", ""));
    return;
  }
  list2.innerHTML = "";
  skillViewer
    .querySelectorAll("p")
    .forEach((item) => item.setAttribute("class", ""));
}

function populateList3(event) {
  console.log(event.target.innerText);
  cleanupList(2);
  event.target.setAttribute("class", "selected");
  let list3 = document.getElementById("list3");
  let firstKey = list1.querySelectorAll("p.selected")[0].innerText;
  for (let item of skills[firstKey][event.target.innerText]) {
    list3.appendChild(skillItem(item));
  }
}

function addList3() {
  // check if list is already added
  if (skillViewer.childElementCount === 3) return;
  let elemListHolder = document.createElement("div");
  elemListHolder.setAttribute("class", "list-holder");
  let elemList = document.createElement("div");
  elemList.setAttribute("class", "list");
  elemList.setAttribute("id", "list3");
  elemListHolder.appendChild(elemList);
  skillViewer.appendChild(elemListHolder);
}

function removeList3() {
  if (skillViewer.childElementCount === 2) return;
  skillViewer.removeChild(skillViewer.lastChild);
}

function populateList2(event) {
  let name = event.target.innerText;
  if (skills[name].length) {
    if (window.innerWidth > 610) {
      cleanupList(2);
    } else {
      removeList3();
    }
    for (let i = 0; i < skills[name].length; i++) {
      list2.appendChild(skillItem(skills[name][i]));
    }
  } else {
    for (let item in skills[name]) {
      const elem = skillItem(item);
      addList3();
      elem.addEventListener("mouseenter", populateList3);
      list2.appendChild(elem);
    }
  }
}

function attachEventListerToAllSkill(skill) {
  skill.addEventListener("mouseenter", (event) => {
    cleanupList();
    event.target.setAttribute("class", "selected");
    populateList2(event);
  });
}

function skillItem(name) {
  const elem = document.createElement("p");
  elem.innerText = name;
  return elem;
}
