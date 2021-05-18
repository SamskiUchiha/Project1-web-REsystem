import {useState, useEffect} from 'react';
import axios from 'axios';

import {useHistory} from "react-router-dom";

const LoginForm = () => {
    const history = useHistory();
    const [userNameText, setUserNameText] = useState("");
    const [passwordText, setPasswordText] = useState("");

  useEffect( () => {
    console.log("username: " +  userNameText );
  }, [userNameText])

  useEffect( () => {
    console.log("password: " + passwordText);
  }, [passwordText])

  function handleSubmit(e:any) {
    e.preventDefault();

    axios({
        method: 'post',
        url: 'http://localhost:7000/login',
        data: {
            username: userNameText,
            password: passwordText
        },
        headers : {
            'Content-Type': 'application/json'
        }
    }).then(response =>{
        if(response.status === 200) {
            alert(userNameText + " Welcome!");
            axios.get("http://localhost:7000/employee/" + userNameText).then(r =>{
                console.log(r.data);
                
                history.push("/employee-home");
            })

        } else if (response.status === 401){
            alert("Username and password is invalid!");
        }
        console.log(response);
    }).catch(err =>{
        console.log(err);
    })


  }
  return(
    <form onSubmit={handleSubmit}>
      <input type = "text" 
        placeholder = "Username" 
        onChange = {e => setUserNameText(e.target.value)
        }/>
      <input type = "password"
        placeholder ="Password"
        onChange = {e => setPasswordText(e.target.value)
        } />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm;