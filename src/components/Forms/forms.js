/**
 * Guinyote -- Proyecto Software
 * Universidad de Zaragoza
 * Curso 2022/2023
 * @author Grupo 8 -- Roberta Williams
 */
import React, { useState } from "react";
import { useField } from "formik";
import * as Yup from "yup";

/**
 * Componente de entrada de texto
 * @returns entrada de texto, label asociada y, si procede, mensaje de error
 */
export function MyTextInput({ label, ...props }) {
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
export function MyCheckbox({ children, ...props }) {
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

export function MySelect({ label, ...props }) {
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