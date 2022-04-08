import { SMTPClient } from "emailjs";

const client = new SMTPClient({
  user: "user",
  password: "password",
  host: "smtp.your-email.com",
  ssl: true,
});

export async function post({ body }) {
  const { form } = await body;

  try {
    await client.sendAsync({
      text: "i hope this works",
      from: "you <username@your-email.com>",
      to: "someone <someone@your-email.com>, another <another@your-email.com>",
      cc: "else <else@your-email.com>",
      subject: "testing emailjs",
    });

    return {
      body: {
        status: "success",
      },
    };
  } catch (err) {
    return {
      body: {
        status: "error",
        error: err,
      },
    };
  }
}
