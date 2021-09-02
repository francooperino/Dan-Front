import React from 'react';

const EmitirOrden = () => {
    return(

        <ul className="form-register">
            
            <h4 id ="myh4">Crear Orden</h4>
            <input className="controls" type="text" placeholder="Material"/>
            <input className="controls" type="float" placeholder="Cantitad"/>
            <select className="select" name="Proveedor">
                <option value="value1">Proveedor 1</option>
                 <option value="value2" selected>Proveedor 2</option>
            </select>
            <input className="botons" type="submit" value="Enviar"/>
        </ul>

    )
}

export default EmitirOrden;