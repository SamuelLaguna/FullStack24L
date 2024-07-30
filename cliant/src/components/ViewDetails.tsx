import { Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton,Text, DrawerHeader, DrawerBody, Input, DrawerFooter, useDisclosure, HStack, Avatar, Heading, VStack } from "@chakra-ui/react"
import React from "react"
import { Product } from "./ProductTable";


interface ViewDetailsProps {
    isOpen : boolean;
    onClose: () => void;
    currentData: Product;
}
const ViewDetails = ({isOpen, onClose, currentData}:ViewDetailsProps) => {
    
  
  return (
   <>
   
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
       
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{currentData.name}</DrawerHeader>

          <DrawerBody>
          <HStack>
            <Avatar name={currentData.name} size={'lg'}/>
            
            <Heading fontSize={16}>
                {currentData.name}
            </Heading>
            <Heading fontSize={20}  >
            ${currentData.price}
            </Heading>
            <Text>
            {currentData.description}
            </Text>
          </HStack>
          </DrawerBody>
         

          <DrawerFooter>
            <Button colorScheme="red" mr={3}  variant='outline'  onClick={onClose}>
              Cancel
            </Button>
            
          </DrawerFooter>
        </DrawerContent>
       
      </Drawer>
   </>
  )
}

export default ViewDetails