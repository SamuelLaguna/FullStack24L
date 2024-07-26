import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, VStack, Textarea, Switch, Text } from "@chakra-ui/react"
import { useState } from "react";
import { BASE_URL } from "../constant";
import axios from "axios";

interface ProductFromProps{
    isOpen: boolean;
    onClose: () => void 
    fetchProduct: () => void
}

const ProductFrom = ({isOpen,onClose, fetchProduct}:ProductFromProps)=> {
   const [product, setProduct] = useState({
    id: 0,
    name: "",
    price: '',
    isInStore: false,
    description: ''
   })

   const onSave = () => {
    axios.post(BASE_URL + "Product", product).then(response => {
        onClose();
        fetchProduct();
    }).catch(error => {
        console.log(error);
        
    })
    
   }
    return (
      <>
      
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <VStack alignItems={'self-start'} gap={3}>
                <Input type="text" placeholder="Name" value={product.name} onChange={(e) => setProduct({...product, name:e.target.value})}/>
                <Textarea  placeholder="Description" value={product.description} onChange={(e) => setProduct({...product, description:e.target.value})}/>
                <Input type="number" placeholder="Price" value={product.price} onChange={(e) => setProduct({...product, price:e.target.value})}/>
                <Text>
                Is In Store
                </Text>
                <Switch isChecked={product.isInStore} onChange={(e) => setProduct({...product, isInStore: e.target.checked})}/>
            </VStack>
            </ModalBody>
            {/* {JSON.stringify({product})} */}
            <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={onSave} variant='ghost' colorScheme="teal" >Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default ProductFrom


