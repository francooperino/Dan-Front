import React, { useState, useRef } from 'react';

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
import { removeDatoBancario } from '../servicesEmpleado.js';

export const AlertDialogEliminarDatoBancario = ({idDatoBancario,isOpen,setIsOpen}) => {
    const toast = useToast();

    const eliminarDatoBancario = async () => {
        onClose();
        console.log(idDatoBancario);
        const response = await removeDatoBancario(idDatoBancario);
        if (response !== -1) {
            toast({
                title: "El dato bancario fue borrado correctamente",
                status: "success",
                duration: 2000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Ocurrio un erro al eliminar el dato bancario",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }


    }

    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();
    return  (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            size="lg"
            motionPreset="slideInBottom"
        >
            <AlertDialogOverlay />
            <AlertDialogContent  bg="rgb(255, 255, 255, 0.95)">
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Eliminar dato bancario
                </AlertDialogHeader>

                <AlertDialogBody>
                    Estas seguro que deseas eliminar el dato bancario?
                </AlertDialogBody>

                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        colorScheme="red"
                        ml={3}
                        onClick={eliminarDatoBancario}
                    >
                        Confirmar
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        );

};