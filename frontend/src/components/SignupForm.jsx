import React, {useState} from "react"

const SignupForm = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone_number,setPhoneNumber] = useState("")
    const [department,setDepartment] = useState("") 


    const onSubmit = () => {
        const payload = JSON.stringify({name, email, password,phone_number,department})
        
        fetch("http://localhost:1002/register", {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : payload
        })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
    return (
        <div>
            <h1>Register</h1>
            <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)}/>
            <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
            <input type="text" placeholder="phone_number" onChange={(e) => setPhoneNumber(e.target.value)}/>

            <input type="text" placeholder="department" onChange={(e) => setDepartment(e.target.value)}/>

            <button onClick={onSubmit}>Signup</button>
        </div>
    )
}

export default SignupForm