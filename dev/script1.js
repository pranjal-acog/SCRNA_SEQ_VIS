let splitby = {
  // 'orig.ident': [],
  // type: [],
  // ident: [],
  // singleR_label: [],
  // cohort: [],
  // singleR_label_wp: [],
  // singleR_label_broad: [],
  // patient: []
};
let sam = {
  samples: [],
  p1_samples: [],
  p2_samples: [],
  p3_samples: [],
  p4_samples: [],
  p5_samples: [],
  p6_samples: [],
  h1_samples: [],
  h2_samples: [],
  h3_samples: [],
};
let mainElement = document.getElementById("main");
let splitbydiv = document.getElementById("splitbydiv");
let splitsdiv = document.getElementById("splitsdiv");
let inputdiv = document.getElementById("input");
let splits_heading = document.getElementById("splitspara");
let splits = document.getElementById("splits");
let metadata,
  minidata,
  gotMetaData = false;

function fetchMetaData() {
  fetch("http://localhost:3000/metadata")
    .then((response) => response.json())
    .then((data) => {
      metadata = data;
      gotMetaData = true;
      populateGeneOptions();
    });
}

function fetchDetails() {
  fetch("http://localhost:3000/minidata")
    .then((response) => response.json())
    .then((data) => {
      // metadata = data;
      // for(let i=0; i<data.length; i++){
      //     if(!(splitby['orig.ident'].includes(data[i]['orig.ident']))){
      //         splitby['orig.ident'].push(data[i]['orig.ident']);
      //     }
      //     if(!(splitby.type.includes(data[i].type))){
      //         splitby.type.push(data[i].type);
      //     }
      //     if(!(splitby.ident.includes(data[i].ident))){
      //         splitby.ident.push(data[i].ident);
      //     }
      //     if(!(splitby.singleR_label.includes(data[i].singleR_label))){
      //         splitby.singleR_label.push(data[i].singleR_label);
      //     }
      //     if(!(splitby.cohort.includes(data[i].cohort))){
      //         splitby.cohort.push(data[i].cohort);
      //     }
      //     if(!(splitby.singleR_label_wp.includes(data[i].singleR_label_wp))){
      //         splitby.singleR_label_wp.push(data[i].singleR_label_wp);
      //     }
      //     if(!(splitby.singleR_label_broad.includes(data[i].singleR_label_broad))){
      //         splitby.singleR_label_broad.push(data[i].singleR_label_broad);
      //     }
      //     if(!(splitby.patient.includes(data[i].patient))){
      //         splitby.patient.push(data[i].patient);
      //     }
      //     if(!(sam.samples.includes(data[i].sample))){
      //         sam.samples.push(data[i].sample);
      //         if(!(data[i].sample.startsWith('P1'))){
      //             sam.p1_samples.push(data[i].sample);
      //         }
      //         else if(!(data[i].sample.startsWith('P2'))){
      //             sam.p2_samples.push(data[i].sample);
      //         }
      //         else if(!(data[i].sample.startsWith('P3'))){
      //             sam.p3_samples.push(data[i].sample);
      //         }
      //         else if(!(data[i].sample.startsWith('P4'))){
      //             sam.p4_samples.push(data[i].sample);
      //         }
      //         else if(!(data[i].sample.startsWith('P5'))){
      //             sam.p5_samples.push(data[i].sample);
      //         }
      //         else if(!(data[i].sample.startsWith('P6'))){
      //             sam.p6_samples.push(data[i].sample);
      //         }
      //         else if(!(data[i].sample.startsWith('H1'))){
      //             sam.h1_samples.push(data[i].sample);
      //         }
      //         else if(!(data[i].sample.startsWith('H2'))){
      //             sam.h2_samples.push(data[i].sample);
      //         }
      //         else if(!(data[i].sample.startsWith('H3'))){
      //             sam.h3_samples.push(data[i].sample);
      //         }
      //     }
      // }
      splitby = data;
      sam.samples = data.sample;
      for (let i = 0; i < data.sample.length; i++) {
        if (data.sample[i].startsWith("P1")) {
          sam.p1_samples.push(data.sample[i]);
        } else if (data.sample[i].startsWith("P2")) {
          sam.p2_samples.push(data.sample[i]);
        } else if (data.sample[i].startsWith("P3")) {
          sam.p3_samples.push(data.sample[i]);
        } else if (data.sample[i].startsWith("P4")) {
          sam.p4_samples.push(data.sample[i]);
        } else if (data.sample[i].startsWith("P5")) {
          sam.p5_samples.push(data.sample[i]);
        } else if (data.sample[i].startsWith("P6")) {
          sam.p6_samples.push(data.sample[i]);
        } else if (data.sample[i].startsWith("H1")) {
          sam.h1_samples.push(data.sample[i]);
        } else if (data.sample[i].startsWith("H2")) {
          sam.h2_samples.push(data.sample[i]);
        } else if (data.sample[i].startsWith("H3")) {
          sam.h3_samples.push(data.sample[i]);
        }
      }
      // 'split by' dropdown element
      let select = document.getElementById("splitbyselect");
      // select.innerHTML = '<option value="" selected disabled>Select</option>'
      let colorBySelect = document.getElementById("colorbyselect");
      for (const key in splitby) {
        if (key === "cohort") {
          select.innerHTML += `<option value="${key}" selected>${key}</option>`;
          colorBySelect.innerHTML += `<option value="${key}">${key}</option>`;
        } else if (key === "singleR_label") {
          select.innerHTML += `<option value="${key}">${key}</option>`;
          colorBySelect.innerHTML += `<option value="${key}" selected>${key}</option>`;
        } else {
          select.innerHTML += `<option value="${key}">${key}</option>`;
          colorBySelect.innerHTML += `<option value="${key}">${key}</option>`;
        }
      }
      // splitbydiv.appendChild(select);
      select.addEventListener("change", renderSplits);
      renderSplits();
    });
}

function populateGeneOptions() {
  // If metadata is not available or is empty, return
  if (!metadata || metadata.length === 0) {
    return;
  }

  // Populate gene options
  let geneSelect = document.getElementById("geneSelect");
  let keys = Object.keys(metadata[0]);
  let geneOptions = keys.filter((key) => key.endsWith("_exp"));
  geneSelect.innerHTML = "";
  geneOptions.forEach((option) => {
    let opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    geneSelect.appendChild(opt);
  });
}

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function renderSplits() {
  const value = document.getElementById("splitbyselect").value;
  let total_no_of_umaps = splitby[value].length;
  if (total_no_of_umaps > 1) {
    if (total_no_of_umaps < 3) {
      inputdiv.innerHTML =
        `<input type="range" id="umapinput" value="${total_no_of_umaps}" min="1" max="` +
        `${total_no_of_umaps}` +
        `">
                                <div id="insideinput"><span>1</span><span>${total_no_of_umaps}</span></div>`;
    } else {
      inputdiv.innerHTML =
        `<input type="range" id="umapinput" value="3" min="1" max="` +
        `${total_no_of_umaps}` +
        `">
                                <div id="insideinput"><span>1</span><span>${total_no_of_umaps}</span></div>`;
    }
    inputElement = document.getElementById("umapinput");
    inputElement.addEventListener("change", updateSplits);
    splits_heading.innerText = `Number of UMAPs: ${inputElement.value}`;
  } else {
    inputdiv.innerHTML = ``;
    splits_heading.innerText = `Only one UMAP possible for this option`;
  }
  updateSplits();
}

function updateSpl() {
  const selectedValue = document.getElementById("splitbyselect").value;
  let umap_count,
    requiredSplits = [],
    allSplits = splitby[selectedValue];
  if (document.getElementById("umapinput")) {
    inputElement = document.getElementById("umapinput");
    splits_heading.innerText = `Number of UMAPs: ${inputElement.value}`;
    umap_count = inputElement.value;
  } else {
    umap_count = 1;
  }
  if (splits.innerHTML) {
    let splitsChildren = splits.children;
    let no_of_cur_splits = splitsChildren.length;
    if (umap_count < no_of_cur_splits) {
      for (let i = no_of_cur_splits - 1; i >= umap_count; i--) {
        splitsChildren[i].remove();
      }
    } else {
      let curSplits = [];
      let curSelects = document.getElementsByClassName("typeselector");
      for (let i = 0; i < curSelects.length; i++) {
        curSplits.push(curSelects[i].value);
      }
      for (let i = 0; i < allSplits.length; i++) {
        if (!curSplits.includes(allSplits[i])) {
          requiredSplits.push(allSplits[i]);
        }
      }
      console.log(requiredSplits);
      for (let i = 0; i < requiredSplits.length; i++) {
        innerhtml = "";
        for (let j = 0; j < allSplits.length; j++) {
          if (requiredSplits[i] == allSplits[j]) {
            innerhtml += `<option value="${allSplits[j]}" selected>${allSplits[j]}</option>`;
          } else {
            innerhtml += `<option value="${allSplits[j]}">${allSplits[j]}</option>`;
          }
        }
        splits.innerHTML += `<div class="split"><p id="splitheading">Split ${
          no_of_cur_splits + i + 1
        }</p><select class="typeselector">${innerhtml}</select>
                            <p id="samplepara">Samples:</p><div class="filters"></div></div>`;
      }
    }
  } else {
    requiredSplits = allSplits;
    console.log(requiredSplits);
    for (let i = 0; i < requiredSplits.length; i++) {
      innerhtml = "";
      for (let j = 0; j < allSplits.length; j++) {
        if (requiredSplits[i] == allSplits[j]) {
          innerhtml += `<option value="${allSplits[j]}" selected>${allSplits[j]}</option>`;
        } else {
          innerhtml += `<option value="${allSplits[j]}">${allSplits[j]}</option>`;
        }
      }
      splits.innerHTML += `<div class="split"><p id="splitheading">Split ${
        i + 1
      }</p><select class="typeselector">${innerhtml}</select>
                        <p id="samplepara">Samples:</p><div class="filters"></div></div>`;
    }
  }
  let typeselectors = document.getElementsByClassName("typeselector");
  for (let i = 0; i < typeselectors.length; i++) {
    typeselectors[i].addEventListener("change", updateFilters);
  }
  updateFilters();
}

function updateSplits() {
  splits.innerHTML = ``;
  const selectedValue = document.getElementById("splitbyselect").value;
  let umap_count;
  if (document.getElementById("umapinput")) {
    inputElement = document.getElementById("umapinput");
    splits_heading.innerText = `Number of UMAPs: ${inputElement.value}`;
    umap_count = inputElement.value;
  } else {
    umap_count = 1;
  }
  let typesOfSplits = splitby[selectedValue];
  for (let i = 0; i < umap_count; i++) {
    let innerhtml = "";
    for (let j = 0; j < typesOfSplits.length; j++) {
      if (i == j) {
        innerhtml += `<option value="${typesOfSplits[j]}" selected>${typesOfSplits[j]}</option>`;
      } else {
        innerhtml += `<option value="${typesOfSplits[j]}">${typesOfSplits[j]}</option>`;
      }
    }
    // splits.innerHTML += `<div class="split"><p id="splitheading">Split ${i+1}</p><select class="typeselector">${innerhtml}</select>
    //                     <p id="samplepara">Samples:</p><div class="filters"></div><div id="showFilters">show filters</div></div>`;
    splits.innerHTML += `<div class="split"><p id="splitheading">Split ${
      i + 1
    }</p><div class="custom"><select class="typeselector">${innerhtml}</select><div class="custom-arrow-splitby"></div>
                                <span class="material-symbols-outlined dropdown" >
                                    arrow_drop_down
                                </span> 
                            </div>
                            <div class="filters"></div><div class="showFilters" onclick="unleashFilters(event)">Show Filters<span class="material-symbols-outlined">
                            expand_more
                            </span>
                            </div></div>`;
  }
  let typeselectors = document.getElementsByClassName("typeselector");
  for (let i = 0; i < typeselectors.length; i++) {
    typeselectors[i].addEventListener("change", updateFilters);
  }
  updateFilters();
}

function updateFilters() {
  let typeselectors = document.getElementsByClassName("typeselector");
  let filters = document.getElementsByClassName("filters");
  for (let i = 0; i < typeselectors.length; i++) {
    filters[i].style.display = "none";
    let nextElement = filters[i].nextElementSibling;
    nextElement.innerHTML =
      'Show Filters<span class="material-symbols-outlined">expand_more</span>';
    if (typeselectors[i].value == "before") {
      filters[i].innerHTML = ``;
      for (let j = 0; j < 6; j++) {
        filters[i].innerHTML += `<div>
                        <input type="checkbox" id="beforecheckbox${i + 1}${
          j + 1
        }" value="p${j + 1}_before" checked>
                        <label for="beforecheckbox${i + 1}${j + 1}">P${
          j + 1
        }_before</label><br></div>
                    `;
      }
    } else if (typeselectors[i].value == "after") {
      filters[i].innerHTML = ``;
      for (let j = 0; j < 6; j++) {
        filters[i].innerHTML += `<div>
                        <input type="checkbox" id="aftercheckbox${i + 1}${
          j + 1
        }" value="p${j + 1}_after" checked>
                        <label for="aftercheckbox${i + 1}${j + 1}">P${
          j + 1
        }_after</label><br></div>
                    `;
      }
    } else if (typeselectors[i].value == "health") {
      filters[i].innerHTML = ``;
      for (let j = 0; j < 3; j++) {
        filters[i].innerHTML += `<div>
                        <input type="checkbox" id="healthcheckbox${i + 1}${
          j + 1
        }" value="h${j + 1}" checked>
                        <label for="healthcheckbox${i + 1}${j + 1}">H${
          j + 1
        }</label><br></div>
                    `;
      }
    } else if (typeselectors[i].value == "P1") {
      filters[i].innerHTML = ``;
      filters[i].innerHTML += `<div>
                    <input type="checkbox" id="p1_before${
                      i + 1
                    }" value="p1_before" checked>
                    <label for="p1_before${i + 1}">p1_before</label><br></div>
                    <div><input type="checkbox" id="p1_after${
                      i + 1
                    }" value="p1_after" checked>
                    <label for="p1_after${i + 1}">p1_after</label><br></div>
                `;
    } else if (typeselectors[i].value == "P2") {
      filters[i].innerHTML = ``;
      filters[i].innerHTML += `<div>
                    <input type="checkbox" id="p2_before${
                      i + 1
                    }" value="p2_before" checked>
                    <label for="p2_before${i + 1}">p2_before</label><br></div>
                    <div><input type="checkbox" id="p2_after${
                      i + 1
                    }" value="p2_after" checked>
                    <label for="p2_after${i + 1}">p2_after</label><br></div>
                `;
    } else if (typeselectors[i].value == "P3") {
      filters[i].innerHTML = ``;
      filters[i].innerHTML += `<div>
                    <input type="checkbox" id="p3_before${
                      i + 1
                    }" value="p3_before" checked>
                    <label for="p3_before${i + 1}">p3_before</label><br></div>
                    <div><input type="checkbox" id="p3_after${
                      i + 1
                    }" value="p3_after" checked>
                    <label for="p3_after${i + 1}">p3_after</label><br></div>
                `;
    } else if (typeselectors[i].value == "P4") {
      filters[i].innerHTML = ``;
      filters[i].innerHTML += `<div>
                    <input type="checkbox" id="p4_before${
                      i + 1
                    }" value="p4_before" checked>
                    <label for="p4_before${i + 1}">p4_before</label><br></div>
                    <div><input type="checkbox" id="p4_after${
                      i + 1
                    }" value="p4_after" checked>
                    <label for="p4_after${i + 1}">p4_after</label><br></div>
                `;
    } else if (typeselectors[i].value == "P5") {
      filters[i].innerHTML = ``;
      filters[i].innerHTML += `<div>
                    <input type="checkbox" id="p5_before${
                      i + 1
                    }" value="p5_before"  checked>
                    <label for="p5_before${i + 1}">p5_before</label><br></div>
                    <div><input type="checkbox" id="p5_after${
                      i + 1
                    }" value="p5_after" checked>
                    <label for="p5_after${i + 1}">p5_after</label><br></div>
                `;
    } else if (typeselectors[i].value == "P6") {
      filters[i].innerHTML = ``;
      filters[i].innerHTML += `<div>
                    <input type="checkbox" id="p6_before${
                      i + 1
                    }" value="p6_before" checked>
                    <label for="p6_before${i + 1}">p6_before</label><br></div>
                    <div><input type="checkbox" id="p6_after${
                      i + 1
                    }" value="p6_after" checked>
                    <label for="p6_after${i + 1}">p6_after</label><br></div>
                `;
    } else if (typeselectors[i].value == "H1") {
      filters[i].innerHTML = ``;
      filters[i].innerHTML += `<div>
                    <input type="checkbox" id="h1${i + 1}" value="h1" checked>
                    <label for="h1${i + 1}">H1</label><br></div>
                `;
    } else if (typeselectors[i].value == "H2") {
      filters[i].innerHTML = ``;
      filters[i].innerHTML += `<div>
                    <input type="checkbox" id="h2${i + 1}" value="h2" checked>
                    <label for="h2${i + 1}">H2</label><br></div>
                `;
    } else if (typeselectors[i].value == "H3") {
      filters[i].innerHTML = ``;
      filters[i].innerHTML += `<div>
                    <input type="checkbox" id="h3${i + 1}" value="h3" checked>
                    <label for="h3${i + 1}">H3</label><br></div>
                `;
    } else {
      filters[i].innerHTML = ``;
      filters[i].innerHTML += `<div>
                <input type="checkbox" id="p1_before${
                  i + 1
                }" value="p1_before" checked>
                <label for="p1_before${i + 1}">p1_before</label><br></div>
                <div><input type="checkbox" id="p1_after${
                  i + 1
                }" value="p1_after"  checked>
                <label for="p1_after${i + 1}">p1_after</label><br></div>
                <div><input type="checkbox" id="p2_before${
                  i + 1
                }" value="p2_before" checked>
                <label for="p2_before${i + 1}">p2_before</label><br></div>
                <div><input type="checkbox" id="p2_after${
                  i + 1
                }" value="p2_after" checked>
                <label for="p2_after${i + 1}">p2_after</label><br></div>
                <div><input type="checkbox" id="p3_before${
                  i + 1
                }" value="p3_before" checked>
                <label for="p3_before${i + 1}">p3_before</label><br></div>
                <div><input type="checkbox" id="p4_after${
                  i + 1
                }" value="p4_after" checked>
                <label for="p4_after${i + 1}">p4_after</label><br></div>
                <div><input type="checkbox" id="p5_before${
                  i + 1
                }" value="p5_before" checked>
                <label for="p5_before${i + 1}">p5_before</label><br></div>
                <div><input type="checkbox" id="p5_after${
                  i + 1
                }" value="p5_after"  checked>
                <label for="p5_after${i + 1}">p5_after</label><br></div>
                <div><input type="checkbox" id="p6_before${
                  i + 1
                }" value="p6_before" checked>
                <label for="p6_before${i + 1}">p6_before</label><br></div>
                <div><input type="checkbox" id="p6_after${
                  i + 1
                }" value="p6_after" checked>
                <label for="p6_after${i + 1}">p6_after</label><br></div>
                <div><input type="checkbox" id="h1${i + 1}" value="h1" checked>
                <label for="h1${i + 1}">H1</label><br></div>
                <div><input type="checkbox" id="h2${i + 1}" value="h2" checked>
                <label for="h2${i + 1}">H2</label><br></div>
                <div><input type="checkbox" id="h3${i + 1}" value="h3" checked>
                <label for="h3${i + 1}">H3</label><br></div>
            `;
    }
  }
}

function unleashFilters(evt) {
  let filter = evt.target.previousElementSibling;
  if (filter.style.display == "none") {
    filter.style.display = "flex";
    evt.target.innerHTML =
      'Hide Filters<span class="material-symbols-outlined">keyboard_arrow_up</span>';
  } else {
    filter.style.display = "none";
    evt.target.innerHTML =
      'Show Filters<span class="material-symbols-outlined">expand_more</span>';
  }
}

let colors_used = {}; //color for each label ({ label: color_name, ... })
function getNewColor() {
  let alphabet = "56789ABCDEF";
  color = "#";
  for (let i = 0; i < 6; i++) {
    color += alphabet[Math.floor(Math.random() * 10)];
  }
  if (Object.values(colors_used).includes(color)) {
    return getNewColor();
  }
  return color;
}

function renderUMAPs() {
  // while(!gotMetaData){console.log('havent got')};
  if (gotMetaData) {
    let umapdiv = document.getElementById("umaps");
    umapdiv.innerHTML = "";
    let typeSelectors = document.getElementsByClassName("typeselector");
    let necessaryUmaps = [];
    let splitByValue = document.getElementById("splitbyselect").value;
    let no_of_umaps;
    if (document.getElementById("umapinput")) {
      no_of_umaps = document.getElementById("umapinput").value;
    } else {
      no_of_umaps = 1;
    }
    let filters = document.getElementsByClassName("filters");
    let colorBy = document.getElementById("colorbyselect").value;
    let filterValues = [];
    for (let i = 0; i < filters.length; i++) {
      let children = filters[i].children;
      let values = [];
      for (let j = 0; j < children.length; j++) {
        let grandChildren = children[j].children;
        for (let k = 0; k < grandChildren.length; k++) {
          if (grandChildren[k].tagName == "INPUT" && grandChildren[k].checked) {
            values.push(grandChildren[k].value);
          }
        }
      }
      filterValues.push(values);
    }
    console.log(filterValues);
    // umapdiv.innerHTML = ``;
    let umaps = {};
    for (let i = 0; i < no_of_umaps; i++) {
      // let splitValue = splitby[splitByValue][i];
      let splitValue = typeSelectors[i].value;
      umaps[splitValue] = {};
      for (let j = 0; j < metadata.length; j++) {
        // iterates over cells
        if (
          metadata[j][splitByValue] == splitValue &&
          filterValues[i].includes(metadata[j].sample.toLowerCase())
        ) {
          let label = metadata[j][colorBy];
          let text =
            label +
            " X1: " +
            metadata[j].umap_x1 +
            " X2: " +
            metadata[j].umpa_x2;
          if (!(label in umaps[splitValue])) {
            umaps[splitValue][label] = {};
            umaps[splitValue][label].x = [];
            umaps[splitValue][label].y = [];
            umaps[splitValue][label].text = [];
            umaps[splitValue][label].mode = "markers";
            umaps[splitValue][label].type = "scatter";
            umaps[splitValue][label].marker = {};
            if (label in colors_used) {
              umaps[splitValue][label].marker.color = colors_used[label];
            } else {
              colors_used[label] = getNewColor();
              umaps[splitValue][label].marker.color = colors_used[label];
            }
            umaps[splitValue][label].marker.size = 1;
            umaps[splitValue][label].name = label;
          }
          umaps[splitValue][label].x.push(metadata[j].umap_x1);
          umaps[splitValue][label].y.push(metadata[j].umpa_x2);
          umaps[splitValue][label].text.push(text);
        }
      }
      let traces = [];
      for (const key in umaps[splitValue]) {
        traces.push(umaps[splitValue][key]);
      }
      traces.sort(function (a, b) {
        let name1 = a.name.toLowerCase(),
          name2 = b.name.toLowerCase();
        if (name1 < name2) return -1;
        if (name1 > name2) return 1;
        return 0;
      });
      let layout = {
        title: `${splitValue}`,
        // "width": 600,
        // "height": 400,
        xaxis: {
          showline: false, // Remove x-axis scale
          showgrid: false,
        },
        yaxis: {
          showline: false, // Remove y-axis scale
          showgrid: false,
        },
        legend: {
          // orientation: 'h'
        },
      };
      let div = document.createElement("div");
      div.id = `${splitValue}${i}`;
      umapdiv.appendChild(div);
      Plotly.newPlot(`${splitValue}${i}`, traces, layout);
      // console.log('end');
    }
    // });
    let pathValue = "M1,0A5,5 0 1,1 0,-1A5,5 0 0,1 1,0Z";
    let paths = document.getElementsByClassName("legendpoints");
    // console.log(paths);
    for (let i = 0; i < paths.length; i++) {
      let pathChildren = paths[i].children;
      for (let j = 0; j < pathChildren.length; j++) {
        if (pathChildren[j].tagName == "path") {
          pathChildren[j].setAttribute("d", pathValue);
        }
      }
    }
  } else {
    alert("Data is not ready");
  }
}

async function render_gene_umaps() {
  console.log("gene umap selected");
  let umapdiv = document.getElementById("gene_umaps");
  umapdiv.innerHTML = "";
  let typeSelectors = document.getElementsByClassName("typeselector");

  let splitByValue = document.getElementById("splitbyselect").value;
  let no_of_umaps;
  if (document.getElementById("umapinput")) {
    no_of_umaps = document.getElementById("umapinput").value;
  } else {
    no_of_umaps = 1;
  }
  let filters = document.getElementsByClassName("filters");
  let colorBy = document.getElementById("colorbyselect").value;
  let filterValues = [];
  for (let i = 0; i < filters.length; i++) {
    let children = filters[i].children;
    let values = [];
    for (let j = 0; j < children.length; j++) {
      let grandChildren = children[j].children;
      for (let k = 0; k < grandChildren.length; k++) {
        if (grandChildren[k].tagName == "INPUT" && grandChildren[k].checked) {
          values.push(grandChildren[k].value);
        }
      }
    }
    filterValues.push(values);
  }

  let filteredMetadata = [];
  for (let i = 0; i < no_of_umaps; i++) {
    let filterData = [];
    let filterArr = filterValues[i];
    console.log(filterArr);
    for (let j = 0; j < metadata.length; j++) {
      if (filterArr.includes(metadata[j].sample.toLowerCase())) {
        filterData.push(metadata[j]);
      }
    }
    filteredMetadata.push(filterData);
  }
  console.log(filteredMetadata);

  // Iterate over each array inside filteredMetadata
  filteredMetadata.forEach((arr, index) => {
    // Initialize empty arrays for x, y, and color
    let x = [];
    let y = [];
    let color = [];

    // Iterate over each object in the current array
    arr.forEach((obj) => {
      // Push umap_x1 to x array
      x.push(obj.umap_x1);

      // Push umpa_x2 to y array
      y.push(obj.umpa_x2);

      // Push selected gene expression value to color array
      color.push(obj[geneSelect.value]);
    });

    // Create trace
    // Create trace
    const trace1 = {
      x: x,
      y: y,
      mode: "markers",
      text: color.map(
        (value, index) =>
          `Log Normalised Value: ${value}<br>X1: ${x[index].toFixed(
            4
          )}<br>X2: ${y[index].toFixed(4)}`
      ),
      marker: {
        size: 1.5,
        color: color,
        colorscale: [
          [0, "rgb(220,220,220)"],
          [1, "rgb(255,0,0)"],
        ],
        cmax: Math.max(...color),
        cmin: Math.min(...color),
        colorbar: {
          title: `Log Normalised Value`,
        },
      },
    };
    const data = [trace1];

    const layout = {
      title: `Gene : ${geneSelect.value}`,
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",

      xaxis: {
        visible: false,
      },
      yaxis: {
        visible: false,
      },
      hovermode: "closest",
    };

    // Create a new div for each scatter plot
    var div = document.createElement("div");
    div.id = `plot${index}`;
    div.style.width = "calc(33.33% - 20px)"; // Each plot takes up one-third of the available space
    div.style.float = "left"; // To arrange them in a row
    umapdiv.appendChild(div);
    // Plot the graph inside the newly created div
    Plotly.newPlot(`plot${index}`, data, layout).then(function () {
      // Update color bar thickness and font size
      var plot = document.getElementById(`plot${index}`);
      var colorBar = plot.querySelector(".colorbar");
      var colorBarTitle = plot.querySelector(".colorbar-title");
      colorBar.style.width = "10px"; // Adjust thickness as needed
      colorBarTitle.style.fontSize = "8px"; // Adjust font size as needed
    });
  });
}

// document.addEventListener('DOMContentLoaded', fetchDetails);

document.addEventListener("DOMContentLoaded", function () {
  fetchMetaData();
  fetchDetails();
});
