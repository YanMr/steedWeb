const iconFun = (type) => {
	let imgText = ''
	switch(type) {
		case 1: // 灯光
		imgText= 'icon-diandeng-shouye';
		break;
		case 2: // 空调
		imgText= 'icon-kongtiao-shouye';
		break;
		case 3: // 投影仪
		imgText= 'icon-touyingyi-shouye';
		break;
		case 4: // 风扇
		imgText= 'icon-fengshan-shouye';
		break;
		case 5: // 幕布
		imgText= 'icon-mubu';
		break;
		case 6: // 一体机
		imgText= 'icon-yitiji';
		break;
		case 7: // 门禁
		imgText= 'icon-menjin-shouye';
		break;
		case 8: // 窗帘
		imgText= 'icon-chuanglian-shouye';
		break;
		case 9: // 电脑
		imgText= 'icon-diannao';
		break;
		default: // 频道
		imgText= 'icon-app_icons--';
		break;
	}
	return imgText;
}

export default iconFun