const mongoose =require ('mongoose');
const dotenv =require('dotenv');

//const uri =process.env.URI_MONGODB;
const uri = `mongodb+srv://beki:1234@cluster0.10vmw.mongodb.net/Book-Club`

const connectDB= async() => {
    try {
        await mongoose.connect(uri)
        .then(() => console.log("established a connection to the database"))
        .catch(err => console.log("something went wrong when connecting to the database",err));
     }catch (error) {
        console.error('erreur de connexion a MongoDB :', error.message);
        process.exit(1); // arrete le processus si ma connexion echoue
     }
};
module.exports= connectDB;