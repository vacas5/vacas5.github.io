---
title: Dusting off a 7 year old Gatsby blog
date: "2024-06-14"
path: "/blog-dust-off/"
unsplash: "rV9m9-a5_mE"
---

Recently, I've been inspired to write another post for this blog (coming soon), but as I only post about once a year there is always a ramp up time to try and remember how this blog works. I originally created this blog 7 years ago using Gatsby version 1. As of last month I was still only on Gatsby v2 (they are now at v5). I hadn't done a major version bump of Gatsby in 5 years. I was still using Node 12 for the project.

Kudos to the Gatsby team that I could still write new posts and deploy pages all these years later. But Github's security warnings for old dependencies were troubling and I wondered how long I maintain it in its current state.

So, I set out to update it to Gatsby v5 and this morning I achieved success. Here's how I did it.

## Step 1: Remove unnecessary dependencies

My first tactic was to simply look at my dependency list and see if they were all still relevant or if a simple refactor could eliminate the need for them. I was able to get rid of a couple but not many. It wasn't a large dependency list to begin with.

## Step 2: Create confidence in dependabot

As you might expect, working with a repo using a 5 year old version of a framework had a lot of dependencies that needed updating. I had dependabot configured on my repo (I think Github did this by default because the repo is public), and it opened several PRs on my behalf for dependencies with security risks.

However, beyond the simplest patch version changes, I was hesitant to merge any of the dependabot PRs, _because I had no confidence my site would continue to work_. In many cases, if I simply merged the dependabot PRs as is, `npm` would fail to run due to conflicting peer deps. Gatsby relies on a lot of interconnected plugins, and so certain dependency updates require a number of other components to be updated at the same time, and that's beyond what dependabot can calculate out of the box.

What I needed was some amount of _automated testing_ that would run against each dependabot PR to tell me if everything was working. Now, testing in a CI pipeline may seem like a no-brainer at this point, but it definitely was NOT a given seven years ago for a personal blog.

So, I set out to create a Github action that would run a small suite of tests. But what kind of test? For this very visual blog, I reached for one of my favorite new tools, **[Playwright](https://playwright.dev/)**. Once I had this in place I would have tests that verified the Gatsby built pages. Even if they were just simple smoke tests, I would have a lot of confidence that something massive didn't bork when updating a dependency.

Here's all I had to do to get the automated testing framework in place for my old blog:

- Upgrade to Node 18 for Playwright
  - Required bumping Node Sass by 4 versions and fixing several breaking changes
  - Required bumping Gatsby manually to v3 (more on how this was done below)
- Introduce Playwright and a smoke test for the landing page and post pages
- Create a Github action to run this test on every pull request made against my primary branch

Of note: Playwright's CLI made the last two substeps pretty easy, and more or less wrote the Github action for me but there was some tweaking to account for env variables, etc and to get it working with Gatsby.

Once these were in place, I started rebasing dependabot PRs and began seeing that yes, they would in fact break my site if I merged them in.

## Step 3: Automated deployment

The biggest pain point I had with my blog is that I'd never set up an automated deployment process. I had a script in my package json for it, but remembering exactly from what branch and how I should run felt like a risk every time.

Now that I'd already had one action in place I decided to go ahead and fix the deployment process as well. This would be especially useful to deploy after every merged PR so if the deployment happened to fail, I'd get immediate feedback as to what issue it was, rather than sifting through any number of commits to try and figure it out.

I added a "Continuous Deployment" Github Action, and after some fenagling I figured out how to get it to work with the gh-pages cli package I was using in my deployment script. Luckily, the maintainers of gh-pages are [well on top of things](https://github.com/tschaub/gh-pages?tab=readme-ov-file#deploying-with-github-actions).

## Step 4: Update my open source Gatsby plugin

I had a lot of fun with the Gatsby ecosystem when it first came out. So much so that I created my own open source community plugin [gatsby-source-unsplash](https://www.gatsbyjs.com/plugins/gatsby-source-unsplash/) to pull in images from Unsplash for use in my blog.

Unfortunately, this repo didn't have any CI/CD or automated tests either, and it had it's own outdated dependencies.

So, for this package I:

- Added some simple unit tests with Jest
- Created a CI Github action to run the unit tests on open PRs
- Added [semantic-release](https://github.com/semantic-release/semantic-release) to control versioning, along with commitlint and husky to enforce conventional commits
- Created a CD Github action to run semantic-release when code is merged to the primary branch
- Updated the vulnerable dependencies
- Updated the version of gatsby-source-unsplash in my personal blog

TBH I feel a little guilty as a "open source maintainer" without having these things in place for so long.

## Step 5: Manually migrate to Gatsby 4 and 5

Now, even after all of this I was still behind two major versions of Gatsby. Most of the dependabot PRs were still failing e2e tests. I had to take matters in to my own hands.

Following the migration guides, I started upgrading version by version. I could have possibly tried to skip versions, but if I ran into snags I thought it would be easier to debug if I went one major version at a time.

The npm process itself was strange. Gatsby relies on a ton of plugins that may or may not have major versions that correspond with the Gatsby major version you're on. So after making the bump of the gatsby package I ended up with commands like this to get npm to finally succeed.

```shell
npm add react-helmet@6 gatsby-plugin-manifest@5 gatsby-plugin-offline@6 gatsby-plugin-preact@7 gatsby-plugin-react-helmet@6 gatsby-plugin-sass@6 gatsby-transformer-sharp@5 gatsby-plugin-sharp@5 gatsby-plugin-twitter@5 gatsby-remark-autolink-headers@6 gatsby-remark-copy-linked-files@6 gatsby-remark-images@7 gatsby-remark-prismjs@7 gatsby-remark-responsive-iframe@6 gatsby-remark-smartypants@6 gatsby-source-filesystem@5 gatsby-transformer-remark@6
```

Trying to update each individually would result in npm warnings, so they all had to go together.

Once upgraded though, there were very few actual breaking changes in my code. Kudos to the Gatsby team for their detailed migration guides and keeping breaking changes to a minimum I was able to remove some additional dependencies also as certain packages were now integrated into the Gatsby core.

Now that I was on the most recent major version of Gatsby, all of my dependabot PRs either auto-closed or were mergeable.

## Future steps

So now I'm up to date and it feels real good. With CI/CD in place it should be much easier to stay on top of dependency updates.

Now I just need to have blog ideas more frequently than once a year.
