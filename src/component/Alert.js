import { useEffect } from 'react';

const Alert = ({ msg, type, setAlert, list }) => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			setAlert({ show: false, msg: '', type: '' });
		}, 3000);
		return () => clearTimeout(timeout);
	}, [list]);
	return <p className={`alert ${type}`}>{msg}</p>;
};
export default Alert;
