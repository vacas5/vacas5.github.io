---
title: Use the framework - pause before abstracting a well-formed API
date: "2022-12-27T22:40:32.169Z"
path: "/use-the-framework/"
unsplash: "Sk-C-om9Jz8"
---

As a young developer my colleagues preached [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) to me, and it remains a strong value. However, as I've gained experience as a developer and a manager, I've found myself increasingly advocating against certain abstractions around libraries, frameworks and APIs, even if it means repeating code.

Let me give a concrete example. A few months ago I introduced Cypress's [intercept](https://docs.cypress.io/api/commands/intercept) command to our e2e test suite to mock api responses from our graphql server. It wasn't as straightforward as I'd hoped, because all graphql server requests share the same endpoint, but I needed a way to differentiate the exact one to mock. So, I leveraged the operation name passed as a header like so:

```javascript
cy.intercept({
  url: "/our-graphql-endpoint",
  headers: {
    "operation-name": "SomeOperationName",
  },
}).as("SomeOperationName");
```

I opened a pull request that repeated this pattern probably 10 times in different test files. Noticing that the only real variable here was the operation name, my colleague suggested to me that I abstract it into a cypress helper function that took a single operation name as an argument. I politely declined. Here's why.

## Do I understand a library or just my codebase's flavor of it?

Every time I get introduced to a new codebase I find it hard to be productive right away. I've been writing React for years now, but all that framework knowledge only goes so far in a legacy codebase. What I really need to be productive are the undocumented idiomatic expressions of the repository. Once I familiarize myself with certain helper functions and find the patterns at play, then the wheels start to hum. But usually this means staring at the code to try and figure it out. Because it's home rolled, there's rarely any documentation explaining it.

I'll give another concrete example. At Lonely Planet we used Apollo GraphQL's React Client and thus heavily leveraged [useQuery](https://www.apollographql.com/docs/react/data/queries/#usequery-api). Except that we didn't. We used our own abstraction around useQuery (let's call it `useCustomQuery`) which returned specific error messages for different scenarios. It supported a limited set of features from the upstream API because it only took a couple of arguments. I was constantly fiddling with it to add functionality without breaking the other instances of usage in the app.

I'd talk with other developers about options like polling or refetch, and they'd be like "wait, it can do that?" They were very familiar with what `useCustomQuery` could do, but had little idea about the underlying tech that powered it. We were great about maintaining consistency across a large codebase, and not doing things a hundred different ways, but it seemed to come at the cost of functionality the useQuery API could have given us if we had used it directly in components.

## Abstraction or obfuscation?

So now, when I go to write an abstraction around a library, I ask myself if I'm prepared to support the whole feature set? Am I prepared to document the usage to the extent that the open source package has? Also, I must remember that almost immediately a use case will come around that requires my abstraction to be tweaked. Is it sufficiently tested to account for this possibility?

The onus is on my colleagues to understand how things work, but it's in my best interest to write code that's as easy to grok as possible, especially if I have turnover or juniors on my team. Isn't it nice to point someone straight to a docs site with an explanation of the API? Abstractions might solve real challenges for my code base in terms of repetitive code or consistency, but they are also adding layers of obfuscation that I must be mindful of. I need to remember that people are going to reach for things that work and are familiar, possibly to the detriment of the product.

The libraries and frameworks we use often have dense documentation. I want my code to stay as close to it as possible, so that answers to questions are easy to find and don't require my help. As a bonus, learnings about additional functionality are easy to find.

## Building knowledge that transfers

Now, as a manager I have some different priorities at play than the typical developer, but it's important to me that my team is building skills that will transfer from job to job (and project to project). This is a primary reason I pushed not to abstract cypress intercept. I _want_ my team learning the underlying Cypress API and getting familiar with those docs so we can begin to leverage that knowledge elsewhere. Also, when they leave my company they'll have skills that transfer.

No one in a job interview is going to care if I really know how to use a particular home rolled utility well. How can I write code that is maintainable but will help get people immersed in the docs for these frameworks? Let's all be experts in these technologies, not just a clever abstraction of it.
