const mongoose=require('mongoose');
const cities=require('./cities');
const Campground=require('../models/campground');
const {places,descriptors}=require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true, useUnifiedTopology: true,
    useUnifiedTopology:true
});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
})

const sample= array=>
    array[Math.floor(Math.random()* array.length)];


const seedDB= async()=>{
    await Campground.deleteMany({ });
    for(let i=0;i< 50;i++){
        const random1000=Math.floor(Math.random()*1000);
        const price= Math.floor(Math.random()*30)+1;
        const camp=new Campground({
            author:'5ffacdadb626322fc45184c8',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            geometry:{coordinates:[
                cities[random1000].longitude,
                cities[random1000].latitude,
                ],type:"Point"},
            description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error provident voluptatibus accusantium atque unde, quibusdam nemo. Placeat veniam commodi assumenda aliquam fuga quod error, impedit minus itaque tenetur ex consequatur.',
            price:price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dei6lfoqo/image/upload/v1610530704/YelpCamp/muhp5dfjyfl23gqwzoby.png',
                  filename: 'YelpCamp/muhp5dfjyfl23gqwzoby'
                },
                {               
                  url: 'https://res.cloudinary.com/dei6lfoqo/image/upload/v1610530705/YelpCamp/anhx2jekfe2goweers69.png',
                  filename: 'YelpCamp/anhx2jekfe2goweers69'
                }
              ]
        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
})

