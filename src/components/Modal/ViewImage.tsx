import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return  (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW='56.25rem'>
        <ModalBody
          borderTopRadius="md"
          padding='0'
        >
          <Image
            src={imgUrl}
            alt='enlarged-image'
            objectFit="contain"
            maxW='56.25rem'
            maxH='37.5rem'
            borderTopRadius="md"
          />
        </ModalBody>

        <ModalFooter
          h='8'
          bgColor='pGray.800'
          justifyContent='flex-start'
          borderBottomRadius='md'
        >
          <Link
            href={imgUrl}
            target='_blank'
            fontWeight='normal'
            fontSize='sm'
            color='pGray.50'
          >
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
