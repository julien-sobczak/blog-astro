---
slug: 2016/09/15/zookeeper-distributed-process-coordination
title: "Book Review: ZooKeeper: Distributed process coordination"
shortTitle: "ZooKeeper: Distributed process coordination"
author: Julien Sobczak
date: 2016-09-15
subject: "ZooKeeper"
headline: "The reference for developers of distributed systems and administrators of applications using ZooKeeper in production"
note: 16
stars: 4
tags: [programming]
topics: [data]
bookCover: "/posts_resources/covers/zookeeper-distributed-process-coordination.jpg"
bookAuthors: "Flavio Junqueira, Benjamin Reed"
bookIsbn: '1449361307'
---


ZooKeeper is used by many popular projects (HBase, Kafka, Accumulo) but has been completely absent from the literature until this book. Written by core contributors on the project, this book is without any doubt the new reference on ZooKeeper. It clearly explains how these tools use ZooKeeper to build distributed algorithms, such as electing a master server, managing group membership, and managing metadata. The book is divided in 3 parts:

- Part I covers some motivations for a system like Apache ZooKeeper, and some of the necessary background in distributed systems that you need to use it. It explains the trade-offs made during its design.
- Part II (the most important one) covers the library calls and programming techniques that programmers need to know.
- Part III covers ZooKeeper for system administrators. Programmers might also find it useful, in particular the chapter about internals.

What I appreciate about this book is the authors make it clear: ZooKeeper will not solve all of your problems and authors spend time discussing ways to deal with tricky aspects of ZooKeeper internals. Explanations are always crystal clear. Authors even take the time to review the various logs messages that occur when running ZooKeeper.

If you use the previously cited tools or plan to use ZooKeeper to build a distributed algorithm, this book will teach you how ZooKeeper solves the classic coordination problem, how to use the Java and C APIs and how to be prepared to administer the tool in face of failures of the network, application processes, and ZooKeeper itself. The authors give you enough background in the principles of distributed systems to use ZooKeeper robustly. The only prerequisite is a basic knowledge of Java. One of the best edited technical books I have read!

