
# GoBussiness


# Go Business Referral Dashboard

## Overview

Go Business Referral Dashboard is a React-based web application that allows users to manage and track referral activities through an interactive dashboard. The application includes secure authentication, referral management, search, sorting, pagination, and detailed referral information.

---

## Features

* Secure user authentication using JWT
* Protected routes with React Router
* Dashboard overview with referral metrics
* Service summary section
* Referral link and referral code with copy functionality
* Search referrals by name or service
* Sort referrals by date (Newest First / Oldest First)
* Client-side pagination (10 referrals per page)
* Referral Details page
* Responsive user interface

---

## Tech Stack

* React.js
* React Router DOM
* JavaScript (ES6+)
* HTML5
* CSS3
* Vite
* js-cookie
* Fetch API

---

## Project Structure

```
src
│
├── components
│   ├── Login
│   ├── Header
│   ├── Overview
│   ├── ServiceSummary
│   ├── ReferralLink
│   ├── AllReferrals
│   ├── UserDetails
│   ├── Footer
│   ├── ProtectedRoute
│   └── NotFound
│
├── App.jsx
└── main.jsx
```

---

## Environment Variables

Create a `.env` file in the project root and add:

```
VITE_API_URL=https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate into the project

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

## Production Build

```bash
npm run build
```

Preview the production build

```bash
npm run preview
```

---

## API

The application consumes a REST API hosted on AWS API Gateway.

Authentication is performed using JWT Bearer Tokens.

---

## Screens

* Login Page
* Dashboard
* Overview Cards
* Service Summary
* Referral Link
* Referral Table
* Search & Sort
* Pagination
* Referral Details
* Not Found Page

---

## Author

**Chaitanya Reddy**

Built as part of the Go Business Referral Dashboard Coding Assessment.
