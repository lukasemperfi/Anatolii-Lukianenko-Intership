import { writeFile } from "fs";
import axios from "axios";
import fs from "fs";

const writeJSONtoFile = (data, path) => {
  let dataJson = JSON.stringify(data);

  writeFile(path, dataJson, "utf8", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Data written to file");
  });
};

const saveResponseToFile = async () => {
  const response = await axios("https://jsonplaceholder.typicode.com/users");

  writeJSONtoFile(response.data, "users.json");
};
