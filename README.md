# Pixo - Client

Pixo is an online marketplace for sellers of handmade and curated items. Designed for artisans, crafters and collectors to list and sell their items. By providing a user-friendly and visually appealing marketplace, Pixo aims to empower sellers to reach a broader customer base and showcase their unique creations. 

Slide Presentation of Pixo - Unfortauntely, Tome is no longer an active site

https://tome.app/zima-e05/pixo-app-clqwk0f18cstzod64kc9kmk5x

## Description 

The Pixo App front-end is designed to be user-friendly, providing collectors with an easy-to-navigate interface for browsing, sharing, and managing their collectible items. Built with Javascript, React, Tailwind and Radix, it features responsive design, interactive elements, and seamless integration with the Pixo App back-end services.

## Features

- **Browse Collectibles:** View a curated list of collectibles.
- **Filter By Category**: Easy to use filter bar to help you find items more directly.
- **User Profiles:** View and edit user profiles, showcasing user collections.
- **Messaging System**: A basic messaging system to be able to ask and answer any questions relating to items.
- **Responsive Design:** Accessible on various devices and screen sizes.

### Dependencies 

- Front End - Javascript/React
- CSS - Tailwind & Radix
- Back End - Django

## Screenshots
![Screenshot 2023-12-20 at 12 46 29 PM](https://github.com/hi-michelleprimiani/pixo-client/assets/133997733/f956f6df-258f-4826-a09c-e5c264341a07)
![Screenshot 2023-12-20 at 12 46 47 PM](https://github.com/hi-michelleprimiani/pixo-client/assets/133997733/75f77a54-79c1-4960-94b1-977d47b6b6eb)
![Screenshot 2023-12-20 at 12 47 03 PM](https://github.com/hi-michelleprimiani/pixo-client/assets/133997733/099e6908-002b-4156-ab82-7fd8c3825991)
![Screenshot 2023-12-20 at 12 47 18 PM](https://github.com/hi-michelleprimiani/pixo-client/assets/133997733/7a1d38fc-32a7-4f0e-bba8-87c526e0c029)
![Screenshot 2023-12-20 at 12 47 28 PM](https://github.com/hi-michelleprimiani/pixo-client/assets/133997733/abe7ac7b-0da1-40f4-86d0-7ab2530ef7f8)



## Installing

- git clone ```git@github.com:hi-michelleprimiani/pixo-client.git```
- cd to ```pixo-client```
- npm install
- npm run dev

### Acknowledgements
- Inspired by the creativity and community-driven aspect of Etsy, this project aims to provide a similar platform for collectible enthusiasts.

### Notes / Future Enhancements

While the core functionality of Pixo was developed in a three-week sprint during my capstone, it was built with scalability and real-world use in mind. Here are several planned improvements and optimizations:

#### Feature Enhancements
- **Stripe Integration for Secure Payments**  
  Implementing Stripe to allow real-time, secure transaction handling between buyers and sellers, including features like order history, receipts, and payment status.

- **Favorites & Watchlists**  
  Allow users to “favorite” items or save them for later, enhancing personalization and increasing user retention.

- **Enhanced Messaging System**  
  Expanding the messaging system to support threading, read receipts, and real-time updates via WebSockets or long polling.

- **Seller Dashboards**  
  Building out analytics and inventory management tools for sellers, such as views per item, conversion rates, and revenue tracking.

#### Technical Optimization & Performance Scaling

To prepare the app for future scalability and performance under increased traffic, I plan to implement the following technical improvements:

- **Code Splitting & Lazy Loading**  
  Use `React.lazy()` and `Suspense` to split bundles and defer loading of non-critical components until needed, improving initial load time.

- **Memoization Hooks**  
  - `useMemo()` to cache expensive calculations (e.g., filtered search results, derived states)  
  - `useCallback()` to memoize event handlers or props passed to child components, avoiding unnecessary re-renders.

- **Context API vs. Global State Management**  
  Evaluate if Context API is sufficient or if a state library like Redux or Zustand would be more appropriate for handling global state as the app grows.

- **Virtualized Lists**  
  Use a tool like `react-window` to efficiently render long lists of items without degrading performance.

- **Client-Side Caching**  
  Integrate a caching layer (e.g., `React Query`, `SWR`) to cache API responses, reduce server load, and improve perceived performance.

- **Accessibility Audits & Improvements**  
  Leverage tools like Lighthouse and `@axe-core/react` to improve semantic structure and keyboard navigation support.

- **Progressive Web App (PWA) Support**  
  Convert Pixo into a PWA to enable offline functionality and better mobile performance.
