import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import icon from './checkbox-icon.svg'
import { list, TItem } from './list';

const App = () => {
  const commonList = list;
  const [items, setItems] = useState<TItem[]>(commonList);
  const [selectedItems, setSelectedItems] = useState<TItem[]>([]);
  const [input, setInput] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);

  const filterItems = items.filter((el) => {
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

  const checkboxHandler = (
    e: { target: { checked: boolean | ((prevState: boolean) => boolean) } },
    item: TItem
  ) => {
    if (e.target.checked) {
      item.checked = true;
      setCheck(!check);

      if (item.checked === true) {
        selectedItems.push(item);
        setSelectedItems(selectedItems);
      }
    } else {
      item.checked = false;
      setCheck(!check);
      selectedItems.pop();
      setSelectedItems(selectedItems);
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
      <img src={icon} className="logo" alt="logo" />
        <p>Поиск</p>
      </header>
      <div className='container'>
        <div className='column'>
          <input type='text' className='input' onChange={inputHandler} />
          <ul className='list list_common'>
            {filterItems.map((el, i) => (
              <li className='list_element' key={i} id={'' + el.id}>
                <input
                  className='checkbox'
                  type='checkbox'
                  id={'' + el.id}
                  onChange={(e) => checkboxHandler(e, el)}
                  value={el.name}
                  checked={el.checked}
                />
                {el.name}
              </li>
            ))}
          </ul>
        </div>
        <div className='column'>
          <p className='text'>Выбрано: <span className='span'>{selectedItems.length}</span></p>
          <ul className='list list_selected'>
            {selectedItems.map((el, i) => (
              <li className='list_element' key={i} id={'' + el.id}>
                <input
                  className='checkbox'
                  type='checkbox'
                  id={'' + el.id}
                  onChange={(e) => checkboxHandler(e, el)}
                  value={el.name}
                  checked={el.checked}
                />
                {el.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
