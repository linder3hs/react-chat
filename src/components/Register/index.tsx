import { useState } from "react";
import { post } from "../../services";
const inputs = [
  {
    id: 1,
    name: "name",
    type: "text",
    placeholder: "Ingrese su nombre",
  },
  {
    id: 2,
    name: "lastname",
    type: "text",
    placeholder: "Ingrese su apellido",
  },
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Ingrese su email",
  },
  {
    id: 1,
    name: "password",
    type: "password",
    placeholder: "Ingrese su password",
  },
];

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await post({
      url: "/users",
      body: form,
    });
    localStorage.setItem("user", JSON.stringify(response.data));
  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-semibold my-5 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            {inputs.map((input) => (
              <input
                key={input.name + input.id}
                type={input.type}
                placeholder={input.placeholder}
                name={input.name}
                value={form[input.name as keyof typeof form]}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
            ))}
          </div>
          <div className="mt-5">
            <button type="submit" className="btn btn-primary w-full">
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
