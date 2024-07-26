import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
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
} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";
import ProductSkeleton from "./ProductSkeleton.tsx";
import ProductFrom from "./ProductFrom.tsx";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  isInStore: boolean;
}

const ProductTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //UseStates
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState("");

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

  if (isLoading) return <ProductSkeleton />;

  return (
    <>
      <ColorModeSwitch />

      <Box m={12} shadow={"md"} rounded={"md"}>
        <Flex justifyContent={"space-between"} alignItems={"center"} px={"5"}>
          <Heading fontSize={25}>Product List</Heading>
          <Button onClick={onOpen} colorScheme="teal" leftIcon={<AddIcon />}>
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
                      <EditIcon boxSize={23} color={"orange.200"} />
                      <DeleteIcon boxSize={23} color={"red.300"} />
                      <ViewIcon boxSize={23} color={"blue.100"} />
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
        {isOpen && <ProductFrom fetchProduct={fetchData} isOpen={isOpen} onClose={onClose}/> }
        
      </Box>
    </>
  );
};

export default ProductTable;
