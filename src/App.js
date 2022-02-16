import { useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import './App.css';
import List from './component/List';
import Alert from './component/Alert';
function App() {
	const [name, setName] = useState('');
	const [list, setList] = useState(['']);
	const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
	const [checkEditeItem, setCheckEditItem] = useState(false);
	const [editid, setEditid] = useState(null);
	const submitData = (e) => {
		e.preventDefault();
		if (!name) {
			// แสดง Alert
			setAlert({ show: false, msg: 'กรุณาป้อนข้อมูล', type: 'error' });
		} else if (checkEditeItem && name) {
			const result = list.map((item) => {
				if (item.id === editid) {
					return { ...item, title: name };
				}
				return item;
			});
			console.log(result);
			setList(result);
			setName('');
			setCheckEditItem(false);
			setEditid(null);
			setAlert({ show: true, msg: 'แก้ไขข้อมูลเรียบร้อย', type: 'success' });
		} else {
			const newItem = {
				id: uuid4(),
				title: name,
			};
			setList([...list, newItem]);
			setName('');
			setAlert({ show: true, msg: 'บันทึกข้อมูลเรียบร้อย', type: 'success' });
		}
	};
	const editItem1 = (id) => {
		// console.log(`แก้ไขข้อมูล = ${id}`);
		setCheckEditItem(true);
		setEditid(id);
		const searchItem = list.find((item) => item.id === id);
		setName(searchItem.title);

		console.log(searchItem);
	};

	const removeItem = (id) => {
		// console.log(list.filter((item) => item.id !== id));
		const result = list.filter((item) => item.id !== id);
		setList(result);
		setAlert({ show: true, msg: 'ลบข้อมูล', type: 'error' });
	};

	return (
		<section className="container">
			<div>
				<h1>TodoList App</h1>
				{alert.show && <Alert {...alert} setAlert={setAlert} list={list} />}
				<form className="form-group" onSubmit={submitData}>
					<div className="form-control">
						<input type="text" className="text-input" onChange={(e) => setName(e.target.value)} value={name} />
						<button type="submit" className="submit-btn">
							{checkEditeItem ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล'}
						</button>
					</div>
				</form>
			</div>
			<section>
				{list.map((data, index) => {
					return <List key={index} {...data} removeItem={removeItem} editItem={editItem1} />;
				})}
			</section>
		</section>
	);
}

export default App;
