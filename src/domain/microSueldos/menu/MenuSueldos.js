import React from 'react';
import './MenuSueldos.css';
import {
    Box, Link, Image, Stack, Text, Heading
} from "@chakra-ui/react"


import imageFondo1 from '../images/fondo0.jpg';

const MenuSueldos = () => {
    return (
        <Box
            bgImage={`url(${imageFondo1})`}
            bgPosition="e"
            bgRepeat="no-repeat"
            bgSize="cover"
            minHeight="100vh"
            w="100%">
            <Heading textAlign="center" size="3xl" pt={10}>Menu Sueldos</Heading>
            <Stack direction="row"  ml="100px" spacing={4}  bg="rgb(19, 35, 47, .9)" borderRadius="50px" m="100px" p="50px">
                <Box w="200px">
                    <Link href="/sucursal/altaSucursal">
                        <Image src="https://image.flaticon.com/icons/png/512/2942/2942587.png"
                            className="smaller-image" margin="auto"/></Link>
                    <Text className="text-image" >Nueva Sucursal</Text>
                </Box>
                <Box w="200px">
                    <Link href="/sucursal/listaSucursales">
                        <Image src="https://image.flaticon.com/icons/png/512/5072/5072158.png"
                            className="smaller-image" margin="auto"/></Link>
                    <Text className="text-image">Sucursales</Text>
                </Box>
                <Box w="200px">
                    <Link href="/empleado/altaDatoBancario">
                        <Image src="https://image.flaticon.com/icons/png/512/2830/2830284.png"
                            className="smaller-image" margin="auto"/></Link>
                    <Text className="text-image">Nuevo Dato Bancario</Text>
                </Box>  
                <Box w="200px">
                    <Link href="/empleado/listaDatoBancario">
                        <Image src="https://image.flaticon.com/icons/png/512/976/976474.png"
                            className="smaller-image" margin="auto"/></Link>
                    <Text className="text-image">Datos Bancarios</Text>
                </Box>
                <Box w="200px">
                    <Link href="/sueldo/reciboSueldos">
                        <Image src="https://cdn-icons-png.flaticon.com/512/2830/2830589.png"
                            className="smaller-image" margin="auto"/></Link>
                    <Text className="text-image">Recibo de sueldo</Text>
                </Box>
                <Box w="200px">
                    <Link href="/sueldo/codigoDetalle">
                        <Image src="https://cdn-icons-png.flaticon.com/512/1550/1550441.png"
                            className="smaller-image" margin="auto"/></Link>
                    <Text className="text-image">Codigo Detalle</Text>
                </Box>
            </Stack>

        </Box>
    );
}
export default MenuSueldos;