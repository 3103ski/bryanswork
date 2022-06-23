// --> React
import { BrowserRouter as Router } from 'react-router-dom';

// -->  Project Imports
import { Navbar, Footer } from 'components';
import { Pages } from './pages';
import './App.scss';

function App() {
	return (
		<div className='App' id='app'>
			<Router>
				<Navbar />
				<Pages />
				<Footer />
			</Router>
		</div>
	);
}

export default App;
