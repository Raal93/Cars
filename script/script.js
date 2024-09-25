const cars = [
  {
    id: "1",
    name: "BMW",
    model: "x5",
    productionYear: 2019,
    price: 33000,
    mileage: 66000,
    img: "./img/bmw-x5.webp",
    inGarage: true,
  },
  {
    id: "2",
    name: "Toyota",
    model: "Corolla",
    productionYear: 2020,
    price: 20000,
    mileage: 30000,
    img: "./img/toyota-corolla.webp",
    inGarage: true,
  },
  {
    id: "3",
    name: "Ford",
    model: "F-150",
    productionYear: 2018,
    price: 29000,
    mileage: 95000,
    img: "./img/ford-f-150.webp",
    inGarage: false,
  },
  {
    id: "4",
    name: "Volkswagen",
    model: "Golf",
    productionYear: 2021,
    price: 22000,
    mileage: 15000,
    img: "./img/volkswagen-golf.webp",
    inGarage: true,
  },
  {
    id: "5",
    name: "Mercedes-Benz",
    model: "C-Class",
    productionYear: 2019,
    price: 35000,
    mileage: 40000,
    img: "./img/mercedes-benz-c-class.webp",
    inGarage: false,
  },
  {
    id: "6",
    name: "Honda",
    model: "Civic",
    productionYear: 2022,
    price: 21000,
    mileage: 10000,
    img: "./img/honda-civic.webp",
    inGarage: true,
  },
];

const display = (cars) => {
  document.getElementById("cards-container").innerHTML = "";
  cars.forEach((car) => {
    const card = document.createElement("div");
    card.classList.add("car-card");
    card.innerHTML = createCard(car);
    document.getElementById("cards-container").appendChild(card);
  });
};

const createCard = (car) => `
  <div class="img-container">
    <img class="car-img" src="${car.img}"/>
  </div>
  <div class="text-container">
    <span class="name">${car.name} ${car.model} prod. ${car.productionYear}</span>
    <span class="mileage">mileage: ${car.mileage}</span>
    <span class="price">Price: ${car.price}</span>
    <span class="inGarage garage-${car.inGarage ? "green" : "red"}">${car.inGarage ? "In the garage" : "Currently not avaliable"}</span>
    <button name="delCarBtn" id="deleteCar_${car.id}" class="delete" onClick="deleteCar(${car.id})">Delete car</button>
    <button id="showEditOptions" class="delete position2" onClick="showEditOptions(${car.id})">Edit car >></button>
    <div class="editCar" id="editCar${car.id}">
      <label>Pick property to edit:</label>
      <select id="keySelect${car.id}">${Object.keys(car).map((key) => `<option value="${key}" name="${key}Property">${key}</option>`)}</select>
      <label>Tap a new value:</label>
      <input type="text" id="newValue${car.id}"/>
      <button class="addBtn" id="saveProperyBtn" onClick="handlePropertyEdit(${car.id})">Save</button>
    </div>
  </div>
  `;

const showEditOptions = (productID) => {
  const element = document.getElementById(`editCar${productID}`);
  if (element.classList.contains("enabled")) element.classList.remove("enabled");
  else element.classList.add("enabled");
};

const handlePropertyEdit = (productID) => {
  const editedKey = document.getElementById(`keySelect${productID}`).value;
  const newValue = document.getElementById(`newValue${productID}`).value;

  const arrayID = cars.findIndex((car) => +car.id === productID);

  cars[arrayID][editedKey] = typeof cars[arrayID][editedKey] === "boolean" ? Boolean(newValue) : newValue;

  display(cars);
};

const sort = (sortType) => {
  switch (sortType) {
    case "priceAsc":
      cars.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      cars.sort((a, b) => b.price - a.price);
      break;
    case "yearAsc":
      cars.sort((a, b) => a.productionYear - b.productionYear);
      break;
    case "yearDesc":
      cars.sort((a, b) => b.productionYear - a.productionYear);
      break;
    case "milageAsc":
      cars.sort((a, b) => a.mileage - b.mileage);
      break;
    case "milageDesc":
      cars.sort((a, b) => b.mileage - a.mileage);
      break;
    default:
      console.log("Didn't found given sorting type");
  }
  display(cars);
};

const countCars = () => {
  document.getElementById("howManyCars").textContent = cars.length;
};

const search = (str) => {
  const newCars = cars.filter((car) => {
    if (car.name.toLocaleLowerCase().includes(str.toLocaleLowerCase()) || car.model.toLocaleLowerCase().includes(str.toLocaleLowerCase())) return car;
  });

  display(newCars);
};

const addNewCar = () => {
  const newCar = {
    id: Math.max(...cars.map((car) => car.id)) + 1,
    name: document.getElementById("name").value,
    model: document.getElementById("model").value,
    productionYear: document.getElementById("productionYear").value,
    mileage: document.getElementById("mileage").value,
    price: document.getElementById("price").value,
    inGarage: document.getElementById("inGarage").value === "true" ? true : false,
    img: "./img/standard-car.webp",
  };

  cars.push(newCar);
  countCars();
  display(cars);
};

const deleteCar = (productID) => {
  const arrayID = cars.findIndex((car) => +car.id === productID);
  cars.splice(arrayID, 1);
  countCars();
  display(cars);
};

const addProperty = () => {
  const newProperty = document.getElementById("newProperty").value.split(" ").join("");
  cars.map((car) => (car[newProperty] = null));
  display(cars);
};

document.getElementById("sort").addEventListener("change", (e) => {
  sort(e.target.value);
});
document.getElementById("search").addEventListener("input", (e) => search(e.target.value));
document.getElementById("addNewCar").addEventListener("click", addNewCar);
document.getElementById("addProperty").addEventListener("click", addProperty);

{
  display(cars.sort((a, b) => a.price - b.price));
  countCars();
}
