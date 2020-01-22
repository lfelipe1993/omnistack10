module.exports = function parseStringToArray(ArrayToString){
    return ArrayToString.split(',').map(tech => tech.trim());
}