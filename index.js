const missions = []

function handlePrintNewMission(item){
    const container = document.createElement('div') 
    const div = document.createElement('div') 
    div.setAttribute('class', 'row mt-3 mb-3 list') 
    
    const checkbox = document.createElement('input') 
    checkbox.setAttribute('type', 'checkbox') 
    checkbox.setAttribute('class', 'col') 
    
    const btn = document.createElement('button')
    btn.setAttribute('class','btn btn-sm btn-danger col')
    btn.innerHTML = 'Delete'
    btn.setAttribute ('onclick', `deleteMission()`)
   

    const p = document.createElement('p') 
    p.setAttribute ('class', 'col list-item') 
    p.innerHTML = item.content 


   div.appendChild(checkbox) 
   div.appendChild(p) 
   div.appendChild(btn)

   container.appendChild(div) 
   document.getElementById('mission-container').appendChild(container) 
}


function handleAddNewMission(){
    const newMission = document.getElementById('inp-mission').value
    const mission = {
        content: newMission,
    }
    missions.push(mission)
    document.getElementById('inp-mission').value=''
    console.log(missions)

}


function saveToLocalStorage(key,value){
    let listMissionLocal = value;
    if (Array.isArray(value)) {
        listMissionLocal = JSON.stringify(value);
    }
    localStorage.setItem(key,listMissionLocal);
}
function getFromLocalStorage(key){
    return localStorage.getItem(key);
}
const btnShow = document.getElementById('button-show')
btnShow.addEventListener("click", function(){
    const inputMission = document.getElementById('inp-mission').value;
    const contentMission = {
        date: new Date(),
    };
    missions.push(contentMission);

    saveToLocalStorage("listMission", missions);
})

function handleShowMissions(){
    missions.forEach((item) => handlePrintNewMission(item));
}



function deleteMission(index) {
    if (index && typeof index === 'number' && index > 0 && index <= missions.length - 1) {
        missions.splice (index,1)
    } 
    saveToLocalStorage("listMission", missions);

}
deleteMission (2);  

const MissionString = getFromLocalStorage("listMission");
const MissionArr = JSON.parse(MissionString);

missions.splice(0, missions.length); 
for (let i = 0; i < MissionArr.length; i++) {
  let mission = MissionArr[i];
  mission.date = new Date(mission.date);

  MissionArr.push(mission);
}