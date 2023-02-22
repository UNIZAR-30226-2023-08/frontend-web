/**
 * Guinyote -- Proyecto Software
 * Universidad de Zaragoza
 * Curso 2022/2023
 * @author Grupo 8 -- Roberta Williams
 */
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

/**
 * Componente de entrada de texto
 * @returns entrada de texto, label asociada y, si procede, mensaje de error
 */
function MyTextInput({ label, ...props }) {
  const [field, meta] = useField(props);

  const inputStyle =
    meta.touched && meta.error ? "border-danger-400" : "border-primary-400";

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className=" mt-4 text-lg text-dark dark:text-gray-200"
      >
        {label}
      </label>
      <input
        className={`${inputStyle} text-input text-lg border-2 peer block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear motion-reduce:transition-none dark:text-neutral-200`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-danger-400">{meta.error}</div>
      ) : null}
    </>
  );
}

/**
 * Componente de selección de casilla
 * @returns casilla, label asociada y, si procede, mensaje de error
 */
function MyCheckbox({ children, ...props }) {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label
        className="my-6 text-md checkbox text-dark dark:text-gray-200"
        htmlFor={props.id || props.name}
      >
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="text-md text-danger-400">{meta.error}</div>
      ) : null}
    </>
  );
}

function MySelect({ label, ...props }) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      {/* <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null} */}
    </>
  );
}
/**
 * Componente formulario de registro.
 * @returns
 */
export function RegisterForm() {
  return (
    <>
      <img className="mb-4" src="https://via.placeholder.com/150 " />
      <Formik
        initialValues={{
          nombre: "",
          usuario: "",
          email: "",
          acceptedTerms: false, // added for our checkbox
          // jobType: "", // added for our select
        }}
        validationSchema={Yup.object({
          nombre: Yup.string().required("Obligatorio"),
          usuario: Yup.string().required("Obligatorio"),
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
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="flex flex-col max-w-lg md:min-w-[50vw] sm:min-w-[80vw]">
          <MyTextInput
            label="Nombre real"
            name="nombre"
            type="text"
            placeholder="Fernando Alonso"
          />
          <MyTextInput
            label="Nombre de usuario"
            name="usuario"
            type="text"
            placeholder="fernandoalo"
          />
          <MyTextInput
            label="Correo electrónico"
            name="email"
            type="email"
            placeholder="micuenta@mail.com"
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
              href="unizar.es"
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
        </Form>
      </Formik>
    </>
  );
}
