import { FaUser } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/operations";

function Contact({ data }) {
  const dispatch = useDispatch();

  const handleDelete = (contactId) => dispatch(deleteContact(contactId));

  return (
    <div className={css.contact}>
      <div className={css.info}>
        <FaUser /> {data.name}
      </div>
      <div className={css.info}>
        <FaPhone /> {data.phoneNumber}
      </div>
      <button onClick={() => handleDelete(data.id)}>Delete</button>
    </div>
  );
}

export default Contact;
