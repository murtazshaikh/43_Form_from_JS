const fs = require("fs");

const formFields = [
  {
    key: "user_name",
    label: "Name",
    type: "text",
    maxLength: "50",
  },
  {
    key: "mobile_no",
    label: "Mobile number",
    type: "mobile_number",
  },
  {
    key: "email",
    label: "Email",
    type: "email",
  },
];

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Form from JS</title>
  <style>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body {
      font-family: sans-serif;
      padding: 30px;
      background: #f5f5f5;
    }

    form {
      max-width: 400px;
      margin: auto;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    label {
      display: block;
      margin-top: 15px;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 8px;
    }

    button {
      margin-top: 20px;
      padding: 10px;
      width: 100%;
    }
  </style>
</head>
<body>
  <form id="dynamicForm"></form>

  <script>
    const formFields = ${JSON.stringify(formFields, null, 2)};

    const form = document.getElementById("dynamicForm");

    const heading = document.createElement("h1");
    heading.textContent = "WIFY JSON form test";
    form.appendChild(heading);

    formFields.forEach((field) => {
      const label = document.createElement("label");
      label.textContent = field.label;

      const input = document.createElement("input");
      input.name = field.key;
      input.required = true;

      if(field.type === "mobile_number") {
        input.type = "number";
        input.maxLength = 10;
        input.minLength = 10;
      } else {
        input.type = field.type || "text";
        if (field.maxLength) input.maxLength = field.maxLength;
      }

      form.appendChild(label);
      form.appendChild(input);
    });

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Submit";
    form.appendChild(button);

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const inputs = form.querySelectorAll("input");
      let valid = true;

      const mobileInput = form.querySelector("input[name='mobile_no']");
      if(mobileInput && (mobileInput.value.length !== 10 || isNaN(mobileInput.value))) {
        alert("Mobile number must be 10 digits.");
        mobileInput.focus();
        return;
      }

      if(valid) {
        alert("Submitted successfully");
        form.reset();
      }
    });
  </script>
</body>
</html>`;

fs.writeFileSync("index.html", htmlContent);
console.log("Form created: index.html");
