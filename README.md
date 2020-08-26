# MERN Marketplace

Hello and Welcome to my coding course to build a multi-vendor ecommerce website by MERN stack. In this course you will learn the essential tools and skills to design, develop and deploy a fully-function marketplace website using React and Redux in frontend and Node and MongoDB in backend.

## What You Will Learn

This is a practical coding course and we are gonna learn and build lots of stuff in this multi-vendor ecommerce website like:

- create functional component by react
- use react hooks to handle form inputs
- manage application state by redux using custom hooks
- create backend web api by node and express js
- design database model by mongodb
- perform CRUP operations on orders, products and users by mongoose ORM
- handle authentication and authorization using JsonWebToken
- create seller and admin roles to manage products, orders and users
- handle shopping cart for customer to place orders
-

## Audiences

This course is for non-coders or juniors who want to be a professional web developer to get a job in 22 million job opportunities around the world. Basic knowledge of web developments like html, css and basic javascript is necessary for this course.

## What You Will Build

1. What we will build
   1. HomeScreen
      1. Create react app
      2. Use bootstrap and react-bootstrap
   2. Product Screen
      1. Url routing in react
      2. handle events in react
   3. Cart Screen
      1. Save and retrieve data in local storage
      2. Working javascript array functions
      3. Update summary based on cart changes
   4. Sign-in and Register Screen
      1. Create dynamic form
      2. Input validation in frontend and backend
      3. Create web server using node.js
      4. Connect to Mongodb database
      5. Add registered user to the database
      6. Authenticate user based on email and password
      7. Using Jsonwebtoken to authorize users
   5. Shipping and Payment Screen
      1. Create wizard form to get user data in multiple steps
      2. Save user info in the local storage
   6. Place Order Screen
      1. Validate and create order in the database
   7. Order Screen
      1. Payment with paypal
      2. Show order state based on user and admin activities
   8. Profile Screen
      1. Create authenticated routes
      2. enable user to update their informations
      3. enable user to logout and clear local storage
      4. show list of orders to user and link it to details
   9. Seller Menu
      1. add products, upload files
      2. manage orders
   10. Admin Menu
       1. manage users

# Table of content

1. Create React Bootstrap App
   1. create mern-marketplace folder
   2. npx create-react-app frontend
   3. npm start
   4. npm install react-bootstrap
   5. link bootstrap.css CDN to index.html
   6. create <>
   7. header
   8. create Navbar, LinkContainer, Navbar.Brand
   9. create Navbar.Toggle, Navbar.Collapse,
   10. Nav, Nav.Link Cart and Nav.Link Sign In
   11. main
   12. create Container and sample content
   13. footer
   14. create Container, Row, Col, copyright
   15. Update style.css to se min-height for main
2. List Products
   1. create an array of products in products.js
   2. copy some images (680x830) in images folder in public folder
   3. create Product.js component
   4. show product name from props
   5. Use Product component in App.js by creating map() over products
   6. complete Product component to show the products
3. Create Rating Component
   1. create components/Rating.js
   2. link to fontawesome.css in index.html
   3. create div.rating
   4. define Rating object with render()
   5. if !props.value return empty div
   6. else use fa fa-star, fa-star-half-o and fa-star-o
   7. last span for props.text || ''
   8. style div.rating, span and last span
   9. Edit Product component
   10. Use Rating component
4. Product Details Screen
   1. Install react-router-dom react-router-bootstrap
   2. Use BrowserRouter and Route for Home Screen
   3. Create HomeScreen.js
   4. Add product list code there
   5. Create ProductScreen.js
   6. Add new Route from product details to App.js
   7. Create 3 columns for product image, info and action
5. Create Node.JS Server
   1. run npm init in root folder
   2. npm install express
   3. create server.js
   4. add start command as node backend/server.js
   5. require express
   6. create route for / return backend is ready.
   7. move products.js from frontend to backend
   8. create route for /api/products
   9. return products
   10. run npm start
6. Load Products From Backend
   1. edit HomeScreen.js
   2. define products, loading and error.
   3. create useEffect
   4. define async fetchData and call it
   5. install axios
   6. get data from /api/products
   7. show them in the list
7. Install Babel And Nodemon
   1. npm install -D babel core, cli, node, preset-env
   2. Create .babelrc and set presets to @babel/preset-env
   3. npm install -D nodemon
   4. set start: nodemon --watch backend --exec babel-node backend/server.js
   5. convert require to import in server.js
   6. npm start
8. Install ESlint For Code Linting
   1. npm install -D eslint
   2. install VSCode eslint extension
   3. Set VSCode setting for eslint
   4. Install prettier extension
   5. npm install -D eslint-config-prettier
   6. Add extends: "prettier"
9. Add Redux to Home Screen
   1. npm install redux react-redux
   2. Create store.js
   3. initState= {products:[]}
   4. reducer = (state, action) => switch LOAD_PRODUCTS: {products: action.payload}
   5. export default createStore(reducer, initState)
   6. Edit HomeScreen.js
   7. shopName = useSelector(state=>state.products)
   8. const dispatch = useDispatch()
   9. useEffect(()=>dispatch({type: LOAD_PRODUCTS, payload: data})
   10. Add store to index.js
10. Show Loading and Message Box
    1. Create Loading Component
    2. Create Message Box Component
    3. Use them in HomeScreen
11. Add Redux to Product Screen
    1. create product details constants, actions and reducers
    2. add reducer to store.js
    3. use action in ProductScreen.js
    4. handle Add To Cart button
12. Add To Cart Action
    1. create CartScreen.js
    2. create addToCart constants, actions and reducers
    3. add reducer to store.js
    4. use action in ProductScreen.js
    5. render cartItems.length
13. Cart Screen UI
    1. cartItems = getCartItems()
    2. create 2 columns for cart items and cart action
    3. cartItems.length === 0 ? cart is empty
    4. show item image, name, qty and price
    5. cart action
    6. Subtotal
    7. Proceed to Checkout button
    8. Add CSS Style
14. Update and Delete Cart Items
    1. add qty select next to each item
    2. after_render()
    3. add change event to qty select
    4. getCartItems() and pass to addToCart()
    5. set force to true to addToCart()
    6. create rerender() as (component, areaName = 'content')
    7. component.render and component.after_render
    8. if force is true then rerender()
    9. add delete button next to each item
    10. add click event to qty button
    11. call removeFromCart(deleteButton.id)
    12. implement removeFromCart(id)
    13. setCartItems( getCartItems().filter)
    14. if id === parseRequestUrl().id? redirect to '/cart'
    15. else rerender(CartScreen);
15. Connect To MongoDB and Create Admin User
    1. npm install mongoose
    2. connect to mongodb
    3. create config.js
    4. npm install dotenv
    5. export MONGODB_URL
    6. create models/userModel.js
    7. create userSchema and userModel
    8. create userRoute
    9. create createadmin route
16. Sign-in Screen UI
    1. create SigninScreen
    2. render email and password fields
    3. style signin form
17. Sign-in Screen Backend
    1. create signin api in backend
    2. create route for /api/users/signin
    3. create check user name and password
    4. if it is not ok the return 401 error
    5. install express-async-handler
    6. wrap it in expressAsyncHandler
    7. add error middleware in server.js
    8. install Postman
    9. send post request
    10. test with invalid user password
    11. otherwise generate token
    12. install jsonwebtoken
    13. set config.JWT_SECRET to somethingsecret
    14. add generateToken to utils.js
    15. return token
    16. test with correct user and password
18. Sign-in Screen Action
    1. after_render handle form submit
    2. create signin request in frontend
    3. show alert if email or password is incorrect
    4. Add getUserInfo and setUserInfo to localStorage
    5. create Header component
    6. if userInfo.email exist show user name otherwise show signin
19. Create Progress Indicator and Alert Component
    1. create overlay loading div in index.html
    2. Style overlay loading
    3. create showLoading() function
    4. set loading-overlay classList add active
    5. create hideLoading() function
    6. create overlay message div in index.html
    7. add style overlay message
    8. create showMessage(message, callback)
    9. document message-overlay set inner HTML
    10. div > div id message-overlay-content
    11. show message
    12. button id message-overlay-close-button OK
    13. add class active to it
    14. add event listener for button to call callback
20. Register Screen
    1. create RegisterScreen.js
    2. add form elements
    3. after_render handle form submit
    4. create register request in frontend
    5. create register api in backend
21. User Profile Screen
    1. create ProfileScreen.js
    2. add form elements
    3. after_render handle form submit
    4. create profile update request in frontend
    5. create profile update api in backend
    6. create isAuth in utils.js and use in update profile
    7. implement sign out
22. Checkout Wizard
    1. create CheckoutSteps.js
    2. create div elements for step 1 to 4
    3. create redirectUser() in utils.js
    4. copy profile screen and as shipping screen
    5. use CheckoutStep
    6. define getShipping and setShipping
    7. copy shipping screen and as payment screen
    8. define getPayment and setPayment
    9. redirect user to PlaceOrder.js
23. PlaceOrder Screen UI
    1. create PlaceOrder.js
    2. style elements
24. PlaceOrder Screen Action
    1. handle place order button click
    2. createOrder api
    3. create orderModel
    4. create orderRouter
    5. create post order route
25. Order Screen
    1. create OrderScreen.js
    2. style elements
26. PayPal Payment
    1. get client id from paypal
    2. set it in .env file
    3. create route form /api/paypal/clientId
    4. create getPaypalClientID in api.js
    5. add paypal checkout script in OrderScreen.js
    6. show paypal button
    7. update order after payment
    8. create payOrder in api.js
    9. create route for /:id/pay in orderRouter.js
    10. rerender after pay order
27. Display Orders History
    1. create customer orders api
    2. create api for getMyOrders
    3. show orders in profile screen
    4. style orders
28. Admin Dashboard UI
    1. Header.js
    2. if user is admin show Dashboard
    3. create DashboardScreen
    4. create DashboardMenu
    5. Style dashboard
29. Admin Products UI
    1. create ProductListScreen.js
    2. show products with edit and delete button
    3. show create product button
30. Create Product
    1. create product model
    2. implement create product route
    3. create product function in api.js
    4. call create product function in ProductListScreen
    5. redirect to edit product
31. Edit Product UI
    1. create ProductEditScreen.js
    2. load product data from backend
    3. handle form submit
    4. save product in backend
32. Edit Product Backend
    1. handle form submit
    2. create updateProduct
    3. save product in backend
33. Upload Product Image
    1. npm install multer
    2. create routes/uploadRoute.js
    3. import express and multer
    4. create disk storage with Date.now().jpg as filename
    5. set upload as multer({ storage })
    6. router.post('/', upload.single('image'))
    7. return req.file.path
    8. app.use('/api/uploads',uploadRoute) in server.js
    9. create uploads folder and put empty file.txt there.
    10. ProductEditScreen.js
    11. create file input and set id to image-file
    12. after_render() handle image-file change
    13. create form data
    14. call uploadProductImage()
    15. create uploadProductImage in api.js
    16. update server.js
34. Build Project
    1. create build script for frontend
    2. create build script for backend
    3. update sever.js to serve frontend build folder and uploads folder
    4. stop running frontend
    5. npm run build
    6. check localhost:5000 for running website and showing images
35. Delete Product
    1. update ProductListScreen.js
    2. handle delete button
    3. rerender after deletion
36. Admin Orders
    1. create Admin Order menu in header
    2. create AdminOrder.js
    3. load orders from backend
    4. list them in the screen
    5. show delete and edit button
    6. redirect to order details on edit action
37. Deliver Order
    1. if order is payed show deliver button for admin
    2. handle click on deliver button
    3. set state to delivered
38. Show Summary Report in Dashboard
    1. create summary section
    2. style summary
    3. create summary backend
    4. create getSummary in api.js
    5. load data in dashboard screen
    6. show 3 boxes for Users, Orders and Sales
39. Show Chart in Dashboard
    1. import chartist
    2. add chartist css to index.html
    3. create linear chart for daily sales
    4. create pie chart for product categories
40. Publish heroku
    1. Create git repository
    2. Create heroku account
    3. install Heroku CLI
    4. heroku login
    5. heroku apps:create <yourname>jsamazona
    6. Edit package.json for heroku-prebuild
    7. Edit package.json for heroku-postbuild
    8. Edit package.json for node engines
    9. Create Procfile
    10. Edit server.js for PORT
    11. Create mongodb atlas database
    12. create MongoDB Account
    13. open cloud.mongodb.com
    14. add new user and save username and password
    15. set Network Access to accept all requests
    16. Create new database
    17. create connection string based on db name and user and password
    18. Set Cloud MongoDB connection in heroku env variables
    19. Commit and push
41. Product Search Bar
    1. create search bar in Header.js
    2. add style
    3. handle submit form
    4. edit parse url to get query string
    5. update product list api for search keyword
42. Show Categories In Sidebar Menu
    1. create aside-open-button in Header.js
    2. add event to open aside
    3. create Aside.js component
    4. Add style aside
    5. after render close it on click on close button
    6. Use it in index.html
    7. Update index.js to render aside 9.
    8. call getCategories
    9. create getCategories in api.js
