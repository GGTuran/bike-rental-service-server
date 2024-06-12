import { Server } from "http";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

let server:Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Server should run on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();

process.on('unhandledRejection', () =>{
  console.log(`UnhandledRejection is detected,shutting down.....`);
  if(server){
    server.close(() =>{
      process.exit(1);
    });
  }
  process.exit(1);
});


process.on('uncaughtException',()=>{
  console.log(`uncaughtexception is detected,shutting down.......`);
  process.exit(1);
});

// console.log(config.port, config.database_url);