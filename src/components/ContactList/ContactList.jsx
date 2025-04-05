import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import {
  selectContactsError,
  selectFilteredContacts,
  selectContactsLoading,
} from "../../redux/contactsSlice";
import { genericErrorMessage } from "../../redux/contactsOps";

function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);

  return (
    <>
      {isLoading && <p>Loading tasks...</p>}
      {error && <p>{genericErrorMessage}</p>}
      {!isLoading && !error && filteredContacts.length > 0 && (
        <ul className={css.list}>
          {filteredContacts.map((contact) => {
            return (
              <li key={contact.id}>
                <Contact data={contact} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default ContactList;
