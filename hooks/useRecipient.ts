import { query, where, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../config/firebase";
import { getRecipientEmail } from "../utils/getRecipientEmail";
import { AppUser, Conversation } from "./../types/index";
export const useRecipient = (conversationUsers: Conversation["users"]) => {
  const [loggedInUser, _loading, _error] = useAuthState(auth);

  const recipientEmail = getRecipientEmail(conversationUsers, loggedInUser);

  const queryGetRecipient = query(
    collection(db, "users"),
    where("email", "==", recipientEmail)
  );

  const [conversationsSnapshot, __loading, __error] =
    useCollection(queryGetRecipient);

  const recipient = conversationsSnapshot?.docs[0]?.data() as
    | AppUser
    | undefined;

  return {
    recipient,
    recipientEmail,
  };
};
