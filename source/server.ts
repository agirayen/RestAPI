import http from 'http';
import express , { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/posts';

const router: Express = express();

//logging
router.use(morgan('dev'));
//parse request
router.use(express.urlencoded({ extended: false}))
//takecare json data
router.use(express.json());

//API
router.use((req,res,next) => {
    // set cors policy
    res.header('Access-Control-Allow_Origin','*');
    //set cors header
    res.header('Access-Control-Allow_Headers','origin, X-Requested-With,Content-Type,Accept, Authorization');
    //set cors method head
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','GET PATCH DELETE POST')
        return res.status(200).json({})
        
    }
    next();
})
//ROutes
router.use('/',routes)


//error handling
router.use((req,res,next)=> {
    const error = new Error('not found');
    return res.status(404).json({
        message:error.message
    })
})
//server
const httpServer= http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT,()=>console.log(`The server is running on port ${PORT}`));