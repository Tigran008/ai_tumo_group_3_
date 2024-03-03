import {passwordHash } from "@/app/users"
import {connectToDatabase} from "../../../db"
import User from "@/models/User"

export async function POST(request) {
    await connectToDatabase()

    const data  = await request.json()
    const email = data.email
    const password = data.password
    const address = data.address
    const age = data.age
    const name = data.name

    const user = await User.findOne({email: data.email})
    console.log(user)
    if (user) {
        return Response.json({
            status: 404,
            message: "User already exists"
        })
    }

    const newUser = new User({
        name,
        email,
        password: passwordHash(password),
        address,
        age,
        token: passwordHash(`${email}:${password}`)
    })

    newUser.save()


    return Response.json({
        token: passwordHash(`${email}:${password}`)
    })
}

