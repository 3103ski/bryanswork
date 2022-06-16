// --> React
import { BrowserRouter as Router } from 'react-router-dom';

// -->  Project Imports
import { Navbar } from 'components';
import { Pages } from './pages';
import './App.scss';

function App() {
	return (
		<div className='App' id='app'>
			<Router>
				<Navbar />
				<Pages />
			</Router>
		</div>
	);
}

export default App;
