import { ChangeEvent, useEffect, useState } from 'react';
import { list as INCOMING_DATA, TItem } from '../../list';
import './MyListComponent.css';

const SORT_KEY = 'name';

const MyListComponent = () => {
	const _sortedSomeList = (list: TItem[]) => {
		return [...list].sort((a, b) => (a[SORT_KEY] > b[SORT_KEY] ? 1 : -1));
	};

	const commonList = _sortedSomeList(INCOMING_DATA);

	const [items, setItems] = useState<TItem[]>(commonList);
	const [selectedItems, setSelectedItems] = useState<TItem[]>([]);
	const [input, setInput] = useState<string>('');
	const [check, setCheck] = useState<boolean>(false);

	const filterItems = _sortedSomeList(items).filter((el) => {
		if (input === '') return el;
		else return el.name.toLowerCase().includes(input);
	});

	useEffect(() => {
		setItems(items);
		setSelectedItems(selectedItems);
	}, [items, selectedItems]);

	const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value.toLowerCase());
	};

	// Можно закинуть в компонет
	const checkboxHandler = (item: TItem) => {
		if (!item.checked) {
			item.checked = true;
			setCheck(!check);

			if (item.checked === true) {
				selectedItems.push(item);
				setSelectedItems(_sortedSomeList(selectedItems));
			}
		} else {
			const found = selectedItems.findIndex(
				(element) => element.id === item.id
			);
			if (found !== -1) {
				item.checked = false;
				selectedItems.splice(found, 1);
				setCheck(!check);
				setSelectedItems(_sortedSomeList(selectedItems));
			}
		}
	};
	return (
		<div className="container">
			{/*
       Можно закинуть в компонент List с пропсами для
      списка и отработка event на нажатие на компонент ListItem
      */}
			<div className="column">
				{/* 
         Можно закинуть в компонент Search в котором также навешать обработку
          и прокинуть event в родителя, и после прокинуть его в List 
        */}
				<input type="text" className="input" onChange={inputHandler} />
				{/* Можно закинуть в компонент List */}
				<ul className="list list_common">
					{/* 
           Можно закинуть в компонент ListItem 
          в котором будет отрабатывать event при клике 
          */}
					{filterItems.map((el, i) => (
						<li className="list_element" key={i} id={'' + el.id}>
							<label>
								<input
									className="checkbox"
									type="checkbox"
									onChange={() => checkboxHandler(el)}
									checked={el.checked}
								/>
								<span className="label">{el.name}</span>
							</label>
						</li>
					))}
				</ul>
			</div>
			<div className="column">
				{/* Можно закинуть в компонент List */}
				<p className="text">
					Выбрано: <span className="span">{selectedItems.length}</span>
				</p>
				<ul className="list list_selected">
					{selectedItems.map((el, i) => (
						<li className="list_element" key={i} id={'' + el.id}>
							<label>
								<input
									className="checkbox"
									type="checkbox"
									onChange={(e) => checkboxHandler(el)}
									checked={el.checked}
								/>
								<span className="label">{el.name}</span>
							</label>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default MyListComponent;
