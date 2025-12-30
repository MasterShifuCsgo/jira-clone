import express from 'express'

const PORT = process.env.PORT

const app = express()



app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`)
}).on('ERROR', (err) => {
  console.log(err)
})
