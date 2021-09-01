import "./CodigoDetalle.css";
import { React, useState, useEffect, useRef, useCallback } from "react";
import {
  getAllCodigoDetalle,
  camposBackendCodigoDetalle,
  deleteCodigoDetalle,
  actualizarCodigoDetalle,
  guardarCodigoDetalle
} from "./ServiceCodigoDetalle.js";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Select,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ChevronDownIcon } from "@chakra-ui/icons";

const VerAllCodigoDetalle = () => {
  const optionData = camposBackendCodigoDetalle;
  const [codigosDetalle, setCodigosDetalle] = useState([]);
  //Todo: agregar toast sino se encuentran los codigos

  const [codigoDetalleAlert, setCodigoDetalleAlert] = useState({
    id: ""});
  //busqueda es el string de busqueda ingresado
  const [busqueda, setbusqueda] = useState("");

  //es el valor seleccionado del filtro de busqueda
  const [selectedValue, setSelectedValue] = useState("id");

  //Para reaprovechar el formulario
  const [isUpdate, setIsUpdate] = useState(false);

  //Campos de el formulario actualizar codigo detalle
  const [codigoDetalleForm, setcodigoDetalleForm] = useState(0);
  const [descripcionForm, setdescripcionForm] = useState("");
  const [haberForm, sethaberForm] = useState(0);
  const [porcentajeForm, setporcentajeForm] = useState(0);

  //Se utiliza para mostrar error de descarga de codigoDetalle
  const toast = useToast();

  //Estos se utilizan para mostrar o cerrar el AlertDialog
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  //estos 3 metodos se usan para abrir el detalle de recibo

  //Abre el AlertDialog
  const handleOpenAlertDialog = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  //setea el codigoDetalle que se va a mostrar en el AlertDialog
  const handleCodigoDetalleAlert = useCallback(
    (codigoDetalle) => {
      setCodigoDetalleAlert(codigoDetalle);
    },
    [setCodigoDetalleAlert]
  );
  //Este metodo reune los dos anteriores, abre el Alert y setea el codigoDetalle(este lo llama el menuItem)
  const openAspect = (codigoDetalle) => {
    handleOpenAlertDialog();
    handleCodigoDetalleAlert(codigoDetalle);
  };

  useEffect(() => {
    obtenerCodigosDetalle();
  }, []);

  function setCamposCodigoDetalle(codigoDetalle) {
    setcodigoDetalleForm(codigoDetalle.codigoDetalle);
    setdescripcionForm(codigoDetalle.descripcion);
    sethaberForm(codigoDetalle.haber);
    setporcentajeForm(codigoDetalle.porcentaje);
  }

  //Estos datos se obtienen de codigoDetalleCampos en cabeceraTablaCodigoDetalle
  const obtenerCodigosDetalle = async () => {
    //Obtener todos los codigo detalle
    const response = await getAllCodigoDetalle();
    console.log(response.data);
    if (response !== -1) {
      setCodigosDetalle(response.data);
    } else {
      toast({
        title: "No se pudieron obtener los recibos",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const borrarCodigoDetalle = async (numeroCodigoDetalle) => {
    //Borrar codigo detalle
    const response = await deleteCodigoDetalle(numeroCodigoDetalle);
    if (response !== -1) {
      toast({
        title:
          "Codigo detalle: " + numeroCodigoDetalle + " borrado correctamente",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      obtenerCodigosDetalle();
    } else {
      toast({
        title: "Codigo detalle: " + numeroCodigoDetalle + " no se pudo borrar",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  //Cada vez que se carga/recarga la pagina se obtienen los codigo detalle de forma asincronica

  const optionsSelect = () =>
    optionData.map((dato) => {
      return (
        <option key={dato.value} value={dato.value}>
          {dato.label}
        </option>
      );
    });

  const updateCodigoDetalle = async () => {
    //actualizar codigo detalle
    const response = await actualizarCodigoDetalle(
      codigoDetalleAlert.id,
      codigoDetalleForm,
      descripcionForm,
      haberForm,
      porcentajeForm
    );
    if (response !== -1) {
      onClose();
      toast({
        title: "El codigo detalle se actualizo correctamente",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      obtenerCodigosDetalle();
    } else {
      toast({
        title: "No se pudo actualizar el codigo detalle",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const saveCodigoDetalle = async () => {
    //guardar codigo detalle
    const response = await guardarCodigoDetalle(
      codigoDetalleForm,
      descripcionForm,
      haberForm,
      porcentajeForm
    );
    if (response !== -1) {
      onClose();
      toast({
        title: "El codigo detalle se guardo correctamente",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      obtenerCodigosDetalle();
    } else {
      toast({
        title: "No se pudo guardar el codigo detalle",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  //Devuelve el formulario de codigo detalle
  const returnForm = () => {
    let defaultCodigoDetalle = 0;
    let defaultDescripcion = "Descripcion";
    let defaultHaber = 0.0;
    let defaultPorcenaje = 0.0;
    if(isUpdate){
      defaultCodigoDetalle=codigoDetalleAlert.codigoDetalle;
      defaultDescripcion=codigoDetalleAlert.descripcion;
      defaultHaber=codigoDetalleAlert.haber;
      defaultPorcenaje=codigoDetalleAlert.porcentaje;
    }
    return (
      <FormControl as="fieldset">
        {isUpdate && (
          <FormControl id="id_update">
            <FormLabel>id codigo detalle: {codigoDetalleAlert.id}</FormLabel>
          </FormControl>
        )}

        <FormControl id="codigoDetalle">
          <FormLabel>Codigo detalle</FormLabel>
          <NumberInput
            onChange={(data) => {
              setcodigoDetalleForm(parseInt(data));
            }}
            min={0}
            max={999999999}
            defaultValue={defaultCodigoDetalle}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="descripcion">
          <FormLabel>Descripcion</FormLabel>
          <Input
            onChange={(data) => {
              setdescripcionForm(data.target.value);
            }}
            maxLength={255}
            defaultValue={defaultDescripcion}
            placeholder={defaultDescripcion}
          />
        </FormControl>
        <FormControl id="haber">
          <FormLabel>Haber</FormLabel>
          <NumberInput
            defaultValue={defaultHaber}
            precision={2}
            step={0.2}
            onChange={(data) => {
              sethaberForm(parseFloat(data));
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="porcentaje">
          <FormLabel>Porcentaje</FormLabel>
          <NumberInput
            defaultValue={defaultPorcenaje}
            precision={2}
            step={0.2}
            onChange={(data) => {
              setporcentajeForm(parseFloat(data));
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </FormControl>
    );
  };

  //Creal el alert y lo muestra cuando isOpen=true
  const callAlertCodigoDetalle = () => {
    return (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          {isUpdate && 
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            codigo Detalle: {codigoDetalleAlert.id}
          </AlertDialogHeader>
          }
          {!isUpdate && 
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Nuevo Codigo Detalle:
          </AlertDialogHeader>
          }
          

          <AlertDialogBody>{returnForm(true)}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            {isUpdate && 
            <Button
              onClick={() => {
                updateCodigoDetalle();
              }}
            >
              Actualizar
            </Button> }

            {!isUpdate && 
            <Button
              onClick={() => {
                saveCodigoDetalle();
              }}
            >
              Guardar
            </Button>}
            
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  function generarTablaCodigoDetalle(header) {
    return (
      <Table id="CodigoDetalle">
        <Thead>
          <Tr>
            {header.map((columna) => {
              return <Th>{columna.label}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody>
          {codigosDetalle
            .filter((codigoDetalle) => {
              const value = codigoDetalle[selectedValue];
              const isString = typeof value === "string";
              if (busqueda === "") {
                return codigoDetalle;
              } else if (
                isString &&
                value.toLowerCase().includes(busqueda.toLowerCase())
              ) {
                return codigoDetalle;
              } else {
                const nuevoVar = value.toString();
                if (nuevoVar.includes(busqueda)) {
                  return codigoDetalle;
                } else {
                  return "";
                }
              }
            })
            .map((codigoDetalle) => {
              return (
                <Tr className="linea" key={codigoDetalle.id}>
                  <Td>{codigoDetalle.id}</Td>
                  <Td>{codigoDetalle.codigoDetalle}</Td>
                  <Td>{codigoDetalle.descripcion}</Td>
                  <Td>{codigoDetalle.haber}</Td>
                  <Td>{codigoDetalle.porcentaje}</Td>
                  <Menu>
                    <Td>
                      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Opciones
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          key="Edit"
                          icon={<EditIcon />}
                          onClick={() => {
                            setIsUpdate(true);
                            openAspect(codigoDetalle);
                            setCamposCodigoDetalle(codigoDetalle);
                          }}
                        >
                          Editar
                        </MenuItem>
                        <MenuItem
                          key="download"
                          icon={<DeleteIcon />}
                          onClick={() => {
                            borrarCodigoDetalle(codigoDetalle.codigoDetalle);
                          }}
                        >
                          Eliminar
                        </MenuItem>
                      </MenuList>
                    </Td>
                  </Menu>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    );
  }
  return (
    <div className="verAllCodigoDetalle">
      <h1 id="title">Ver codigos detalle</h1>
      <div>
        <input
          type="text"
          placeholder="Buscar codigo detalle"
          onChange={(e) => {
            setbusqueda(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            setIsUpdate(false);
            openAspect();
          }}
        >
          Nuevo codigo
        </Button>
      </div>
      <Select
        title="Campos"
        key="select"
        variant="filled"
        size="sm"
        value={optionData.find((obj) => obj.label === selectedValue)}
        onChange={handleChange}
      >
        {optionsSelect()}
      </Select>
      {generarTablaCodigoDetalle(optionData)}
      {callAlertCodigoDetalle()}
    </div>
  );
};
export default VerAllCodigoDetalle;
