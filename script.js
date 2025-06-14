const banali = "sovorutyantvyal-1711160013";
let input = document.getElementById("input");
let list = document.getElementById("list");
let sovorutyun = [];
let qanak = 0;

kardaltvyalnery();

for (let i = 0; i < sovorutyun.length; i++) {
  let mitvyal = sovorutyun[i];

  stexcelsovorutyun(mitvyal);
}

function pahpaneltvyalnery() {
  let tvyalner = JSON.stringify(sovorutyun);

  localStorage.setItem(banali, tvyalner);
}

function kardaltvyalnery() {
  let tvyalneriinformacia = localStorage.getItem(banali);

  sovorutyun = JSON.parse(tvyalneriinformacia) || [];
}

function avelacnel() {
  let sovorutyuntext = input.value;

  if (sovorutyuntext.trim().length === 0) {
    return;
  }

  input.value = "";

  let misovorutyun = {
    aneliq: sovorutyuntext
  };

  for (let i = 0; i < 21; i++) {
    misovorutyun[i.toString()] = 0;
  }

  sovorutyun.push(misovorutyun);

  pahpaneltvyalnery();

  stexcelsovorutyun(misovorutyun);
}

function stexcelsovorutyun(misovorutyun) {

  let aneliqtextnode = document.createTextNode(misovorutyun["aneliq"]);

  let iksik = document.createElement("button");
  iksik.setAttribute("onclick", "aneliqjnjel(this)");
  iksik.classList.add("jnjeluknopka");
  iksik.textContent = "x";

  let li = document.createElement("li");
  li.appendChild(aneliqtextnode);
  li.appendChild(iksik);
  li.classList.add("li");

  for (let i = 0; i < 21; i++) {
    if (i % 7 === 0) {
      let br1 = document.createElement("br");
      li.appendChild(br1);

      let br2 = document.createElement("br");
      li.appendChild(br2);
    }

    let aneliqgalochka = document.createElement("input");
    aneliqgalochka.setAttribute("type", "checkbox");
    aneliqgalochka.setAttribute("onclick", "chechboxClick(this)");
    aneliqgalochka.setAttribute("name", i);

    setCheckboxState(aneliqgalochka, misovorutyun[i.toString()]);

    let galochkaspan = document.createElement("span");
    galochkaspan.classList.add("checkmark");

    let containerSpan = document.createElement("label");
    containerSpan.classList.add("container");
    containerSpan.appendChild(aneliqgalochka);
    containerSpan.appendChild(galochkaspan);
    li.appendChild(containerSpan);
  }

  let br = document.createElement("br");
  let br1 = document.createElement("br");
  let br2 = document.createElement("br");

  li.appendChild(br);
  li.appendChild(br1);
  li.appendChild(br2);

  let aneliqiul = document.getElementById("aneliqneri-list");
  aneliqiul.appendChild(li);

  qanak++;
  updateInput();
}

function updateInput() {
  if (qanak == 5) {
    let qanakidiv = document.getElementById("inputidiv");
    qanakidiv.classList.add("inputikorel");
  }
}

function toggleCheckboxClick(checkbox) {
  if (checkbox.readOnly) {
    checkboxChecked(checkbox);
  } else if (!checkbox.checked) {
    checkboxUnchecked(checkbox);
  } else if (checkbox.checked) {
    checkboxIndeterminate(checkbox);
  } else {
    console.log(
      "Unknown checkbox state. Possible states are - Unchecked: 0, Indeterminate: 1, Checked: 2"
    );
  }
}

function getCheckboxState(checkbox) {
  if (checkbox.readOnly) {
    // Միջանկյալ

    return 1;
  } else if (!checkbox.checked) {
    // Չընտրված

    return 0;
  } else {
    // Ընտրված

    return 2;
  }
}

function setCheckboxState(checkbox, state) {
  if (state === 0) {
    // Չընտրված
    checkboxUnchecked(checkbox);
  } else if (state === 1) {
    // Միջանկյալ
    checkboxIndeterminate(checkbox);
  } else if (state === 2) {
    // Ընտրված
    checkboxChecked(checkbox);
  } else {
    // Անորոշ
    console.log(
      "Unknown checkbox state. Possible states are - Unchecked: 0, Indeterminate: 1, Checked: 2"
    );
  }
}

/**

 * Չընտրված

 */

function checkboxUnchecked(checkbox) {
  checkbox.checked = false;
  checkbox.readOnly = false;
  checkbox.indeterminate = false;
}

/**

 * Միջանկյալ

 */

function checkboxIndeterminate(checkbox) {
  checkbox.checked = false;
  checkbox.readOnly = true;
  checkbox.indeterminate = true;
}

/**

 * Ընտրված

 */

function checkboxChecked(checkbox) {
  checkbox.checked = true;
  checkbox.readOnly = false;
  checkbox.indeterminate = false;
}

function chechboxClick(sxmvaccheckbox) {

  toggleCheckboxClick(sxmvaccheckbox);

  let sexmvacli = sxmvaccheckbox.parentElement.parentElement;
  let sexmvacindex = liIndexInUl(sexmvacli);
  let sovorutyanObject = sovorutyun[sexmvacindex];

  sovorutyanObject[sxmvaccheckbox.name.toString()] = getCheckboxState(
    sxmvaccheckbox
  );

  pahpaneltvyalnery();
}

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("knopka").click();
  }
});

function aneliqjnjel(jnjeluknopka) {
  let sexmvacli = jnjeluknopka.parentElement;
  let jnjeluindex = liIndexInUl(sexmvacli);
  sovorutyun.splice(jnjeluindex, 1);

  pahpaneltvyalnery();
  sexmvacli.remove();

  qanak--;
  updateInput();
}

function liIndexInUl(li) {
  let index = Array.prototype.indexOf.call(li.parentElement.children, li);
  return index;
}
