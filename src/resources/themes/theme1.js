// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react"
// 2. Extend the theme to include custom colors, fonts, etc

//Aca podemos definir nuestro proopios colores
const colors = {
    na: {
        verdeBotonGuardar: "#1ab188",
        rojoBotonAtras: "#EE5A47",
        backgroundPrimary: "rgb(19, 35, 47, .9)",
    },
}

//Aca podemos cambiar el estilo de botones
const Button = {
    /*baseStyle: { //se aplica a todos los botones
        fontWeigt: 'light',
        borderRadius: '30px',
        _hover: {
            boxShadow: '0 0 2px 2px #efdfde'
        }
    },*/
    variants: {
        //Crear variante
        'btnAceptar': {
            bg: '#1ab188',
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: 'widest',
            w: '100px',
            _hover: {
                boxShadow: 'none',
                color: 'black'
            },
            _focus:{
                borderColor: 'black'
            }
        },
        //Variante 2
        'btnCancelar': {
            bg: '#EE5A47',
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: 'widest',
            w: '100px',
            _hover: {
                boxShadow: 'none',
                color: 'black'
            },
            _focus: {
                borderColor: 'black'
            }
        }
    }
}


export const theme1 = extendTheme({ colors, components: { Button } })