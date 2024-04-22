const BASE_URL = "https://api.spacexdata.com/v3";
const infoCards = document.getElementById("infoCards");
let data;

const getSpaceInfo = async() => {
  await axios.get(
    `${BASE_URL}/landpads`
  )
  .then((res) => {
    data = res.data;
    console.log(data);
    if (data && data.length > 0){
      showSpaceInfo(data);

    }
  })
  .catch((error) => console.error(`Error: ${error}`));
};

const showSpaceInfo = (data) =>{
  const cardElements = data.map((selectedPad) => {
    const card = document.createElement("div");
    card.classList.add("card", "card-medium", "m-3");

    const cardBody =  document.createElement("div");
    cardBody.classList.add("card-body","bg-dark", "border-dark");
    card.appendChild(cardBody);

    


    const landingZoneTitle = document.createElement("h4");
    landingZoneTitle.classList.add("card-title");
    landingZoneTitle.textContent = `${selectedPad.full_name} `;
    cardBody.appendChild(landingZoneTitle);

    const serial = document.createElement("span");
    serial.classList.add("badge", "badge-secondary");
    serial.textContent = `${selectedPad.id}`;
    cardBody.appendChild(serial);

    const landingType = document.createElement("span");
    landingType.classList.add("badge", "badge-secondary", "ml-2");
    landingType.textContent = `${selectedPad.landing_type}`;
    cardBody.appendChild(landingType);
    
    const details = document.createElement("p");
    details.classList.add("card-text", "text-overflow", "mt-2");
    details.textContent = selectedPad.details;
    cardBody.appendChild(details);

    const buttons = document.createElement("div");
    buttons.classList.add("d-flex", "justify-content-between");
    cardBody.appendChild(buttons);

    const cardBtn =  document.createElement("button");
    cardBtn.classList.add("btn", "btn-dark", "border", "border-light");
    cardBtn.textContent ="Read More";
    buttons.appendChild(cardBtn);
    cardBtn.addEventListener("click", () => sendData(selectedPad));



    return card;
  });
  cardElements.forEach((card) => {
    infoCards.appendChild(card);
  });
}


function sendData(selectedPad) {
  console.log(selectedPad);
  sessionStorage.setItem('selectedPad', JSON.stringify(selectedPad));
  window.location.href = 'details/details.html';
}






(async () => {
  await getSpaceInfo(BASE_URL);
})();
