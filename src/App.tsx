import './App.css';
import Header from './components/Header/Header';
import MyListComponent from './components/MyListComponent/MyListComponent';

const App = () => {
	return (
		<div className="App">
			<Header />
			<div className="container">
				<MyListComponent />
			</div>
		</div>
	);
};

export default App;
