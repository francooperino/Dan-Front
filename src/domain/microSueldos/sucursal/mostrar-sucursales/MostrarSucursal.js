import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { BiSearchAlt, BiCog } from "react-icons/bi"
import { FiChevronDown } from "react-icons/fi"




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
    Divider,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from "@chakra-ui/react"
import { getAllSucursales, getSucursalPorId } from '../services/Services.js'
import { AlertDialogEliminarSucursal } from './AlertDialogEliminarSucursal.js';
import { ModalModificar } from './ModalModificar.js';

import { ModalListaEmpleado } from './ModalListaEmpleado.js';


import imageFondo1 from '../../images/fondo8.jpg';

const MostraSucursal = () => {
    const history = useHistory();
    const toast = useToast();

    const [sucursalId, setSucursalId] = useState({
        'idSucursal': ''
    });

    //Lista sucursales 
    //Hock use state para las sucursales


    const [dataSucursales, setDataSucursales] = useState([]);

    const obtenerSucursales = async () => {
        let idSucur = sucursalId.idSucursal.replace(/\s/g, ""); //elimina los espacio en blanco.
        if (idSucur.length == 0) {
            //No se buscar por id de sucursal, se traen todas
            const response = await getAllSucursales();
            console.log(response.data);
            if (response !== -1) {
                setDataSucursales(response.data);
            } else {
                toast({
                    title: "No se pudieron obtener las sucursales",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            }
        }
        else {
            //Busqueda por la id
            const response2 = await getSucursalPorId(sucursalId.idSucursal);
            console.log(response2.data);
            if (response2 !== -1) {
                setDataSucursales([response2.data]);
            } else {
                toast({
                    title: "No se pudo obtener la sucursal requerida",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            }

        }
    };


    const handlerInputChange = (event) => {
        console.log(event.target.value)
        setSucursalId({
            ...sucursalId,
            [event.target.name]: event.target.value
        })

    }

    //-----------------------Logica de modificacion de sucursal
    //Hock use state para la sucursal
    //const [sucursalSeleccionadaAModificar, setSucursalSeleccionadaAModificar] = useState ('');
    const sucursalInicial = {
        'cuit': '',
        'ciudad': '',
        'direccion': '',
        'empleados': []
    }
    const [sucursalAModificar, setSucursalAModificar] = useState([sucursalInicial]);
    const [isOpenModalModificar, setIsOpenModalModificar] = useState(false);

    const showModalModificarSucursal = (elemento) => {
        setSucursalAModificar(
            elemento
        );
        /*setSucursalAModificar({
            ...elemento,
            elemento
        }); */
        setIsOpenModalModificar(true);
    };
    //----------------------------Logica eliminar sucursal
    const [isOpenModalEliminar, setIsOpenModalEliminar] = useState(false);
    const [idSucursalAEliminar, setIdSucursalAEliminar] = useState("");
    const eliminarSucursal = (sucursal) => {
        setIdSucursalAEliminar(sucursal.id);
        setIsOpenModalEliminar(true);
    }
    //-----------------------------Logica para mostrar los empleados de una sucursal
    const [isOpenModalVerEmpleados, setIsOpenModalVerEmpleados] = useState(false);
    const [dataEmpleadosSucursal, setdataEmpleadosSucursal] = useState([]);
    const showModalVerEmpleado = (sucursal) => {
        setdataEmpleadosSucursal(sucursal.empleados);
        setIsOpenModalVerEmpleados(true);
    };


    return (

        <Box
            bgImage={`url(${imageFondo1})`}
            bgPosition="e"
            bgRepeat="no-repeat"
            bgSize="cover"
            minHeight="100vh"
            w="100%">
            <ModalModificar setSucursalAModificar={setSucursalAModificar} sucursalAModificar={sucursalAModificar} isOpen={isOpenModalModificar} setIsOpen={setIsOpenModalModificar}></ModalModificar>
            <AlertDialogEliminarSucursal idSucursal={idSucursalAEliminar} isOpen={isOpenModalEliminar} setIsOpen={setIsOpenModalEliminar}></AlertDialogEliminarSucursal>
            <ModalListaEmpleado isOpen={isOpenModalVerEmpleados} setIsOpen={setIsOpenModalVerEmpleados} dataEmpleados={dataEmpleadosSucursal}></ModalListaEmpleado>
            <Center pt={2}>
                <Stack
                    direction="column"
                    spacing={4} padding={4} width="60%"
                    bg="rgb(19, 35, 47, .9)"
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
                    >Lista de sucursales</Heading>
                    <Divider orientation="horizontal" color="white" />

                    <Text color="white">Filtrado (Opcional):</Text>
                    <FormControl id="id-sucursal" color="white">
                        <FormLabel>Id sucursal: </FormLabel>
                        <Input
                            _focus={{ bg: 'grey', color: 'black' }}
                            name="idSucursal"
                            onChange={handlerInputChange}
                        />
                    </FormControl>
                    <Button leftIcon={<BiSearchAlt size="30px" />}
                        w={5} onClick={obtenerSucursales}
                    ></Button>
                    <Box className="table-wrapper" >
                        <Box className="table-scroll">
                            <Table variant="simple" size="sm" color="white" >
                                <Thead color="white">
                                    <Tr>
                                        <Th isNumeric color="white">id</Th>
                                        <Th color="white">ciudad</Th>
                                        <Th color="white">cuit</Th>
                                        <Th color="white">direccion</Th>
                                        <Th color="white">empleados</Th>
                                        <Th color="white"></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {dataSucursales.map((elemento) => {
                                        return (
                                            <Tr key={elemento.id}>
                                                <Td isNumeric>{elemento.id}</Td>
                                                <Td>{elemento.ciudad}</Td>
                                                <Td>{elemento.cuitEmpresa}</Td>
                                                <Td>{elemento.direccion}</Td>
                                                <Td><Button color="white" bg="rgb(19, 35, 47, .1)" size="md" rightIcon={<FiChevronDown />}
                                                    onClick={() => showModalVerEmpleado(elemento)}></Button></Td>
                                                <Td>
                                                    <Menu>
                                                        <MenuButton as={Button} color="black" rightIcon={<BiCog />}>
                                                            Accion
                                                        </MenuButton>
                                                        <MenuList>
                                                            <MenuItem color="black" onClick={() => showModalModificarSucursal(elemento)}>Modificar</MenuItem>
                                                            <MenuItem color="black" onClick={() => eliminarSucursal(elemento)}>Eliminar</MenuItem>
                                                        </MenuList>
                                                    </Menu>
                                                </Td>
                                            </Tr>
                                        );
                                    })}

                                </Tbody>
                            </Table>
                        </Box>
                    </Box>
                    <Stack spacing={4} direction="row" >
                        <Button
                            variant="btnCancelar"
                            letterSpacing= "widest"
                            onClick={() => history.push("/empleado/menuSueldo")}
                        >
                            Atras
                        </Button>
                    </Stack>
                </Stack>
            </Center>
        </Box>
    );




}
export default MostraSucursal;