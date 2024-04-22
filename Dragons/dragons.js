const BASE_URL = "https://api.spacexdata.com/v3";
const infoCards = document.getElementById("infoCards");
const pageBody = document.getElementById("pageBody");
let data;

const getSpaceInfo = async() => {
  await axios.get(
    `${BASE_URL}/dragons`
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
  const cardElements = data.map((selectedDragon) => {
    const card = document.createElement("div");
    card.classList.add("card", "card-large", "m-3");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    imgContainer.style.backgroundImage = `url(${selectedDragon.flickr_images[1]})`;
    card.appendChild(imgContainer);

    const cardBody =  document.createElement("div");
    cardBody.classList.add("card-body","bg-dark", "border-dark");
    card.appendChild(cardBody);

    const spaceCraftTitle = document.createElement("h4");
    spaceCraftTitle.classList.add("card-title");
    spaceCraftTitle.textContent = `${selectedDragon.name} `;
    cardBody.appendChild(spaceCraftTitle);

    const details = document.createElement("p");
    details.classList.add("card-text", "text-overflow");
    details.textContent = selectedDragon.description;
    cardBody.appendChild(details);

    const buttons = document.createElement("div");
    buttons.classList.add("d-flex", "justify-content-between");
    cardBody.appendChild(buttons);

    const cardBtn =  document.createElement("button");
    cardBtn.classList.add("btn", "btn-dark", "border", "border-light");
    cardBtn.textContent ="Read More";
    buttons.appendChild(cardBtn);
    cardBtn.addEventListener("click", () => sendData(selectedDragon));

    const cardBtn2 =  document.createElement("a");
    cardBtn2.classList.add("btn", "btn-dark", "border", "border-light");
    cardBtn2.textContent ="Wikipedia";
    cardBtn2.href = selectedDragon.wikipedia;
    cardBtn2.target="_blank";
    buttons.appendChild(cardBtn2);



    return card;
  });
  cardElements.forEach((card) => {
    infoCards.appendChild(card);
  });
}


function sendData(selectedDragon) {
  console.log(selectedDragon);
  sessionStorage.setItem('selectedDragon', JSON.stringify(selectedDragon));
  window.location.href = 'details/details.html';
}






(async () => {
  await getSpaceInfo(BASE_URL);
})();
