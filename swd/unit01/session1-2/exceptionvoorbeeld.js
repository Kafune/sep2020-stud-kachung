function getName(name){
    if(name === "") {
        throw new Error("Empty String");
    }
    return name;
}

function tussenFunctie(name) {
    let naam = getName(name)
    console.log("test")
    return naam
}

const names = ["AIM", "", "HAN"]

try {
for(const name of names) {
    console.log(tussenFunctie(name))
} catch(error) {
    console.log(error.message)
}
}