const express = require('express');
const PORT = process.env.PORT || 8080;
const userRouter = require('./routes/userRouter');
const orderRouter = require('./routes/orderRouter');
const itemRouter = require('./routes/itemRouter');

const app = express();

app.use(express.json());
app.use('/api', userRouter)
app.use('/api', orderRouter)
app.use('/api', itemRouter)

app.listen(PORT, () => console.log('working ' + PORT));