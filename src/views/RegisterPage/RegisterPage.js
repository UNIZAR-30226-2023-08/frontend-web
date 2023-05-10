import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { MyCheckbox, MyTextInput } from "../../components/Forms/forms";
import * as Yup from "yup";
import { BACKEND_URL, REGISTER_ENDPOINT } from "../../config";

/**
 * Componente formulario de registro.
 * @returns
 */
export function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-[80vh] flex-col justify-center items-center">
      <img
        className="mb-4"
        src="https://via.placeholder.com/150 "
        alt="placeholder"
      />
      <Formik
        initialValues={{
          real_name: "",
          username: "",
          email: "",
          hashed_password: "",
          acceptedTerms: false, // added for our checkbox
          // jobType: "", // added for our select
        }}
        validationSchema={Yup.object({
          real_name: Yup.string().required("Obligatorio"),
          username: Yup.string().required("Obligatorio"),
          hashed_password: Yup.string().required("Obligatorio"),
          email: Yup.string()
            .email("Formato incorrecto`")
            .required("Obligatorio"),
          acceptedTerms: Yup.boolean()
            .required("Obligatorio")
            .oneOf([true], "Debes aceptar los términos"),
          // jobType: Yup.string()
          //   // specify the set of valid values for job type
          //   // @see http://bit.ly/yup-mixed-oneOf
          //   .oneOf(
          //     ["designer", "development", "product", "other"],
          //     "Invalid Job Type"
          //   )
          //   .required("Required"),
        })}
        onSubmit={(values) => {
          fetch('http://' + BACKEND_URL + REGISTER_ENDPOINT, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(values, null, 2),
            headers: {
              "Content-type": "application/json",
            },
          })
          .then(() => navigate("/login"));

          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));

          //   setSubmitting(false);
          // }, 400);
        }}
      >
        <Form className="flex flex-col max-w-lg md:min-w-[50vw] sm:min-w-[80vw]">
          <MyTextInput
            label="Correo electrónico"
            name="email"
            type="email"
            placeholder="micuenta@mail.com"
          />
          <MyTextInput
            label="Nombre real"
            name="real_name"
            type="text"
            placeholder="Fernando Alonso"
          />
          <MyTextInput
            label="Nombre usuario"
            name="username"
            type="text"
            placeholder="alo33"
          />
          <MyTextInput
            label="Contraseña"
            name="hashed_password"
            type="password"
            placeholder="micontraseña33"
          />

          {/* <MySelect label="Job Type" name="jobType">
            <option value="">Select a job type</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </MySelect> */}
          <MyCheckbox name="acceptedTerms">
            &ensp;Acepto los&nbsp;
            <a
              className="text-primary-600 dark:text-primary-300 hover:underline"
              href="https://unizar.es"
            >
              términos y condiciones
            </a>
          </MyCheckbox>

          <button
            type="submit"
            className="w-full rounded bg-primary-500 px-6 py-2.5 text-md font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Confirmar
          </button>
          <p className="mt-4 text-md checkbox text-dark dark:text-gray-200">
            ¿Ya tienes cuenta?&ensp;
            <Link
              to="/login"
              className="text-primary-600 dark:text-primary-300 hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
}
