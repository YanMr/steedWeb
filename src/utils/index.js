// 数组对象去重
const unique = (arr, key) => {
	let result = [];
	let obj = {};
	for (let i = 0; i < arr.length; i++) {
		if (!obj[arr[i][key]]) {
			result.push(arr[i]);
			obj[arr[i][key]] = true;
		}
	}
	return result;
};

/** 获取url query 参数 */
const getQuery = (queryName = '') => {
	const queryStr = window.location.href.split('?')[1];
	let queryObj = {};
	const queryArray = queryStr.split('&');
	queryArray.forEach(item => {
		const [key, value] = item.split('=');
		queryObj[key] = value;
	});
	return queryObj[queryName] || '';
};

export { unique, getQuery };
