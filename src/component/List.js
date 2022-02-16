const List = ({ id, title, removeItem, editItem }) => {
	if (id) {
		return (
			<div className="list-item">
				<p className="title"> {title}</p>
				<div className="button-container">
					<button onClick={() => editItem(id)}>แก้ไข</button>
					<button onClick={() => removeItem(id)}>ลบ</button>
				</div>
			</div>
		);
	} else {
		return '';
	}
};

export default List;
