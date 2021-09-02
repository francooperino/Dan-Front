import React from 'react';
import './MenuEmpleado.css';
import {
    Box, Link, Image, Stack, Text, Heading
} from "@chakra-ui/react"


import imageFondo1 from '../domain/microSueldos/images/fondo0.jpg';

const MenuSueldos = () => {
    return (
        <Box
            bgImage={`url(${imageFondo1})`}
            bgPosition="e"
            bgRepeat="no-repeat"
            bgSize="cover"
            minHeight="100vh"
            w="100%">
            <Heading textAlign="center" size="3xl" pt={10}>Menu Empleado</Heading>
            <Stack direction="row"  ml="100px" spacing={4}  bg="rgb(19, 35, 47, .9)" borderRadius="50px" m="100px" p="50px">
                <Box w="200px">
                    <Link href="/empleado/menuSueldo">
                        <Image src="https://cdn-icons-png.flaticon.com/512/584/584039.png"
                            className="smaller-image" margin="auto"/></Link>
                    <Text className="text-image" >Menu sueldos</Text>
                </Box>
                <Box w="200px">
                    <Link href="/empleado/clientes">
                        <Image src="https://image.flaticon.com/icons/png/512/1256/1256650.png"
                            className="smaller-image" margin="auto"/></Link>
                    <Text className="text-image">Clientes</Text>
                </Box>
                <Box w="200px">
                    <Link href="/empleado/obra">
                        <Image src="https://image.flaticon.com/icons/png/512/479/479345.png"
                            className="smaller-image" margin="auto"/></Link>
                    <Text className="text-image">Registro de obras</Text>
                </Box>  
                <Box w="200px">
                    <Link href="/cuentaCorriente/pagoRegistro">
                        <Image src="https://image.flaticon.com/icons/png/512/1019/1019607.png"
                            className="smaller-image" margin="auto"/></Link>
                    <Text className="text-image">Registrar Pago</Text>
                </Box>
                <Box w="200px">
                    <Link href="/pedidos/registrarPedido">
                        <Image src="https://image.flaticon.com/icons/png/512/3143/3143218.png"
                            className="smaller-image" margin="auto"/></Link>
                    <Text className="text-image">Registrar Pedido</Text>
                </Box>
                <Box w="200px">
                    <Link href="/productos/gestionProducto">
                        <Image src="https://image.flaticon.com/icons/png/512/2421/2421989.png"
                            className="smaller-image" margin="auto"/></Link>
                    <Text className="text-image">Gestion Producto</Text>
                </Box>
                <Box w="200px">
                    <Link href="/">
                        <Image src="https://cdn-icons-png.flaticon.com/512/2949/2949728.png"
                            className="smaller-image" margin="auto"/></Link>
                    <Text className="text-image">Cerrar Sesion</Text>
                </Box>
            </Stack>

        </Box>
    );
}
export default MenuSueldos;