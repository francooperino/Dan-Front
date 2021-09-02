
import React from 'react';

const PedidoEmpleado = () => {
    return(
        <div className="fondo">
       <div className="center">
        <ul class="form-register">
            
            <h4 id ="myh4">Registrar Pedido</h4>
            <input class="controls" type="text" placeholder="Ingrese el nombre del cliente"/>
            <input class="controls" type="text" placeholder="Ingrese Direccion de la Obra"/>
            <input className="controls" type="date"  ></input>
            <div class="asd">
             <input id="latlong" type="text" maxlength="10" placeholder="Material"></input>
             <input id="latlong" type="float" maxlength="10" placeholder="Cantidad"></input>
             <input class="botons" type="submit" value="Agregar al carrito"/>
            </div>
            <table >
            <tr>
                <th>Cliente</th>
                <th>Material</th>
                <th>Cantidad</th>
                <th>Fecha</th>
                <th>Obra</th>
            </tr>
            <tr>
                <td>Dato 1.1</td>
                <td>Dato 1.2</td>
                <td>Dato 1.3</td>
                <td>Dato 1.4</td>
                <td>Dato 1.5</td>
            </tr>
            <tr>
                <td>Dato 2.1</td>
                <td>Dato 2.2</td>
                <td>Dato 2.3</td>
                <td>Dato 2.4</td>
                <td>Dato 2.5</td>
            </tr>
        </table>

            <input class="botons" type="submit" value="Enviar Pedido"/>
        </ul>
        </div>
        </div>
    )
}

export default PedidoEmpleado;