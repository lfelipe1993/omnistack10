const Dev = require('../models/dev');
const parseStringToArray = require('../Utils/parseStringToArray');

module.exports = {
    async index(request,response){
        const {latitude,longitude,techs} = request.query;

        const techsArray = parseStringToArray(techs);

        console.log(techsArray);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location:{
                $near:{
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude,latitude],
                    },
                    $maxDistance: 10000,
                }
            }
        })
        

        return response.json({devs})
    }
}