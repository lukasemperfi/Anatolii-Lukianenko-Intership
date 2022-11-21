import { db } from "../db/db.js";

//Selects, joins, groupping, sorting, having
export const getUsersId = async () => {
  const users = await db.select("id").from("users");

  return users;
};

//joins
const joinedTaskTitleAndUsersId = async () =>
  await db("users")
    .join("task", "users.id", "task.user_id")
    .select("users.id", "task.title");

const innerJoinedUserAndTask = async () =>
  await db.from("users").innerJoin("task", "users.id", "task.user_id");

const leftJoinedUserAndTask = async () =>
  await db.from("users").leftJoin("task", "users.id", "task.user_id");

const rightJoinedUserAndTask = async () =>
  await db.from("users").rightJoin("task", "users.id", "task.user_id");

const crossJoinedUsersAndTask = async () =>
  await db.from("users").crossJoin("task");

//groupping
const groupping = async () => await db("task").groupBy("completed");

//sorting
const sorting = async () => await db("users").orderBy("age", "asc");

//having
const having = async () =>
  await db("users")
    .select(db.raw("count(id)"), "age")
    .groupBy("age")
    .having(db.raw("count(id) > 1"));
