import React, { SyntheticEvent, useState } from 'react';
import { encode } from '../utils/encode';
import { navigate } from 'gatsby';
const FormBasic = ({ name }: { name: string | null | undefined }) => {
  const [state, setState] = useState<{
    [key: string]: string;
  }>();
  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setState({ ...state, [target.name]: target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action') as string))
      .catch((error) => console.log(error));
  };
  return (
    <form
      name="events"
      action="/thankyou"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input
        type="hidden"
        name="event-name"
        value={name ?? 'Missing event title'}
        onChange={handleChange}
      />
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Name"
        onBlur={handleChange}
      />
      <label htmlFor="company">Company:</label>
      <input
        id="company"
        type="text"
        name="company"
        placeholder="Company"
        onChange={handleChange}
      />
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
