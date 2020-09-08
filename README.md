
# What is Mitio?
Mitio is a weather app that I created to have a better understanding of the web development process and what it takes to build a web app. I wanted to create a simple-looking weather app without using any third-party libraries (except for animation). I tried to keep the design simple and practical where user can have access to the weather information without much hassle. You can go here for live [preview](https://weathertestapp.netlify.app). **It only works on desktop, not on mobile devices.**
To give a basic idea of the functionality of the website, I used the geolocation API to fetch the user's location and then weatherbit API to receive necessary weather data. It was then processed into meaningful information and then rendered in the browser. Below I've a detailed explanation of the important part.

[![Netlify Status](https://api.netlify.com/api/v1/badges/2fe72a73-cba2-46a8-9972-7197c7a9e699/deploy-status)](https://weathertestapp.netlify.app/)

# Setting up the UI

After dribbling through dribbble, I came up with something like this.
![enter image description here](https://cdn-images-1.medium.com/max/1000/1*ziiH3zlUDEiKd0oTkeIYMw.jpeg)

My idea was to display information in grids, so it would be easier for the user to go through them easily. I also gave grid cells different dimensions based on the hierarchy of the information. So if the information is something that I think is important to the user then I gave that cell a bigger dimension with higher depth.

To convert my design into code, the obvious choice for me was to use CSS grids. I declared `<body>` as a grid container because I wanted to show the whole page in single view without any scroll.

![enter image description here](https://cdn-images-1.medium.com/max/1000/1*O63nRqR5Aj8e9w6u-g9Y3w.png)

This is the result.

![enter image description here](https://cdn-images-1.medium.com/max/1000/1*br2M9mjBzVirFCCOxPd3xw.png)

# Functioning

Let’s divide this section into three parts — Getting data, Modifying Data and Rendering data.
**Getting Data** — The first step was to get the data. Here by data I mean user’s location and the weather data fetched by keeping user’s location into mind. In programming to access data from a service we use an **API** (Application Programming Interface). So if we want to access data from Youtube website, we would use Youtube API which acts as a mediator of the information.

In our case to get user’s location I used Geolocation API. Geolocation is one of the many Web APIs browsers provide. In this project I learned something interesting that I want to share. JavaScript is a simple programming language that runs in browser in isolation without having access to internet. It access internet and _DOM_ through Web APIs, which are browser features. So whenever we access _DOM_ using _document.getElementById_ or something else of that sort, we are actually reaching _DOM_ using _DOM API. DOM_ is not a part of JavaScript environment. To read more about Web API, [click here](https://developer.mozilla.org/en-US/docs/Web/Reference/API).

Geolocation API provides information regarding user’s device location which includes latitude, longitude, acceleration etc. You can find more about Geolocation API [here](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).

We can prompt for user’s location with the following code. If user gives the permission then value will be stored in long and let variables, if not then we can try IP address API to fetch location. But I didn’t use the IP address API in my case.

![enter image description here](https://cdn-images-1.medium.com/max/1000/1*pCwpxqBU-dhOmw61Wd8kDw.png)

The second data we need is the weather data. I used weatherbit API and in weatherbit API, it had two endpoints — one for current weather and the other having weather forecast for next 16 days. Endpoints are actually URL which can be used to access data in JSON format. I needed to fetch two different API endpoints. I used fetch method to access these data and then used destructuring to store those data.

![enter image description here](https://cdn-images-1.medium.com/max/1000/1*HiZB8Qk2jIVPyndlu80AuQ.png)

**Modifying Data** — The weatherbit API gives temperature information in Celsius. So I used a simple function that converts Celsius into Fahrenheit when user clicks on it.

![enter image description here](https://cdn-images-1.medium.com/max/1000/1*_u6vE6XoQNbeH4rtDefcLA.png)

The main challenge that I faced while modifying data was to convert UTC time into the time user is in, in 12 hour time format. The weatherbit API always gives UTC time. So I needed to add or subtract the timezone offset from the UTC time.

![enter image description here](https://cdn-images-1.medium.com/max/1000/1*EBf1M7n-73KZEUttivtjfQ.png)

Here, the idea was to convert the UTC string which comes as a string “00:10” into two separate integers. One being 00 and the other being 10. Then I calculated the Timezone offset using in-built date function. The interesting thing that I found was that for positive timezone, like +5:30. It always gave me a negative number.

![enter image description here](https://cdn-images-1.medium.com/max/1000/1*XbyrpVodfWm4aDhYdhUx6w.png)

**Rendering data** — For rendering data to the DOM, I simply used textContent to display the values. `dayOneDate.textContent = dayOne;`

For animation I used Lottie animation library. If you want to know more about Lottie go [here](https://lottiefiles.com/what-is-lottie). I will try to explain the animations briefly because there’s not much going on here. First I imported the lottie js files in my index.html. Then I’m using if…else conditions to show the right weather animation for the right condition.

![enter image description here](https://cdn-images-1.medium.com/max/1000/1*6fg-MRB01SUCxDEOEhbK_Q.png)

Here’s an example. The `currentIconId` and `currentPod` are weatherbit data that tells the current weather(rain, snow etc) and whether its day or night respectively. On that basis I’m deciding which animation to show.

![enter image description here](https://cdn-images-1.medium.com/max/1000/1*2GNHh8fjejVBmxUjhRkt9Q.gif)

# Background Animations

There are four types of background animations which depends on the weather — *cloudy, snow, rainy and night.*

Among them I want to explain here the night animation, the reason being, one it looks great and unlike other animations I came up with the whole idea. The idea was to create several html divs, each having different size and positioning and also different animations.

![enter image description here](https://cdn-images-1.medium.com/max/1000/1*j3zoOz87We2TVgSPUQSA6w.png)

In this makeStars function, I’m creating 200 `<div>` elements, each having a size which can be from 1 to 3 pixels using random Math function. Then I’m populating these `<div>` in the parent div which occupies the whole screen. I’m assigning them different CSS IDs and a main CSS class. On line 903 & 904, I’m shifting their position from top and left randomly based on user screen’s width and height.

![enter image description here](https://cdn-images-1.medium.com/max/1000/1*aOq314jpT70d6YlBAit1hA.png)

The code below is the SCSS snippet which provides randomness (sort of) to the stars. SCSS or SASS is a CSS pre-processor which gives you ability to add logic to your CSS. In other words you can use CSS as a programming language instead of using cascading programming style. Also SCSS or SASS are basically the same things, the only difference is of syntax. SASS uses indent to define scope like in python, on the other hand SCSS uses our friending curly braces `{}`. To learn more about SASS, click [here](https://sass-lang.com/guide).

So here, the idea was to divide the 200 star `<div>` into three categories each having different keyframe animations. In the code snippet, I’m again looping through 200 times (no of divs) and assigning two variables — `randomId` and `randomFl`. The value of `randomId` can anything from 1 to 3. `randomId` variable determines which animation will be given to the star. There’s also three keyframes each having different motions which are attached to the stars div on the basis of `randomId`.

![enter image description here](https://cdn-images-1.medium.com/max/1000/1*cSwAyVMIbXrq6PAJYLQOKA.png)

The first three values in animation property are the keyframe name, time of the animation and the delay.

![enter image description here](https://cdn-images-1.medium.com/max/1000/1*vnWTWxegLRjRMC2eu5Gvyw.png)
![enter image description here](https://cdn-images-1.medium.com/max/1000/1*YYdJZ7u5dyybKuFp4Zth0g.png)

In my case I am adding two animations to each star `<div>`, one is the universal stars class and the other can be one of the three animation keyframes. While assigning them for the time of the animation I am giving a random number which can be anywhere between 16 to 55 seconds for `move-1` animation, on top of that I’m also adding an animation delay which can be anywhere between 0 to 9000 ms. These random time values gives an illusion that movement of stars are random. But as you can see all the motions are fixed, I’m just changing the speed of animation and its delay. I’m also adding a flicker animation based on the same logic.

![enter image description here](https://cdn-images-1.medium.com/max/1000/1*pY7V56JkgSL9H3szrDIDQA.png)

# How to Install

If you want to make changes or introduce new features you need to - 

 1. First go to [weatherbit](https://www.weatherbit.io/api), create an account.
 2. Clone this repository. 
 3. Then add your master key that you got from
    weatherbit in the const api found in main.js. You can use the key
    that is provided in the main.js or use yours. **But I would suggest
    you to replace the existing key with your key.**
    
    ![enter image description here](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f29aeefb-d64d-4718-b0b1-34f6a66a9150/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5/20200908/us-west-2/s3/aws4_request&X-Amz-Date=20200908T122405Z&X-Amz-Expires=86400&X-Amz-Signature=d6220c42741a79d2a2a3f88e0f7655aad2f8df56b1d652e533a2ebed67ea5ad6&X-Amz-SignedHeaders=host&response-content-disposition=filename%20=%22Untitled.png%22)

# Conclusion

> Education without application is just entertainment. — Tim Sanders

Though I had some understanding of the web development in bits and pieces before, but I never understood how these technologies worked together in conjunction with each other. It was because of this project that helped me to put those pieces together and made me understand the big picture. It made me realize the elegance of web development. Web development have many parts — browser, javascript, DOM, APIs, server and the list goes on. But when you put these things together, it makes sense why these things exists.

I love creating things and I’m pretty sure that I’ll continue building new things with these tools that I have learned. 😄
