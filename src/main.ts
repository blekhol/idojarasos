import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import type { Elorejelzes } from "./Elorejelzes";

const URL = "https://petrik-idojaras-default-rtdb.europe-west1.firebasedatabase.app/.json";

let napok: Elorejelzes[];

document.addEventListener("DOMContentLoaded", ()=> {
  document.getElementById("submit")?.addEventListener("click", (event) => {
    event.preventDefault();
    Hozzaadas();
  });
  document.getElementById("export")?.addEventListener("click", Export)
  Load();
});


async function Load() {
  const response = await fetch(URL);
  napok = await response.json() as Elorejelzes[];  

  Megjelenit()
}

function Megjelenit() {
  const table = document.getElementById("table") as HTMLTableElement;
  table.innerText = "";

  napok.forEach(element => {
    const tr = document.createElement("tr");
    const day = document.createElement("td");
    const temp = document.createElement("td");
    day.textContent = element.day.toString();
    temp.textContent = element.temperature.toString() + " °C";

    if (element.temperature < 10) {
      tr.classList.add("hideg");
    }
    else if (element.temperature >= 30) {
      tr.classList.add("meleg");
    }

    tr.appendChild(day);
    tr.appendChild(temp);

    table.appendChild(tr);
  });
}

function Hozzaadas() {
  const form = document.getElementById("felvetelForm") as HTMLFormElement;
  const formData = new FormData(form);

  let day = new Date().getDay();
  let dayString: string = "";

  switch (day) {
    case 0: dayString = "Sunday"; break;
    case 1: dayString = "Monday"; break;
    case 2: dayString = "Tuesday"; break;
    case 3: dayString = "Wednesday"; break;
    case 4: dayString = "Thursday"; break;
    case 5: dayString = "Friday"; break;
    case 6: dayString = "Saturday"; break;
  }

  const ujNap: Elorejelzes = {
    day: dayString,
    temperature: Number(formData.get("temp"))
  }

  napok.push(ujNap);

  Megjelenit();

  form.reset();
}

function Export() {
  const exportArea = document.getElementById("exportArea") as HTMLTextAreaElement;

  exportArea.value = JSON.stringify(napok);
}