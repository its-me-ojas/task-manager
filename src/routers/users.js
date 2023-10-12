const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const Task = require('../models/task')
const multer = require('multer')
const sharp = require('sharp')

router.post('/users', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send()
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send({ message: 'User logged out' })
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send({ message: 'Logged Out Of All Sessions' })
  } catch (e) {
    res.status(500).send()
  }

})

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      cb(new Error('Upload can only be of type jpg,jpeg or png'))
    } else {
      cb(undefined, true)
    }
  }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send({ message: 'successful' })
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send({ message: 'Deleted avatar' })
})

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user || !user.avatar) {
      throw new Error()
    }
    res.set('Content-Type', 'image/png')
    res.send(user.avatar)

  } catch (e) {
    res.status(404).send()
  }
})

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' })
  }

  try {
    updates.forEach(update => req.user[update] = req.body[update])
    await req.user.save()
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})


router.delete('/users/me', auth, async (req, res) => {
  try {
    // console.log(1)
    await Task.deleteMany({ owner: req.user._id })
    // console.log(req.user)
    // const tasks = await Task.findMany({ owner: req.user._id })
    // console.log(4)
    // console.log(tasks)
    // await req.user.remove()
    // console.log(2)
    await User.deleteOne({ _id: req.user._id })
    res.send({})
  } catch (e) {
    console.log(e)
    res.status(500).send()
  }
})

module.exports = router
