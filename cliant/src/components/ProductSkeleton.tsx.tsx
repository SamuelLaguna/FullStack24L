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
  Skeleton,
  SkeletonCircle
} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   isInStore: boolean;
// }

const ProductSkeleton = () => {
 

  return (
    <>
      

      <Box m={12} shadow={"md"} rounded={"md"}>
        <Flex justifyContent={"space-between"} alignItems={"center"} px={"5"}>
          <Heading>Product List
            <Skeleton>Product List</Skeleton>
          </Heading>
          <Button colorScheme="teal" leftIcon={<AddIcon />}>
            {""}
            <Skeleton>Add Skeleton</Skeleton>
          </Button>
        </Flex>

        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th><Skeleton>Id</Skeleton></Th>
                <Th><Skeleton>Name</Skeleton></Th>
                <Th><Skeleton>Description</Skeleton></Th>
                <Th><Skeleton>Is In Store</Skeleton></Th>
                <Th isNumeric><Skeleton>Price</Skeleton></Th>
                
              </Tr>
            </Thead>
            <Tbody>
              {Array.from({length:5}).map((_,index) => (
                <Tr key={index}>
                  <Td><Skeleton>01</Skeleton></Td>
                  
                  <Td>
                    <HStack>
                      <SkeletonCircle>AD</SkeletonCircle>
                      <Text><Skeleton>Product Name</Skeleton></Text>
                    </HStack>
                  </Td>
                
                  <Td> <Skeleton>Product Posistion</Skeleton></Td>
                  <Td> 
                  <Badge><Skeleton>Yes</Skeleton></Badge>
                  </Td>
                  <Td><Skeleton>12345</Skeleton></Td>

                  <Td>
                    <HStack>
                     <SkeletonCircle>1</SkeletonCircle>
                     <SkeletonCircle>1</SkeletonCircle>
                     <SkeletonCircle>1</SkeletonCircle>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            {/* <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot> */}
          </Table>
        </TableContainer>

      
      </Box>
    </>
  );
};

export default ProductSkeleton;
