import "./App.css";
import Sidebar from "./components/sidebar";
import Chatbar from "./components/chatbar";
function App() {
    return (
        <div className="app">
            <div className="app__body">
                <Sidebar />
                <Chatbar />
            </div>
        </div>
    );
}

export default App;
