import { useSelector, useDispatch } from "react-redux";
import {
  selectFilteredContacts,
  selectIsLoading,
  selectIsError,
} from "../../redux/contactsSlice";
import { deleteContact } from "../../redux/contactsOps";
import s from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Помилка: {isError}</p>;

  return (
    <ul className={s.list}>
      {contacts.length > 0 ? (
        contacts.map(({ id, name, number }) => (
          <li key={id} className={s.item}>
            {name}: {number}
            <button
              className={s.button}
              onClick={() => dispatch(deleteContact(id))}
            >
              Видалити
            </button>
          </li>
        ))
      ) : (
        <p>Список контактів порожній.</p>
      )}
    </ul>
  );
};

export default ContactList;
