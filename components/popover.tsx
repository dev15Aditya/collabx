import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal';
import { PersonIcon, RoomIcon } from './icons';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';

interface PopupProps {
  onJoin: (roomId: string, username: string) => Promise<void>;
}

export default function Popup({ onJoin }: PopupProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJoin = async () => {
    if (!roomId.trim() || !username.trim()) {
      setError("Room ID and username are required");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await onJoin(roomId, username);
      onOpenChange();
    } catch (err) {
      console.error("Join room error:", err);
      setError(err instanceof Error ? err.message : "Failed to join room");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleJoin();
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Join Room
      </Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={() => {
          if (!isLoading) onOpenChange();
        }} 
        placement="top-center"
        isDismissable={!isLoading}
      >
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Join or Create a Room
              </ModalHeader>
              <ModalBody>
                <Input
                  endContent={
                    <RoomIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Room ID"
                  placeholder="Enter your Room-ID"
                  variant="bordered"
                  value={roomId}
                  onChange={(e) => {
                    setRoomId(e.target.value);
                    setError(null);
                  }}
                  onKeyPress={handleKeyPress}
                  isDisabled={isLoading}
                  isInvalid={!!error}
                  errorMessage={error}
                />
                <Input
                  endContent={
                    <PersonIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Username"
                  placeholder="Enter your Name"
                  variant="bordered"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError(null);
                  }}
                  onKeyPress={handleKeyPress}
                  isDisabled={isLoading}
                />

                {error && (
                  <div className="text-red-500 text-sm mt-2">
                    {error}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button 
                  color="danger" 
                  variant="flat" 
                  onPress={onClose}
                  isDisabled={isLoading}
                >
                  Close
                </Button>
                <Button 
                  color="primary" 
                  onPress={handleJoin}
                  isLoading={isLoading}
                >
                  {isLoading ? 'Joining...' : 'Join'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}