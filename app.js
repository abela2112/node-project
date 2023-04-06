const express=require('express')
const app=express()
const port=5000||process.env.PORT
// express async errors
require('express-async-errors')
require('dotenv').config()
//security
const helmet=require('helmet')
const xss=require('xss-clean')
const cors=require('cors')
const rateLimiter=require('express-rate-limit')
// connectDb
const connectDB=require('./db/coonectDB')
//routers
const auth=require('./router/auth')
const jobs=require('./router/jobs')


//middleware
const errorhandler=require('./middleware/errorhandler')
const notFound=require('./middleware/notFound')
const authorize=require('./middleware/authorization')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 100,
  message: 'You have exceeded the 100 requests in 24 hrs limit!', 
  standardHeaders: true,
  legacyHeaders: false
}))
app.use(helmet())
app.use(cors())
app.use(xss())

app.use('/api/v1/auth',auth)
app.use('/api/v1/jobs',authorize,jobs)

app.use(errorhandler)
app.use(notFound)
app.get('/',(req,res)=>{
  res.send("hello world")
})


const start =async()=>{
    await connectDB(process.env.MONGODB_URL)
    app.listen(port,()=>{
        console.log(`server is listening at port ${port}...`)
    })
}
start()

