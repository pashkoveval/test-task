import icon from '../../checkbox-icon.svg';
import './Header.css';

const Header = () => {
	return (
		<header className="header">
			<img src={icon} className="logo" alt="logo" />
			<p>Поиск</p>
		</header>
	);
};
export default Header;
