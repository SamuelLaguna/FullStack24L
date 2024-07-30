import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,

  TableContainer,
  Box,
  Flex,
  Heading,
  Button,
  HStack,
  Avatar,
  Text,
  Badge,
  useDisclosure,
  useToast,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PopoverFooter,
} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";
import ProductSkeleton from "./ProductSkeleton.tsx";
import ProductFrom from "./ProductFrom.tsx";
import ViewDetails from "./ViewDetails.tsx";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  isInStore: boolean;
}

const ProductTable = () => {
  const toast = useToast();

  const { isOpen: viewDialogOpen, onOpen: onViewDialogOpen, onClose:onviewDialogClose } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentData, setcurrentData] = useState<Product>({} as Product);
  //UseStates
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  

  
  //function to help us fetch our data
  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(BASE_URL + "Product")
      .then((response) => {
        setData(response.data);
      })

      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getProduct = (id: number) => {
    axios
      .get(BASE_URL + "Product/" + id)
      .then((res) => {
        setcurrentData(res.data);
        onOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading) return <ProductSkeleton />;

  const handleAdd = () => {
    onOpen();
    setcurrentData({} as Product);
  };

  const handleDelete = (id:number) => {
    axios.delete(BASE_URL + "Product/" + id)
    .then(() => {
      toast({
        title: 'Product Deleted',
        description: "Product Delted Noice",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      fetchData();
    }).catch(error => {
      console.log(error);
      
    })
  }

  const handleViewDetail = (id:number) => {
    axios.get<Product>(BASE_URL+"Product/"+id)
    .then(res => {
      setcurrentData(res.data)
      onViewDialogOpen()
    }).catch(error => {
      console.log(error);
      
    })
  }

  return (
    <>
      <ColorModeSwitch />

      <Box m={12} shadow={"md"} rounded={"md"}>
        <Flex justifyContent={"space-between"} alignItems={"center"} px={"5"}>
          <Heading fontSize={25}>Product List</Heading>
          <Button
            onClick={() => handleAdd()}
            colorScheme="teal"
            leftIcon={<AddIcon />}
          >
            Add Product
          </Button>
        </Flex>

        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>name</Th>
                <Th>Description</Th>
                <Th>Is In Stock</Th>
                <Th isNumeric>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((product: Product) => (
                <Tr>
                  <Td> {product.id}</Td>
                  <Td> {product.id}</Td>
                  <Td>
                    <HStack>
                      <Avatar size={"sm"} name={product.name} />
                      <Text>{product.name}</Text>
                    </HStack>
                  </Td>
                  <Td> {product.name}</Td>
                  <Td> {product.description}</Td>
                  <Td>
                    <Badge>{product.isInStore ? "Yes" : "No"}</Badge>
                  </Td>
                  <Td> {product.price}</Td>
                  <Td>
                    <HStack>
                      <EditIcon
                        onClick={() => getProduct(product.id)}
                        boxSize={23}
                        color={"orange.200"}
                      />
                      <Popover>
                        <PopoverTrigger>
                        <DeleteIcon boxSize={23} color={"red.300"} />
                        
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Confirmation!</PopoverHeader>
                          <PopoverBody>
                            Are you sure you want to delete?
                          </PopoverBody>
                          <PopoverFooter>
                            <Button colorScheme="red" onClick={() => handleDelete(product.id)}>Delete</Button>
                          </PopoverFooter>
                        </PopoverContent>
                      </Popover>
                    
                      <ViewIcon onClick={() => handleViewDetail(product.id)} boxSize={23} color={"blue.100"} />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>

        {data.length == 0 && (
          <Heading textAlign={"center"} fontSize={24}>
            No Data
          </Heading>
        )}
        {isOpen && (
          <ProductFrom
            currentData={currentData}
            fetchProduct={fetchData}
            isOpen={isOpen}
            onClose={onClose}
          />
        )}

        {viewDialogOpen && <ViewDetails isOpen={viewDialogOpen} onClose={onviewDialogClose} currentData={currentData} />}

      </Box>
    </>
  );
};

export default ProductTable;
