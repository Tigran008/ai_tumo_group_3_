import {passwordHash } from "@/app/users"
import {connectToDatabase} from "../../../db"
import User from "@/models/User"

export async function POST(request) {
    await connectToDatabase()
    // get login and password from request body
    // check user in out db
    // validate password 
    // return jwt token

    const data  = await request.json()

    console.log(data);

    const user = await User.findOne({email: data.login})

    if (!user) {
        return Response.json({
            status: 404,
            message: "User not defined"
        })
    }

    if (user.password !== passwordHash(data.password)) {
        return Response.json({
            status: 400,
            message: "Bad request"
        })
    }


    const token = passwordHash(`${user.id}${user.login}:${user.password}`)

    return Response.json({
        token: token
    })
}

