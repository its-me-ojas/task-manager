// CRUD operations

const { MongoClient, ObjectId } = require('mongodb');

const connnectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectId()
// console.log(id)
// console.log(id.getTimestamp())

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(connnectionURL);

    const db = client.db(databaseName)

    // const result = await db.collection('users').insertOne({
    //   _id: id,
    //   name: 'Bulma',
    //   age: 55
    // })

    // const result = await db.collection('users').insertMany([{
    //   name: 'May',
    //   age: 45
    // }, {
    //   name: 'Ash',
    //   age: 34
    // }])

    // const result = await db.collection('tasks').insertMany([{
    //   desc: 'Have to finish this course',
    //   completed: true
    // }, {
    //   desc: 'Write my journal',
    //   completed: false
    // }])

    // const result = await db.collection('users').find({ age: 55 }).toArray()

    // const result = await db.collection('tasks').findOne({ _id: new ObjectId("6508b5cd39de20beebc0e9ff") })
    // const result = await db.collection('tasks').find({ completed: false }).toArray()
    // console.log(result)

    // const updatePromise = await db.collection('users').updateOne({ _id: new ObjectId('6508b7c1cd9f971a5750f6b9') }, {
    //   $set: {
    //     name: 'Bulma-GT-2'
    //   },
    //   $inc: {
    //     age: 1
    //   }
    // }).then((result) => {
    //   console.log(result)
    // }).catch((error) => {
    //   console.log(error)
    // })

    // await db.collection('tasks').updateMany({
    //   completed: false
    // }, {
    //   $set: {
    //     completed: true
    //   }
    // }).then(result => {
    //   console.log(result)
    // }).catch(error => {
    //   console.log(error)
    // })

    // await db.collection('users').deleteMany({
    //   age: 55
    // }).then(result => {
    //   console.log(result)
    // }).catch(error => {
    //   console.log(error)
    // })

    await db.collection('tasks').deleteOne({
      _id: new ObjectId('6508b5cd39de20beebc0e9ff')
    }).then(result => {
      console.log(result)
    }).catch(error => {
      console.log(error)
    })

  } catch (error) {
    console.log('Unable to connect to database', error);
  }
}

connectToDatabase();

