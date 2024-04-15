---
slug: 2015/05/05/jenkins-the-definitive-guide
title: "Book Review: Jenkins: The Definitive Guide"
shortTitle: "Jenkins: The Definitive Guide"
author: Julien Sobczak
date: 2015-05-05
subject: Continuous Integration
headline: Still the best introduction to the most popular CI Server but not a definitive guide.
note: 12
stars: 2
tags:
  - devops
  - tools
cover: '/posts_resources/covers/jenkins-the-definitive-guide.jpg'
bookAuthors: John Ferguson Smart
bookIsbn: '1449305350'
---

*Jenkins: The Definitive Guide* is the perfect introduction to Jenkins and the subject of continuous integration. The setup and basic configuration of the server are perfectly covered and all the most popular plugins are presented (Jenkins is so extensible that it uses plugins to do almost anything).

So, what is missing from this book?

The book is mainly targeted for Java project using Maven. The authors only scratch the surface concerning other environments like .Net. However, with the information packaged in this book, you will have no difficulty to install necessary plugins for our project.

Moreover, the book is also a little outdated. The content is still valid but new plugins like Workflow (Continuous Delivery) are not covered. Jenkins Enterprise, which add a lot of interesting plugins (Template...) and Jenkins Operations Center (useful when you have several masters) are simply not covered at all and if you plan to use these tools, you should expect to read the official documentation.

The last missing point concerns the writing of plugins: a subject still not documented today.

*Jenkins: The Definitive Guide* is definitely not a reference but is a really good place to start. I recommend it for any developer new to Jenkins who want to quickly setup a Jenkins environment with all essential plugins and following industry best practices.
