require('../src/db/mongoose')
const Task = require('../src/models/task')

// 650df9940255744f1344ef95

// Task.findByIdAndDelete('650df9940255744f1344ef95').then(task => {
//   console.log(task)
//   return Task.countDocuments({ completed: false })
// }).then(result => {
//   console.log(result)
// }).catch(e => {
//   console.log(e)
// })

const deleteTaskAndCount = async id => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed: false })
  return count
}

deleteTaskAndCount('650df9c80255744f1344ef97').then(count => {
  console.log(count)
}).catch(e => {
  console.log(e)
})
