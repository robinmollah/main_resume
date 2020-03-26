let ip = "255.0.55.255";

let hexas = ip.split(".").map(value => parseInt(value).toString(16)).join("-");
console.log(hexas);