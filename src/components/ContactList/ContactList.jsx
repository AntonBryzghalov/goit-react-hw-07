import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import {
  selectContactsError,
  selectContactsFiltered,
  selectContactsLoading,
} from "../../redux/contactsSlice";
import { fetchContacts } from "../../redux/operations";
import { useEffect } from "react";

function ContactList() {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectContactsFiltered);
  const isLoading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
