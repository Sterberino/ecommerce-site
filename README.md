# ecommerce-site

This is an ecommerce site I made as a learning project. It uses PostgreSQL, Express, React, and the Stripe API. 
Features Include: 

-Filtering and Sorting products

-Pagination

-Checkout

-Login and Registering user accounts

Stripe API Webhook empties the user cart and transfers items to an order entry upon sucessful payment.
Authentication is handled using JSON web tokens. If no token is found when the user lands on the site, a temporary user is created and a JWT is issued.

Note: This began as a group project for a college course. A group project in which I committed 96% of the lines of code. This was a project I wanted to do anyway and I felt fortunate that I was able to do it for a letter grade, so I didn't mind taking charge on it. There were features I wanted to include that I didn't get to complete prior to the end of the course, so I have ported the code to this repo to continue working on it. I mention not to denegrate my former classmates, who were all wonderful, but in case anyone perusing this repo has questions regarding the large initial commit.
