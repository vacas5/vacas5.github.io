---
title: Redesign Your Workflow
date: "2018-03-24T22:40:32.169Z"
path: "/redesign-your-workflow/"
unsplash: 'KR84RpMCb0w'
---

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Your UI development process is too slow and cumbersome, so you invest in prototyping tools that don&#39;t use your code. Now you have two problems.</p>&mdash; Mark Dalgleish (@markdalgleish) <a href="https://twitter.com/markdalgleish/status/973663937571909632?ref_src=twsrc%5Etfw">March 13, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I saw this tweet the other day. It has inspired me to extrapolate on a product development process I currently use. I first mentioned this process in my [last post](http://russelljanderson.com/ambiguous-requirements/).

I mean this post to be descriptive of the process, not necessarily prescriptive for anybody else. Take from it what you will. It hasn’t always worked perfectly. Yet, I feel like it has allowed our small teams to rapidly build a volume of quality software. Incidentally, it has also helped preserve my sanity.

## Product development can be the bottleneck

Let's take for granted that everybody is going to want to push features faster. Often, when we reflect on the time it takes to deliver a feature, the burden gets placed on developers to increase efficiencies or to skip things like unit tests. A lot of post-mortem decision making includes ways to reduce the development time constraint.

I wonder, though, if the same consideration should be given to the time spent planning/deliberating over requirements and specific implementation of those requirements represented by wireframes or even more fully realized graphic designs? What if we could net time by shifting the design process closer to the finished product?

## Working without a graphic designer

At my last two companies our small teams have been without a dedicated graphic designer. No one was responsible for creating designs, wireframes, mockups, etc for developers to work from when implementing a new feature. I familiarized myself with tools like Sketch and Omnigraffle to produce wireframes. Early on, our product/business teams relied on these to flesh out requirements and determine how a new feature would meet them.

I quickly identified some issues:

1. As a developer, fumbling through a tool like Sketch was only marginally easier than developing it in HTML/CSS/JS
1. These wireframes prompted lengthy discussions, which were difficult to control and would frequently drift off into tangents unrelated to the specific feature
1. We would iterate on the wireframes, come back and deliberate even more. They fell victim to perfectionism, which makes sense if they are meant to serve as gospel truth to a developer about to build out a feature
1. Expectations were set as a result of these deliberations. Unseen constraints encountered in actual development would often lead to further deliberation and often disappointment

I am not a graphic designer foremost. However, over the years of developing websites (from other's designs) and applications, and from following smart people on twitter and caring about best practices, I do believe I've picked up enough knowledge to consider myself a UX designer. As a developer (mostly front-end) I care about my code and how I write it, but ultimately, what I care about is the end product, and if it's user friendly and valuable. I often gladly had a say in the ultimate UI/UX of the product I was building. That is definitely part of the job.

So, at my last two companies, I pushed to have us _skip wireframing and graphic designing altogether_ in favor of iterative initial development. Based on a set of requirements, I would usually just get to work, building and designing at the same time. We would then review my implementation, deliberate, tweak, sometimes multiple times, but then ultimately arrive on the desired feature.

## Laying the foundation

I should mention that we had a great foundation to work from. We took great efforts before we built our product to put together a style guide and an atomic design system that dictated a number of things for our applications. Most of the major UI/UX components should be there, and in many cases it was just a matter of piecing them together.

If at any point I felt like I was venturing into uncharted territory, this was likely a sign that I should bring in other opinions and expand our existing framework of design components. We were forever aiming for consistency and reusability with our UI/UX because that not only leads to more expeditious development but also to a better user experience all around.

Additionally, I had to make sure that other stakeholders (product owners, designers) could easily view my working prototype before merging it into the codebase (Heroku's pull request app generation was useful for this). I had to treat it as a work in progress, and expect changes and feedback. A lot of the challenge was managing my own expectations.

## The benefit

Here's what we gained.

### Really understanding the constraints

Maybe I'm all alone in this, but when I sit down in a design discussion with nothing but tickets and graphics, I am rarely able to think about the nitty gritty details of my software in any meaningful way. It never fails, but as soon as I actually start trying to implement a design, a flood of reality hits me about the shape of data in our database, other code that should be reused, and what might take 10 days rather than 10 minutes. At this point, if I am working from a design, the conversation to make changes might be really difficult.

Often when you are working from a design, so many alternatives have been considered, so many expectations have been set, that the developer becomes the bad guy when he or she pushes back. Everyone leaves dissatisfied.

No matter how good the design or how long the planning process, stuff will always be missed until one actually begins to code.

By attempting to prototype without a fully fleshed design, the developer is able to specifically communicate these constraints. Alternatives and iterative ideas can flow without anyone's expectations being let down. Peace in the valley (not really but kinda).

### Cutting out the middleman

Often, the requirements for a feature will be fleshed out by one party, who hopefully understands the needs of the user. Then, another party will create the graphic design. Then, a third party will implement the feature in code. This can mean the developer is out of touch with the underlying needs of the user, and this can have a negative impact on your product. It can be more about implementing the design than it is about satisfying the needs of the user.

In my experience, getting the developer closer to the actual needs of the user results in better software. And it's more motivating for the developer! Understanding how my work (which can be drudgery) will actually solve problems creates a lot of satisfaction. There's real ownership there.

### Speeeeeeeeeeeed

Let's just be honest with ourselves. Even if you implement a design perfectly down to each particular pixel, there will still be changes. Certain "feel" just can't be measured in a Sketch file, without complete interactivity. And as the tweet above mentions, you could either invest in prototyping tools that are still not actual code, or you could just *code*. I can't say exactly how much of this product development philosophy is inspired by my hatred of meetings, but it certainly has helped eliminate many of them.

Often, the design review and deliberation would result in very small iterations, which could be done quickly, sometimes during the design review meeting itself. We seemed to get so much closer to finished product so much faster by writing it in code from the get-go. An added bonus is that we'd also identify bugs at the same time. The design review had crossover benefit of QA.

## Conclusions

It wasn't always perfect. And for some features that were complete green field, we did follow a more traditional product planning approach. For the most part, however, this approach allowed us to generate production ready features quickly. I got much better at UI/UX design, and we saved a great deal of man hours that would have been languished in meetings.
