let elmn1 = document.querySelector(".many--1");
let elmn2 = document.querySelector(".many--2");

for(let i =1;i<=100;i++)
{
	elmn1.innerHTML +=`<option value=${i}>${i}</option>`;
	elmn2.innerHTML +=`<option value=${i}>${i}</option>`;
}

let validate = async (e) => {
	e.preventDefault();

	let valid = true;

	let name = document.querySelector("#name");
	let email = document.querySelector("#email");
	let phone = document.querySelector("#phone");
	let notarisations = document.querySelector("#notarisations");
	let signers = document.querySelector("#signers");

	if(/^[a-zA-Z ]+$/.test(name.value.trim())===false)
	{
		makeError(name,"Name should not contain any numbers or whitespace");
		valid=false;
    }
	else
	{
		makeSuccess(name,"Name is valid");
	}


	if(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/.test(email.value)===false)
	{
		makeError(email,"Enter a valid email");
		valid=false;
	}
	else
	{
		makeSuccess(email,"Entered email is valid");
	}

	if(/^\d+$/.test(phone.value)===false || phone.value.length!=10)
	{
		makeError(phone,"Phone number must contains 10 digits");
		valid=false;
	}
	else
	{
		makeSuccess(phone,"Phone number is valid");
	}

	if (notarisations.value)
	{
		makeSuccessSelect(notarisations,"Entered Value is valid");
	}
	else
	{
		makeErrorSelect(notarisations,"Enter a valid value");
		valid=false;
	}

	if (signers.value)
	{
		makeSuccessSelect(signers,"Entered Value is valid")
	}
	else
	{
		makeErrorSelect(signers,"Enter a valid value");
		valid=false;
	}

	if(valid)
	{
		let data = {
			name:name.value,
			email:email.value,
			phoneNumber:phone.value,
			noOfSigners:notarisations.value,
			noOfNotarizations:signers.value
		};

		document.querySelector(".loading").style.display = "inherit";
		let res = await setFetchRequest("https://api-notarize.herokuapp.com/customer/createPublicOrder",data);
		res = res.status;
		document.querySelector(".loading").style.display = "none";
		if(res)
		{
			document.querySelector(".part--1").style.display="none";
			document.querySelector(".part--2").style.display="inherit";
		}
		else
		{
			alert("Please check your network connection");
		}
	}

	return valid;
}

let makeError = (name,text) => {
	let tar = name.nextElementSibling;
	tar.innerHTML = text;
	tar.classList.add("error");
	tar.classList.remove("success");
	tar.style.display = "inherit";
}

let makeSuccess = (name,text) => {
	let tar = name.nextElementSibling;
	tar.innerHTML = text;
	tar.classList.remove("error");
	tar.classList.add("success");
	tar.style.display = "inherit";
}

let makeErrorSelect = (name,text) => {
	let tar = name.parentElement.nextElementSibling;
	tar.innerHTML = text;
	tar.classList.add("error");
	tar.classList.remove("success");
	tar.style.display = "inherit";
}

let makeSuccessSelect = (name,text) => {
	let tar = name.parentElement.nextElementSibling;
	tar.innerHTML = text;
	tar.classList.remove("error");
	tar.classList.add("success");
	tar.style.display = "inherit";
}



setFetchRequest = async (url,data) => {
    let response = await fetch(url,
    {
        method: 'POST',
        body: data,
    });

    let result = await response.json();

	console.log(result);
    return result;
}
