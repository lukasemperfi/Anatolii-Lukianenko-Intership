import { faker } from '@faker-js/faker';

import { db } from '../db/db.js';

export const createFakeUser = () => {
    const name = faker.name.firstName()

    return {
        email: faker.internet.email(name),
        name,
        age: faker.datatype.number({ min: 18, max: 80 })
    }
}

export const createTableRows = (count = 1, row) => {
    const res = []

    for (let i = 0; i < count; i++) {
        res.push(createFakeUser(row))
    }

    return res
}

export const getAvgUsersAge = async () => {
    const users = await db('users').select("name")
        .where('age', '>',
            db('users').avg('age')
        )
    return users
}