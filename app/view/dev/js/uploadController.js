function createHidden(inputName, inputValue) {
	var el = document.createElement('input');
	el.type="hidden";
	el.name=inputName;
	el.value=inputValue;
	return el;
}

function multipleValues(inputName, formName) {
	var form = document.forms[formName];
	var field = form.elements[inputName];

	var arr = field.value.split(",");
	if (arr.length==0) return; 

	field.value = $.trim(arr[0]);
	
	for (var i=1; i<arr.length; i++) {
		if ($.trim(arr[i])=='')
			continue;

		form.appendChild(createHidden(
			field.name,	
			$.trim(arr[i])
		));
	}
}

Big.UploadController = Ember.Controller.extend({
	submit: function() {
		multipleValues("author", "upload");
		multipleValues("keywords", "upload");
	}
});
