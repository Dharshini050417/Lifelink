import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (req, res) => {    
    res.send('Server is ready');
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

// need to do user auth
