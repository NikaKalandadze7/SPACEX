const pageBody = document.getElementById("pageBody");
document.addEventListener("DOMContentLoaded", function() {

  const selectedDragon = JSON.parse(sessionStorage.getItem('selectedDragon'));
  console.log(selectedDragon);
  const spacecraftName = document.getElementById("spacecraftName");
  spacecraftName.textContent = selectedDragon.name;

  const flightDate = document.getElementById("flightDate");
  flightDate.textContent = `First Flight Date: ${selectedDragon.first_flight}`;
  
  const descriptionElement = document.getElementById("description");
  descriptionElement.textContent = selectedDragon.description;

  const stats = document.getElementById("stats");
  stats.classList.add("card", "border-dark", "m-1", "p-2", "card-large");
  const spaceCraftType = document.createElement("p");
  spaceCraftType.textContent= `Type: ${selectedDragon.type.toUpperCase()}`;
  stats.appendChild(spaceCraftType);

  const crew = document.createElement("p");
  crew.textContent = `Crew Count: ${selectedDragon.crew_capacity}`;
  stats.appendChild(crew);

  const dryMass = document.createElement("p");
  dryMass.textContent = `Dry Mass: ${selectedDragon.dry_mass_kg} KG`;
  stats.appendChild(dryMass);

  const status = document.createElement("p");
  status.classList.add("text-" + (selectedDragon.status === true ? "danger" : "success"));
  status.textContent = selectedDragon.status === true ? "Inactive" : "Active";
  stats.appendChild(status);

  const cardBtn2 =  document.createElement("a");
  cardBtn2.classList.add("btn", "btn-dark", "border", "border-light", "d-block", "mt-2");
  cardBtn2.textContent ="Wikipedia";
  cardBtn2.href = selectedDragon.wikipedia;
  cardBtn2.target="_blank";
  status.appendChild(cardBtn2);

  const secondaryStats = document.getElementById("secondaryStats");
  secondaryStats.classList.add("card", "border-dark", "m-1", "p-2", "card-large");
  
  const statHeader = document.createElement("h5");
  statHeader.textContent = "Heat Shield";
  secondaryStats.appendChild(statHeader);

  const devPartner = document.createElement("p");
  devPartner.textContent = `Dev Partner is ${selectedDragon.heat_shield.dev_partner}`;
  secondaryStats.appendChild(devPartner);
  
  const material = document.createElement("p");
  material.textContent = `Material: ${selectedDragon.heat_shield.material}`;
  secondaryStats.appendChild(material);

  const size = document.createElement("p");
  size.textContent = `Size: ${selectedDragon.heat_shield.size_meters} m`;
  secondaryStats.appendChild(size);

  const temperature = document.createElement("p");
  temperature.textContent = `Temperature: ${selectedDragon.heat_shield.temp_degrees}`;
  secondaryStats.appendChild(temperature);

  const massInfo = document.getElementById("massInfo");
  let launchPayloadMass = document.createElement("p");
  launchPayloadMass.textContent = `Launch Payload Mass: ${selectedDragon.launch_payload_mass.kg} KG`;
  massInfo.appendChild(launchPayloadMass);
  const returnPayloadMass = document.createElement("p");
  returnPayloadMass.textContent = `Return Payload Mass: ${selectedDragon.return_payload_mass.kg} KG`;
  massInfo.appendChild(returnPayloadMass);

  const diameter = document.createElement("p");
  diameter.textContent = `Diameter: ${selectedDragon.diameter.meters} meters`;
  massInfo.appendChild(diameter);

  const height = document.createElement("p");
  height.textContent = `Height: ${selectedDragon.height_w_trunk.meters} meters`;
  massInfo.appendChild(height);


  const volumeInfo = document.getElementById("volumeInfo");
  let launchPayloadVol = document.createElement("p");
  launchPayloadVol.textContent = `Launch Payload Volume: ${selectedDragon.launch_payload_vol.cubic_meters} m3`;
  volumeInfo.appendChild(launchPayloadVol);
  const returnPayloadVol = document.createElement("p");
  returnPayloadVol.textContent = `Return Payload Volume: ${selectedDragon.return_payload_vol.cubic_meters} m3`;
  volumeInfo.appendChild(returnPayloadVol);

  const trunkVolume = document.createElement("p");
  trunkVolume.textContent = `Trunk Volume: ${selectedDragon.trunk.trunk_volume.cubic_meters} m3`;
  volumeInfo.appendChild(trunkVolume);

  const pressurizedCapsulePayloadVolume = document.createElement("p");
  pressurizedCapsulePayloadVolume.textContent = `Pressurized Capsule Payload Volume: ${selectedDragon.pressurized_capsule.payload_volume.cubic_meters} m3`;
  volumeInfo.appendChild(pressurizedCapsulePayloadVolume);


  const detailsImg = document.getElementById("imageDisplay");
  const selectedImg = document.createElement("div");
  selectedImg.classList.add("details-image");
  selectedImg.style.backgroundImage = `url(${selectedDragon.flickr_images[1]})`;
  detailsImg.appendChild(selectedImg);

  const imgSelection = document.createElement("div");
  imgSelection.classList.add("d-flex", "flex-row");
  detailsImg.appendChild(imgSelection);


  selectedDragon.flickr_images.forEach((img) => {
    let imgBtn = document.createElement("button");
    imgBtn.classList.add("m-2")
    let thumbnail = document.createElement("img");
    thumbnail.classList.add("thumbnail")
    imgBtn.appendChild(thumbnail);

    thumbnail.src = img;
    imgSelection.appendChild(imgBtn);
    imgBtn.addEventListener("click", (event) => selectedImg.style.backgroundImage = `url(${event.target.src})`);

  })


  const toggleBtn = document.createElement("button");
  toggleBtn.classList.add("btn", "btn-dark", "border", "border-light", "d-block", "mt-5");
  toggleBtn.textContent ="Toggle Imperial Units";
  toggleBtn.addEventListener("click", toggleUnitstoImperial);
  massInfo.appendChild(toggleBtn);


  const backBtn = document.createElement("a");
  backBtn.classList.add("btn", "btn-dark", "border", "border-light", "d-block", "mt-5");
  backBtn.textContent ="Back";
  backBtn.href = "../dragons.html";
  volumeInfo.appendChild(backBtn);


  function toggleUnitstoImperial(){
    dryMass.textContent = `Dry Mass: ${selectedDragon.dry_mass_lb} LBs`;
    launchPayloadMass.textContent = `Launch Payload Mass: ${selectedDragon.launch_payload_mass.lb} LBs`;
    returnPayloadMass.textContent = `Return Payload Mass: ${selectedDragon.return_payload_mass.lb} LBs`;
    diameter.textContent = `Diameter: ${selectedDragon.diameter.feet} feet`;
    height.textContent = `Height: ${selectedDragon.height_w_trunk.feet} feet`;
    
    launchPayloadVol.textContent = `Launch Payload Volume: ${selectedDragon.launch_payload_vol.cubic_feet} ft3`;
    returnPayloadVol.textContent = `Return Payload Volume: ${selectedDragon.return_payload_vol.cubic_feet} ft3`;
    trunkVolume.textContent = `Trunk Volume: ${selectedDragon.trunk.trunk_volume.cubic_feet} ft3`;
    pressurizedCapsulePayloadVolume.textContent = `Pressurized Capsule Payload Volume: ${selectedDragon.pressurized_capsule.payload_volume.cubic_feet} ft3`;

    toggleBtn.textContent ="Toggle Metric Units";
    toggleBtn.addEventListener("click", toggleUnitstoMetric);
    
  }

  function toggleUnitstoMetric(){
    dryMass.textContent = `Dry Mass: ${selectedDragon.dry_mass_kg} KG`;
    launchPayloadMass.textContent = `Launch Payload Mass: ${selectedDragon.launch_payload_mass.kg} KG`;
    returnPayloadMass.textContent = `Return Payload Mass: ${selectedDragon.return_payload_mass.kg} KG`;
    diameter.textContent = `Diameter: ${selectedDragon.diameter.meters} m`;
    height.textContent = `Height: ${selectedDragon.height_w_trunk.meters} m`;

    launchPayloadVol.textContent = `Launch Payload Volume: ${selectedDragon.launch_payload_vol.cubic_meters} m3`;
    returnPayloadVol.textContent = `Return Payload Volume: ${selectedDragon.return_payload_vol.cubic_meters} m3`;
    trunkVolume.textContent = `Trunk Volume: ${selectedDragon.trunk.trunk_volume.cubic_meters} m3`;
    pressurizedCapsulePayloadVolume.textContent = `Pressurized Capsule Payload Volume: ${selectedDragon.pressurized_capsule.payload_volume.cubic_meters} m3`;

    toggleBtn.textContent ="Toggle Imperial Units";
    toggleBtn.addEventListener("click", toggleUnitstoImperial);

  }
});

