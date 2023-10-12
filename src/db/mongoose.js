const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true // Use this instead of useCreateIndex
})

