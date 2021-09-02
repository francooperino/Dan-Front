
import React from 'react';
import Grid from '@material-ui/core/Grid';
import  './ProductoAlta.css';

const ProductoAlta = () => {
    return(

        <ul className="form-register">
            
            <h4 id ="myh4">Registrar Producto</h4>
            
            <Grid container direction="row" id="container">
                <Grid item id="asd">
                <input className="controls" type="text" placeholder="Nombre" />
                <input className="controls" type="float" placeholder="$00.00"/>
                <input className="controls" type="text" placeholder="Descuento por cantidad"/>
                <input className="controls" type="text" placeholder="Cantidad mínima"/>
                </Grid>
            
            </Grid>

            <select className="select" name="Tipo de unidad">
                <option value="value1">Unidad</option>
                 <option value="value2" selected>m2</option>
                 <option value="value2" selected>m3</option>
                 <option value="value2" selected>Litros</option>
            </select>
            <textarea className ="controls" name="description" rows="10" cols="40" placeholder="Descripción"></textarea>
            <input className="botons" type="submit" value="Registrar"/>
        </ul>

    )
}

export default ProductoAlta;