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
import { removeSucursal } from '../services/Services.js'

export const AlertDialogEliminarSucursal = ({idSucursal,isOpen,setIsOpen}) => {
    const toast = useToast();

    const eliminarSucursal = async () => {
        onClose();
        console.log(idSucursal);
        const response = await removeSucursal(idSucursal);
        if (response !== -1) {
            toast({
                title: "La sucusal fue borrada correctamente",
                status: "success",
                duration: 2000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Ocurrio un erro al eliminar la sucursal",
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
                    Eliminar Sucursal
                </AlertDialogHeader>

                <AlertDialogBody>
                    Estas seguro que deseas eliminar la sucursal?
                </AlertDialogBody>

                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        colorScheme="red"
                        ml={3}
                        onClick={eliminarSucursal}
                    >
                        Confirmar
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        );

};