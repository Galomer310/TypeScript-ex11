import { useState } from "react";

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const useForm = (initialValues: FormValues) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!values.email.includes("@")) {
      newErrors.email = "Invalid email address.";
    }
    if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit =
    (onSubmit: () => void) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validate()) {
        onSubmit();
      }
    };

  return { values, errors, handleChange, handleSubmit };
};

export default useForm;
