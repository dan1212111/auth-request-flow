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
  if (
    req.body.username === mockUser.username &&
    req.body.password === mockUser.password
  ) {
    const payload = {
      username: mockUser.username,
      age: mockUser.profile.age,
      fred: "bob",
    }

    const token = jwt.sign(payload, secret)
    res.json({ token })
  } else {
    res.status(400)
    res.json({ error: "invalid credentials" })
  }
})

router.get("/profile", (req, res) => {
  const authorisation = req.headers["authorization"]
  const parts = authorisation.split("")
  const token = parts[1]
  try {
    const payload = jwt.verify(token, secret)
    res.json({ profile: mockUser.profile })
  } catch (e) {
    res.status(401)
    res.json({ error: "token not valid" })
    return
  }
  res.json({ test: true })
})

module.exports = router

// 1. Create a new JWT; the payload should be an object containing the mock user's username.
//     - Don't worry about working with credentials right now.
// 2. Send the JWT back to the client in a JSON response.
