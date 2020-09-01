function whichCar() {
    return {brand: "toyota", type:"auris"}
}

const brand = whichCar().brand;

const {brand, type} = whichCar();

console.log(brand);

