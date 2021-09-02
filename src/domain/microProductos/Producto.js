
import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProductoAlta from './ProductoAlta';
import EmitirOrden from './EmitirOrden';

const Producto = () => {
    return(
        <div className="fondo">
        <Grid container direction="column">
            <Grid container>
                <ProductoAlta></ProductoAlta>
                <EmitirOrden></EmitirOrden>
            </Grid>
        </Grid>
        </div>
    )
}

export default Producto;