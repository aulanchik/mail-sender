# mail-sender

This repository contains a simple Node.js and Express application that serves as a mail-sending service using the Mailgun API. It provides an API endpoint to send customized HTML emails to two different recipients simultaneously, using separate Handlebars templates for each.

## Features

*   **Mailgun Integration**: Leverages the Mailgun API for robust email delivery.
*   **Dynamic Templating**: Uses Handlebars.js to populate HTML email templates with dynamic data.
*   **Concurrent Sending**: Sends emails to multiple recipients in parallel.
*   **RESTful API**: Exposes a clean `POST` endpoint to trigger the email sending process.
*   **Middleware**: Includes `helmet` for security and `morgan` for request logging.

## Project Structure

```
.
├── src/
│   ├── index.js          # Main entry point, sets up Express server and middlewares
│   ├── configs/
│   │   └── client.js     # Configures and initializes the Mailgun client
│   ├── controllers/
│   │   └── email.js      # Handles the logic for processing the request and sending emails
│   ├── routes/
│   │   └── index.js      # Defines the API routes
│   ├── services/
│   │   └── mailgun.js    # Service layer abstracting the Mailgun API calls
│   └── templates/
│       ├── a.html        # Handlebars template for the first recipient
│       └── b.html        # Handlebars template for the second recipient
└── package.json          # Project dependencies and scripts
```

## Prerequisites

*   Node.js
*   A Mailgun account with:
    *   Your API Key
    *   Your Mailgun Domain

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aulanchik/mail-sender.git
cd mail-sender
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following configuration. Replace the placeholder values with your actual Mailgun credentials.

```env
# Server Configuration
PORT=4000

# Mailgun API Credentials
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_USERNAME=api
DOMAIN=your.mailgun.domain.com

# Default Sender Name
SENDER="Your Sender Name"
```

### 4. Run the application

For development with live reloading:
```bash
npm run dev
```

For production:
```bash
npm start
```

The server will be running on the port specified in your `.env` file (e.g., `http://localhost:4000`).

## API Usage

### Send Emails

Send a `POST` request to the `/api/emails/send-email` endpoint with the recipient details and template data in the request body.

**Endpoint**: `POST /api/emails/send-email`

**Request Body**:

```json
{
    "recepientA": "first_email@example.com",
    "recepientB": "second_email@example.com",
    "subject": "Greetings from Mail Sender!",
    "dataA": {
        "name": "Alice",
        "message": "This is a special message just for you, Alice."
    },
    "dataB": {
        "name": "Bob",
        "message": "This is a different message tailored for Bob."
    }
}
```

#### Field Descriptions:
- `recepientA` (string, required): The email address for the first recipient.
- `recepientB` (string, required): The email address for the second recipient.
- `subject` (string, required): The subject line for both emails.
- `dataA` (object, required): Data to populate the `a.html` template.
- `dataB` (object, required): Data to populate the `b.html` template.

#### Example `curl` Request:

```bash
curl -X POST http://localhost:4000/api/emails/send-email \
-H "Content-Type: application/json" \
-d '{
    "recepientA": "alice@example.com",
    "recepientB": "bob@example.com",
    "subject": "Your Weekly Update",
    "dataA": {
        "name": "Alice",
        "message": "Here is your update for the week."
    },
    "dataB": {
        "name": "Bob",
        "message": "Please see your weekly summary attached."
    }
}'
```

#### Success Response (Status `200 OK`)

```json
{
    "message": "Emails sent successfully!",
    "successes": [
        {
            "id": "<20240320183021.1234.5678@your.mailgun.domain.com>",
            "message": "Queued. Thank you."
        },
        {
            "id": "<20240320183022.9876.5432@your.mailgun.domain.com>",
            "message": "Queued. Thank you."
        }
    ],
    "failures": []
}
```

#### Error Responses

- **Status `400 Bad Request`**: If any of the required fields are missing from the request body.
    ```json
    {
        "error": "All fields are required to be filled in."
    }
    ```
- **Status `500 Internal Server Error`**: If Mailgun fails to send the emails.
    ```json
    {
        "error": "Failed to send out emails.",
        "details": "..."
    }
