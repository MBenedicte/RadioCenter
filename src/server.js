import 'dotenv/config';
import express from 'express';
import { OK, NOT_FOUND, SERVER_ERROR } from './constants/statusCodes';

const app = express();

app.use(express.urlencoded({ extended: false, limit: '3mb'}));
app.use(express.json({ limit: '3mb'}));

app.get('/', (req, res)=> res.json({
    status: OK, 
    message: 'Welcome to our web api!!!'
}));

app.use('*', (req, res) =>{
    const status = NOT_FOUND;
    const message = `Route ${req.url} is not found`;
    res.status(status).json({
        status, message
    })
})

app.use( (err, req, res) => {
    const status = err.statusCode || SERVER_ERROR;
    const message = err.message || 'Internal Server Error';

    res.status(SERVER_ERROR).json({
        status, message
    })
});

const port = process.env.PORT;

app.listen(port, ()=> console.log(`App is running on ${port}`));

export default app;
