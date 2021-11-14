
import fs from "fs";
import moment from "moment";

// info logger function ex. api url
export const infoLogger = (req, res, next) => {
  
  next();
};

// log error handler
export const errorLogger = (error, req, res, next) => {
  console.log(error);
    
  next();
};
