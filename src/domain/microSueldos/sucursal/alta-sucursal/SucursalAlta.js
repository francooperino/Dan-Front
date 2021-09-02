import './SucursalAlta.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
//import { TiUserAdd } from 'react-icons/ti';



import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Center,
    useToast,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Checkbox,
    Divider
} from "@chakra-ui/react"
import { postSucursal, getAllEmpleadosDisponibles } from '../services/Services.js'

import imageFondo1 from '../../images/fondo8.jpg';

const SucursalAlta = () => {
    const history = useHistory();
    const toast = useToast();
    //EMPLEADOS
    //Hock use state para los empleados
    const [dataEmpleados, setEmpleados] = useState([]);

    const obtenerEmpleadosDisponibles = async () => {
        const response = await getAllEmpleadosDisponibles();
        console.log(response.data);
        if (response !== -1) {
            setEmpleados(response.data);
        } else {
            toast({
                title: "No se pudieron obtener los empleados disponibles",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }
    };
    //Hock
    //Cada vez que se renderiza ejecuta la funcion siguiente
    useEffect(() => {
        obtenerEmpleadosDisponibles();
    }, []);

    //-----------------------------------------Sucursal
    //Hock use state para la sucursal
    const [dataSucursal, setSucursal] = useState({
        'cuit': '',
        'ciudad': '',
        'direccion': '',
        'empleados': []
    });
    //detecta cambios en los imputs de sucursal  
    const handleInputChange = (event) => {
        console.log(event.target.value)
        setSucursal({
            ...dataSucursal,
            [event.target.name]: event.target.value
        })
    }
    //-------------------------------------------Empleado
    const [empleadoSelected, setEmpleadoSelected] = useState([]);
    const handleCheckBoxChange = (idEmpleado, event) => {
        console.log("checkbox: " + event.target.value);
        if (event.target.checked) {
            //Elemento seleccionado
            setEmpleadoSelected(
                [...empleadoSelected, idEmpleado]
            )
        } else {
            //Elemento deseleccionado
            let aux = [...empleadoSelected].filter(item => item !== idEmpleado);
            setEmpleadoSelected(aux);
        }
    }

    //Envia la sucursal al api y muestra un toast  
    async function enviarSucursal() {
        let cuit = dataSucursal.cuit.replace(/\s/g, ""); //elimina los espacio en blanco.
        let direccion = dataSucursal.direccion.replace(/\s/g, ""); //elimina los espacio en blanco.
        let ciudad = dataSucursal.ciudad.replace(/\s/g, ""); //elimina los espacio en blanco.
        if (cuit.length == 0) {
            toast({
                title: "Campo obligatorio: cuit",
                status: "warning",
                duration: 1000,
                isClosable: true,
            })
        }
        else if (direccion.length == 0) {
            toast({
                title: "Campo obligatorio: Direccion",
                status: "warning",
                duration: 1000,
                isClosable: true,
            })
        }
        else if (ciudad.length == 0) {
            toast({
                title: "Campo obligatorio: Ciudad",
                status: "warning",
                duration: 1000,
                isClosable: true,
            })
        }
        else {
            //POST AL API
            const a = await postSucursal(dataSucursal, empleadoSelected);
            if (a !== -1) {
                toast({
                    title: "Sucursal guardada correctamente",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: "La sucursal no se pudo guardar",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            }
        }

    }



    return (

        <Box
            bgImage={`url(${imageFondo1})`}
            bgPosition="e"
            bgRepeat="no-repeat"
            bgSize="cover"
            minHeight="100vh"
            w="100%">
            <Center  pt={2}>
                <Stack
                    direction="column"
                    spacing={4} padding={4} width="60%"
                    bg="na.backgroundPrimary"
                    borderRadius="5px"
                    boxShadow="dark-lg"
                    overflow="auto"
      
                >
                    <Heading size="2xl" align="center"
                        pt={2} pl={2} pr={2} mb={4}
                        letterSpacing="normal"
                        fontWeight="semibold"
                        fontFamily="Century Gothic"
                        color="#E4E4E4"
                    >Nueva Sucursal</Heading>
                    <Divider orientation="horizontal" color="white"/>
                    <FormControl id="cuit-empresa" isRequired color="white">
                        <FormLabel>Cuit: </FormLabel>
                        <Input placeholder="30-00000000-0"
                            _focus={{ bg: 'grey', color: 'black' }}
                            name="cuit"
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                    <FormControl id="ciudad-sucursal" isRequired color="white">
                        <FormLabel>Ciudad:</FormLabel>
                        <Input
                            _focus={{ bg: 'grey', color: 'black' }}
                            name="ciudad"
                            onChange={handleInputChange}

                        />
                    </FormControl>
                    <FormControl id="direccion-sucursal" isRequired color="white">
                        <FormLabel>Direccion:</FormLabel>
                        <Input
                            _focus={{ bg: 'grey', color: 'black' }}
                            name="direccion"
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <Text color="white">Empleados a asociar:</Text>
                    <Box className="table-wrapper">
                        <Box className="table-scroll">
                            <Table variant="simple" size="sm" color="white">
                                <Thead color="white">
                                    <Tr>
                                        <Th isNumeric color="white">id</Th>
                                        <Th color="white">mail</Th>
                                        <Th color="white">asociar</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {dataEmpleados.map((elemento) => {
                                        return (
                                            <Tr key={elemento.id}>
                                                <Td isNumeric>{elemento.id}</Td>
                                                <Td>{elemento.email}</Td>
                                                <Td>
                                                    <Checkbox
                                                        pt="6px"
                                                        onChange={(e) => handleCheckBoxChange(elemento.id, e)} />
                                                </Td>
                                            </Tr>
                                        );
                                    })}

                                </Tbody>
                            </Table>
                        </Box>
                    </Box>
                    <Stack spacing={4} direction="row" aling="center" justify="center">
                        <Button
                            variant="btnAceptar"
                            onClick={enviarSucursal}
                        >
                            Aceptar
                        </Button>
                        <Button
                           variant="btnCancelar"
                           onClick={()=>history.push("/empleado/menuSueldo")}
                        >
                            Atras
                        </Button>

                    </Stack>
                </Stack>
            </Center>
        </Box>

    );
}

export default SucursalAlta;