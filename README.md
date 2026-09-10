
# ByteForge - Online Coding Lab Platform

## Overview

The Online Lab Platform is a web-based application designed to facilitate coding assignments and their automated evaluation in an educational environment. This platform bridges the gap between instructors and students by providing a comprehensive system for creating, submitting, and evaluating programming assignments.

### Key Features

- **User Role Management**:
    - Instructors can create, edit, and delete coding assignments
    - Students can view assignments, submit code, and receive feedback
- **Assignment Management System**:
    - Upload problem statements and test cases
    - Organize assignments by courses or topics
- **Code Submission System**:
    - Interactive interface for students to write and submit solutions
    - Support for multiple programming languages
- **Automated Evaluation Engine**:
    - Executes submitted code against predefined test cases
    - Generates instant feedback on code performance and correctness
- **Authentication**:
    - Secure login system for instructors and students
    - Role-based access control
- **Result Management**:
    - Reaults and codes are saves in database for later access.


## Technical Stack

- **Frontend**: React, Tailwind CSS, Daisy UI
- **Backend**: Node.js
- **Database**: MongoDB
- ** Compiler API ** : Jdoodle


## Requirements

- Node.js (v14.x or higher)
- npm (v6.x or higher)


## Installation

1. Clone the repository:

```bash
git clone https://github.com/Mayank471/Online-Lab-Platform.git
cd Online-Lab-Platform
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env
# Edit .env file with your configuration
```

4. Set up the database:

 - Add MongoDB API key to .env File


## Running the Application

1. Start the server:

```bash
npm start
```

2. For development mode with auto-reload:

```bash
npm run dev
```

3. The application will be available at:

```
http://localhost:5000
```


## Deploying to Vercel

The repository deploys as a single Vercel project: the Vite client is served as
static files and the Express API runs as one serverless function at `api/index.js`.

1. Import the repository at [vercel.com/new](https://vercel.com/new) and keep the
   root directory as `./`. `vercel.json` already sets the build command and the
   `Client/dist` output directory, so leave the framework preset on "Other".
2. Add these environment variables in **Settings -> Environment Variables** for
   the Production, Preview, and Development scopes:

   | Variable | Purpose |
   | --- | --- |
   | `MONGO_URI` | MongoDB Atlas connection string |
   | `JWT_SECRET` | Secret used to sign the auth cookie |
   | `Jdoodle_clientID` | JDoodle client id |
   | `Jdoodle_clientSecret` | JDoodle client secret |
   | `JDoodle_API_URL` | `https://api.jdoodle.com/v1/execute` |

3. In MongoDB Atlas, allow access from anywhere (`0.0.0.0/0`) under **Network
   Access**. Vercel functions do not have fixed outbound IP addresses on the
   Hobby plan.
4. Deploy. Confirm the API is live at `https://<your-app>.vercel.app/api/health`,
   which returns `{"status":"ok"}` without touching the database.

`CLIENT_URL` is only needed if the client is hosted on a different domain than
the API. On a single Vercel project the browser calls `/api` on its own origin.


## Contributing

We welcome contributions to improve the Online Lab Platform! If you're interested in contributing, please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Improvements

We are actively working on enhancing the platform with:

- Support for more programming languages
- Advanced plagiarism detection
- Integration with learning management systems
- Real-time collaboration features
- Enhanced analytics and reporting


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



[^1]: https://github.com/Mayank471/Online-Lab-Platform
