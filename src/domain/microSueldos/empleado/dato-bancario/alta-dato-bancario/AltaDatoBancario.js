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
    Divider,
    Select
} from "@chakra-ui/react"

import { getAllEmpleados, postDatoBancario } from '../servicesEmpleado';

import imageFondo1 from '../../../images/fondo7.jpg';

const AltaDatoBancario = () => {
    const history = useHistory();
    const toast = useToast();

    //EMPLEADOS
    //Hock use state para los empleados
    const [dataEmpleados, setEmpleados] = useState([]);

    const obtenerEmpleadosDisponibles = async () => {
        const response = await getAllEmpleados();
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

    //------------------Dato bancario
    const [datoBancario, setdatoBancario] = useState({
        'nombrebanco': '',
        'numerocuenta': '',
        'idempleado': []
    });


    const handleInputChange = (event) => {
        console.log(event.target.value)
        setdatoBancario({
            ...datoBancario,
            [event.target.name]: event.target.value
        })
    }
   

    const enviarDatoBancario = async () => {
        let nombrebanco = datoBancario.nombrebanco.replace(/\s/g, ""); //elimina los espacio en blanco.
        let numerocuenta = datoBancario.numerocuenta.replace(/\s/g, ""); //elimina los espacio en blanco.
        let empleadoSelecionado = datoBancario.idempleado;
        if (nombrebanco.length == 0) {
            toast({
                title: "Campo obligatorio: nombre de banco",
                status: "warning",
                duration: 1000,
                isClosable: true,
            })
        }
        else if (numerocuenta.length == 0) {
            toast({
                title: "Campo obligatorio: nombre de cuenta",
                status: "warning",
                duration: 1000,
                isClosable: true,
            })
        }
        else if(empleadoSelecionado.length == 0 ){
            toast({
                title: "Debes seleccionar un empleado",
                status: "warning",
                duration: 1000,
                isClosable: true,
            })
        }
        else {
            //Enviamos el post
            //Obtenemos el empleado
            let idEmpleado = datoBancario.idempleado;
            let aux = dataEmpleados.find((item) => item.id == idEmpleado);

            const a = await postDatoBancario(datoBancario, aux);
            if (a !== -1) {
                toast({
                    title: "Dato bancario guardada correctamente",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: "El dato bancario no se pudo guardar",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            }




        }
    };



    return (

        <Box
            bgImage={`url(${imageFondo1})`}
            bgPosition="e"
            bgRepeat="no-repeat"
            bgSize="cover"
            minHeight="100vh"
            w="100%">
            <Center pt={2}>
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
                    >Nuevo Dato Bancario</Heading>
                    <Divider orientation="horizontal" color="white" />
                    <Text color="white">Para:</Text>
                    <Select
                        placeholder="Seleciona un empleado"
                        color="white"
                        name="idempleado"
                        onChange={handleInputChange}

                    >
                        {dataEmpleados.map((elemento) => {
                            return (
                                <option
                                    value={elemento.id}
                                    key={elemento.id}
                                    color="black"
                                >
                                    {elemento.email}
                                </option>
                            );
                        })}
                    </Select>
                    <FormControl id="nombre-banco" isRequired color="white">
                        <FormLabel>Nombre de banco: </FormLabel>
                        <Input
                            _focus={{ bg: 'grey', color: 'black' }}
                            name="nombrebanco"
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                    <FormControl id="nombre-cuenta" isRequired color="white">
                        <FormLabel>Nombre de cuenta:</FormLabel>
                        <Input
                            _focus={{ bg: 'grey', color: 'black' }}
                            name="numerocuenta"
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                    <Stack spacing={4} direction="row" aling="center" justify="center">  
                        <Button
                            variant="btnAceptar"
                            onClick={enviarDatoBancario}
                        >
                            Aceptar
                        </Button>
                        <Button
                            variant="btnCancelar"
                            onClick={() => history.push("/")}
                        >
                            Atras
                        </Button>

                    </Stack>
                </Stack>
            </Center>
        </Box>

    );


};
export default AltaDatoBancario;