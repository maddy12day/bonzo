export const emptyFieldCleaner = (reqBody) => {
  for (let key in reqBody) {
    if (reqBody[key] == "" || reqBody[key] == undefined) {
      delete reqBody[key];
    }
    if (Array.isArray(reqBody[key]) && reqBody[key].length > 1) {
      reqBody[key] = reqBody[key]
        .map((item) => {
          if (item.includes("All") === false) {
            return item;
          }
        })
        .join(",");
    } else if (Array.isArray(reqBody[key]) && reqBody[key].length == 1) {
      reqBody[key] = reqBody[key].map((item) => {
        if (item.includes("All") === false) {
          return item;
        }
      })[0];
    }
  }

  return reqBody;
};
