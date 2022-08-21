import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { Conversation } from "./../types/index";
export const getRecipientEmail = (
  conversationUsers: Conversation["users"],
  loggedInUser?: User | null
) => conversationUsers.find((userEmail) => userEmail !== loggedInUser?.email);
