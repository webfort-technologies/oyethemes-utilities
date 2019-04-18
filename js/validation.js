/*
	Developed By : Princepal Singh
	Started_on : 15-04-2019
*/

class validation{

	constructor(validate = [],data = []) {
		if (validate.length !=0 && data.length != 0) {
			this.validate = validate;
			this.data = data;
		}else{
			console.log('One of the array is empty!');
		}
	}

	static generateDataArray(){
		var tempArray = [];
		return tempArray
	}

	static generateErrorArray(data){
		var array = [];
		for (var key in data) {
		  	if (data.hasOwnProperty(key)) {
		    	// var val = data[key];
		    	// console.log(val);
				array[key] = {
	                            errorStatus : false,
	                            errors : []
	                        }; 
		  	}
		}
		return array;
	}

	static validateEmail(email) {
    	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(String(email).toLowerCase());
	}
	validateData(validations,key){
		// console.log(validations);
		var self = this;
		var array = [];
		var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		for (var i = 0; i < validations.length; i++) {

			switch(validations[i].type) {
			  	case 'email':
			    	// email validation
			    	if (!emailRegex.test(String(self.data[key]).toLowerCase())) {
			    		array.push(`Email is not valid`);
			    	}
			    	break;
			  	case 'minLen':
			    	// minimun length validation
			    	if ( self.data[key].length < (typeof validations[i].value === 'undefined' ? 5 : validations[i].value)) {
			    		array.push(`Value Should be greater than ${typeof validations[i].value === 'undefined' ? 5 : validations[i].value}`)
			    	}
			    	break;
			    case 'maxLen':
			    	// maximum length validation
			    	if ( self.data[key].length > (typeof validations[i].value === 'undefined' ? 10 : validations[i].value)) {
			    		array.push(`Value Should be less than ${typeof validations[i].value === 'undefined' ? 5 : validations[i].value}`)
			    	}
			    	break; 
			    case 'minMaxLen':
			    	// minimum length validation
			    	if ( self.data[key].length < (typeof validations[i].range[0] === 'undefined' ? 5 : validations[i].range[0])) {
			    		array.push(`Value Should be greater than ${typeof validations[i].range[0] === 'undefined' ? 5 : validations[i].range[0]}`)
			    	}

			    	// maximum length validation
			    	if ( self.data[key].length > (typeof validations[i].range[1] === 'undefined' ? 10 : validations[i].range[1])) {
			    		array.push(`Value Should be less than ${typeof validations[i].range[1] === 'undefined' ? 5 : validations[i].range[1]}`)
			    	}
			    	break;
			    case 'required':
			    	// maximum length validation
			    	if ( self.data[key].trim() == '' ) {
			    		array.push(`This Field is Required`);
			    	}
			    	break;
			    case 'minVal':
			    	// minimum value validation
			    	if ( parseInt(self.data[key]) < (typeof validations[i].value === 'undefined' ? 10 : validations[i].value) ) {
			    		array.push(`Value Should be greater than ${typeof validations[i].value === 'undefined' ? 5 : validations[i].value}`)
			    	}
			    	break;
			    case 'maxVal':
			    	// maximum length validation
			    	if ( self.data[key].length > (typeof validations[i].value === 'undefined' ? 10 : validations[i].value)) {
			    		array.push(`Value Should be less than ${typeof validations[i].value === 'undefined' ? 5 : validations[i].value}`)
			    	}
			    	break; 
			  	default:
			    	// if validation doesn't exists 
			    	console.log(`${validations[i].type} is not present in library. Please Check misspelling. Thank You`);
			}
		}
		// console.log(array);
		return array;
	}

	startValidate(){
		var self = this;
		var validatedArray = [];

		for (var i = 0; i < this.validate.length; i++) {
			var temp = this.validateData(this.validate[i].validations,this.validate[i].key);
			// console.log(temp);
			// var values = {};
			validatedArray[this.validate[i].key] = { errorStatus: temp.length > 0 ? true : false , errors : temp };
			// validatedArray.push( values );
		}
		// console.log(validatedArray);
		return validatedArray;
	}
}
