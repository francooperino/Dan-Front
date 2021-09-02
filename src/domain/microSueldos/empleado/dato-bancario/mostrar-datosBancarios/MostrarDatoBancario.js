import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { BiSearchAlt, BiCog } from "react-icons/bi"


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
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Lorem,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Wrap
} from "@chakra-ui/react"
import imageFondo1 from '../../../images/fondo8.jpg';
import { getDatoBancarioPorId, getAllDatoBancario, getAllDatoBancarioPorIdEmpleado } from '../servicesEmpleado.js';
import { AlertDialogEliminarDatoBancario } from './AlertDialogEliminarDatoBancario.js';
import { ModalModificarDatoBancario } from './ModalModificarDatoBancario.js';

const MostrarDatoBancario = () => {
    const history = useHistory();
    const toast = useToast();

    const [dataDatosBancarios, setDataDatosBancarios] = useState([]);
    const [optionsFilterDatoBancario, setOptionsFilterDatoBancario] = useState({
        'idDatoBancario': '',
        'idEmpleado': ''
    });

    //Logica para modificar dato bancario
    const datoBancarioInicial = {
        'id': '',
        'nombreBanco': '',
        'numeroCuenta': ''
    }
    const [datoBancarioAModificar, setDatoBancarioAModificar] = useState([datoBancarioInicial]);
    const [isOpenModalModificar, setIsOpenModalModificar] = useState(false);
    const showModalModificarDatoBancario = (datoBancario) => {
        setDatoBancarioAModificar(
            datoBancario
        );
       setIsOpenModalModificar(true);
    };

    //Logica para eliminar dato bancario
    const [isOpenModalEliminar, setIsOpenModalEliminar] = useState(false);
    const [idDatoBancarioAEliminar, setIdDatoBancarioAEliminar] = useState("");
    const eliminarDatoBancario = (datoBancario) => {
        setIdDatoBancarioAEliminar(datoBancario.id);
        setIsOpenModalEliminar(true);
    };

    const obtenerDatosBancarios = async () => {
        let idDatoBancario = optionsFilterDatoBancario.idDatoBancario.replace(/\s/g, ""); //elimina los espacio en blanco.
        let idEmpleado = optionsFilterDatoBancario.idEmpleado.replace(/\s/g, ""); //elimina los espacio en blanco.
        if (idDatoBancario.length !== 0) {
            //Obtengo dato bancario por su id
            const response = await getDatoBancarioPorId(idDatoBancario);
            console.log(response.data);
            if (response !== -1) {
                setDataDatosBancarios([response.data]);
            } else {
                toast({
                    title: "No se pudieron obtener los datos bancarios",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            }
        }
        else if (idEmpleado.length !== 0) {
            //Obtengo dato bancario por su id empleado
            const response2 = await getAllDatoBancarioPorIdEmpleado(idEmpleado);
            console.log(response2.data);
            if (response2 !== -1) {
                setDataDatosBancarios(response2.data);
            } else {
                toast({
                    title: "No se pudieron obtener los datos bancarios",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            }

        }
        else {
            //Obtengo todos los datos bancarios
            const response3 = await getAllDatoBancario();
            console.log(response3.data);
            if (response3 !== -1) {
                setDataDatosBancarios(response3.data);
            } else {
                toast({
                    title: "No se pudieron obtener los datos bancarios",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            }


        }



    };

    const handlerInputChange = (event) => {
        console.log(event.target.value)
        setOptionsFilterDatoBancario({
            ...optionsFilterDatoBancario,
            [event.target.name]: event.target.value
        })
    };

//
    return (
        <Box
            bgImage={`url(${imageFondo1})`}
            bgPosition="e"
            bgRepeat="no-repeat"
            bgSize="cover"
            minHeight="100vh"
            w="100%">
            <ModalModificarDatoBancario setDatoBancarioAModificar={setDatoBancarioAModificar} datoBancarioAModificar={datoBancarioAModificar} isOpen={isOpenModalModificar} setIsOpen={setIsOpenModalModificar}></ModalModificarDatoBancario>
            <AlertDialogEliminarDatoBancario idDatoBancario={idDatoBancarioAEliminar} isOpen={isOpenModalEliminar} setIsOpen={setIsOpenModalEliminar}></AlertDialogEliminarDatoBancario>

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
                    >Datos bancarios</Heading>
                    <Divider orientation="horizontal" color="white" />

                    <Text color="white">Filtrado-no exluyente (Opcional):</Text>
                    <FormControl id="id" color="white">
                        <FormLabel>Id dato bancario: </FormLabel>
                        <Input
                            _focus={{ bg: 'grey', color: 'black' }}
                            name="idDatoBancario"
                            onChange={handlerInputChange}
                        />
                        <FormLabel>Id empleado: </FormLabel>
                        <Input
                            _focus={{ bg: 'grey', color: 'black' }}
                            name="idEmpleado"
                            onChange={handlerInputChange}
                        />
                    </FormControl>
                    <Button leftIcon={<BiSearchAlt size="30px" />}
                        w={5}
                        onClick={obtenerDatosBancarios}
                    ></Button>
                    <Box className="table-wrapper" >
                        <Box className="table-scroll">
                            <Table variant="simple" size="sm" color="white" >
                                <Thead color="white">
                                    <Tr>
                                        <Th isNumeric color="white">id</Th>
                                        <Th color="white">nombre-banco</Th>
                                        <Th color="white">numero-cuenta</Th>
                                        <Th color="white">empleado</Th>
                                        <Th></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {dataDatosBancarios.map((elemento) => {
                                        return (
                                            <Tr key={elemento.id}>
                                                <Td isNumeric>{elemento.id}</Td>
                                                <Td>{elemento.nombreBanco}</Td>
                                                <Td>{elemento.numeroCuenta}</Td>
                                                <Td>{"(id:" + elemento.empleado.id + ") " + elemento.empleado.email}</Td>
                                                <Td>
                                                    <Menu>
                                                        <MenuButton as={Button} color="black" rightIcon={<BiCog />}>
                                                            Accion
                                                        </MenuButton>
                                                        <MenuList>
                                                            <MenuItem color="black" onClick={() => showModalModificarDatoBancario(elemento)} >Modificar</MenuItem>
                                                            <MenuItem color="black" onClick={() => eliminarDatoBancario(elemento)}>Eliminar</MenuItem>
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

};
export default MostrarDatoBancario;