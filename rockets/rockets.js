const BASE_URL = "https://api.spacexdata.com/v4";
const infoCards = document.getElementById("infoCards");
let data;

const getSpaceInfo = async() => {
  await axios.get(
    `${BASE_URL}/rockets`
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
  const cardElements = data.map((selectedRocket) => {
    const card = document.createElement("div");
    card.classList.add("card", "card-large", "m-3");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    imgContainer.style.backgroundImage = `url(${selectedRocket.flickr_images[0]})`;
    card.appendChild(imgContainer);

    const cardBody =  document.createElement("div");
    cardBody.classList.add("card-body","bg-dark", "border-dark");
    card.appendChild(cardBody);

    const rocketTitle = document.createElement("h4");
    rocketTitle.classList.add("card-title");
    rocketTitle.textContent = `${selectedRocket.name} `;
    cardBody.appendChild(rocketTitle);

    const eventTime = document.createElement("p");
    eventTime.classList.add("text-muted",);
    const eventDate = new Date(selectedRocket.first_flight);
    const options = { year: 'numeric', month: 'long', day: 'numeric'}
    const legibleDate = eventDate.toLocaleDateString('en-US', options);
    eventTime.textContent = `First Flight: ${legibleDate}`;
    cardBody.appendChild(eventTime);

    const status = document.createElement("p");
    status.classList.add("text-" + (selectedRocket.status === true ? "danger" : "success"));
    status.textContent = selectedRocket.status === true ? "Inactive" : "Active";
    cardBody.appendChild(status);
    
    const details = document.createElement("p");
    details.classList.add("card-text", "text-overflow", "mt-2");
    details.textContent = selectedRocket.description;
    cardBody.appendChild(details);

    const buttons = document.createElement("div");
    buttons.classList.add("d-flex", "justify-content-between");
    cardBody.appendChild(buttons);

    const cardBtn =  document.createElement("button");
    cardBtn.classList.add("btn", "btn-dark", "border", "border-light");
    cardBtn.textContent ="Learn More";
    buttons.appendChild(cardBtn);
    cardBtn.addEventListener("click", () => sendData(selectedRocket));



    return card;
  });
  cardElements.forEach((card) => {
    infoCards.appendChild(card);
  });
}


function sendData(selectedRocket) {
  console.log(selectedRocket);
  sessionStorage.setItem('selectedRocket', JSON.stringify(selectedRocket));
  window.location.href = 'details/details.html';
}






(async () => {
  await getSpaceInfo(BASE_URL);
})();
