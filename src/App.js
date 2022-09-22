import React, { useEffect, useState } from "react"
import AddFakeUser from "./components/add-fake-user/AddFakeUser"
import FakeTable from "./components/fake-table/FakeTable"

export default function App() {
  const [fakeUsers, setFakeUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const postFakeUser = async (userInfo) => {
    setError(false)
    setLoading(true)
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })

      if (!res.ok) throw new Error("Couldn't Post the User")

      const user = await res.json()

      setTimeout(() => {
        setLoading(false)

        setFakeUsers((prevFakeUsers) => [user, ...prevFakeUsers])
      }, 1000)
    } catch (err) {
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    const getFakeUsers = async () => {
      setError(false)
      setLoading(true)
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users")
        if (!res.ok) throw new Error("Couldn't find users")

        const users = await res.json()

        setTimeout(() => {
          setLoading(false)
          if (users.length === 0) return
          setFakeUsers(users)
        }, 1000)
      } catch (err) {
        setError(true)
        setLoading(false)
      }
    }
    getFakeUsers()
  }, [])

  return (
    <div className="container">
      <FakeTable fakeUsers={fakeUsers} loading={loading} error={error} />
      <AddFakeUser
        postFakeUser={postFakeUser}
        loading={loading}
        error={error}
      />
    </div>
  )
}
