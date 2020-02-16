---
title: Updating an ejected Create React App
date: "2018-04-26T22:40:32.169Z"
path: "/updating-create-react-app/"
unsplash: 'FZWivbri0Xk'
---

When I started working with React in September of 2016 [Create React App](https://github.com/facebook/create-react-app) was only a few months old. It appealed to me immediately. I'd been developing in the Angular 1.x world, and had exactly zero experience writing ES6 or configuring webpack, let alone writing React applications. I wanted to dig into React foremost, not attempt scaffolding an app. CRA seemed a perfect solution even in its nascent stage.

Before too long I chose to [eject](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject), in my case because I'd gotten pretty comfortable with Bootstrap Sass and skinning it to serve my purpose. Again, less learning curve, the better. So I ejected from version 0.6.1. In fairness, I was warned. This would make things quite a bit more complicated down the line.

Cut to yesterday, when I run `npm outdated` on my application and see horrifying results. One of the major dependencies I rely on, unrelated to CRA, had some improvements that I sorely needed, so I started down the road of updating my dependencies, knowing the domino effect that likely lay ahead of me.

What follows is my perilous journey, or you can just [skip to my solution.](#tldr)

##My first attempt to update dependencies

It's all kind of a blur, but I think my first step was to run `npm update` to get at least the latest minor or patch versions of many of my dependencies, depending on how I had them configured. This worked fine. But then, I noticed that one troublesome package I'd pegged to a specific minor version, but I wanted to update it in hopes of fixing some issues I'd experienced. This is where the fun began.

Updating it to the latest version gave me "peer dependency" errors. It relied on at least webpack v2. I was on v1 (gasp). I figured I should probably get webpack up to date (or at least closer). So, I manually installed v2 of webpack. (I think I tried an even more recent version of webpack, but alas, another dependency couldn't support past v2. Dependencies are hell).

Here's where I started to slip.

![Person falling into a creek](https://media.giphy.com/media/3oxRmGNqKwCzJ0AwPC/giphy.gif)

After updating webpack any number of other packages had peer dependency issues, because they relied on v1 of webpack. I tried manually updating them, but it took a bit of tinkering and research to find versions that relied on v2 and not v3, for instance. Inelegant.

I think I got it somewhat stable at that point, without peer dependency issues. So now it was time to dig into the webpack configs. I ran `npm start` CRA command just to see what might happen. It obviously failed. I went line by line in the webpack dev config trying to update to use the new webpack API, fix things like PostCSS, etc. I had made some customizations to this config that I didn't want to lose, and I thought that maybe I could get the old config working.

Eventually, I gave up.

##Take 2, stand on the shoulders of giants

The changes to webpack were not marginal. It occurred to me that CRA probably had it figured out in a more recent version, and why should I struggle so much when I could rely on what they wrote? I concluded it would be easier to patch my small webpack tweaks back in to their updated code (it was).

So, I went digging in their GitHub repo to find where they upgraded to v2 of webpack (1.0.0 I think). But then, I thought, I shouldn't do the earliest version as it might be buggy, I should find the latest version of CRA that relied on webpack v2. This took some time to locate, because unfortunately they went from webpack v2 to v3 between versions 1.0.10 and 1.0.11. Not sure why that didn't warrant more than a patch. Maybe upgrading to v3 will be easier for me.

Once I found the version, I compared the package.json for "react-scripts" package against my own, and updated my dependencies to match theirs. This was a bit tedious but not too bad. `npm install` ran fine.

Then, I largely copy/pasted over the code from v1.0.10 of CRA into my app. Some of the file names had changed, and a lot of the code from the scripts had been abstracted out. With the help of GitHub I could easily see the customizations I had made to these files, and applied it on top of their new configs, making it compatible with the new version of webpack. This proved easier than trying to redo the whole configs myself.

I ran `npm start`. Cool to see some ESlint updates. Had a few issues with ENV vars in the template but nothing too crazy. So far so good. Then `npm run build`. A couple tweaks here too, but nothing too challenging.

Then I ran `npm test`. This was a little tougher. I realized that there were some jest configuration changes that needed to be made. But how would I know what exactly needed changing? I got this working for local tests, but then when I pushed to my CI environment, the tests broke. Worst feeling ever.

I concluded that copy/pasting from the CRA repo did not give me a full picture of what exactly would be different from an ejected create-react-app at v1.0.10 versus an ejected app at v0.6.1, especially with respect to the package.json file. I bit more work was necessary. I installed CRA globally on my machine at the closest version to v1.0.10 I could get (`npm install -g create-react-app@1.0.0`).

I created a dummy application using this version of CRA. I then, keenly (a unique moment of clarity), made sure to version the react-scripts to v1.0.10, because that code was the whole point. Then, I ejected this dummy app.

There it was! A package.json with a lot of changes to things like the Jest configuration. I now had better source code from which to rebuild my application. A few tweaks later and I was in business, with a lot of lessons learned.

##TL;DR

Here's how I'd do it if I were to do it again:

1) Find the version/tag of CRA [react-scripts](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts) that relies on the version of the associated dependency I'm targeting. Identify the latest version possible.

2) Install that particular version (or prior, if unavailable) of CRA globally on your machine, for instance `npm install -g create-react-app@1.0.0`. It's important to note that the "react-scripts" package, where the important config magic lives, is versioned more frequently than the actual create-react-app package.

3) Create a dummy app using that version by running `create-react-app my-app`. Cd into `my-app`.

4) Update the "react-scripts" in package.json to match the version identified in step 1. `npm install` again.

5) Eject using `npm run eject`.

6) Now, compare/contrast the package.json, config, and scripts files against my own. Reference version control or whatever to make sure I've got a good handle on what changes I made to webpack config files, testing configuration, etc. Copy/paste the new ejected versions and then piece things back together, or try and diff the files and go line by line. Either way, get the updates and improvements and code that references new/changed dependencies into my code base.

7) Fix tests, fix code against new linting rules, check the `start`, `test`, and `build` commands.

8) Do this way more often so it's not as painful.
