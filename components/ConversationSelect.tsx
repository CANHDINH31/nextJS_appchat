import { Conversation } from "../types";
import styled from "styled-components";
import { useRecipient } from "../hooks/useRecipient";
import RecipientAvatar from "./RecipientAvatar";
import { useRouter } from "next/router";
const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-all;
  :hover {
    background-color: #e9eaeb;
  }
`;

const ConversationSelect = ({
  id,
  conversationUsers,
}: {
  id: string;
  conversationUsers: string[];
}) => {
  const { recipient, recipientEmail } = useRecipient(conversationUsers);

  const router = useRouter();

  const onSelectConversation = () => {
    router.push(`/conversation/${id}`);
  };

  return (
    <StyledContainer onClick={onSelectConversation}>
      <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
      <span>{recipientEmail}</span>
    </StyledContainer>
  );
};

export default ConversationSelect;
