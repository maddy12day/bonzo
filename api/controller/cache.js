import memcached from "memcached";

const memcachedConnection = new memcached("localhost:11211", {
  retries: 10,
  retry: 10000,
  remove: true,
});

export const regularFilterDropdownData = async (req, res) => {
  try {
    memcachedConnection.getMulti(
      [
        "productSource",
        "brandType",
        "lifeCycle",
        "newness",
        "brands",
        "channels",
        "subChannels",
        "categories",
        "collections",
      ],
      (err, data) => {
        res.status(200).send({
          response: {
            productSource: JSON.parse(data.productSource),
            brandType: JSON.parse(data.brandType),
            lifeCycle: JSON.parse(data.lifeCycle),
            newness: JSON.parse(data.newness),
            brands: JSON.parse(data.brands),
            channels: JSON.parse(data.channels),
            subChannels: JSON.parse(data.subChannels),
            categories: JSON.parse(data.categories),
            collections: JSON.parse(data.collections),
          },
        });
      }
    );
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};
export const programFilterDropdownData = async (req, res) => {
  try {
    memcachedConnection.getMulti(
      [
        "programSource",
        "programType",
        "programLifeCycle",
        "programNewness",
        "programbrands",
        "programCollabs",
        "programChannels",
        "programSubChannels",
        "programCategories",
        "programClasses",
        "programSubClasses",
        "programCollections",
      ],
      (err, data) => {
        res.status(200).send({
          response: {
            programSource: JSON.parse(data.programSource),
            programType: JSON.parse(data.programType),
            programLifeCycle: JSON.parse(data.programLifeCycle),
            programNewness: JSON.parse(data.programNewness),
            programbrands: JSON.parse(data.programbrands),
            programCollabs: JSON.parse(data.programCollabs),
            programChannels: JSON.parse(data.programChannels),
            programSubChannels: JSON.parse(data.programSubChannels),
            programCategories: JSON.parse(data.programCategories),
            programClasses: JSON.parse(data.programClasses),
            programSubClasses: JSON.parse(data.programSubClasses),
            programCollections: JSON.parse(data.programCollections),
          },
        });
      }
    );
  } catch (error) {
    res.send(500).send({
      message: error,
    });
  }
};
// display all options for first load without any selection
export const filterAllOptions = async (req, res) => {
  try {
    memcachedConnection.getMulti(
      ["allRegularFilters", "allProgramFilters"],
      (err, data) => {
        res.status(200).send({
          response: {
            regular: JSON.parse(data.allRegularFilters),
            program: JSON.parse(data.allProgramFilters),
          },
        });
      }
    );
  } catch (error) {
    res.status(500).send({
      error: new Error(error),
    });
  }
};