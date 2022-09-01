import React from 'react';
const FormBasic = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
  return (
    <form
      name="events"
      action="/thankyou"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Name"
        onBlur={handleChange}
      />
      <label htmlFor="company">Company:</label>
      <input id="company" type="text" name="company" placeholder="Company" />
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        type="text"
        name="title"
        placeholder="Title"
        onBlur={handleChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        onBlur={handleChange}
      />

      <label htmlFor="details">Details:</label>
      <input
        id="details"
        type="text"
        name="details"
        placeholder="Details"
        onBlur={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormBasic;
