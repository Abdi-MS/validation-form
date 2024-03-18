import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import "./ValidationForm.css";

const ValidationForm = () => {
  const form = useForm();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
    watch,
    trigger,
  } = form;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^\d{11}$/;
  const passRegex =
    /^(?!.*\s)(?=.*[!@#$%^&*()_+{}|:"<>?`~\-=[\];',./])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

  const formSubmit = (data) => {
    console.log("Form submitted, data >>> ");
    console.log(data);
  };

  const validateName = (value) => {
    return true;
  };

  const validatePass = (value) => {
    if (!passRegex.test(value)) {
      setError("password", {
        type: "manual",
        message:
          "Password must be atleast 8 characters long, and have atleast one capital letter, one small letter, one number, and a special character",
      });
      return false;
    }
    setError("password", null);
    return true;
  };

  const validateRepPass = (value) => {
    let mainPass = watch("password");
    if (value !== mainPass) {
      setError("repPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return false;
    }
    setError("repPassword", null);
    return true;
  };

  const printErrors = () => {
    console.log("errors >>> ");
    console.log(errors);
  };

  const validateContact = (value) => {
    console.log("contact validation being triggered");
    if (!contactRegex.test(value)) {
      setError("contact", {
        type: "manual",
        message: "Please enter a valid 11-digit Contact Number.",
      });
      return false;
    }
    setError("contact", null);
    return true;
  };

  const validateEmails = (value) => {
    let emails = value.split(",");
    let EmailErrors = [];
    emails = emails.map((email) => email.trim());
    for (let email of emails) {
      if (!emailRegex.test(email) && email !== "") {
        EmailErrors.push(email);
      }
    }
    if (EmailErrors.length > 0) {
      setError("emails", {
        type: "manual",
        message: EmailErrors.map(
          (email) => `'${email}' is not a valid email\n`
        ),
      });
      return false;
    } else {
      setError("emails", null);
      return true;
    }
  };

  return (
    <form className="form">
      //name
      <br />
      <TextField
        placeholder="John Doe"
        {...register("name", {
          required: "Name can not be empty",
          validate: (value) => validateName(value),
        })}
        label="Full Name"
        variant="standard"
        onBlur={printErrors}
      />
      {errors.name && <p>{errors.name.message}</p>}
      //password
      <br />
      <TextField
        {...register("password", {
          required: "Password can not be empty",
          validate: (value) => validatePass(value),
        })}
        label="Password"
        type="password"
        variant="standard"
        onBlur={printErrors}
      />
      {errors.password && <p>{errors.password.message}</p>}
      //confirm password
      <br />
      <TextField
        {...register("repPassword", {
          required: "Please confirm your password",
          validate: (value) => {
            return validateRepPass(value);
          },
        })}
        label="Repeat Password"
        type="password"
        variant="standard"
        onBlur={() => {
          trigger("repPassword");
          printErrors();
        }}
      />
      {errors.repPassword && <p>{errors.repPassword?.message}</p>}
      //contact
      <br />
      <TextField
        {...register("contact", {
          required: "Please enter an 11-digit phone number",
          validate: (value) => validateContact(value),
        })}
        label="Contact"
        variant="standard"
        onBlur={printErrors}
      />
      {errors.contact && <p>{errors.contact.message}</p>}
      //emails
      <br />
      <TextField
        className="textfield"
        placeholder="example@email.com (separate multiple emails with ',')"
        {...register("emails", {
          required: false,
          validate: (value) => {
            validateEmails(value);
          },
        })}
        label="Enter your Email"
        variant="standard"
        onBlur={() => {
          trigger("emails");
          printErrors();
        }}
      />
      {errors.emails && <p>{errors.emails.message}</p>}
      <Button disabled={!isValid} onClick={handleSubmit(formSubmit)}>
        Submit form
      </Button>
    </form>
  );
};

export default ValidationForm;
