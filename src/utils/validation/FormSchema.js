import * as Yup from 'yup';
 
const getValidationMessages = (language) => {
  return {
    name: {
      required: language === 'ar' ? "الاسم مطلوب" : "Name is required",
      match: language === 'ar' ? "يجب أن يحتوي الاسم على حروف فقط" : "Name should contain letters only",
    },
    email: {
      required: language === 'ar' ? "البريد الإلكتروني مطلوب" : "Email is required",
      invalid: language === 'ar' ? "يرجى إدخال عنوان بريد إلكتروني صالح" : "Please enter a valid email address",
    },
    mobilePhone: {
      required: language === 'ar' ? "رقم الهاتف المحمول مطلوب" : "Phone number is required",
      match: language === 'ar' ? "يجب أن يحتوي رقم الهاتف على أرقام فقط" : "Phone number should contain only numbers",
      min: language === 'ar' ? "يجب أن يكون رقم الهاتف على الأقل 10 أرقام" : "Phone number should be at least 10 digits",
      max: language === 'ar' ? "يجب ألا يتجاوز رقم الهاتف 15 رقماً" : "Phone number should not exceed 15 digits",
    },
    courtSections: {
      court: language === 'ar' ? "اسم الملعب مطلوب" : "Court name is required",
      date: {
        required: language === 'ar' ? "التاريخ مطلوب" : "Date is required",
        typeError: language === 'ar' ? "التاريخ مطلوب" : "Date is required",
      },
      time: {
        required: language === 'ar' ? "الوقت مطلوب" : "Time is required",
      },
    },
  };
};


export const validationSchema = (language) => {
  const messages = getValidationMessages(language);

  return Yup.object({
    name: Yup.string()
    .matches(/^[A-Za-z\u0621-\u064A\s]+$/, messages.name.match)
      .required(messages.name.required),
    
    email: Yup.string()
      .email(messages.email.invalid)
      .required(messages.email.required),
    
    mobilePhone: Yup.string()
      .matches(/^[0-9]+$/, messages.mobilePhone.match)
      .min(10, messages.mobilePhone.min)
      .max(15, messages.mobilePhone.max)
      .required(messages.mobilePhone.required),
    
    courtSections: Yup.array().of(
      Yup.object({
        court: Yup.string().required(messages.courtSections.court),
        date: Yup.date()
          .typeError(messages.courtSections.date.typeError)
          .required(messages.courtSections.date.required)
          .nullable(),
        time: Yup.string().required(messages.courtSections.time.required),
      })
    ),
  });
};
