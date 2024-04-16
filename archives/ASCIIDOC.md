# Asciidoc Migration

## Headings

```asciidoc
= Title

== Subtitle
```

=>

```mdx
# Title

## Subtitle
```

Check [official documentation](https://docs.asciidoctor.org/asciidoc/latest/document/header/)

## Admonitions

```asciidoc
[CAUTION.license]
====
You are reading...
====
```

=>

```mdx
<Admonition type="license">
You are reading...
</Admonition>
```

See also `NOTE`, `TIP`, `IMPORTANT`, `CAUTION`, `WARNING` and [official documentation](https://docs.asciidoctor.org/asciidoc/latest/blocks/admonitions/).

```
[NOTE]
.Optional Title
====
An admonition block may contain complex content.

.A list
- one
- two
- three
====
```

## Links

```
link:<url>[title]
```

=>

```mdx
[title](url)
```

See [official documentation](https://docs.asciidoctor.org/asciidoc/latest/macros/link-macro/)

Replace `link:(.*?)\[(.*?)\]` by `[$2]($1)`


## Quotes

```asciidoc
[quote,"Gerard Meszaros, author of book _XUnit Test Patterns_"]
____
Never in the field of software development have so many owed so much to so few lines of code
____
```

=>

```mdx
> Never in the field of software development have so many owed so much to so few lines of code
>
> — Gerard Meszaros, author of book _XUnit Test Patterns_
```


## Comments

```asciidoc
// ---
```

=>

```mdx
{/* --- */}
```


## Code Blocks

```asciidoc
[source,java]
----
public ...
----
```

=>

    ```java
    public ...
    ```

With callouts

```asciidoc
[source,java]
----
public // <1>
private // <2>
----
<1> Blabla
<2> Blabla
```

=>

```mdx
 ```java {"1":1} {"2":2}
 public
 private
 ```
 * <Marker number={1} /> Blabla
 * <Marker number={2} /> Blabla
 ```
```


## Sidebar

```asciidoc
[sidebar]
Sidebars are used to visually separate auxiliary bits of content
that supplement the main text.
```

See [official documentation](https://docs.asciidoctor.org/asciidoc/latest/blocks/sidebars/).

```mdx
.Optional Title
****
Sidebars are used to visually separate auxiliary bits of content
that supplement the main text.

TIP: They can contain any type of content.

.Source code block in a sidebar
[source,js]
----
const { expect, expectCalledWith, heredoc } = require('../test/test-utils')
----
****
```
