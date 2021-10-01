var ethAirBalloons = require('ethairballoons');
var path = require('path');
var savePath = path.resolve(__dirname + '/contracts');

var ethAirBalloonsProvider = ethAirBalloons('http://localhost:8545', savePath);
//ethereum blockchain provider URL, path to save auto generated smart contracts

var Car = ethAirBalloonsProvider.createSchema({
    name: "Car",
    contractName: "carsContract",
    properties: [
        {
            name: "model",
            type: "bytes32",
            primaryKey: true
        },
        {
            name: "engine",
            type: "bytes32",
        },
        {   name: "cylinders",
            type: "uint"
        }
    ]
});

Car.deploy(function (success, err) {
    if (!err) {
        console.log('Deployed successfully');
    }
    else {
      console.log(err);
    }
});
