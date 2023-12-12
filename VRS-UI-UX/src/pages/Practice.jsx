import {useState} from "react";


export const Test = () => {

    const[form,setForm] = useState(
        {
            name:"",
            phone:"",
            email:"",
            age:"",

        }
    )

    const[error,setError] = useState(
        {
            error_name:"",
            error_age:"",
            error_phone:"",
            error_email:"",
        }
    )

    const handleForm = (e) => {
     const {name,value} = e.target;
     setForm({
        ...form,
        [name]:value
     })   
    }

    const validateForm = (e) => {
        e.preventDefault();
        if(form.name.isEmpty || !form.name.match(/^[a-zA-Z]+ [a-zA-Z]+$/)){
            alert("enter a valid name");    
        }
    }

    return <>
    
        <div>
            <form onSubmit={validateForm}>
                <label>Name:</label>
                <input name="name" type="text" onInput={handleForm}/>
                 <br></br>
                <label>Phone:</label>
                <input type="submit"/>
            </form>
        </div>
    
    </>
}