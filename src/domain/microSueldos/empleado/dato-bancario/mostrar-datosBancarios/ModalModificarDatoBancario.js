import React, { useState, useRef } from 'react';


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
    Divider
} from "@chakra-ui/react"
import { updateDatoBancario } from '../servicesEmpleado.js';



export const ModalModificarDatoBancario = ({ isOpen, setIsOpen, datoBancarioAModificar, setDatoBancarioAModificar }) => {
    const toast = useToast();

    //detecta cambios en los imputs del dato bancario  
    const handleInputChange = (event) => {
        console.log(event.target.value)
        setDatoBancarioAModificar({
            ...datoBancarioAModificar,
            [event.target.name]: event.target.value
        })
    }


    const initialRef = useRef()
    const finalRef = useRef()
    const onClose = () => { setIsOpen(false) };

    const actualizarDatoBancario = async () => {
        onClose();
        let nombreDatoB = datoBancarioAModificar.nombreBanco.replace(/\s/g, ""); //elimina los espacio en blanco.
        let numeroDatoB = datoBancarioAModificar.numeroCuenta.replace(/\s/g, ""); //elimina los espacio en blanco.

        if (nombreDatoB.length !== 0 || numeroDatoB.length !== 0) {
            //setDatoBancarioAModificar(...datoBancarioDataNueva, { id: datoBancarioAModificar.id });
            const response = await updateDatoBancario(datoBancarioAModificar);
            if (response !== -1) {
                toast({
                    title: "El dato bancario fue actualizada correctamente",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: "Ocurrio un erro al actualizar el dato bancario",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            }
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
                    <ModalHeader color="white" textAlign="center">Modificar dato bancario</ModalHeader>
                    <Divider orientation="horizontal" color="white" />
                    <ModalCloseButton />
                    <ModalBody pb={6} pt={6}>
                        <FormControl>
                            <FormLabel color="white">Nombre banco:</FormLabel>
                            <Input ref={initialRef}
                                type="Text"
                                name="nombreBanco"
                                value={datoBancarioAModificar.nombreBanco}
                                onChange={handleInputChange}
                                color="white" />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel color="white">Número cuenta:</FormLabel>
                            <Input type="Text"
                                name="numeroCuenta"
                                value={datoBancarioAModificar.numeroCuenta}
                                onChange={handleInputChange}
                                color="white" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            mr={3}
                            onClick={actualizarDatoBancario}
                            variant="btnAceptar"
                        >Guardar</Button>
                        <Button
                            variant="btnCancelar"
                            onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};