import Popup from "./pages/Popup";
import {createRoot} from "react-dom/client";

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Popup />);
