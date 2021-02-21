import React from 'react';
import { useHistory } from 'react-router-dom';
import IconFont from '@/components/IconFont';
import './style.scss';

const Back = props => {
	const history = useHistory();
	const onBack = () => {
		history.goBack();
	};
	return (
		<section className="back-wrapper" onClick={onBack}>
			<IconFont type="icon-fanhui" className="icon" />
			<span className="back-text">返回</span>
		</section>
	);
};

export default Back;
