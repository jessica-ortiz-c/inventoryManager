
import './App.css';

import { CategoryProvider } from './context/CategoryContext';
import ProductManager from './components/ProductManager';

function App() {
  return (
    <CategoryProvider>
      <div className="App">
        <header className="App-header">
          <main className="App-body">
            <ProductManager />
          </main>
        </header>
      </div>
    </CategoryProvider>
  );
}

export default App;
