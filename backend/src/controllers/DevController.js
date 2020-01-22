const axios = require('axios');
const Dev = require('../models/dev');
const parseStringToArray = require('../Utils/parseStringToArray');
const { findConnections, sendMessage } = require('../websocket');

//index,show,store,update,destroy

module.exports = {
    async index(request,response){
        const devs = await Dev.find();

        return response.json(devs);
    },
    async store(request,response) {
        const {github_username,techs, latitude,longitude} = request.body;
    
        let dev = await Dev.findOne({github_username});

        if(!dev){

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
        const {name = login, avatar_url, bio} = apiResponse.data;
    
        const techsArray = parseStringToArray(techs);
    
        const location = {
            type: 'Point',
            coordinates: [longitude,latitude],
        };
    
        const dev = await Dev.create({
           github_username,
           name,
           avatar_url,
           techs: techsArray, 
           location,    
        })
    
        //console.log(name, avatar_url, bio)

        //Filtrar as conexoes que estao a no max 10KM
        //e que o novo dev tenha ao menos 1 tech filtrada

        const sendSocketMessageTo = findConnections(
            {latitude, longitude },
            techsArray,
        )

        sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

        return response.json(dev);
    }
}