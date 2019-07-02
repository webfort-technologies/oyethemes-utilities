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
		var array = {};
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
		var requierd = false;
		for (var i = 0; i < validations.length; i++) {
			
			var index = validations.map(function(data){ return data.type }).indexOf('required');

			switch(validations[i].type) {
			  	case 'email':
					if (index == -1 || requierd) {
						// email validation
						if (!emailRegex.test(String(self.data[key]).toLowerCase())) {
							array.push(`Email is not valid`);
						}
					}
			    	break;
				case 'minLen':// Input should be greater than 3 characters
					if (index == -1 || requierd) {
						// minimun length validation
						if ( self.data[key].length < (typeof validations[i].value === 'undefined' ? 5 : validations[i].value)) {
							array.push(`Input should be greater than ${typeof validations[i].value === 'undefined' ? 5 : validations[i].value} characters`)
						}
					}
			    	break;
			    case 'maxLen':
					if (index == -1 || requierd) {
						// maximum length validation
						if ( self.data[key].length > (typeof validations[i].value === 'undefined' ? 10 : validations[i].value)) {
							array.push(`Input should be less than ${typeof validations[i].value === 'undefined' ? 5 : validations[i].value} characters`)
						}
					}
			    	break; 
			    case 'minMaxLen':
					if (index == -1 || requierd) {
						// minimum length validation
						if ( self.data[key].length < (typeof validations[i].range[0] === 'undefined' ? 5 : validations[i].range[0])) {
							array.push(`Input should be greater than ${typeof validations[i].range[0] === 'undefined' ? 5 : validations[i].range[0]} characters`)
						}
	
						// maximum length validation
						if ( self.data[key].length > (typeof validations[i].range[1] === 'undefined' ? 10 : validations[i].range[1])) {
							array.push(`Input should be less than ${typeof validations[i].range[1] === 'undefined' ? 5 : validations[i].range[1]} characters`)
						}
					}
			    	break;
			    case 'required':
					requierd = true;
			    	// maximum length validation
			    	if ( self.data[key].trim() == '' ) {
						array.push(`This Field is Required`);
						requierd = false;
			    	}
			    	break;
			    case 'minVal':
					if (index == -1 || requierd) {
						// minimum value validation
						if ( parseInt(self.data[key]) < (typeof validations[i].value === 'undefined' ? 10 : validations[i].value) ) {
							array.push(`Value Should be greater than ${typeof validations[i].value === 'undefined' ? 5 : validations[i].value}`)
						}
					}
			    	break;
			    case 'maxVal':
					if (index == -1 || requierd) {
						// maximum length validation
						if ( self.data[key].length > (typeof validations[i].value === 'undefined' ? 10 : validations[i].value)) {
							array.push(`Value Should be less than ${typeof validations[i].value === 'undefined' ? 5 : validations[i].value}`)
						}
					}
					break;
				case 'numeric':
					if (index == -1 || requierd) {
						// maximum length validation
						if (isNaN(self.data[key])) {
							array.push(`Entered value is not a number`);
						}
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

	startValidate(callback = undefined){
		var self = this;
		var validatedArray = {};
		var errorCount = 0;
		for (var i = 0; i < this.validate.length; i++) {
			var temp = this.validateData(this.validate[i].validations,this.validate[i].key);
			// console.log(temp);
			// var values = {};
			if (temp.length > 0) {
				errorCount++;
			}

			validatedArray[this.validate[i].key] = { errorStatus: temp.length > 0 ? true : false , errors : temp };
			// validatedArray.push( values );
		}

		if (typeof callback != undefined) {
			return callback( validatedArray, errorCount );
		}
		// console.log(validatedArray);

		return validatedArray;
	}
}
