const pageBody = document.getElementById("pageBody");
document.addEventListener("DOMContentLoaded", function() {

  const selectedPad = JSON.parse(sessionStorage.getItem('selectedPad'));
  console.log(selectedPad);
  const spacecraftName = document.getElementById("spacecraftName");
  spacecraftName.textContent = selectedPad.full_name;

  const serialId = document.getElementById("serialId");
  serialId.textContent = `${selectedPad.id}`;

  const landingType = document.createElement("span");
  landingType.classList.add("badge", "badge-secondary", "ml-2");
  landingType.textContent = `${selectedPad.landing_type}`;
  serialId.appendChild(landingType);
  
  const descriptionElement = document.getElementById("description");
  descriptionElement.textContent = selectedPad.details;

  const stats = document.getElementById("stats");
  stats.classList.add("border-dark", "m-1", "p-2", "card-large");
  const spaceCraftType = document.createElement("p");
  stats.appendChild(spaceCraftType);

  const attemptedLandings = document.createElement("p");
  attemptedLandings.textContent = `Attempted Landings: ${selectedPad.attempted_landings}`;
  stats.appendChild(attemptedLandings);

  const successfulLandings = document.createElement("p");
  successfulLandings.textContent = `Successful Landings: ${selectedPad.successful_landings}`;
  stats.appendChild(successfulLandings);

  const status = document.createElement("p");
  status.classList.add("text-" + (selectedPad.status === true ? "danger" : "success"));
  status.textContent = selectedPad.status === true ? "Inactive" : "Active";
  stats.appendChild(status);

  const cardBtn2 =  document.createElement("a");
  cardBtn2.classList.add("btn", "btn-dark", "border", "border-light", "d-block", "mt-2");
  cardBtn2.textContent ="Wikipedia";
  cardBtn2.href = selectedPad.wikipedia;
  cardBtn2.target="_blank";
  status.appendChild(cardBtn2);

  const secondaryStats = document.getElementById("secondaryStats");
  secondaryStats.classList.add("card", "border-dark", "m-1", "p-2", "card-large");
  
  const statHeader = document.createElement("h5");
  statHeader.textContent = "Location";
  secondaryStats.appendChild(statHeader);

  const locationName = document.createElement("p");
  locationName.textContent = `${selectedPad.location.name}`;
  secondaryStats.appendChild(locationName);
  
  const locationRegion = document.createElement("p");
  locationRegion.textContent = `${selectedPad.location.region}`;
  secondaryStats.appendChild(locationRegion);

  const backBtn = document.createElement("a");
  backBtn.classList.add("btn", "btn-light", "border", "border-light", "d-block", "m-2");
  backBtn.textContent ="Back";
  backBtn.href = "../landpads.html";
  secondaryStats.appendChild(backBtn);

});

