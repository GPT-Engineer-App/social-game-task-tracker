import React, { useState } from "react";
import { Container, VStack, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Text, IconButton, Textarea } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const Index = () => {
  const [participants, setParticipants] = useState([{ name: "", phone: "", word: "" }]);
  const [messages, setMessages] = useState([]);
  const [bulkInput, setBulkInput] = useState("");

  const handleInputChange = (index, event) => {
    const values = [...participants];
    values[index][event.target.name] = event.target.value;
    setParticipants(values);
  };

  const handleAddParticipant = () => {
    setParticipants([...participants, { name: "", phone: "", word: "" }]);
  };

  const handleRemoveParticipant = (index) => {
    const values = [...participants];
    values.splice(index, 1);
    setParticipants(values);
  };

  const generateMessages = () => {
    const shuffledParticipants = [...participants].sort(() => 0.5 - Math.random());
    const newMessages = participants.map((participant, index) => {
      const pair = shuffledParticipants[index === participants.length - 1 ? 0 : index + 1];
      return {
        ...participant,
        message: `Hi ${participant.name}, you are invited to play with us! You need to make ${pair.name} say the word ${pair.word}. Best luck!`,
      };
    });
    setMessages(newMessages);
  };

  const handleBulkInputChange = (event) => {
    setBulkInput(event.target.value);
  };

  const handleBulkInputSubmit = () => {
    const lines = bulkInput.split("\n");
    const newParticipants = lines.map(line => {
      const [name, phone] = line.split(",").map(item => item.trim());
      return { name, phone, word: "" };
    });
    setParticipants(newParticipants);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Social Game Setup</Text>
        <Textarea
          placeholder="Paste names and phone numbers here, one per line (e.g., 'Name, Phone')"
          value={bulkInput}
          onChange={handleBulkInputChange}
        />
        <Button onClick={handleBulkInputSubmit}>Add Participants from Bulk Input</Button>
        {participants.map((participant, index) => (
          <VStack key={index} spacing={2} width="100%">
            <Input
              placeholder="Name"
              name="name"
              value={participant.name}
              onChange={(event) => handleInputChange(index, event)}
            />
            <Input
              placeholder="Phone"
              name="phone"
              value={participant.phone}
              onChange={(event) => handleInputChange(index, event)}
            />
            <Input
              placeholder="Word"
              name="word"
              value={participant.word}
              onChange={(event) => handleInputChange(index, event)}
            />
            <IconButton
              aria-label="Remove participant"
              icon={<FaTrash />}
              onClick={() => handleRemoveParticipant(index)}
            />
          </VStack>
        ))}
        <Button onClick={handleAddParticipant}>Add Participant</Button>
        <Button onClick={generateMessages}>Generate Messages</Button>
        {messages.length > 0 && (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Phone</Th>
                <Th>Message</Th>
              </Tr>
            </Thead>
            <Tbody>
              {messages.map((message, index) => (
                <Tr key={index}>
                  <Td>{message.name}</Td>
                  <Td>{message.phone}</Td>
                  <Td>{message.message}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </VStack>
    </Container>
  );
};

export default Index;