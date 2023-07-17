# ecommerce-site

This is an ecommerce site I made as a learning project. It uses PostgreSQL, Express, React, and the Stripe API. 
Features Include: 

-Filtering and Sorting products

-Pagination

-Checkout

-Login and Registering user accounts

Stripe API Webhook empties the user cart and transfers items to an order entry upon sucessful payment.
Authentication is handled using JSON web tokens. If no token is found when the user lands on the site, a temporary user is created and a JWT is issued.
