require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const levelRoutes = require('./routes/level_routes');
const userLevelRoutes = require('./routes/user_level_routes');
const routerRoutes = require('./routes/user_routes');


app.use(express.json());
app.use(cors());

app.use('/api/level', levelRoutes);
app.use('/api/userLevel', userLevelRoutes);
app.use('/api/user', routerRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in the port ${PORT}`);
});
