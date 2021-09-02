import './Login.css';
import React, {useState} from 'react';
import { useHistory } from "react-router-dom";


const Login = () => {
    const history = useHistory();
    const [form, setValues] = useState({
        mail:'',
    });

    const handleInput = event=>{
        setValues({
            ...form,
            [event.target.name]:event.target.value,
        })
    };

    const handleSubmit = event =>{
        event.preventDefault();
        console.log(form);
    }
    return(
        <div className="fondo">
       <div className="center">
        <form class="form-register" onSubmit={handleSubmit}>
            
            <h4 id ="myh4">Iniciar sesión</h4>
            <input name="mail" class="controls" type="text" placeholder="Usuario" onChange={handleInput}/>
            <input name="password" class="controls" type="password" placeholder="*******" onChange={handleInput}/>
            <select class="select" name="Tipo de usuario" onChange={handleInput}>
                <option value="cliente">Cliente</option>
                 <option value="empleado" selected>Empleado</option>
            </select>
            <button class="botons" type="submit" value="ingresar" onClick={()=>history.push("/empleado")}/>
        </form>
        </div>
        </div>
        
    )
}

export default Login;