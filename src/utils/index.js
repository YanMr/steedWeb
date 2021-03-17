
// 数组对象去重
const unique = (arr, key) => {
	let result  = [];
				let obj = {};
				for (let i = 0; i < arr.length; i ++) {
					if(!obj[arr[i][key]]){
						result.push(arr[i]);
						obj[arr[i][key]] = true;
					}
				}
return result	
};

export { unique };
