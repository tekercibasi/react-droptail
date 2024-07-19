const express = require('express');
const nano = require('nano')('http://admin:YOURPASSWORD@localhost:5984');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const cocktailsRouter = require('./routes/cocktails');
const ordersRouter = require('./routes/orders');

app.use('/api/cocktails', cocktailsRouter);
app.use('/api/orders', ordersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
