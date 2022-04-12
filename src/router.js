/** @format */

const express = require("express")
const jwt = require("jsonwebtoken")

const router = express.Router()

const mockUser = {
  username: "authguy",
  password: "mypassword",
  profile: {
    firstName: "Chris",
    lastName: "Wolstenholme",
    age: 43,
  },
}

router.post("/login", (req, res) => {
  const token = jwt.sign({ username: mockUser.username }, "secret")
  res.json({ token })
})

router.get("/profile", (req, res) => {
  const token = req.headers["authorization"]
  try {
    const payload = jwt.verify(token, secret)
    res.json({profile: mockUser.profile})
  } catch (e) {
    res.status(401)
    res.json({error: 'token not valid'})
    return
  }
  res.json({ test: true })
})

module.exports = router

// 1. Create a new JWT; the payload should be an object containing the mock user's username.
//     - Don't worry about working with credentials right now.
// 2. Send the JWT back to the client in a JSON response.
