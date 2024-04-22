const BASE_URL = "https://api.spacexdata.com/v3";
const infoCards = document.getElementById("infoCards");
let data;

const getSpaceInfo = async() => {
  await axios.get(
    `${BASE_URL}/missions`
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
  const cardElements = data.map((selectedMission) => {
    const card = document.createElement("div");
    card.classList.add("card", "card-small", "m-3");


    const cardBody =  document.createElement("div");
    cardBody.classList.add("card-body","bg-dark", "border-dark");
    card.appendChild(cardBody);

    const eventTitle = document.createElement("h3");
    eventTitle.classList.add("card-title", "text-truncate-title");
    eventTitle.textContent = `${selectedMission.mission_name} `;
    cardBody.appendChild(eventTitle);

    const eventId = document.createElement("p");
    eventId.classList.add("text-muted",);
    eventId.textContent = `${selectedMission.mission_id}`;
    cardBody.appendChild(eventId);

    const details = document.createElement("p");
    details.classList.add("card-text", "text-overflow", "mt-2");
    details.textContent = selectedMission.description;
    cardBody.appendChild(details);

    const payloadList = document.createElement("div");
    payloadList.classList.add("d-flex", "flex-column", "flex-wrap", "text-truncate");
    cardBody.appendChild(payloadList);

    selectedMission.payload_ids.forEach((payloadId) => {
       const id = document.createElement("p");
      id.classList.add("card-text", "negative-margin")
      id.textContent = `${payloadId}`;
      payloadList.appendChild(id);
    });


    const buttons = document.createElement("div");
    buttons.classList.add("d-flex", "justify-content-between", "p-2");
    card.appendChild(buttons);

    const cardBtn =  document.createElement("a");
    cardBtn.classList.add("btn", "btn-dark", "border", "border-light");
    cardBtn.href = selectedMission.website;
    cardBtn.textContent ="Website";
    cardBtn.target="_blank";

    buttons.appendChild(cardBtn);


    const cardBtn2 =  document.createElement("a");
    cardBtn2.classList.add("btn", "btn-dark", "border", "border-light");
    cardBtn2.textContent ="Wikipedia";
    cardBtn2.href = selectedMission.wikipedia;
    cardBtn2.target="_blank";
    buttons.appendChild(cardBtn2);



    return card;
  });
  cardElements.forEach((card) => {
    infoCards.appendChild(card);
  });
}







(async () => {
  await getSpaceInfo(BASE_URL);
})();
