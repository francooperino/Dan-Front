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
    ModalCloseButton
} from "@chakra-ui/react"
import { updateSucursal } from '../services/Services.js'

export const ModalModificar = ({ isOpen, setIsOpen, sucursalAModificar, setSucursalAModificar }) => {
    const toast = useToast();
    //detecta cambios en los imputs de sucursal  
    const handleInputChange = (event) => {
        console.log(event.target.value)
        setSucursalAModificar({
            ...sucursalAModificar,
            [event.target.name]: event.target.value
        })
    }

    const initialRef = useRef()
    const finalRef = useRef()
    const onClose = () => { setIsOpen(false) };

    const actualizarSucursal = async () => {
        let cuit = sucursalAModificar.cuitEmpresa.replace(/\s/g, ""); //elimina los espacio en blanco.
        let direccion = sucursalAModificar.direccion.replace(/\s/g, ""); //elimina los espacio en blanco.
        let ciudad = sucursalAModificar.ciudad.replace(/\s/g, ""); //elimina los espacio en blanco.

        if (cuit.length !== 0 && direccion.length !== 0 && ciudad.length !== 0) {
            onClose();
            const response = await updateSucursal(sucursalAModificar);
            if (response !== -1) {
                toast({
                    title: "La sucusal fue actualizada correctamente",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: "Ocurrio un erro al actualizar la sucursal",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            }
        }
        else {
            toast({
                title: "No se permiten campos nulos",
                status: "warning",
                duration: 2000,
                isClosable: true,
            })
        }
    }
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
                    <ModalHeader color="white">Modificar sucursal</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel color="white">Cuit:</FormLabel>
                            <Input ref={initialRef}
                                type="Text"
                                name="cuitEmpresa"
                                value={sucursalAModificar.cuitEmpresa}
                                onChange={handleInputChange}
                                isRequired
                                color="white"
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel color="white">Dirección:</FormLabel>
                            <Input type="Text"
                                name="direccion"
                                value={sucursalAModificar.direccion}
                                onChange={handleInputChange}
                                color="white"
                                isRequired />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel color="white">Ciudad:</FormLabel>
                            <Input type="Text"
                                name="ciudad"
                                value={sucursalAModificar.ciudad}
                                onChange={handleInputChange}
                                color="white"
                                isRequired />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="btnAceptar"
                            mr={3} onClick={actualizarSucursal}>Guardar</Button>
                        <Button 
                        onClick={onClose}
                        variant="btnCancelar"
                        >Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );


};