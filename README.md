We'll use:
🔗 DummyJSON – https://dummyjson.com/products

All Products: https://dummyjson.com/products

Search: https://dummyjson.com/products/search?q=laptop

Filter by Category: https://dummyjson.com/products/category/smartphones

List of Categories: https://dummyjson.com/products/categories

Product Details: https://dummyjson.com/products/1

<!--  -->
Features to Build
Feature	Notes
Product Listing Page	Home page with categories
Product Search	Input + debounce API call
Product Filters (Category)	Category tabs or sidebar
Product Detail Page	Show images, description, price
Add to Cart	Context API / useReducer
Cart Page	Quantity change, delete, total
Responsive UI	Mobile + desktop views
Toast Notifications	On add/remove
Optional Auth (Firebase later)	Not required for MVP

<!--  -->
API Endpoint
To get a single product by ID:
https://dummyjson.com/products/:id

<!-- Features to add -->
Product Details Page (Done)

Cart Functionality (Done)

Lazy-loading for images (Done)

Search & Filter (Done)

Toast Notifications (Done)

Dark Mode : css property : bg-base-100 text-base-content (Done)

Responsive Mobile View

Price Filter and Range Slider (Done)

Category Filter / Multi-Filter

Sorting

Skeleton Loaders (Done)

Toasts for Feedback

Search Suggestions Dropdown

Pagination or Infinite Scroll (Done)

User Login/Signup (Authentication)

Order Summary Page

Save Address / Shipping Info

Discount Coupons / Promo Codes

Out of Stock Badge

Recently Viewed Products

Compare Products

Dark Mode Toggle (Done)

PWA Support

Admin Panel (Optional)

Scroll-to-Top Button

Price Breakdown
Show item price, tax, shipping, discount, total.

Multi-select Filters

Debounced Search

Meta Tags for Products

Component Fallback UI

Product Data Cache

Type Safety with PropTypes or TypeScript

<!--  -->
Install
npm install react-hot-toast

<!--  -->
Add Dynamic Exchange Rate
Use a Free Currency API

ExchangeRate-API
use https://api.frankfurter.app/latest?from=USD&to=INR (no API key needed).
use https://api.exchangerate.host/latest (no API key needed).

<!-- Issues to resolve -->
Category filter is not working completely.
What is working :
    If the product of selected category is available on page 1, then the products for that category are fetched successfully.
What is not working :
    If the product of a selected category is not available on page one but is available in the api, on selecting that particular category the products are not fetched.
What more to add :
    If the category is de-selected/removed. All the products of all categories must be available on the UI.