import { async } from "@firebase/util";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import ConverstationScreen from "../../components/ConverstationScreen";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../config/firebase";
import { Conversation, IMessage } from "../../types";
import {
  generateQueryGetMessages,
  transformMessage,
} from "../../utils/getMessagesInConversation";
import { getRecipientEmail } from "../../utils/getRecipientEmail";

interface Props {
  conversation: Conversation;
  messages: IMessage[];
}

const StyledContaiiner = styled.div`
  display: flex;
`;

const StyleConversationContainer = styled.div`
  flex-grow: 1;
  overflow: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const Conversation = ({ conversation, messages }: Props) => {
  const [loggedInUser, _loading, _error] = useAuthState(auth);

  return (
    <StyledContaiiner>
      <Head>
        <title>
          Conversation with{" "}
          {getRecipientEmail(conversation.users, loggedInUser)}
        </title>
      </Head>
      <Sidebar />
      <StyleConversationContainer>
        <ConverstationScreen conversation={conversation} messages={messages} />
      </StyleConversationContainer>
    </StyledContaiiner>
  );
};

export default Conversation;

export async function getServerSideProps(context: { params: { id: any } }) {
  const conversationId = context.params?.id;
  const conversationRef = doc(db, "conversations", conversationId as string);
  const conversationSnapshot = await getDoc(conversationRef);

  const queryMessages = generateQueryGetMessages(conversationId);

  const messagesSnapshot = await getDocs(queryMessages);

  const messages = messagesSnapshot.docs.map((messageDoc) =>
    transformMessage(messageDoc)
  );

  return {
    props: {
      conversation: conversationSnapshot.data() as Conversation,
      messages,
    },
  };
}
