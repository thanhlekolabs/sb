const {DATE_NULL, DATA_LIMIT} = Config;
const {CheckEmpty, CheckAttr} = Check;

export const DisplayDate = (date) => {
	if(date === DATE_NULL){
		return '';
	}
	if(CheckEmpty(date))
		return '';
	if(typeof date === 'undefined')
		return '';

	date = date.split(' ')[0];
	const dateArr = date.split('-');
	const year = dateArr[0];
	const month = dateArr[1];
	const day = dateArr[2];

	return day+'/'+month+'/'+year;
};

export const DisplayDateTime = (dateTime) => {
	if(dateTime === DATE_NULL){
		return '';
	}
	if(CheckEmpty(dateTime))
		return '';
	if(typeof dateTime === 'undefined')
		return '';

	let date = dateTime.split(' ')[0];
	const dateArr = date.split('-');
	const year = dateArr[0];
	const month = dateArr[1];
	const day = dateArr[2];

	let time = dateTime.split(' ')[1];
	const timeArr = time.split(':');
	const hour = timeArr[0];
	const minute = timeArr[1];
	const second = timeArr[2];

	return day+'/'+month+'/'+year+' '+hour+':'+minute+':'+second;
};

export const DisplayDateFriendly = (dateTime) => {
	if(dateTime === DATE_NULL){
		return '';
	}
	if(CheckEmpty(dateTime))
		return '';
	if(typeof dateTime === 'undefined')
		return '';

	let date = dateTime.split(' ')[0];
	const dateArr = date.split('-');
	const year = dateArr[0];
	const month = parseInt(dateArr[1]);
	const day = parseInt(dateArr[2]);


	return `${day} Tháng ${month} Năm ${year}`;
};

export const GetFilesUpload = files => {
	let rFiles = [];
	files.map(file => {
		if(!CheckAttr(file, 'uid'))
			rFiles.push(file);
	});
	return rFiles;
};

export const GetTotalPages = all => {
	if(all === 0)
		return 1;
	return Math.ceil(all/DATA_LIMIT);
};

export const GetOffsetPage = page => {
	return (page-1)*DATA_LIMIT;
};

export const DisableWebKeyboard = () => {
	document.onkeydown = function (event) {
	    event = event || window.event;
	    var control = event.which || event.keyCode || document.all;
	    switch(control){
	    	case 112:
	    	case 113:
	    	case 114:
	    	case 115:
	    	case 116:
	    	case 117:
	    	case 118:
	    	case 119:
	    	case 120:
	    		event.preventDefault();
	    		event.stopPropagation();
	    }
	};
};

export const GetContentHeight = (element) => {
	return $(window).height()-48-43;
};

export const ScrollIntoView = (element, container) => {
	/*if(typeof $(element).offset() !== 'undefined'){
		const containerTop = $(container).scrollTop();
		const containerBottom = containerTop + $(container).height();
		const elemTop = $(element).offset().top;
		const elemBottom = elemTop + $(element).height();
		if(elemTop < containerTop)
			$(container).scrollTop(elemTop);
		else if(elemBottom > containerBottom)
			$(container).scrollTop(elemBottom-$(container).height());
	}*/
};

export const GetListQuery = (list, offset, limit, search) => {
	let array = [];
	const length = (list.length <= (offset+limit)) ? list.length: (offset+limit);
	for(let i = offset; i < length; i++){
		let l = list[i];
		var valid = true;
		for(var key in search){
			var value = search[key];
			var lkey = l[key];
			if(typeof lkey.indexOf === 'function'){
				if(lkey.indexOf(value) === -1){
					valid = false;
				}
			}else{
				if(lkey != value && value !== ''){
					valid = false;
				}
			}
		}
		if(valid)
			array.push(l);
	}
	return array;
};