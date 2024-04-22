const pageBody = document.getElementById("pageBody");
document.addEventListener("DOMContentLoaded", function() {

  const selectedRocket = JSON.parse(sessionStorage.getItem('selectedRocket'));
  console.log(selectedRocket);
  const spacecraftName = document.getElementById("spacecraftName");
  spacecraftName.textContent = selectedRocket.name;

  const flightDate = document.getElementById("flightDate");
  flightDate.textContent = `First Flight Date: ${selectedRocket.first_flight}`;
  
  const descriptionElement = document.getElementById("description");
  descriptionElement.textContent = selectedRocket.description;

  const stats = document.getElementById("stats");
  stats.classList.add("card", "border-dark", "m-1", "p-2", "card-large");
  const spaceCraftType = document.createElement("p");
  spaceCraftType.textContent= `Type: ${selectedRocket.type.toUpperCase()}`;
  stats.appendChild(spaceCraftType);

  const diameter = document.createElement("p");
  diameter.textContent = `Diameter: ${selectedRocket.diameter.meters} meters`;
  stats.appendChild(diameter);

  const mass = document.createElement("p");
  mass.textContent = `Mass: ${selectedRocket.mass.kg} KG`;
  stats.appendChild(mass);

  const successRate = document.createElement("p");
  successRate.textContent = `Success Rate: ${selectedRocket.success_rate_pct}%`;
  stats.appendChild(successRate);

  const secondaryStats = document.getElementById("secondaryStats");
  secondaryStats.classList.add("card", "border-dark", "m-1", "p-2", "card-large");
  
  const statHeader = document.createElement("p");
  statHeader.textContent = `Country: ${selectedRocket.country}`;
  secondaryStats.appendChild(statHeader);

  const company = document.createElement("p");
  company.textContent = `Company: ${selectedRocket.company}`;
  secondaryStats.appendChild(company);
  
  const cost = document.createElement("p");
  cost.textContent = `Cost Per Launch: $${selectedRocket.cost_per_launch}`;
  secondaryStats.appendChild(cost);

  const status = document.createElement("p");
  status.classList.add("text-" + (selectedRocket.status === true ? "danger" : "success"));
  status.textContent = selectedRocket.status === true ? "Inactive" : "Active";
  secondaryStats.appendChild(status);

  const detailsImg = document.getElementById("imageDisplay");
  const selectedImg = document.createElement("div");
  selectedImg.classList.add("details-image");
  selectedImg.style.backgroundImage = `url(${selectedRocket.flickr_images[0]})`;
  detailsImg.appendChild(selectedImg);

  const imgSelection = document.createElement("div");
  imgSelection.classList.add("d-flex", "flex-row");
  detailsImg.appendChild(imgSelection);


  selectedRocket.flickr_images.forEach((img) => {
    let imgBtn = document.createElement("button");
    imgBtn.classList.add("m-2")
    let thumbnail = document.createElement("img");
    thumbnail.classList.add("thumbnail")
    imgBtn.appendChild(thumbnail);

    thumbnail.src = img;
    imgSelection.appendChild(imgBtn);
    imgBtn.addEventListener("click", (event) => selectedImg.style.backgroundImage = `url(${event.target.src})`);

  })

  const infoCards = document.getElementById("infoCards");
  console.log(11111,infoCards)
  
  const buttons = document.createElement("div");
  buttons.classList.add("d-flex", "justify-content-between", "p-2");
  infoCards.appendChild(buttons);

  const cardBtn2 =  document.createElement("a");
  cardBtn2.classList.add("btn", "btn-dark", "border", "border-light");
  cardBtn2.textContent ="Wikipedia";
  cardBtn2.href = selectedRocket.wikipedia;
  cardBtn2.target="_blank";
  buttons.appendChild(cardBtn2);

  const toggleBtn = document.createElement("button");
  toggleBtn.classList.add("btn", "btn-dark", "border", "border-light");
  toggleBtn.textContent ="Toggle Imperial Units";
  toggleBtn.addEventListener("click", toggleUnitstoImperial);
  buttons.appendChild(toggleBtn);
  

  const backBtn = document.createElement("a");
  backBtn.classList.add("btn", "btn-dark", "border", "border-light");
  backBtn.textContent ="Back";
  backBtn.href = "../rockets.html";
  buttons.appendChild(backBtn);


  function toggleUnitstoImperial(){
    diameter.textContent = `Diameter: ${selectedRocket.diameter.feet} feet`;
    mass.textContent = `Mass: ${selectedRocket.mass.lb} LBS`;

    toggleBtn.textContent ="Toggle Metric Units";
    toggleBtn.addEventListener("click", toggleUnitstoMetric);
    
  }

  function toggleUnitstoMetric(){
    diameter.textContent = `Diameter: ${selectedRocket.diameter.meters} Meters`;
    mass.textContent = `Mass: ${selectedRocket.mass.kg} KG`;

    toggleBtn.textContent ="Toggle Imperial Units";
    toggleBtn.addEventListener("click", toggleUnitstoImperial);

  }
});

