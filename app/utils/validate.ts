import {
  AnyObjectSchema,
  InferType,
  string,
  ValidationError,
  object,
} from "yup";
import { ValidateOptions } from "yup/lib/types";

export const withFormValidator = <Schema extends AnyObjectSchema>(
  scheme: Schema
) => {
  return Object.assign(scheme, {
    validateForm: async (formData: FormData, option?: ValidateOptions<any>) => {
      const value = Object.fromEntries([...formData.entries()]);

      try {
        const result = await scheme.validate(value, {
          ...(option || {}),
          abortEarly: false,
        });
        return { data: result, errors: undefined };
      } catch (e) {
        const err = e as ValidationError;
        const errors = err.inner.reduce((acc, curr) => {
          if (!curr.path) {
            return acc;
          }
          acc[curr.path as keyof InferType<Schema>] = curr.message;
          return acc;
        }, {} as Record<keyof InferType<Schema>, string>);

        return {
          data: undefined,
          errors,
        };
      }
    },
  });
};

export const postScheme = withFormValidator(
  object({
    title: string().required("제목을 입력해주세요."),
    content: string().default(""),
    excerpt: string().default(""),
  })
);

export const userScheme = withFormValidator(
  object({
    email: string()
      .email("올바른 이메일 형식을 입력해주세요.")
      .required("이메일을 입력해주세요."),
    password: string().required("패스워드를 입력해주세요."),
  })
);
