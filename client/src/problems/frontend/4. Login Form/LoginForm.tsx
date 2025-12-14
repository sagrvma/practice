import {
  useState,
  type ChangeEvent,
  type ComponentProps,
  type FormEvent,
} from "react";
import "./LoginForm.css";

interface FormValues {
  username: string;
  email: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
}

interface input {
  id: number;
  name: keyof FormValues;
  type: string;
  placeholder: string;
  label: string;
  required?: boolean;
  pattern?: string;
}

interface FormInputProps extends ComponentProps<"input"> {
  label: string;
}

const inputs: input[] = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "User Name",
    label: "User Name",
    // required: true,
    // pattern: "^[A-Za-z0-9]{3,16}$",
  },
  {
    id: 2,
    name: "email",
    type: "email",
    placeholder: "Email Address",
    label: "Email",
    // required: true,
  },
  {
    id: 3,
    name: "birthDate",
    type: "date",
    placeholder: "Birth Date",
    label: "Birth Date",
    // required: true,
  },
  {
    id: 4,
    name: "password",
    type: "password",
    placeholder: "Enter Password",
    label: "Password",
    // required: true,
  },
  {
    id: 5,
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    label: "Confirm Password",
    // required: true,
  },
];

const FormInput = (props: FormInputProps) => {
  const { label, onChange, ...inputProps } = props;
  return (
    <label className="formField">
      {label}
      <input className="formInput" {...inputProps} onChange={onChange} />
    </label>
  );
};

const LoginForm = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    username: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState<FormValues>({
    username: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (errorMsg[e.target.name as keyof FormValues]) {
      setErrorMsg((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: Partial<FormValues> = {};

    if (!formValues.username) {
      errors.username = "Username is mandatory";
    } else if (formValues.username && formValues.username.length < 3) {
      errors.username = "Username must be atleast 3 characters long.";
    }

    if (!formValues.email) {
      errors.email = "Email is mandatory.";
    }

    if (!formValues.birthDate) {
      errors.birthDate = "Date of Birth is mandatory.";
    }

    if (!formValues.password) {
      errors.password = "Password is mandatory";
    } else if (formValues.password && formValues.password.length < 8) {
      errors.password = "Password must be 8 characters long.";
    }

    if (!formValues.confirmPassword) {
      errors.confirmPassword = "Password is mandatory";
    } else if (
      formValues.password &&
      formValues.confirmPassword &&
      formValues.password !== formValues.confirmPassword
    ) {
      errors.confirmPassword = "Passwords don't match.";
    }

    setErrorMsg(errors as FormValues);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);

      alert("Registration successfull!");
    }, 1000);
  };

  return (
    <div className="formWrapper">
      <form onSubmit={handleSubmit}>
        <h1 className="formTitle">Register</h1>
        {inputs.map((input) => (
          <div key={input.id}>
            <FormInput
              {...input}
              id={input.id.toString()}
              value={formValues[input.name]}
              onChange={handleChange}
            />
            {errorMsg[input.name] && (
              <span className="errorMessage">{errorMsg[input.name]}</span>
            )}
          </div>
        ))}
        <button className="formButton" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export const meta = {
  title: "Login Form with Validation",
  category: "frontend" as const,
};

export default LoginForm;
