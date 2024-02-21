import DropdownSearch from "./components/DropdownSearch";
import "./App.css";
import LanguageChanger from "./components/LanguageChanger";

function App() {
  return (
    <>
      <div>
        <LanguageChanger />
      </div>
      <DropdownSearch></DropdownSearch>
    </>
  );
}

export default App;
