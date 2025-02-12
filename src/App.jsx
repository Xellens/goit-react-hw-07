import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import { fetchContacts, addContact, deleteContact } from "./redux/contactsOps";
import {
  selectFilteredContacts,
  selectIsLoading,
  selectIsError,
} from "./redux/contactsSlice";
import { changeFilter, selectFilter } from "./redux/filtersSlice";

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (name, number) => {
    const isExist = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      alert(`Контакт з ім'ям "${name}" вже існує!`);
      return;
    }

    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (event) => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />

      <SearchBox value={filter} onChange={handleFilterChange} />

      {isLoading && <p>Завантаження...</p>}
      {isError && <p>Помилка: {isError}</p>}
      <ContactList contacts={contacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
}

export default App;
