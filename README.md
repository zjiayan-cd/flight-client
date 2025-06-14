# Flight Booking Frontend

Flight booking web frontend built with React, Vite, Tailwind CSS, Redux, and i18n. Designed to interact with the [flightapi](https://github.com/zjiayan-cd/flightapi) backend service.

---

## Tech Stack

- [React 18+](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [react-i18next](https://react.i18next.com/)
- [Axios](https://axios-http.com/) for API calls
- [React Router](https://reactrouter.com/) for routing

##  Features

-  User authentication (JWT-based login & registration)  
-  Flight search with filters and pagination  
-  One-way & round-trip support  
-  Flight selection & booking flow  
-  Server-side sorting (price, departure time)   
-  Global login modal  
-  Internationalization with `react-i18next` (English, Chinese)  
-  Mobile-friendly responsive layout  
-  Toast notifications for errors and feedback  
-  Clean modular architecture using Redux Toolkit   
---

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/zjiayan-cd/flight-client.git
cd flight-client
npm install
npm run dev
```
### 2. Internationalization (i18n)

This project supports multiple languages via react-i18next.  
&nbsp;&nbsp;  Default: English (en)  
&nbsp;&nbsp;  Available: English (en), Simplified Chinese (zh)  
Translation files are located in:  
```
  src/i18n/locales/en/xxx.json  
  src/i18n/locales/zh/xxx.json
```

### 3. Authentication
JWT is stored in localStorage after login.  
Axios includes the token in every authenticated request.  
User state is managed via React Context.  

### 4. Pagination & Sorting
Server-side pagination and sorting are supported.
Sorting options include: price, departureTime.  

### 5. Mobile Support
Responsive and optimized for mobile and tablet screens using Tailwind's responsive utility classes.
