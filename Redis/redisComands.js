import express from "express";
import redis from "redis";

const app = express();

const PORT = 5000;

const client = redis.createClient();

const connectRedis = async () => {
  await client.connect();
};

client.on("connect", async () => {
  console.log("You are connected to the Redis server");
});

client.on("error", (err) => {
  console.log("Error " + err);
});

//Redis
const storeData = async () => {
  await client.set("name", "Simon");
};

const storeDataTtl = async () => {
  await client.set("phone", "12345", {
    EX: 10,
    NX: true,
  });
};

const getData = async () => {
  return await client.get("name");
};

const delData = async () => {
  await client.del("name");
};
/////////////////////////////////////////

//List
const storeListData = async () => {
  await client.lPush("friends", ["john", "frank", "kamina"]);
};

const getListData = async () => {
  return await client.lRange("friends", 0, 1);
};
/////////////////////////////////////////

//SetList
const storeSetListData = async () => {
  await client.sAdd("hobbies", "football");
};

const getSetListData = async () => {
  return await client.sMembers("hobbies");
};

const deleteFromSetListData = async () => {
  return await client.sRem("hobbies", "football");
};
/////////////////////////////////////////

//Hset
const storeHsetData = async () => {
  await client.hSet("info", {
    name: "kamina",
    quote:
      "Don't believe in yourself. Believe in me! Believe in the Kamina who believes in you!",
  });
};

const getHsetData = async () => {
  return await client.hGetAll("info");
};

const delHsetData = async () => {
  await client.hDel("info", "name");
};
/////////////////////////////////////////

app.listen(PORT, async () => {
  console.log(`Server started on ${PORT}`);
  await connectRedis();
});
