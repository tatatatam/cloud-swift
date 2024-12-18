# Getting Started with NestJS

This document provides a step-by-step guide to set up and start a NestJS application. Follow the instructions below to get started.

---

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (version 16 or later)  
  You can download Node.js from [nodejs.org](https://nodejs.org/).

- **npm** (Node Package Manager)  
  npm is included with Node.js.

- **MongoDB Community Edition** (version 8.0)  
  You can download MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community).

---

## Installation Steps

### 1. Install Node.js

If you don’t have Node.js installed, download and install it from the [official Node.js website](https://nodejs.org/). Verify the installation by running:

```bash
node -v
npm -v
```

### 2. Install MongoDB Community Edition

Download and install MongoDB Community Edition (version 8.0) from the [official MongoDB website](https://www.mongodb.com/try/download/community). Follow the installation instructions for your operating system. Verify the installation by running:

```bash
mongod --version
```
After installation MongoDB port is usally 27017. It may change if you want to install in other port. You can configure on MongoDB URI on env files.


### 3. Install Dependencies

Run the following command in the project directory to install all required dependencies:

```bash
npm install
```

### 4. Run Initial Migration Script

To set up the initial database schema, run the migration script:

```bash
node migrate/initial.js
```

### 5. Start the Development Server

Start the development server with the following command:

```bash
npm run start:dev
```

---

Enjoy building with NestJS!
