const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const authRoutes = require('./routes/authRoutes'); 

dotenv.config();

const app = express();

const connectDB = async () => {
    try{
         await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
         });
         console.log('MongoDB connected...');
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
};
connectDB();

app.use(express.json({ extended: false })); 
app.use(cors()); 

app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => res.send('API Running'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
