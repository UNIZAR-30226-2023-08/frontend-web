import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { MyCheckbox, MyTextInput } from "../../components/Forms/forms";
import * as Yup from "yup";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { BACKEND_URL, LOGIN_ENDPOINT, PROTOCOL } from "../../config";

export function LoginPage({ setUsername }) {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-[80vh] flex-col justify-center items-center">
      <img
        className="mb-4"
        src="/logo.png"
        alt="placeholder"
      />
      <Formik
        initialValues={{
          username: "",
          password: "",
          keepSession: false,
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("Obligatorio"),
          password: Yup.string().required("Obligatorio"),
        })}
        onSubmit={(values) => {
          const params = new URLSearchParams();
          params.append("username", values["username"]);
          params.append("password", values["password"]);
          fetch(PROTOCOL + BACKEND_URL + LOGIN_ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params,
          })
            .then((response) => {
              if (!response.ok) {
                console.log(response);
                alert("Acceso no permitido"); //TODO poner bonito
                throw new Error("Acceso no permitido");
              } else {
                console.log(response);
                return response.json();
              }
            })
            .then((data) => {
              console.log(data["access_token"]);
              localStorage.setItem("access_token", data["access_token"]);
              localStorage.setItem("username", values["username"]);
              setUsername(values["username"])
              console.log(localStorage.getItem("access_token"));
              navigate("/");
            })
            .catch((e) => console.log(e));
        }}
      >
        <Form className="flex flex-col max-w-lg md:min-w-[50vw] sm:min-w-[80vw]">
          <MyTextInput
            label="Nombre de usuario"
            name="username"
            type="text"
            placeholder="fernandoalo"
          />
          <MyTextInput
            label="Contraseña"
            name="password"
            type="password"
            placeholder="micontraseña33"
          />

          {/* <MyCheckbox name="keepSession">
            &ensp;Mantener sesión iniciada
          </MyCheckbox> */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full rounded bg-primary-500 px-6 py-2.5 text-md font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Enviar
          </button>
          <BeatLoader className="mt-6 mb-4 self-center" loading={isLoading} />
          <p className="mt-4 text-md checkbox text-dark dark:text-gray-200">
            ¿No tienes cuenta?&ensp;
            <Link
              to="/register"
              className="text-primary-600 dark:text-primary-300 hover:underline"
            >
              Regístrate ahora
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
}
