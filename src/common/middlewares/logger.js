const logger = store => next => action => {
	//const findForm = action.type.indexOf('Field');

	let result = next(action);
	//if(findForm === -1){
		//console.group(action.type);
		//console.info('dispatching', action);
		console.group(action.type);
		console.info('next state', store.getState());
		console.groupEnd(action.type);
		//console.groupEnd(action.type);
	//}

	return result;
}

export default logger;