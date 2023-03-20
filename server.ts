import app from "./app";

let HOST_NAME:string|undefined =  process.env.HOST_NAME;
let PORT:number|undefined = Number(process.env.PORT);

if(PORT !== undefined && HOST_NAME !== undefined){
    app.listen(PORT, HOST_NAME, () => {
        console.log(`Express Server is running at ${HOST_NAME}:${PORT}`);
    });
}

module.exports = app;