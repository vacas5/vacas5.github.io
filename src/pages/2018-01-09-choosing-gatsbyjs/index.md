---
title: Choosing Gatsby JS
date: "2018-01-09T23:46:37.121Z"
path: "/choosing-gatsby/"
---

Recently the team at [SimplyAgree](https://simplyagree.com) wanted to get serious about thought leadership in the legal tech space. For us, there are serious opportunities to move ideas forward because for better or worse, attorneys and firms are often slow to adopt software to help their process. Therefore, to provide this content we needed a blog. So it was up to me and the rest of the development team to make that happen.

Now, we could have made it happen by saying "hire an agency". Someday I might write a post about this specifically, but there are solid arguments for SAAS companies to shop out the marketing parts of their website and taking it off of the hands of the people building product. In our case, we had some extra design/front-end bandwidth in house and felt like we could take the project on ourselves.

So, the tried and true first instinct was a hosted CMS, because blogging means content, and content generation. The 800-lb gorilla in this space is WordPress, so we considered it the default solution. But, we had some other options.

I was familiar with the concept of static site generation, and had played around with [Jekyll](https://jekyllrb.com/docs/home/) once before (a static site generator based in Ruby). I thought I understood a lot of the benefits, and considered they mostly made sense from a developer's standpoint, not necessarily from a marketing person's point of view. Alternatively, I'd been turned on the the [JAMstack](https://jamstack.org/) site in the javascript channel of the NashDev slack community, and had learned about some of the API based content solutions. And then someone mentioned [Gatsby JS](https://www.gatsbyjs.org/) and suddenly I felt like the guy who invented Reese's. Reese, I guess. A static site generator based in React?

![Martin from the Simpsons gif saying "Tell me more"](https://media.giphy.com/media/l4FGx257ZwUoRUjcY/giphy.gif)


## Weighing pros and cons of Gatsby


|Pros   |Cons   |
|---|---|
|Security   |Established ecosystem   |
|Cost |Comfortable, familiar CMS |
|Performance |External scripts |
|JS (specifically React)   |   |

I started researching Gatsby and [its features](https://www.gatsbyjs.org/features/). Many of the benefits are consistent with all static site generators. No server side rendering required. This is a game changer in several ways, so I'll go into it in more detail.

From what I can glean, Gatsby and other static site generators use a manual build task to compile the website somewhere before deployment. For instance, your local machine or in some type of CI environment. This is similar to the way many client-side applications are built. This means that when the page is requested, all you have to do is return a file. There are no gaps to be dynamically filled in. No database to connect to, because that already happened. Also, no server needed.

Why is this good?

##Pros

###Security

You can point the finger squarespacely at end user negligence, but WordPress and other hosted CMS solutions like Drupal, Joomla, etc. have developed a reputation of being vulnerable to attack. WordPress is diligent with their security package updates, but as a result of being big man on campus they are also the biggest target. And keeping up with plugin releases means that whoever manages the content site (often someone in a marketing role) needs to be diligent about staying up to date. Anecdotally, I haven't seen this very often in my experience. So, when it came to even thinking about WordPress, I only considered it in conjunction with a hosting service like Pressable. Pressable, while a bit more expensive than other hosting solutions, will automatically install security updates for WordPress sites hosted through it.

Additionally, hosted CMS solutions require an admin panel that is live on the web (`/wp-admin`). As bad as most individuals are with generating secure passwords, companies seem to be even worse. They pass around credentials like a Swingline stapler. The idea of anyone having access to even attempt to break into our admin panel and jack with our site gives me pause.

###Cost

Thus, with security as a major consideration, our hosting options with something like WordPress seemed to be in the range of ~$25 per month. With a hosted CMS, there's quite a bit more going on with your site. You have to have a database and a server running. There's usually the need for some kind of control panel inside the hosting provider that gives you to access the database (another vulnerability).

With the static files, our hosting options become dirt cheap / free. These sites can be hosted on Github pages for free, or on AWS S3 for pennies a month. In our case, we already host our other front end applications on s3, and were pretty comfortable with the flow to get that set up (future blog post).

Now, there is one big caveat to this: content generation.

With Gatsby, you get all your content in Node at build time, either as markdown files or via APIs. Gatsby has some pretty great plugins (like most things in JS right now, Gatsby starts with basically nothing and you tack on the modules you want) that convert markdown files to HTML. For a developer like me, this works perfectly. I'm comfortable writing in MD and can conceptually grasp how it will translate to HTML on real pages. In SimplyAgree's case, our marketing team is savvy enough not to be scared off by using markdown and Github to generate content at first. I will say that this is still an ongoing experiment, and in reality we will likely need some sort of content solution with a GUI long-term.

Unfortunately, that piece may undo a lot of the cost benefit. API based content solutions [Contentful](https://www.contentful.com/) are an option for us, but I am not digging their pricing page rn. It looks like WordPress.com provides an API and some pretty inexpensive options.  is a fully API based solution, and other content could be picked up via RSS potentially (is blogger still a thing?).

Using a third-party service for content also negates part of my security argument, but at least the login page doesn't have to live at the same domain as the site. And, it's not a problem we're dealing with... yet.

###Performance

To be honest, performance wasn't a huge consideration for us when we were looking to create a content site, but it made sense to me that static files would always be a bit faster than SSR. However, performance has been one of the most pleasant surprises of the Gatsby experience.

Their blog post ["Web Performance 101—also, why is Gatsby so fast?"](https://www.gatsbyjs.org/blog/2017-09-13-why-is-gatsby-so-fast/) really outlines it well, but to highlight: Gatsby was built to render as fast as possible. Here are some of the things it does for you that speed things up:

![Slide from Kyle Mathews' talk on Gatsby](https://www.gatsbyjs.org/static/reactnext-gatsby-performance.049-ba99fa93c5e4dc66c23bd9b2d3516da6-b1d1d.png)

This slide is amazing! The only thing I don't like about that list is that because they do it all for me I won't be forced to learn how to do it on my own. Additionally, you get the benefit of the React virtual dom on page changes. The resulting pages are really snappy.

I also love this:

![Another slide from Kyle Mathews' performance talk](https://www.gatsbyjs.org/static/reactnext-gatsby-performance.064-4a502ed6b98a1a5d9499bd4badfff796-b1d1d.png)

I can't really say anything better than what's in that post. Go read it.

###javascript

Here is the coup de grace. With our hosted CMS options, or Squarespace or another web builder, we were facing a learning curve. In my experience, often the easiest way to get up and running with WordPress was to find a similar template and reconfigure it to serve your purposes and try and match your design. In our case, we already had a site that we wanted to reuse that was a part of a backend behemoth. Trying to work a template would be like starting from scratch.

Additionally, we have pretty clever developers, but none of us write PHP all day. What we do write all day is React. Porting over some HTML source code into JSX was not intimidating for us. On top of that, using React to do DOM manipulation or add other dynamism to the page would easily click for our whole team, and we could share any knowledge gleaned from working in Gatsby with the other apps we are working on.

This same logic applies to considering Jekyll or Hugo as alternate static site generators. When comparing/contrasting solutions, the React/JS element of Gatsby made it clear to me that it would be our straightest path towards converting our existing site and having something live.

##Cons

It's not all roses. Here are some of the things we're giving up.

###The ecosystem

The WordPress community is massive. The list of plugins is massive. If you have an issue with WordPress, there is a forum answer out there for you, you just have to look. This is not true for Gatsby. It is pretty nascent. Some of the documentation pages are just placeholders. There isn't much action on StackOverflow yet. If you want a plugin for a particular source that isn't listed on their site, you probably have to write it yourself. And what happens if in two years the maintainer drops it altogether?

###Comfortable CMS

There is a good chance your marketing team has worked with WordPress before. They haven't written in Markdown. You're going to have to figure out the content piece eventually, and you should provide your team with an easy to use experience wherein they can generate it quickly and easily. That's kind of what hosted CMS solutions are all about.

One cool thing, as mentioned above, is that if you already have a WordPress site, you can actually use their API to source your content. I'm not 100% on how you would keep that WP site going after switching to GatsbyJS, but the potential is there to use the WordPress admin as a place for content, hosted elsewhere.

###External scripts

One gotcha I ran into specifically was trying to use a third-party script on our site. This doesn't surprise me at all. Third party scripts pretty much suck in general, because you didn't write them and you have no idea the assumptions they are making. In our case, the script was assuming a document load event to happen on every page. But with Gatsby, it's one big react app. The load happens once (which is awesome).

I fiddled with the script quite a bit to finally get it to work.

##Conclusion

Those are most of my thoughts. I've really enjoyed the experience so far. I've really liked working with their node configuration and getting my own sources into the GraphQL layer (a whole other thing I'm not qualified to speak on). Working in React has been nice, following their tutorials has been fun and so far they've had plugins to support most of what I want, such as Sass and Google Analytics for instance.

Finally, I'd say that if you are unfamiliar with React and want to dip your feet in, Gatsby might be a great solution for you. I might even recommend it over Create React App as a place to start, because application development can be so much different. We all have blogs, right?
