import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Title, Button, TextArea, Input, Label, ErrorMessage } from '@/components/ui';
import { emailRegex } from '@/utils/validationsRegex';
import { errorMessages, CustomErrorCodes } from '@/utils/errorCodeMessages';
import { useFormspark } from '@formspark/use-formspark';

const FORMSPARK_FORM_ID = "VBuUk83dI";

const ContactPage = () => {

  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });

  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    emailError: '',
    subjectError: '',
    messageError: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [`${name}Error`]: ''
    });
  };

  const validateForm = () => {
    const newErrors = {
      emailError: '',
      subjectError: '',
      messageError: ''
    };
    let isValid = true;

    if (!formData.email) {
      newErrors.emailError = errorMessages[CustomErrorCodes.REQUIRED_FIELD];
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.emailError = errorMessages[CustomErrorCodes.INVALID_EMAIL];
      isValid = false;
    }

    if (!formData.subject) {
      newErrors.subjectError = errorMessages[CustomErrorCodes.REQUIRED_FIELD];
      isValid = false;
    }

    if (!formData.message) {
      newErrors.messageError = errorMessages[CustomErrorCodes.REQUIRED_FIELD];
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      Object.values(errors).forEach(error => {
        if (error) toast.error(error);
      });
      return;
    }

    try {
      await submit(formData);e
      toast.success('Message sent successfully');
      setFormData({
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="container mx-auto p-4 mb-[100px]">
      <Toaster position="top-center" reverseOrder={false} />
      <Title>Contact Us</Title>
      <div className='flex flex-col md:flex-row items-start gap-6'>
        <div className="w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1325163.3586476257!2d-122.93836384030406!3d37.43456729132762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806415f06bdf%3A0xf048a8b5bd7b0cf3!2sGoogle%20San%20Francisco%20-%20345%20Spear%20St!5e0!3m2!1ses!2ses!4v1718611771622!5m2!1ses!2ses"
            className="w-full h-96 border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col w-full'>
          <div className='flex flex-col'>
            <div className="flex flex-col lg:flex-col lg:flex-nowrap justify-center content-center lg:max-w-[450px] mb-2 lg:mb-0 lg:m-auto">
              <Label htmlFor="email">Email address<span className="text-red_color">*</span></Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div style={{ height: '20px' }}>
                <ErrorMessage message={errors.emailError} />
              </div>
            </div>
            <div className="flex flex-col lg:flex-col lg:flex-nowrap justify-center content-center lg:max-w-[450px] mb-2 lg:mb-0 lg:m-auto">
              <Label htmlFor="subject">Subject<span className="text-red_color">*</span></Label>
              <Input
                id="subject"
                type="text"
                placeholder="Enter subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
              <div style={{ height: '20px' }}>
                <ErrorMessage message={errors.subjectError} />
              </div>
            </div>
            <div className="flex flex-col lg:flex-col lg:flex-nowrap justify-center content-center lg:max-w-[450px] mb-2 lg:mb-0 lg:m-auto">
              <Label htmlFor="message">Message<span className="text-red_color">*</span></Label>
              <TextArea
                id="message"
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="min-w-[217px] sm:w-full"
              />
              <div style={{ height: '20px' }}>
                <ErrorMessage message={errors.messageError} />
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4 mb-[100px]">
            <Button type="submit" disabled={submitting}>Send</Button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default ContactPage;
