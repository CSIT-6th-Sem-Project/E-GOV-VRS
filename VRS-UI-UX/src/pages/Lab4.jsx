import { useState } from "react"

export const Lab =() => {
    const [input,SetInput] = useState("")
    const [message,setMessage] = useState("")
    const checkAlphaNumeric = (e) =>  {
        const alphaRegx = /^[a-z0-9]+$/i;
        let input = e.target.value;
        if(input.match(alphaRegx)){
            setMessage(`${input} is Alpha Numeric`)
        }else{
            setMessage(`${input} is  not Alpha Numeric`)
        }
    }
    return <>
    <div className="container-fluid">
        <div className="row">
            <div className="col-12">
                <div className="text h3 text-primary">
                    Check if Input is Alpha Numeric or not
                </div>
            </div>
            <div className="col-12 my-2">
                <label className="form-label h2">Enter your input </label>
                <input onChange={checkAlphaNumeric}className="form-control" name="input" value={input} onInput={(e)=>{SetInput(e.target.value)}}/>
            </div>
            <div className="col-12">
                <div className="text text-danger">
                {message}
                </div>
            </div>
        </div>
    </div>
    </>
}