import _ from 'lodash';
import path from 'path';
import Promise from 'bluebird';
import express from 'express';


export default {
    config:{},
    handlers:{},
    responders:{},
    initialize(){
        this.loadConfigs();
    },
    loadConfigs(){
        
    },
    loadAdapters(){
        return Promise.bind(this)
        .then(_ => {
            
        })
    }
}

const app = express();

const port  = 3000;

app.get("/",(req,res,next)=>{
    res.send("TESTE 20")
})


app.get("/error",(req,res,next)=>{
    res.send(new NotFoundError("user jasilva17"))
})

app.listen(port,()=>{
    console.log(`Started in port ${port}`);    
});

export default app;
