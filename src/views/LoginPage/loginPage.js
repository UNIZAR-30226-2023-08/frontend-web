import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { MyCheckbox, MyTextInput } from "../../components/Forms/forms";
import * as Yup from "yup";

export function LoginPage() {
  return (
    <div className="flex h-[80vh] flex-col justify-center items-center">
      <img
        className="mb-4"
        src="https://via.placeholder.com/150 "
        alt="placeholder"
      />
      <Formik
        initialValues={{
          usuario: "",
          passwd: "",
          keepSession: false,
        }}
        validationSchema={Yup.object({
          usuario: Yup.string().required("Obligatorio"),
          passwd: Yup.string().required("Obligatorio"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="flex flex-col max-w-lg md:min-w-[50vw] sm:min-w-[80vw]">
          <MyTextInput
            label="Nombre de usuario"
            name="usuario"
            type="text"
            placeholder="fernandoalo"
          />
          <MyTextInput
            label="Contraseña"
            name="passwd"
            type="password"
            placeholder="micontraseña33"
          />

          <MyCheckbox name="keepSession">
            &ensp;Mantener sesión iniciada
          </MyCheckbox>

          <button
            type="submit"
            className="w-full rounded bg-primary-500 px-6 py-2.5 text-md font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Enviar
          </button>

          <p className="mt-4 text-md checkbox text-dark dark:text-gray-200">
            ¿No tienes cuenta?&ensp;
            <Link to='/register' className="text-primary-600 dark:text-primary-300 hover:underline">
              Regístrate ahora
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
}
