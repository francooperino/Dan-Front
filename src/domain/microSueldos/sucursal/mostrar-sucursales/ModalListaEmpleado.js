import React, { useState, useRef, useEffect } from 'react';


import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    useToast,
    ModalBody,
    ModalCloseButton,
    Box,
    Table,
    Th,
    Td,
    Tr,
    Tbody,
    Thead,
    Center,
    Divider
} from "@chakra-ui/react"

export const ModalListaEmpleado = ({ isOpen, setIsOpen, dataEmpleados }) => {
    const toast = useToast();
    const initialRef = useRef()
    const finalRef = useRef()
    const onClose = () => { setIsOpen(false) };
    

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              
            >
                <ModalOverlay />
                <ModalContent bg="rgb(19, 35, 47, .9)">
                   <Center><ModalHeader color="white">Empleados</ModalHeader></Center> 
                   <Divider orientation="horizontal" color="white"/>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Box className="table-wrapper" >
                            <Box className="table-scroll">
                                <Table variant="simple" size="sm" color="white">
                                    <Thead color="white">
                                        <Tr>
                                            <Th isNumeric color="white">id</Th>
                                            <Th color="white">email</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {dataEmpleados.map((elemento) => {
                                            return (
                                                <Tr key={elemento.id}>
                                                    <Td isNumeric>{elemento.id}</Td>
                                                    <Td>{elemento.email}</Td>
                                                </Tr>
                                            );
                                        })}

                                    </Tbody>
                                </Table>
                            </Box>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );

};
