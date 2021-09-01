import "./MostrarSueldos.css";
import { React, useState, useEffect, useCallback, useRef} from "react";
import {
  Table,
  Thead,
  Tbody,
  Select,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Wrap,
  useToast
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  DownloadIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import {
  downloadRecibo,
  camposBackendSueldo,
  cabeceraTablaDetalleSueldo,
  getAllSueldosData
} from "./ServiceSueldos";

//Esta pantalla se usa para ver y descargar los recibos de sueldo
function MostrarSueldos() {

  //sueldos es la lista que se muestra en la tabla de la pantalla principal
  const [sueldos, setSueldos] = useState([]);

  //busqueda es el string de busqueda ingresado
  const [busqueda, setbusqueda] = useState("");

  //es el valor seleccionado del filtro de busqueda
  const [selectedValue, setSelectedValue] = useState("id");

  //contiene el id y el texto a mostrar (label) en el option
  const optionData = camposBackendSueldo;

  //contiene el id y label del texto a mostrar (label) en la cabecera de la tabla
  const cabeceraTabla = cabeceraTablaDetalleSueldo;

  //Estos se utilizan para mostrar o cerrar el AlertDialog
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  //Se utiliza para mostrar error de descarga de sueldos
  const toast = useToast();

  //Este es el recibo que se pasa al alertDialog
  const [recibo, setRecibo] = useState({
    listaDetalleRecibo: [],
  });

  //Se obtiene y se setea la lista de recibos de sueldo de forma asincronica
  const obtenerSueldos = async () => {
        //Obtener todos los recibos de sueldo
        const response = await getAllSueldosData();
        console.log(response.data);
        if (response !== -1) {
          setSueldos(response.data);
        } else {
            toast({
                title: "No se pudieron obtener los recibos",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }
    
};

//Cada vez que se carga/recarga la pagina se obtienen los recibos de sueldo de forma asincronica
useEffect(() =>{
  obtenerSueldos();
},[]);

//estos 3 metodos se usan para abrir el detalle de recibo

  //Abre el AlertDialog
  const handleOpenAlertDialog = useCallback(
    ()=>{
    setIsOpen(true);
  }, [setIsOpen]);

  //setea el recibo que se va a mostrar en el AlertDialog
  const handleRecibo = useCallback(
    (recibo) => {
      setRecibo(recibo);
    },
    [setRecibo]
  );
  //Este metodo reune los dos anteriores, abre el Alert y setea el recibo(este lo llama el menuItem)
  const openAspect = (recibo) => {
    handleOpenAlertDialog();
    handleRecibo(recibo);
  };

//Este metodo descarga el recibo de sueldo seleccionado lo usa el menuItem descargar
  const getReciboSueldoData = (recibo) => {
    downloadRecibo(recibo);
  };
//Este metodo descarga el recibo seleccionado y cierra el AlertDialog 
//lo usa el boton descargar del alert
  function downloadAndClose(recibo) {
    downloadRecibo(recibo);
    onClose();
  }

//Creal el alert y lo muestra cuando isOpen=true
  const callAlertDetalleSueldo = () => {
    return (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size={Wrap}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Detalle recibo: {recibo.id}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Box className="table-wrapper">
              <Box className="table-scroll">
                <Table id="DetalleSueldo">
                  <Thead>
                    <Tr>
                      {cabeceraTabla.map((columna) => {
                        return <Th>{columna.label}</Th>;
                      })}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {recibo.listaDetalleRecibo.map((detalle) => {
                      return (
                        <Tr className="linea" key={recibo.id}>
                          <Td>{detalle.id}</Td>
                          <Td>{detalle.deduccion}</Td>
                          <Td> {detalle.haber}</Td>
                          <Td> {detalle.porcentaje}</Td>
                          <Td>{detalle.codigoDetalle.codigoDetalle}</Td>
                          <Td>{detalle.codigoDetalle.descripcion}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variantColor="red"
              onClick={() => {
                downloadAndClose(recibo);
              }}
              ml={3}
            >
              Descargar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

//Genera la lista desplegable de options para el filtro
//Estos datos se obtienen de optionData en camposBackendSueldo
  const optionsSelect = () =>
    optionData.map((dato) => {
      return (
        <option key={dato.value} value={dato.value}>
          {dato.label}
        </option>
      );
    });

//Setea el valor seleccionado del option
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

//Genera la tabla de los sueldos de la pantalla principal
  function generarTablaSueldos(cabeceraTabla) {
    return (
      <Table id="Sueldos">
        <Thead >
          <Tr className="linea">
            {cabeceraTabla.map((columna) => {
              return <Th>{columna.label}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody>
          {console.log("Sueldos antes de filter: "+sueldos)}
          {sueldos
      .filter((recibo) => {
        const value = recibo[selectedValue];
        const isString = typeof value === "string";
        if (busqueda === "") {
          return recibo;
        } else if (
          isString &&
          value.toLowerCase().includes(busqueda.toLowerCase())
        ) {
          return recibo;
        } else {
          const nuevoVar = value.toString();
          if (nuevoVar.includes(busqueda)) {
            return recibo;
          }
        }
      })
      .map((recibo) => {
        return (
          <Tr className="linea" key={recibo.id}>
            <Td>{recibo.id}</Td>
            <Td>{recibo.numeroRecibo}</Td>
            <Td>{recibo.fechaEmision}</Td>
            <Td>{recibo.lugarDePago}</Td>
            <Td>{recibo.fechaDePago}</Td>
            <Td>{recibo.pagado}</Td>
            <Td>{recibo.totalBruto}</Td>
            <Td>{recibo.totalNeto}</Td>
            <Menu>
              <Td>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Opciones
                </MenuButton>
                <MenuList>
                  <MenuItem
                    key="information"
                    onClick={() => {
                      openAspect(recibo);
                    }}
                    icon={<InfoOutlineIcon />}
                  >
                    Ver detalles
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      getReciboSueldoData(recibo);
                    }}
                    key="download"
                    icon={<DownloadIcon />}
                  >
                    Descargar
                  </MenuItem>
                </MenuList>
              </Td>
            </Menu>
          </Tr>
        );})}
        </Tbody>
      </Table>
    );
  }

  return (
    <div className="MostrarSueldos">
      <h1 id="title">Sueldos</h1>
      <input
        type="text"
        placeholder="Buscar sueldos"
        onChange={(e) => {
          setbusqueda(e.target.value);
        }}
      />
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
      {generarTablaSueldos(optionData)}
      {callAlertDetalleSueldo()}
    </div>
  );
}

export default MostrarSueldos;
