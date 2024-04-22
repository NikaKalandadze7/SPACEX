const BASE_URL = "https://api.spacexdata.com/v3";
const infoCards = document.getElementById("infoCards");
let data;

const getSpaceInfo = async() => {
  await axios.get(
    `${BASE_URL}/payloads`
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
  const cardElements = data.map((selectedPayload) => {
    const card = document.createElement("div");
    card.classList.add("card", "border-dark", "m-3",  "card-small");

    const cardBody =  document.createElement("div");
    cardBody.classList.add("card-body","bg-dark", "border-dark");
    card.appendChild(cardBody);

    const payloadName = document.createElement("h5");
    payloadName.classList.add("card-title");
    payloadName.textContent = `${selectedPayload.payload_id} `;
    cardBody.appendChild(payloadName);

    const manufacturer = document.createElement("p");
    manufacturer.textContent = `Manufacturer: ${selectedPayload.manufacturer}`;
    cardBody.appendChild(manufacturer);

    const payloadInfo = document.createElement("ul");
    payloadInfo.classList.add("list-group", "list-group-flush");
    card.appendChild(payloadInfo);

    const customers = document.createElement("li");
    customers.classList.add("list-group-item", "bg-dark",);
    customers.textContent = `Customers: ${selectedPayload.customers}`;
    payloadInfo.appendChild(customers);

    const payloadType = document.createElement("li");
    payloadType.classList.add("list-group-item", "bg-dark",);
    payloadType.textContent = `Payload Type: ${selectedPayload.payload_type}`;
    payloadInfo.appendChild(payloadType);

    const nationality = document.createElement("li");
    nationality.classList.add("list-group-item", "bg-dark",);
    nationality.textContent = `Nationality: ${selectedPayload.nationality}`;
    payloadInfo.appendChild(nationality);

    return card;
  });
  cardElements.forEach((card) => {
    infoCards.appendChild(card);
  });
}




(async () => {
  await getSpaceInfo(BASE_URL);
})();

