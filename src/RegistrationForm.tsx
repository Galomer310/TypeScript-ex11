import useForm from "./useForm";

const RegistrationForm = () => {
  const { values, errors, handleChange, handleSubmit } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = () => {
    alert("Form submitted successfully!");
    console.log(`Email: ${values.email} Password: ${values.password}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
