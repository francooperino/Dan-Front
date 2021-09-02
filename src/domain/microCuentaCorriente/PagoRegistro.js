import React from 'react';

const PagoRegistro = () => {
    return(
        <div className="fondo">
       <div className="center">
        <ul class="form-register">
            
            <h4 id ="myh4">Registrar Pago</h4>
            <input class="controls" type="text" placeholder="Cliente"/>
            <input class="controls" type="float" placeholder="$00.00"/>
            <input className="controls" type="date"  ></input>
            <select class="select" name="Tipo de usuario">
                <option value="value1">Efectivo</option>
                <option value="value2" selected>Cheque</option>
                <option value="value2" selected>Transferencia</option>
            </select>
            <input class="botons" type="submit" value="Registrar"/>
        </ul>
        </div>
        </div>
    )
}

export default PagoRegistro;