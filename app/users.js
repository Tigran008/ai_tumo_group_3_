import md5 from "md5"

export const passwordHash = (password) => {
    return md5(password)
}

export const Users = [
    {
        id: 1,
        login: "Tigran",
        password: passwordHash("1234"),
        name: "Tigran"
    }
]