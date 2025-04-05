import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { selectFilterByName } from "../../redux/filtersSlice";
import {
  selectContacts,
  selectContactsError,
  selectContactsLoading,
} from "../../redux/contactsSlice";
import { fetchContacts } from "../../redux/operations";
import { useEffect } from "react";

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilterByName);
  const isLoading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <>
      {isLoading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}
      {filteredContacts.length > 0 && (
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
